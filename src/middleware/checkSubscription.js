'use strict';

/**
 * checkSubscription.js — Middleware التحقق من الاشتراك
 * constitution.md § 1: الفحص يحدث في كل طلب، وليس مرة واحدة عند الدخول
 * يُعيد 402 (Payment Required) عند اشتراك منتهٍ أو معلّق
 */

const db = require('../db');

function checkSubscription(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'مطلوب تسجيل الدخول' });
  }

  // super_admin لا يحتاج اشتراكًا
  if (req.user.role === 'super_admin') {
    return next();
  }

  const { businessId } = req.user;
  if (!businessId) {
    return res.status(403).json({ error: 'المستخدم غير مرتبط بمحل' });
  }

  const sub = db.prepare(
    'SELECT status, expires_at FROM subscriptions WHERE business_id = ?'
  ).get(businessId);

  if (!sub) {
    return res.status(402).json({ error: 'subscription_expired', message: 'لا يوجد اشتراك مسجّل لهذا المحل' });
  }

  if (sub.status !== 'active') {
    return res.status(402).json({ error: 'subscription_expired', message: 'الاشتراك غير نشط', status: sub.status });
  }

  // التحقق من تاريخ الانتهاء
  if (sub.expires_at && new Date(sub.expires_at) < new Date()) {
    return res.status(402).json({ error: 'subscription_expired', message: 'انتهت صلاحية الاشتراك', expires_at: sub.expires_at });
  }

  next();
}

module.exports = checkSubscription;
