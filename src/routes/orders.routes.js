'use strict';

/**
 * orders.routes.js — عمليات البيع
 * محمي بـ auth + checkSubscription (كل المسارات بما فيها GET)
 * constitution.md § 1
 */

const express = require('express');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const checkSubscription = require('../middleware/checkSubscription');

const router = express.Router();

// كل المسارات تتطلب مصادقة + اشتراك نشط
router.use(auth, checkSubscription);

// GET /api/orders
router.get('/', requireRole('cashier', 'manager', 'super_admin'), (req, res) => {
  // TODO: استبدال بمنطق الجلب الفعلي من قاعدة البيانات
  return res.json({ orders: [], message: 'جاهز للتنفيذ' });
});

// POST /api/orders
router.post('/', requireRole('cashier', 'manager'), (req, res) => {
  // TODO: منطق إنشاء طلب بيع جديد
  return res.status(201).json({ message: 'تم إنشاء الطلب (قيد التطوير)' });
});

module.exports = router;
