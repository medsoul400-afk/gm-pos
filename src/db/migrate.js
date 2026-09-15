'use strict';

/**
 * migrate.js — سكربت ترحيل قاعدة البيانات
 * الاستخدام: node src/db/migrate.js
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const db = require('./index');

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

try {
  db.exec(schema);

  // هجرة التغييرات على الجداول القائمة بأمان (Spec 002)
  const userColumns = db.prepare("PRAGMA table_info('users')").all().map(c => c.name);
  if (!userColumns.includes('is_active')) {
    db.exec("ALTER TABLE users ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1");
  }

  const reqTableInfo = db.prepare("PRAGMA table_info('payment_requests')").all();
  const bizIdCol = reqTableInfo.find(c => c.name === 'business_id');

  if (bizIdCol && bizIdCol.notnull === 1) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS payment_requests_new (
        id                      TEXT PRIMARY KEY,
        request_type            TEXT CHECK(request_type IN ('renewal','new_subscription')) DEFAULT 'renewal',
        business_id             TEXT REFERENCES businesses(id),
        submitted_by            TEXT REFERENCES users(id),
        transaction_id          TEXT UNIQUE,
        payer_phone             TEXT,
        bank_name               TEXT,
        requested_username      TEXT,
        requested_password_hash  TEXT,
        status                  TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')) DEFAULT 'pending',
        reviewed_by             TEXT REFERENCES users(id),
        reviewed_at             TEXT,
        reject_reason           TEXT,
        created_at              TEXT DEFAULT (datetime('now'))
      );

      INSERT INTO payment_requests_new (id, request_type, business_id, submitted_by, transaction_id, payer_phone, status, reviewed_by, reviewed_at, reject_reason, created_at)
      SELECT id, 'renewal', business_id, submitted_by, transaction_id, payer_phone, status, reviewed_by, reviewed_at, reject_reason, created_at FROM payment_requests;

      DROP TABLE payment_requests;
      ALTER TABLE payment_requests_new RENAME TO payment_requests;
    `);
  } else {
    const reqColumns = reqTableInfo.map(c => c.name);
    if (!reqColumns.includes('request_type')) {
      db.exec("ALTER TABLE payment_requests ADD COLUMN request_type TEXT CHECK(request_type IN ('renewal','new_subscription')) DEFAULT 'renewal'");
    }
    if (!reqColumns.includes('bank_name')) {
      db.exec("ALTER TABLE payment_requests ADD COLUMN bank_name TEXT");
    }
    if (!reqColumns.includes('requested_username')) {
      db.exec("ALTER TABLE payment_requests ADD COLUMN requested_username TEXT");
    }
    if (!reqColumns.includes('requested_password_hash')) {
      db.exec("ALTER TABLE payment_requests ADD COLUMN requested_password_hash TEXT");
    }
    if (!reqColumns.includes('receipt_image')) {
      db.exec("ALTER TABLE payment_requests ADD COLUMN receipt_image TEXT");
    }
  }

  console.log('✅ تم تطبيق المخطط والترحيل بنجاح.');

  // التحقق من الجداول المنشأة
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
  console.log('📋 الجداول المنشأة:', tables.map(t => t.name).join(', '));
} catch (err) {
  console.error('❌ فشل الترحيل:', err.message);
  process.exit(1);
}
