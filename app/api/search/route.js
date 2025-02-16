// app/api/search/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { query, messages } = await request.json();
    // Simulate semantic search: filter messages containing the query substring.
    const results = messages
      .filter((msg) =>
        msg.text.toLowerCase().includes(query.toLowerCase())
      )
      .map((msg) => msg.text);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Error processing search request" },
      { status: 500 }
    );
  }
}
