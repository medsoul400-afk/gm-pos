'use strict';

/**
 * auth.js — Middleware التحقق من JWT
 * constitution.md § 1: Zero Client Trust
 */

const db = require('../db');
const { verifyToken } = require('../utils/jwt');

/**
 * يقرأ Authorization: Bearer <token>
 * يضع req.user = {userId, businessId, role} عند النجاح
 * يُعيد 401 عند الفشل أو التعطيل
 */
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'مطلوب تسجيل الدخول' });
  }

  const token = authHeader.slice(7); // حذف "Bearer "

  try {
    const payload = verifyToken(token); // يرمي خطأ إذا كان غير صالح

    // FR-020: Zero Client Trust — التحقق من وجود الحساب وعدم تعطيله في قاعدة البيانات
    const user = db.prepare('SELECT id, business_id, role, is_active FROM users WHERE id = ?').get(payload.userId);
    if (!user || user.is_active === 0) {
      return res.status(401).json({ error: 'حسابك معطّل أو غير صالح، تواصل مع المدير' });
    }

    req.user = {
      userId: user.id,
      businessId: user.business_id,
      role: user.role
    };
    next();
  } catch {
    return res.status(401).json({ error: 'جلسة غير صالحة أو منتهية، سجّل الدخول مجددًا' });
  }
}

module.exports = auth;
