'use strict';

/**
 * password.js — أداة تجزئة كلمات المرور
 * constitution.md § 2: لا كلمات مرور نصية أبدًا
 */

const bcrypt = require('bcrypt');

const ROUNDS = 10;

/**
 * تجزئة كلمة مرور
 * @param {string} plain - كلمة المرور النصية
 * @returns {Promise<string>} - hash
 */
async function hashPassword(plain) {
  return bcrypt.hash(plain, ROUNDS);
}

/**
 * مقارنة كلمة مرور بـ hash
 * @param {string} plain - كلمة المرور المُدخَلة
 * @param {string} hash - الـ hash المخزّن
 * @returns {Promise<boolean>}
 */
async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword };
