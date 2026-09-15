'use strict';

/**
 * server.js — نقطة تشغيل الخادم
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ خادم G.M POS يعمل على المنفذ ${PORT}`);
  console.log(`📡 http://localhost:${PORT}/api/health`);
});
