import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metricName, metricValue, rating, pagePath } = body;

    if (!metricName || metricValue === undefined) {
      return NextResponse.json(
        { error: "metricName and metricValue are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("web_vitals").insert([
      {
        metric_name: metricName,
        metric_value: metricValue,
        rating,
        page_path: pagePath || "/",
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error storing web vital:", error);
      return NextResponse.json(
        { error: "Failed to store web vital" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/analytics/web-vitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}