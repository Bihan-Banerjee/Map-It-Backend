require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); 

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Method:", req.method);
  next();
});

const geminiRoutes = require("./routes/gemini");
app.use("/api/gemini", geminiRoutes);

const userDataRoutes = require('./routes/user');
app.use('/api', userDataRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.options("*", cors());
