// app/api/summarize/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages } = await request.json();
    // Simulate summarization by concatenating and truncating messages.
    const fullText = messages.map((msg) => msg.text).join(" ");
    const summary = fullText.slice(0, 200) + (fullText.length > 200 ? "..." : "");
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json(
      { error: "Error generating summary" },
      { status: 500 }
    );
  }
}
