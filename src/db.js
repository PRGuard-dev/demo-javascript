// Shared data helpers — the only sanctioned way to touch orders.
//
// query() binds every value as a driver-level parameter, so SQL injection
// is structurally impossible. money() formats an integer number of cents
// as currency without floating-point rounding. Business code uses these
// helpers rather than rolling its own.
"use strict";

const Database = require("better-sqlite3");

const db = new Database("orders.db");

// Run `sql` with `params` bound by the driver; return all rows.
function query(sql, params = []) {
  return db.prepare(sql).all(...params);
}

// Format an integer number of `cents` as currency, e.g. 1299 → "$12.99".
function money(cents) {
  return `$${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

module.exports = { money, query };
