const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bookings.db');

// Create bookings table if it doesn't exist

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   email TEXT NOT NULL,
   date TEXT NOT NULL,
   time TEXT NOT NULL
    )`);
});

db.close();
console.log('Database and table created');