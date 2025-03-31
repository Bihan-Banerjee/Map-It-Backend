const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');


router.post('/save-data', authenticate, async (req, res) => {
  try {
    const { visitedCities, visitedCountries, statistics } = req.body;
    
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { visitedCities, visitedCountries, statistics },
      { new: true }
    );
    
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save data' });
  }
});


router.get('/get-data', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

module.exports = router;
