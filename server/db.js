// server/db.js
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data.sqlite'));

function init() {
  db.exec(`PRAGMA foreign_keys = ON;`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT,
      name TEXT,
      about TEXT,
      plays INTEGER DEFAULT 0,
      isPro INTEGER DEFAULT 0
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS pending_games (
      id TEXT PRIMARY KEY,
      title TEXT,
      link TEXT,
      message TEXT,
      thumbnail TEXT,
      submittedBy TEXT,
      createdAt INTEGER
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS approved_games (
      id TEXT PRIMARY KEY,
      title TEXT,
      link TEXT,
      thumbnail TEXT,
      submittedBy TEXT,
      approvedAt INTEGER
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS votes (
      id TEXT PRIMARY KEY,
      userId TEXT,
      gameId TEXT,
      value INTEGER,
      createdAt INTEGER
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS chat (
      id TEXT PRIMARY KEY,
      fromUser TEXT,
      msg TEXT,
      createdAt INTEGER
    );
  `);
}

init();

module.exports = db;
