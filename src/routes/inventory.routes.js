'use strict';

/**
 * inventory.routes.js — عمليات المخزون
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

// GET /api/inventory
router.get('/', requireRole('storekeeper', 'manager', 'super_admin'), (req, res) => {
  // TODO: استبدال بمنطق الجلب الفعلي
  return res.json({ items: [], message: 'جاهز للتنفيذ' });
});

// POST /api/inventory
router.post('/', requireRole('storekeeper', 'manager'), (req, res) => {
  // TODO: منطق إضافة/تعديل مخزون
  return res.status(201).json({ message: 'تم التحديث (قيد التطوير)' });
});

module.exports = router;
