'use strict';

/**
 * staff.routes.js — مسارات إدارة طاقم الموظفين
 *   GET   /api/staff     — قائمة الموظفين (manager فقط)
 *   POST  /api/staff     — إنشاء موظف (manager فقط)
 *   PATCH /api/staff/:id — تعديل/تعطيل موظف (manager فقط)
 *
 * FR-018, FR-019, FR-020, FR-021, constitution.md §§ 1,2,4,8
 */

const express = require('express');
const { z } = require('zod');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const { hashPassword } = require('../utils/password');

const router = express.Router();

// جميع مسارات الموظفين تتطلب مصادقة ودور manager
router.use(auth, requireRole('manager'));

// مخططات التحقق من المدخلات
const createStaffSchema = z.object({
  name: z.string().min(1, 'اسم الموظف مطلوب'),
  username: z.string().min(1, 'اسم المستخدم مطلوب'),
  password: z.string().min(4, 'كلمة المرور يجب أن تكون 4 محارف على الأقل'),
  role: z.enum(['cashier', 'storekeeper'], { errorMap: () => ({ message: 'الدور غير صالح' }) })
});

const updateStaffSchema = z.object({
  name: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  password: z.string().min(4).optional(),
  role: z.enum(['cashier', 'storekeeper']).optional(),
  is_active: z.boolean().optional()
});

// دالة مساعدة لتسجيل audit_log
function logAudit({ businessId, userId, action, details }) {
  try {
    db.prepare(`
      INSERT INTO audit_log (id, business_id, user_id, action, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(uuidv4(), businessId || null, userId || null, action, JSON.stringify(details || {}));
  } catch {
    // لا نوقف الطلب بسبب فشل التسجيل
  }
}

// ── GET /api/staff ──────────────────────────────────────────────────
router.get('/', (req, res) => {
  const { businessId } = req.user;

  const staff = db.prepare(`
    SELECT id, name, username, role, is_active, created_at
    FROM users
    WHERE business_id = ? AND role IN ('cashier', 'storekeeper')
    ORDER BY created_at DESC
  `).all(businessId);

  // تحويل is_active إلى Boolean للعميل
  const formattedStaff = staff.map(emp => ({
    ...emp,
    is_active: Boolean(emp.is_active)
  }));

  return res.json({ staff: formattedStaff, total: formattedStaff.length });
});

// ── POST /api/staff ─────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const parsed = createStaffSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { name, username, password, role } = parsed.data;
  const { businessId, userId } = req.user;

  // FR-018: تفرّد اسم المستخدم داخل نفس المحل فقط
  const existing = db.prepare(
    'SELECT id FROM users WHERE business_id = ? AND username = ?'
  ).get(businessId, username);

  if (existing) {
    return res.status(409).json({ error: 'اسم المستخدم مستخدم بالفعل في محلك' });
  }

  try {
    const passwordHash = await hashPassword(password);
    const id = uuidv4();

    db.prepare(`
      INSERT INTO users (id, business_id, username, password_hash, name, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `).run(id, businessId, username, passwordHash, name, role);

    logAudit({
      businessId,
      userId,
      action: 'staff_created',
      details: { staff_id: id, name, username, role }
    });

    return res.status(201).json({
      id,
      name,
      username,
      role,
      is_active: true,
      message: 'تم إنشاء حساب الموظف بنجاح'
    });
  } catch (err) {
    console.error('خطأ في إنشاء حساب الموظف:', err.message);
    return res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// ── PATCH /api/staff/:id ────────────────────────────────────────────
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { businessId, userId } = req.user;

  // FR-019: التحقق من أن الموظف تابع لمحل المدير نفسه
  const staffUser = db.prepare(
    'SELECT * FROM users WHERE id = ? AND business_id = ?'
  ).get(id, businessId);

  if (!staffUser || !['cashier', 'storekeeper'].includes(staffUser.role)) {
    return res.status(403).json({ error: 'غير مصرح بتعديل هذا الحساب' });
  }

  const parsed = updateStaffSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const updates = parsed.data;

  // إذا تم تغيير اسم المستخدم، نتحقق من عدم تكراره داخل المحل
  if (updates.username && updates.username !== staffUser.username) {
    const existing = db.prepare(
      'SELECT id FROM users WHERE business_id = ? AND username = ? AND id != ?'
    ).get(businessId, updates.username, id);

    if (existing) {
      return res.status(409).json({ error: 'اسم المستخدم مستخدم بالفعل في محلك' });
    }
  }

  try {
    let newPasswordHash = staffUser.password_hash;
    if (updates.password) {
      newPasswordHash = await hashPassword(updates.password);
    }

    const newName = updates.name !== undefined ? updates.name : staffUser.name;
    const newUsername = updates.username !== undefined ? updates.username : staffUser.username;
    const newRole = updates.role !== undefined ? updates.role : staffUser.role;
    const newIsActive = updates.is_active !== undefined ? (updates.is_active ? 1 : 0) : staffUser.is_active;

    db.prepare(`
      UPDATE users
      SET name = ?, username = ?, role = ?, is_active = ?, password_hash = ?
      WHERE id = ? AND business_id = ?
    `).run(newName, newUsername, newRole, newIsActive, newPasswordHash, id, businessId);

    const action = updates.is_active === false ? 'staff_disabled' : updates.is_active === true ? 'staff_enabled' : 'staff_updated';

    logAudit({
      businessId,
      userId,
      action,
      details: { staff_id: id, username: newUsername, role: newRole, is_active: Boolean(newIsActive) }
    });

    return res.json({
      id,
      name: newName,
      username: newUsername,
      role: newRole,
      is_active: Boolean(newIsActive),
      message: 'تم تحديث حساب الموظف بنجاح'
    });
  } catch (err) {
    console.error('خطأ في تحديث حساب الموظف:', err.message);
    return res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

module.exports = router;
