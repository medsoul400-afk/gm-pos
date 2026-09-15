-- schema.sql — نموذج البيانات لنظام G.M POS

CREATE TABLE IF NOT EXISTS businesses (
  id            TEXT PRIMARY KEY,      -- uuid
  name          TEXT NOT NULL,
  phone         TEXT,
  created_at    TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS users (
  id             TEXT PRIMARY KEY,     -- uuid
  business_id    TEXT REFERENCES businesses(id),
  username       TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  name           TEXT NOT NULL,
  role           TEXT NOT NULL CHECK(role IN ('super_admin','manager','cashier','storekeeper')),
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT DEFAULT (datetime('now')),
  UNIQUE(business_id, username)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id            TEXT PRIMARY KEY,      -- uuid
  business_id   TEXT NOT NULL UNIQUE REFERENCES businesses(id),
  status        TEXT NOT NULL CHECK(status IN ('active','expired','suspended')) DEFAULT 'expired',
  expires_at    TEXT,                  -- ISO datetime
  monthly_fee   INTEGER NOT NULL DEFAULT 300,
  updated_at    TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payment_requests (
  id                      TEXT PRIMARY KEY,    -- uuid
  request_type            TEXT CHECK(request_type IN ('renewal','new_subscription')) DEFAULT 'renewal',
  business_id             TEXT REFERENCES businesses(id),
  submitted_by            TEXT REFERENCES users(id),
  transaction_id          TEXT UNIQUE,
  payer_phone             TEXT,
  bank_name               TEXT,
  requested_username      TEXT,
  requested_password_hash  TEXT,
  receipt_image           TEXT,                -- base64 or URL of payment receipt
  status                  TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')) DEFAULT 'pending',
  reviewed_by             TEXT REFERENCES users(id),
  reviewed_at             TEXT,
  reject_reason           TEXT,
  created_at              TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_log (
  id           TEXT PRIMARY KEY,       -- uuid
  business_id  TEXT,
  user_id      TEXT,
  action       TEXT NOT NULL,          -- e.g. 'login_failed', 'subscription_approved'
  details      TEXT,                   -- JSON string
  created_at   TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_business ON users(business_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_business ON payment_requests(business_id);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests(status);
