'use strict';

/**
 * admin.routes.js — مسارات super_admin
 *   GET  /api/admin/payment-requests             — قائمة الطلبات
 *   POST /api/admin/payment-requests/:id/approve — موافقة + تفعيل 30 يوم
 *   POST /api/admin/payment-requests/:id/reject  — رفض
 *
 * constitution.md §§ 1,4,5,8
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// كل المسارات تتطلب super_admin
router.use(auth, requireRole('super_admin'));

// ── GET /api/admin/payment-requests ─────────────────────────────────
router.get('/payment-requests', (req, res) => {
  const status = req.query.status || 'pending';
  const requests = db.prepare(`
    SELECT pr.id, pr.request_type, pr.transaction_id, pr.payer_phone, pr.bank_name,
           pr.requested_username, pr.receipt_image, pr.status, pr.created_at, pr.reviewed_at, pr.reject_reason,
           b.name AS business_name, b.phone AS business_phone,
           u.name AS submitted_by_name, u.username AS submitted_by_username
    FROM payment_requests pr
    LEFT JOIN businesses b ON b.id = pr.business_id
    LEFT JOIN users u ON u.id = pr.submitted_by
    WHERE pr.status = ?
    ORDER BY pr.created_at DESC
  `).all(status);

  return res.json({ requests, total: requests.length });
});

// ── GET /api/admin/active-subscriptions ─────────────────────────────
// إرجاع قائمة جميع العملاء/المحلات المشتركة حاليًا للمسؤول الإداري
router.get('/active-subscriptions', (req, res) => {
  const activeSubs = db.prepare(`
    SELECT s.id, s.business_id, s.status, s.expires_at, s.updated_at,
           b.name AS business_name, b.phone AS business_phone,
           u.name AS manager_name, u.username AS manager_username,
           (SELECT COUNT(*) FROM users u2 WHERE u2.business_id = b.id AND u2.role IN ('cashier','storekeeper')) AS staff_count
    FROM subscriptions s
    JOIN businesses b ON b.id = s.business_id
    LEFT JOIN users u ON u.business_id = b.id AND u.role = 'manager'
    WHERE s.status = 'active'
    ORDER BY s.expires_at DESC
  `).all();

  return res.json({ subscriptions: activeSubs, total: activeSubs.length });
});

// ── POST /api/admin/payment-requests/:id/approve ─────────────────────
// constitution.md § 5: لا تفعيل تلقائي — يتطلب فعلًا صريحًا من super_admin
router.post('/payment-requests/:id/approve', (req, res) => {
  const { id } = req.params;
  const reviewerId = req.user.userId;

  const request = db.prepare('SELECT * FROM payment_requests WHERE id = ?').get(id);

  if (!request) {
    return res.status(404).json({ error: 'الطلب غير موجود' });
  }

  if (request.status !== 'pending') {
    return res.status(409).json({ error: 'تمت معالجة هذا الطلب مسبقًا', current_status: request.status });
  }

  const now = new Date().toISOString();

  // FR-016: إذا كان الطلب اشتراك جديد (new_subscription): إنشاء المحل، حساب المدير، والاشتراك في معاملة واحدة
  if (request.request_type === 'new_subscription') {
    const approveNewSub = db.transaction(() => {
      const newBusinessId = uuidv4();
      const newUserId = uuidv4();

      // 1. إنشاء المحل
      const shopName = request.bank_name || 'محل جديد';
      db.prepare(`
        INSERT INTO businesses (id, name, phone)
        VALUES (?, ?, ?)
      `).run(newBusinessId, shopName, request.payer_phone || null);

      // 2. إنشاء حساب المدير العام (manager)
      db.prepare(`
        INSERT INTO users (id, business_id, username, password_hash, name, role, is_active)
        VALUES (?, ?, ?, ?, ?, 'manager', 1)
      `).run(
        newUserId,
        newBusinessId,
        request.requested_username,
        request.requested_password_hash,
        request.bank_name || shopName
      );

      // 3. إنشاء اشتراك نشط لمدة 30 يومًا
      const newExpiry = new Date();
      newExpiry.setDate(newExpiry.getDate() + 30);
      const newExpiryISO = newExpiry.toISOString();

      db.prepare(`
        INSERT INTO subscriptions (id, business_id, status, expires_at, updated_at)
        VALUES (?, ?, 'active', ?, ?)
      `).run(uuidv4(), newBusinessId, newExpiryISO, now);

      // 4. تحديث الطلب بالموافقة وربطه بالمحل والمستخدم المنشأين
      db.prepare(`
        UPDATE payment_requests
        SET status = 'approved', business_id = ?, submitted_by = ?, reviewed_by = ?, reviewed_at = ?
        WHERE id = ?
      `).run(newBusinessId, newUserId, reviewerId, now, id);

      // 5. سجل التدقيق
      db.prepare(`
        INSERT INTO audit_log (id, business_id, user_id, action, details)
        VALUES (?, ?, ?, 'new_subscription_approved', ?)
      `).run(uuidv4(), newBusinessId, reviewerId, JSON.stringify({
        payment_request_id: id,
        created_user_id: newUserId,
        username: request.requested_username,
        expires_at: newExpiryISO
      }));

      return { newExpiryISO, newBusinessId, newUserId };
    });

    try {
      const result = approveNewSub();
      return res.json({
        message: 'تمت الموافقة وإنشاء المحل وحساب المدير وتفعيل الاشتراك بنجاح',
        business_id: result.newBusinessId,
        user_id: result.newUserId,
        expires_at: result.newExpiryISO
      });
    } catch (err) {
      console.error('خطأ في الموافقة على اشتراك جديد:', err.message);
      return res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }

  // ── موافقة على طلب تجديد لمحل قائم (renewal) ─────────────────────
  const businessId = request.business_id;

  const approveRenewal = db.transaction(() => {
    // تحديث الطلب
    db.prepare(`
      UPDATE payment_requests
      SET status = 'approved', reviewed_by = ?, reviewed_at = ?
      WHERE id = ?
    `).run(reviewerId, now, id);

    const existingSub = db.prepare(
      'SELECT status, expires_at FROM subscriptions WHERE business_id = ?'
    ).get(businessId);

    let baseDate = new Date();
    if (existingSub && existingSub.status === 'active' && existingSub.expires_at) {
      const existingExpiry = new Date(existingSub.expires_at);
      if (existingExpiry > baseDate) baseDate = existingExpiry;
    }

    const newExpiry = new Date(baseDate);
    newExpiry.setDate(newExpiry.getDate() + 30);
    const newExpiryISO = newExpiry.toISOString();

    if (existingSub) {
      db.prepare(`
        UPDATE subscriptions
        SET status = 'active', expires_at = ?, updated_at = ?
        WHERE business_id = ?
      `).run(newExpiryISO, now, businessId);
    } else {
      db.prepare(`
        INSERT INTO subscriptions (id, business_id, status, expires_at, updated_at)
        VALUES (?, ?, 'active', ?, ?)
      `).run(uuidv4(), businessId, newExpiryISO, now);
    }

    db.prepare(`
      INSERT INTO audit_log (id, business_id, user_id, action, details)
      VALUES (?, ?, ?, 'subscription_approved', ?)
    `).run(uuidv4(), businessId, reviewerId, JSON.stringify({
      payment_request_id: id,
      transaction_id: request.transaction_id,
      new_expires_at: newExpiryISO
    }));

    return newExpiryISO;
  });

  try {
    const newExpiry = approveRenewal();
    return res.json({
      message: 'تمت الموافقة وتفعيل الاشتراك',
      expires_at: newExpiry
    });
  } catch (err) {
    console.error('خطأ في الموافقة:', err.message);
    return res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// ── POST /api/admin/payment-requests/:id/reject ──────────────────────
router.post('/payment-requests/:id/reject', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const reviewerId = req.user.userId;

  const request = db.prepare('SELECT * FROM payment_requests WHERE id = ?').get(id);

  if (!request) {
    return res.status(404).json({ error: 'الطلب غير موجود' });
  }

  if (request.status !== 'pending') {
    return res.status(409).json({ error: 'تمت معالجة هذا الطلب مسبقًا', current_status: request.status });
  }

  const now = new Date().toISOString();

  db.prepare(`
    UPDATE payment_requests
    SET status = 'rejected', reviewed_by = ?, reviewed_at = ?, reject_reason = ?
    WHERE id = ?
  `).run(reviewerId, now, reason || null, id);

  db.prepare(`
    INSERT INTO audit_log (id, business_id, user_id, action, details)
    VALUES (?, ?, ?, 'payment_rejected', ?)
  `).run(uuidv4(), request.business_id || null, reviewerId, JSON.stringify({ payment_request_id: id, reason }));

  return res.json({ message: 'تم رفض الطلب' });
});

module.exports = router;
