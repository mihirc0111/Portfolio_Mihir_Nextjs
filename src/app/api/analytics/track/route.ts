import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

const BOT_PATTERNS = /bot|crawler|spider|slurp|curl|wget|python|go-http|headless|chrome-lighthouse|semrush|ahrefs|mj12bot|dotbot|bingpreview|yandex/i;

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERNS.test(userAgent);
}

function generateSessionId(): string {
  return crypto.randomUUID();
}

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent");
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const { eventType, pagePath, deviceInfo, source, timestamp } = body;

    if (!eventType || !pagePath) {
      return NextResponse.json(
        { error: "eventType and pagePath are required" },
        { status: 400 }
      );
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    const cookieStore = await cookies();
    let sessionId = cookieStore.get("session_id")?.value;
    if (!sessionId) {
      sessionId = generateSessionId();
    }

    const response = NextResponse.json({ success: true });

    if (!cookieStore.get("session_id")?.value) {
      response.cookies.set("session_id", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }

    const { error } = await supabase.from("analytics_events").insert([
      {
        event_type: eventType,
        page_path: pagePath,
        device_info: deviceInfo || null,
        source: source || null,
        ip_address: ip,
        session_id: sessionId,
        timestamp: timestamp || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Analytics events table not available:", error.message);
      return response;
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

    return response;
  } catch (error) {
    console.error("Error in POST /api/analytics/track:", error);
    return NextResponse.json({ success: true });
  }
}