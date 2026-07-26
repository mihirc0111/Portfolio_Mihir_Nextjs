import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, role, company, expires_at, created_at")
      .eq("role", "guest")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guests:", error);
      return NextResponse.json(
        { error: "Failed to fetch guests" },
        { status: 500 }
      );
    }

    return NextResponse.json({ guests: data || [] });
  } catch (error) {
    console.error("Error in GET /api/dashboard/guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
