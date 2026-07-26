import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import bcrypt from "bcryptjs";

function generateSecurePassword(length = 16) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  const values = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    password += charset[values[i] % charset.length];
  }
  return password;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company } = body;

    if (!company || typeof company !== "string" || company.trim().length < 2) {
      return NextResponse.json(
        { error: "Company name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const guestEmail = `guest-${Date.now()}@temp.com`;
    const guestPassword = generateSecurePassword();
    const passwordHash = await bcrypt.hash(guestPassword, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { data: guestUser, error } = await supabaseAdmin
      .from("users")
      .insert({
        email: guestEmail,
        password_hash: passwordHash,
        role: "guest",
        company: company.trim(),
        expires_at: expiresAt.toISOString(),
      })
      .select("id, email, role, company, expires_at")
      .single();

    if (error || !guestUser) {
      console.error("Error creating guest user:", error);
      return NextResponse.json(
        { error: "Failed to create guest account" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      email: guestUser.email,
      password: guestPassword,
      expiresAt: guestUser.expires_at,
    });
  } catch (error) {
    console.error("Error in POST /api/auth/create-guest:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}