import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily/Safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[Warning] GEMINI_API_KEY is not defined in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: AI Concierge Assistant Chat Handler
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback for offline/no-api-key demo environments
      return res.json({
        text: `[Offline Demo Mode] Greetings from AutoBourn VIP Concierge. We received your interest. Since the Gemini API key is currently being synchronized, here is a mock response:\n\n"Absolutely premium choice. The configured model represents the zenith of our automotive heritage. Would you like to schedule a virtual tour or discuss tailored financing options with our Mumbai gallery?"`
      });
    }

    // Prepare system instructions for ultra-luxury VIP concierge vibe
    const systemInstruction = 
      "You are a highly prestigious senior VIP Concierge Advisor for AutoBourn, an ultra-luxury automotive showroom based in Marine Drive Central, Mumbai, India. " +
      "Your tone must be authoritative, quiet luxury, elegant, respectful, and bespoke. Treat the user as a respected high-net-worth individual. " +
      "You advise on custom vehicle commissions (Mercedes-AMG GT, Audi Q8 e-tron, Jaguar XF, and AutoBourn Bespoke XUV700 Executive), customized leather interiors, bespoke racing tracks, priority shipping, and private test showings. " +
      "Keep responses classy, concise, and highly polished, avoiding typical enthusiastic AI corporate cliches.";

    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Generate output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    const text = response.text || "An advisor will be with you shortly regarding this bespoke commission.";
    res.json({ text });

  } catch (error: any) {
    console.error("Gemini API Error in Chat:", error);
    res.status(500).json({ error: error.message || "Failed to contact luxury advisor." });
  }
});

// 2. API: Secure Contact Form Inquiry Analysis Hook
app.post("/api/inquiry", async (req, res) => {
  try {
    const { name, interest, inquiry } = req.body;
    if (!name || !interest) {
      return res.status(400).json({ error: "Name and Interest are required fields." });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        message: `Thank you, ${name}. Your secure file has been encrypted. An agent specializing in the "${interest}" will contact you shortly step-by-step.`,
        suggestedBudgetRange: "₹ 75 Lakh - ₹ 2.5 Crore"
      });
    }

    // Let Gemini generate an automated VIP priority acknowledgement and fit recommendation!
    const prompt = `Form details:
Name of Patron: ${name}
Interest Specified: ${interest}
Patron Message / Requirements: ${inquiry || "None specified."}

Generate a beautiful, personalized, and high-end priority acknowledgement letter from the AutoBourn Managing Director.
Explain how the choice aligns with grand tourer excellence, outline the next steps for a private showing at Marine Drive or their residence, and estimate in a sophisticated manner what elite perks would complement their selection. Keep it to 1-2 paragraphs. Keep tone classy.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the General Manager of AutoBourn Showrooms India. Address the high-net-worth patron by name with ultimate respect.",
        temperature: 0.7,
      }
    });

    res.json({
      success: true,
      message: response.text,
      suggestedBudgetRange: interest.includes("Performance") ? "₹ 1.8 Crore" : interest.includes("Heritage") ? "₹ 75 Lakh-₹ 1.5 Crore" : "₹ 25-50 Lakh"
    });

  } catch (error: any) {
    console.error("Inquiry endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to process inquiry." });
  }
});

// 3. Vite middleware for development vs static build files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AutoBourn Server] Fleet services operating at http://localhost:${PORT}`);
  });
}

startServer();
