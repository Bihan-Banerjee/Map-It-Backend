require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGINS ||
  "http://localhost:5173,https://map-it-9g3b.vercel.app")
  .split(",")
  .map((o) => o.trim());

// Allow the explicit allowlist plus any localhost/127.0.0.1 port for local dev.
const isLocalhost = (origin) =>
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || isLocalhost(origin) || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

const geminiRoutes = require("./routes/gemini");
app.use("/api/gemini", geminiRoutes);

const userDataRoutes = require('./routes/user');
app.use('/api', userDataRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
