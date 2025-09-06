import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

// ---------------------
// Configuration
// ---------------------
const app = express();
const port = 3001;

// ---------------------
// Middleware
// ---------------------
app.use(cors({
  origin: '*', // ✅ Allow all origins (for testing only)
  credentials: true
}));
app.use(express.json());

// ---------------------
// Initialize OpenAI
// ---------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
 // <-- replace with your real key

// ---------------------
// Health check endpoint
// ---------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ---------------------
// Chat endpoint
// ---------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a professional but friendly AI assistant for **Arfan Riaz Photography** (https://www.arfanriaz.co.uk/). 
Your job is to help potential clients with property photography needs.

✅ Services to highlight:
- High-quality housing photography
- 360° virtual tours
- Accurate floor plans
- Interior, architectural, and commercial photography

✅ Key rules:
- Keep answers short, professional, and easy to read.
- If a user asks about prices, explain that pricing depends on the property type/size, and politely offer to provide a quote if they share details.
- If a user asks about portfolio, share: "You can view recent work here: https://www.arfanriaz.co.uk/gallery"
- If a user wants to book or get a quote, always ask: "Could you please share your name, email, and the property type so we can prepare an accurate quote?"

✅ Tone:
- Friendly, professional, approachable.
- Avoid being too technical.
`
      },
      ...conversation,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const botReply = response.choices[0].message.content;

    res.json({ 
      message: botReply,
      success: true 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response. Please try again.',
      success: false 
    });
  }
});

// ---------------------
// Start server
// ---------------------
app.listen(port, () => {
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📡 Health check: http://localhost:${port}/api/health`);
  console.log(`OpenAI API Key configured: Yes`);
});
