'use strict';

/**
 * subscription.routes.js
 *   GET  /api/subscription         — حالة اشتراك المحل الحالي
 *   POST /api/payment-requests     — إرسال طلب تجديد (manager فقط)
 */

const express = require('express');
const { z } = require('zod');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const rateLimit = require('express-rate-limit');
const { hashPassword } = require('../utils/password');

const router = express.Router();

// T011 — Rate limiting لطلب الاشتراك الجديد: 5 محاولات / دقيقة / IP
const signupRequestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'محاولات كثيرة، انتظر دقيقة ثم حاول مجددًا.' }
});

const signupSchema = z.object({
  bank_name: z.string().min(1, 'الاسم البنكي مطلوب'),
  phone: z.string().min(1, 'رقم الهاتف مطلوب'),
  business_name: z.string().min(1, 'اسم المحل مطلوب'),
  username: z.string().min(1, 'اسم المستخدم مطلوب'),
  password: z.string().min(4, 'كلمة المرور يجب أن تكون 4 محارف على الأقل'),
  receipt_image: z.string().optional()
});

// ── FR-011 & FR-012: POST /api/signup-requests ─────────────────────
router.post('/signup-requests', signupRequestLimiter, async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { bank_name, phone, business_name, username, password, receipt_image } = parsed.data;

  try {
    // FR-012: تجزئة كلمة المرور فورًا — لا تُخزَّن ولا تُعرض أبدًا كنص صريح
    const passwordHash = await hashPassword(password);
    const id = uuidv4();
    const tempTxnId = `NEW-SUB-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    db.prepare(`
      INSERT INTO payment_requests (
        id, request_type, bank_name, payer_phone, transaction_id,
        requested_username, requested_password_hash, receipt_image, status
      )
      VALUES (?, 'new_subscription', ?, ?, ?, ?, ?, ?, 'pending')
    `).run(id, bank_name, phone, tempTxnId, username, passwordHash, receipt_image || null);

    // audit log
    try {
      db.prepare(`
        INSERT INTO audit_log (id, action, details)
        VALUES (?, 'signup_request_created', ?)
      `).run(uuidv4(), JSON.stringify({
        request_id: id,
        bank_name,
        phone,
        business_name,
        requested_username: username
      }));
    } catch {}

    return res.status(201).json({
      id,
      status: 'pending',
      whatsapp: '41010021',
      message: 'تم تسجيل طلبك بنجاح، يرجى إرسال صورة التحويل البنكي عبر واتساب'
    });
  } catch (err) {
    console.error('خطأ في إرسال طلب الاشتراك:', err.message);
    return res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// ── T013: GET /api/subscription ─────────────────────────────────────
// constitution.md § 1: الرد يأتي من الخادم دائمًا، وليس من localStorage
router.get('/subscription', auth, (req, res) => {
  const { businessId, role } = req.user;

  if (!businessId && role !== 'super_admin') {
    return res.status(400).json({ error: 'المستخدم غير مرتبط بمحل' });
  }

  if (role === 'super_admin') {
    return res.json({ status: 'active', message: 'super_admin لا يحتاج اشتراكًا', expires_at: null });
  }

  const sub = db.prepare(
    'SELECT status, expires_at, monthly_fee, updated_at FROM subscriptions WHERE business_id = ?'
  ).get(businessId);

  if (!sub) {
    return res.json({ status: 'expired', expires_at: null, monthly_fee: 300 });
  }

  return res.json({
    status: sub.status,
    expires_at: sub.expires_at,
    monthly_fee: sub.monthly_fee,
    updated_at: sub.updated_at
  });
});

// ── T014: POST /api/payment-requests ────────────────────────────────
const paymentSchema = z.object({
  transaction_id: z.string().min(1, 'رقم العملية مطلوب'),
  payer_phone: z.string().optional()
});

router.post('/payment-requests', auth, requireRole('manager'), (req, res) => {
  const parsed = paymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { transaction_id, payer_phone } = parsed.data;
  const { businessId, userId } = req.user;

  // منع التكرار
  const existing = db.prepare('SELECT id FROM payment_requests WHERE transaction_id = ?').get(transaction_id);
  if (existing) {
    return res.status(409).json({ error: 'رقم العملية مستخدم سابقًا' });
  }

  // إنشاء الطلب بحالة pending فقط — لا يُغيّر subscriptions (constitution.md § 5)
  const id = uuidv4();
  db.prepare(`
    INSERT INTO payment_requests (id, request_type, business_id, submitted_by, transaction_id, payer_phone, status)
    VALUES (?, 'renewal', ?, ?, ?, ?, 'pending')
  `).run(id, businessId, userId, transaction_id, payer_phone || null);

  return res.status(201).json({
    id,
    status: 'pending',
    message: 'تم إرسال طلبك، في انتظار مراجعة المشرف العام'
  });
});

module.exports = router;
