const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  visitedCities: [{
    name: String,
    lat: Number,
    lng: Number
  }],
  visitedCountries: [{ type: String }],
  statistics: {
    numCitiesVisited: Number,
    numCountriesVisited: Number,
    percentageWorldExplored: Number,
  }
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
