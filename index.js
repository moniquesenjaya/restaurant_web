const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up the database
const db = new sqlite3.Database('./bookings.db');

// Static files middleware
app.use(express.static('public_html'));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Validate form data on the server
function validateFormData(name, email, date, time) {
  let errors = [];

  // Validate Name
  if (!name || name.trim() === '') {
    errors.push('Name is required.');
  }

  // Validate Email
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email is required.');
  }

  // Validate Date
  if (!date) {
    errors.push('Date is required.');
  }

  // Validate Time (10:00 AM - 10:00 PM)
  if (!time) {
    errors.push('Time is required.');
  } else {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 10 || hour > 22) {
      errors.push('Time must be between 10:00 AM and 10:00 PM.');
    }
  }

  return errors;
}

// Route to handle form submission
app.post('/book', (req, res) => {
  const { name, email, date, time } = req.body;
  const errors = validateFormData(name, email, date, time);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    db.run(
      `INSERT INTO bookings (name, email, date, time) VALUES (?, ?, ?, ?)`,
      [name, email, date, time],
      function (err) {
        if (err) {
          console.error(err.message);
          res.status(500).json({ errors: ['Error saving booking'] });
        } else {
          res.status(200).json({ message: 'Booking successfully saved' });
        }
      }
    );
  }
});

// Route to get all bookings
app.get('/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error retrieving bookings');
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
