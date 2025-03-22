const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/save-data', async (req, res) => {
  try {
    const { visitedCities, visitedCountries, statistics } = req.body;
    const user = new User({
      visitedCities,
      visitedCountries,
      statistics,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save data' });
  }
});

router.get('/get-data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

module.exports = router;
