'use strict';

require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DATABASE_PATH || './data/gm-pos.db';

// تأكد من وجود مجلد البيانات
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);

// تفعيل Foreign Keys وضبط الأداء
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

module.exports = db;
