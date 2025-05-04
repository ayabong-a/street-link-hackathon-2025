const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate-description', async (req, res) => {
  const { name, product, location, experience, uniqueSellingPoint } = req.body;

  const prompt = `Write a short, friendly vendor profile description for a vendor named ${name} who sells ${product} in ${location}. They have ${experience || "some"} experience. A unique selling point is: ${uniqueSellingPoint || "their dedication to quality."}`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo"
    });

    const description = chatCompletion.choices[0].message.content.trim();
    res.json({ description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate description.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
