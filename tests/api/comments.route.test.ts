import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const { supabase } = vi.hoisted(() => ({
  supabase: { from: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase }));

import { POST } from "@/app/api/comments/route";

describe("POST /api/comments", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects an incomplete comment", async () => {
    const response = await POST(
      new Request("http://localhost/api/comments", {
        method: "POST",
        body: JSON.stringify({ name: "Mihir" }),
      }) as NextRequest,
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Name, email, and message are required" });
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("persists and returns a normalized comment", async () => {
    const select = vi.fn().mockResolvedValue({
      data: [{
        id: "comment-1",
        name: "Mihir",
        email: "mihir@example.com",
        message: "Great portfolio!",
        status: "pending",
        created_at: "2026-07-26T00:00:00.000Z",
        replied_at: null,
        reply_message: null,
      }],
      error: null,
    });
    const insert = vi.fn().mockReturnValue({ select });
    supabase.from.mockReturnValue({ insert });

    const response = await POST(
      new Request("http://localhost/api/comments", {
        method: "POST",
        body: JSON.stringify({ name: "Mihir", email: "mihir@example.com", message: "Great portfolio!" }),
      }) as NextRequest,
    );

    expect(response.status).toBe(201);
    expect(insert).toHaveBeenCalledWith([{ name: "Mihir", email: "mihir@example.com", message: "Great portfolio!", status: "pending" }]);
    await expect(response.json()).resolves.toMatchObject({
      message: "Comment submitted successfully",
      data: [{ id: "comment-1", createdAt: "2026-07-26T00:00:00.000Z" }],
    });
  });
});
