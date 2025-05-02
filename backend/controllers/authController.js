// backend/controllers/authController.js
const User = require('../models/User');

exports.register = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const user = new User({ userId, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
