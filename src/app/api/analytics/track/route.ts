import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, pagePath, deviceInfo, timestamp } = body;

    if (!eventType || !pagePath) {
      return NextResponse.json(
        { error: "eventType and pagePath are required" },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    const { error } = await supabase.from("analytics_events").insert([
      {
        event_type: eventType,
        page_path: pagePath,
        device_info: deviceInfo || null,
        ip_address: ip,
        session_id: request.cookies.get("session_id")?.value || null,
        timestamp: timestamp || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Analytics events table not available:", error.message);
      return NextResponse.json({ success: true });
    }

    const { error: upsertError } = await supabase.rpc("increment_page_view", {
      page_slug: pagePath,
    });

    if (upsertError) {
      const { error: insertError } = await supabase
        .from("page_views")
        .upsert(
          { page_slug: pagePath, views: 1, unique_views: 1, last_updated: new Date().toISOString() },
          { onConflict: "page_slug", ignoreDuplicates: false }
        );

      if (insertError) {
        console.warn("Page views table not available:", insertError.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/analytics/track:", error);
    return NextResponse.json({ success: true });
  }
}