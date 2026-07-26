import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const { supabase, hash } = vi.hoisted(() => ({
  supabase: { from: vi.fn() },
  hash: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ supabase }));
vi.mock("bcryptjs", () => ({ default: { hash } }));

import { POST } from "@/app/api/auth/create-guest/route";

describe("POST /api/auth/create-guest", () => {
  beforeEach(() => vi.clearAllMocks());

  it("requires a company name with at least two characters", async () => {
    const response = await POST(
      new Request("http://localhost/api/auth/create-guest", {
        method: "POST",
        body: JSON.stringify({ company: "A" }),
      }) as NextRequest,
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Company name is required (min 2 characters)" });
  });

  it("creates a time-limited guest account and returns its credentials once", async () => {
    hash.mockResolvedValue("hashed-password");
    const single = vi.fn().mockResolvedValue({
      data: {
        id: "guest-1",
        email: "guest-123@temp.com",
        role: "guest",
        company: "Example Inc.",
        expires_at: "2026-08-02T00:00:00.000Z",
      },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    supabase.from.mockReturnValue({ insert });

    const response = await POST(
      new Request("http://localhost/api/auth/create-guest", {
        method: "POST",
        body: JSON.stringify({ company: "  Example Inc.  " }),
      }) as NextRequest,
    );

    expect(response.status).toBe(200);
    expect(hash).toHaveBeenCalledWith(expect.any(String), 10);
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ role: "guest", company: "Example Inc.", password_hash: "hashed-password" }),
    );
    await expect(response.json()).resolves.toMatchObject({
      email: "guest-123@temp.com",
      expiresAt: "2026-08-02T00:00:00.000Z",
      password: expect.stringMatching(/^.{16}$/),
    });
  });
});
