const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  console.log("Gemini route hit!");
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent([prompt]);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response:", text);

    res.json({ message: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to get a response from the robot." });
  }
});

module.exports = router;
