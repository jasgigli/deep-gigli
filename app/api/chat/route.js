// app/api/chat/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { message, settings } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const model = settings?.model || "gemini-1.5-flash";
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [{ parts: [{ text: message }] }],
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
      generationConfig: {
        temperature: settings?.temperature || 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: settings?.maxTokens || 1024,
        stopSequences: ["Human:", "Assistant:"],
      },
    };

    const response = await axios.post(GEMINI_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": crypto.randomUUID(),
      },
      timeout: 30000,
    });

    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) throw new Error("Invalid response format from AI service");

    console.log({
      timestamp: new Date().toISOString(),
      model,
      temperature: settings?.temperature,
      maxTokens: settings?.maxTokens,
      inputLength: message.length,
      outputLength: aiResponse.length,
      responseTime: response.headers["x-processing-time"] || "unknown",
    });

    return NextResponse.json({
      reply: aiResponse,
      usage: {
        promptTokens: Math.ceil(message.length / 4),
        completionTokens: Math.ceil(aiResponse.length / 4),
        totalTokens: Math.ceil((message.length + aiResponse.length) / 4),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    let statusCode = 500;
    let errorMessage = "An error occurred while processing your request";

    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      errorMessage = error.response?.data?.error?.message || error.message;
      if (statusCode === 429)
        errorMessage = "Rate limit exceeded. Please try again later.";
      else if (statusCode === 401)
        errorMessage = "Authentication failed. Please check your API key.";
      else if (statusCode === 404)
        errorMessage = "The requested model is not available.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
