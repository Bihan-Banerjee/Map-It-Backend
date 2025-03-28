const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  visitedCities: [
    {
      name: String,
      lat: Number,
      lng: Number
    }
  ],
  visitedCountries: [{ type: String }],
  statistics: {
    numCitiesVisited: Number,
    numCountriesVisited: Number,
    percentageWorldExplored: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
