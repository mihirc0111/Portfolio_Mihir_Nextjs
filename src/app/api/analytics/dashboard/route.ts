import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (period) {
      case "24h":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 7d
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const startISO = startDate.toISOString();

    // Total page views
    const { count: totalViews } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "page_view");

    // Total unique visitors (by IP)
    const { data: uniqueIps } = await supabase
      .from("analytics_events")
      .select("ip_address")
      .eq("event_type", "page_view");

    const uniqueVisitors = new Set(uniqueIps?.map((e) => e.ip_address).filter(Boolean)).size;

    // Views in current period
    const { count: periodViews } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "page_view")
      .gte("timestamp", startISO);

    // Today's views
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: todayViews } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "page_view")
      .gte("timestamp", todayStart.toISOString());

    // Daily views for chart (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const { data: dailyEvents } = await supabase
      .from("analytics_events")
      .select("timestamp")
      .eq("event_type", "page_view")
      .gte("timestamp", thirtyDaysAgo.toISOString())
      .order("timestamp", { ascending: true });

    // Aggregate daily views
    const dailyViewsMap = new Map<string, number>();
    dailyEvents?.forEach((event) => {
      const day = new Date(event.timestamp).toISOString().split("T")[0];
      dailyViewsMap.set(day, (dailyViewsMap.get(day) || 0) + 1);
    });

    const dailyViews = Array.from(dailyViewsMap.entries()).map(([date, views]) => ({
      date,
      views,
    }));

    // Top pages
    const { data: pageData } = await supabase
      .from("analytics_events")
      .select("page_path")
      .eq("event_type", "page_view");

    const pageCountMap = new Map<string, number>();
    pageData?.forEach((event) => {
      const path = event.page_path || "/";
      pageCountMap.set(path, (pageCountMap.get(path) || 0) + 1);
    });

    const topPages = Array.from(pageCountMap.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Device breakdown
    const { data: deviceData } = await supabase
      .from("analytics_events")
      .select("device_info")
      .eq("event_type", "page_view")
      .not("device_info", "is", null);

    const deviceCountMap = new Map<string, number>();
    const browserCountMap = new Map<string, number>();
    const osCountMap = new Map<string, number>();

    deviceData?.forEach((event) => {
      const info = event.device_info as { deviceType?: string; browser?: string; os?: string } | null;
      if (info) {
        deviceCountMap.set(info.deviceType || "Unknown", (deviceCountMap.get(info.deviceType || "Unknown") || 0) + 1);
        browserCountMap.set(info.browser || "Unknown", (browserCountMap.get(info.browser || "Unknown") || 0) + 1);
        osCountMap.set(info.os || "Unknown", (osCountMap.get(info.os || "Unknown") || 0) + 1);
      }
    });

    const deviceBreakdown = Array.from(deviceCountMap.entries()).map(([name, count]) => ({ name, count }));
    const browserBreakdown = Array.from(browserCountMap.entries()).map(([name, count]) => ({ name, count }));
    const osBreakdown = Array.from(osCountMap.entries()).map(([name, count]) => ({ name, count }));

    // Web vitals
    const { data: vitalsData } = await supabase
      .from("web_vitals")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100);

    const latestVitals: Record<string, { value: number; rating: string }> = {};
    vitalsData?.forEach((v) => {
      if (!latestVitals[v.metric_name]) {
        latestVitals[v.metric_name] = { value: v.metric_value, rating: v.rating };
      }
    });

    return NextResponse.json({
      summary: {
        totalViews: totalViews || 0,
        uniqueVisitors,
        periodViews: periodViews || 0,
        todayViews: todayViews || 0,
      },
      dailyViews,
      topPages,
      deviceBreakdown,
      browserBreakdown,
      osBreakdown,
      webVitals: latestVitals,
    });
  } catch (error) {
    console.error("Error in GET /api/analytics/dashboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}