'use strict';

/**
 * jwt.js — أداة إصدار والتحقق من JWT
 * الصلاحية: 12 ساعة — constitution.md § 1
 */

const jwt = require('jsonwebtoken');

/**
 * @param {object} payload - {userId, businessId, role}
 * @returns {string} JWT token صالح 12 ساعة
 */
function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET غير معرَّف في متغيرات البيئة');
  return jwt.sign(payload, secret, { expiresIn: '12h' });
}

/**
 * @param {string} token
 * @returns {object} payload مفكوك
 * @throws إذا كان Token غير صالح أو منتهي الصلاحية
 */
function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET غير معرَّف في متغيرات البيئة');
  // jwt.verify يرمي خطأ تلقائيًا — لا نُعيد null بصمت (constitution.md § 1)
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
