// Order lookup service — PRGuard demo (JavaScript).
//
// A minimal slice of a shop backend. All data access goes through the
// shared helpers in src/db.js: query() for parameter-bound SQL and
// money() for currency formatting — business code never rolls its own.
"use strict";

const { money, query } = require("./src/db");

// Fetch a single order by primary key.
function getOrder(orderId) {
  const rows = query(
    "SELECT id, total_cents, status FROM orders WHERE id = ?",
    [orderId]
  );
  return rows[0] ?? null;
}

// Return the formatted total for an order, or null if it is missing.
function orderTotal(orderId) {
  const order = getOrder(orderId);
  return order ? money(order.total_cents) : null;
}

module.exports = { getOrder, orderTotal };
