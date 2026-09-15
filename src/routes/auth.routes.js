'use strict';

/**
 * auth.routes.js — POST /api/login
 * constitution.md §§ 1,2,4,8
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { comparePassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');

const router = express.Router();

// T011 — Rate limiting: 5 محاولات / دقيقة / IP
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'محاولات كثيرة، انتظر دقيقة ثم حاول مجددًا.' }
});

// مخطط التحقق من المدخلات
const loginSchema = z.object({
  username: z.string().min(1, 'اسم المستخدم مطلوب'),
  password: z.string().min(1, 'كلمة المرور مطلوبة')
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

// POST /api/login
router.post('/login', loginLimiter, async (req, res) => {
  // التحقق من المدخلات
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'بيانات الدخول غير صحيحة' });
  }

  const { username, password } = parsed.data;

  try {
    // FR-013 & قسم 7: قد يتكرر اسم المستخدم بين محلات مختلفة.
    // نجلب كافة الحسابات النشطة القائمة بنفس اسم المستخدم ونطابق كلمة المرور بحساب حساب.
    const candidates = db.prepare(
      'SELECT id, business_id, username, password_hash, name, role, is_active FROM users WHERE username = ? AND is_active = 1'
    ).all(username);

    if (!candidates || candidates.length === 0) {
      logAudit({ action: 'login_failed', details: { username, reason: 'user_not_found_or_disabled' } });
      return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }

    let matchedUser = null;
    for (const candidate of candidates) {
      const passwordMatch = await comparePassword(password, candidate.password_hash);
      if (passwordMatch) {
        matchedUser = candidate;
        break;
      }
    }

    if (!matchedUser) {
      logAudit({ action: 'login_failed', details: { username, reason: 'invalid_password' } });
      return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }

    // النجاح: إصدار Token
    const token = signToken({
      userId: matchedUser.id,
      businessId: matchedUser.business_id,
      role: matchedUser.role
    });

    logAudit({ businessId: matchedUser.business_id, userId: matchedUser.id, action: 'login_success', details: { username } });

    // ⚠️ لا نُرسل password_hash أبدًا في الرد (constitution.md § 2)
    return res.json({
      token,
      user: {
        id: matchedUser.id,
        name: matchedUser.name,
        role: matchedUser.role,
        businessId: matchedUser.business_id
      }
    });
  } catch (err) {
    console.error('خطأ في تسجيل الدخول:', err.message);
    return res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

module.exports = router;
