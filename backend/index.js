require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from React dev servers
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Basic route
app.get('/', (req, res) => {
  res.send('NUTRIMIND AI API is running...');
});

// Recommendations Endpoint
app.post('/api/recommendations', async (req, res) => {
  try {
    const { userId, healthData } = req.body;
    
    if (!healthData) {
      return res.status(400).json({ error: "Missing health data." });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
    }

    const prompt = `
      You are an expert nutritionist and AI wellness coach for the NUTRIMIND AI platform.
      A user has requested a personalized diet recommendation and health advice based on their profile:
      - Age: ${healthData.age}
      - Height: ${healthData.height} cm
      - Weight: ${healthData.weight} kg
      - BMI: ${healthData.bmi}
      - Blood Pressure: ${healthData.bloodPressure || 'Unknown'}
      - Activity Level: ${healthData.activityLevel}
      - Goals: ${healthData.healthGoals || 'General health maintenance'}

      Please provide:
      1. A customized daily diet plan (Breakfast, Lunch, Dinner, Snacks) with estimated portions.
      2. Specific nutritional advice tailored to their BMI and activity level.
      3. Healthy lifestyle and habit suggestions to help them meet their goals.
      Keep the response structured, supportive, clearly formatted, and under 500 words.
    `;

    // Try multiple models in order to handle quota limits
    // Only use models confirmed available in v1beta for this API key
    const modelsToTry = [
      "gemma-3-27b-it",       // Available quota, instruction-tuned
      "gemma-3-4b-it",        // Fallback gemma model
      "gemini-3.1-flash-lite-preview",
      "gemini-3-flash-preview",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-flash-latest",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-pro-latest",
    ];
    let textResponse = "";
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting generation with model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        textResponse = result.response.text();
        
        if (textResponse) {
          console.log(`Success with model: ${modelName}`);
          break; 
        }
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err.message);
        lastError = err;
        // Continue to next model if it's a quota error (429) or other retryable error
      }
    }

    if (!textResponse && lastError) {
      throw lastError;
    }

    res.json({ recommendation: textResponse });

  } catch (error) {
    console.error("Final Error generating recommendation:", error?.message || error);
    const errorMessage = error?.message || 'Unknown error';
    res.status(500).json({ 
      error: "Failed to generate AI recommendations: " + errorMessage 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
