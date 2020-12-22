"use strict";

const database = require("../infrastructure/database");

async function getUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM users WHERE email = ?";
  const [user] = await pool.query(query, email);

  return user[0];
}

async function createUser(nombre, email, password) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [created] = await pool.query(insertQuery, [nombre, email, password]);

  return created.insertId;
}

module.exports = { createUser, getUserByEmail };
