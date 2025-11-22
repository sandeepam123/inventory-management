const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adapt path
const bcrypt = require('bcrypt'); // npm i bcrypt
const jwt = require('jsonwebtoken'); // npm i jsonwebtoken

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 8);
  try {
    const user = new User({ username, password: hash });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, 'SECRET_KEY'); // Use env variable!
  res.json({ token });
});

module.exports = router;
