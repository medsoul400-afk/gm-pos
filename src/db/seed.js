'use strict';

/**
 * seed.js — بيانات تجريبية أولية
 * الاستخدام: node src/db/seed.js
 *
 * ⚠️  كلمات المرور لا تُكتب في الكود أو السجلات. مرّرها مؤقتًا عبر متغيرات البيئة
 *     SEED_SUPER_ADMIN_PASSWORD وSEED_MANAGER_PASSWORD.
 */

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const db = require('./index');

const { hashPassword } = require('../utils/password');

function requiredSeedPassword(variableName) {
  const value = process.env[variableName];
  if (!value || value.length < 6) {
    throw new Error(`${variableName} مطلوب ويجب أن يتكون من 12 محرفًا على الأقل`);
  }
  return value;
}


async function seed() {
  try {
    const superAdminPassword = requiredSeedPassword('SEED_SUPER_ADMIN_PASSWORD');
    const managerPassword = requiredSeedPassword('SEED_MANAGER_PASSWORD');

    const existingManager = db.prepare(
      "SELECT id, business_id FROM users WHERE username = 'manager1' AND role = 'manager' LIMIT 1"
    ).get();
    if (existingManager) {
      console.log('ℹ️ بيانات البذر موجودة مسبقًا؛ لم تُنشأ سجلات مكررة.');
      return;
    }

    // ── 1. Business تجريبي ──────────────────────────────────────────
    const businessId = uuidv4();
    db.prepare(`
      INSERT OR IGNORE INTO businesses (id, name, phone)
      VALUES (?, ?, ?)
    `).run(businessId, 'محل نموذجي', '22000000');

    // ── 2. super_admin (خارج أي business) ──────────────────────────
    const superAdminHash = await hashPassword(superAdminPassword);
    const superAdminId = uuidv4();
    db.prepare(`
      INSERT OR IGNORE INTO users (id, business_id, username, password_hash, name, role)
      VALUES (?, NULL, ?, ?, ?, 'super_admin')
    `).run(superAdminId, 'superadmin', superAdminHash, 'المشرف العام');

    // ── 3. Manager تابع للـ business التجريبي ───────────────────────
    const managerHash = await hashPassword(managerPassword);
    const managerId = uuidv4();
    db.prepare(`
      INSERT OR IGNORE INTO users (id, business_id, username, password_hash, name, role)
      VALUES (?, ?, ?, ?, ?, 'manager')
    `).run(managerId, businessId, 'manager1', managerHash, 'مدير المحل');

    // التحقق: سجل محل واحد + مستخدم super_admin + مستخدم manager.
    const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
    const hashes = db.prepare('SELECT username, password_hash FROM users').all();

    console.log(`✅ تم إدخال البيانات التجريبية. عدد المستخدمين: ${userCount}`);
    console.log('🔒 التحقق من عدم وجود كلمات مرور نصية:');
    hashes.forEach(u => {
      const isHashed = u.password_hash.startsWith('$2b$') || u.password_hash.startsWith('$2a$');
      console.log(`   ${u.username}: ${isHashed ? '✅ مجزّأة' : '❌ نص صريح!'}`);
    });

  } catch (err) {
    console.error('❌ فشل البذر:', err.message);
    process.exit(1);
  }
}

seed();
