import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { supabase } = vi.hoisted(() => ({
  supabase: { from: vi.fn(), rpc: vi.fn() },
}));

vi.mock("@/lib/supabase", () => ({ supabase }));

import { POST } from "@/app/api/analytics/track/route";

describe("POST /api/analytics/track", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects events without their required type and page path", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/analytics/track", {
        method: "POST",
        body: JSON.stringify({ eventType: "page_view" }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "eventType and pagePath are required" });
  });

  it("records a valid page-view event and increments its counter", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    supabase.from.mockReturnValue({ insert });
    supabase.rpc.mockResolvedValue({ error: null });

    const response = await POST(
      new NextRequest("http://localhost/api/analytics/track", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
        body: JSON.stringify({ eventType: "page_view", pagePath: "/projects", deviceInfo: { type: "desktop" } }),
      }),
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ event_type: "page_view", page_path: "/projects", ip_address: "203.0.113.10" }),
    ]));
    expect(supabase.rpc).toHaveBeenCalledWith("increment_page_view", { page_slug: "/projects" });
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
