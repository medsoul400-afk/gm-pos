'use strict';

/**
 * requireRole.js — Middleware التحقق من الدور
 * constitution.md § 4: Least Privilege
 */

/**
 * دالة مصنع تُعيد middleware يتحقق من دور المستخدم
 * @param {...string} allowedRoles - الأدوار المسموح بها
 * @returns {Function} Express middleware
 *
 * مثال: requireRole('manager', 'super_admin')
 */
function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'مطلوب تسجيل الدخول' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'ليس لديك صلاحية للوصول لهذا المسار',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
}

module.exports = requireRole;
