// app/api/analytics/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // In a real implementation, query your database or analytics service.
    const analytics = {
      totalConversations: 123,
      totalMessages: 456,
      averageResponseTime: 2.5, // in seconds
      sentimentAverage: 0.85,
      activeUsers: 12,
    };
    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 }
    );
  }
}
