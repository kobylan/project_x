const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { saveUser, findUserByUsernameAndPassword } = require('./db');
const app = express();
const PORT = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Registration Form',
  password: 'kobik2007',
  port: 5432,
});

app.use(express.json());
app.use(express.static(__dirname));

// Serve login.html when accessing root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web-site.html');
});

// Handle login POST request
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Invalid login data' });
  }

  try {
    // Check if the user exists and the password is correct
    const user = await findUserByUsernameAndPassword(username, password);

    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle registration POST request
app.post('/register', async (req, res) => {
  const { username, email, password1, password2 } = req.body;

  if (!username || !email || !password1 || password1 !== password2) {
    return res.status(400).json({ message: 'Invalid registration data' });
  }

  try {
    const result = await saveUser(username, email, password1);

    console.log(result);

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
