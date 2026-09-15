'use strict';

/**
 * app.js — إعداد تطبيق Express
 * constitution.md §§ 1,3,6
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const adminRoutes = require('./routes/admin.routes');
const staffRoutes = require('./routes/staff.routes');
const ordersRoutes = require('./routes/orders.routes');
const inventoryRoutes = require('./routes/inventory.routes');

const app = express();

// ── Middleware الأمان ────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' })); // حد حجم الطلب

// ── مسار الصحة ──────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── المسارات ────────────────────────────────────────────────────────
app.use('/api', authRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/inventory', inventoryRoutes);

// ── تقديم واجهة الموقع (الملفات الثابتة) من مجلد frontend ─────────────
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));

// أي طلب GET لا يبدأ بـ /api ولم يطابق ملفًا ثابتًا: أعطه صفحة الموقع الرئيسية
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// ── معالجة المسارات غير الموجودة (تبقى فقط لمسارات /api) ─────────────
app.use((req, res) => {
  res.status(404).json({ error: 'المسار غير موجود' });
});

// ── معالجة الأخطاء العامة ────────────────────────────────────────────
// constitution.md § 8: لا نُسرِّب تفاصيل داخلية
app.use((err, req, res, _next) => {
  console.error('خطأ غير متوقع:', err.message);
  res.status(500).json({ error: 'خطأ في الخادم' });
});

module.exports = app;
