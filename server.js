require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
