import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStorage } from "@/hooks/useStorage";

describe("useStorage", () => {
  it("stores and removes namespaced preferences", () => {
    const { result } = renderHook(() => useStorage());

    act(() => result.current.savePreference("theme", { mode: "dark" }));

    expect(window.localStorage.getItem("portfolio_theme")).toBe('{"mode":"dark"}');
    expect(result.current.getPreference("theme")).toEqual({ mode: "dark" });

    act(() => result.current.removePreference("theme"));
    expect(result.current.getPreference("theme")).toBeNull();
  });

  it("keeps session data separate from persistent preferences", () => {
    const { result } = renderHook(() => useStorage());

    act(() => result.current.saveSessionData("returnTo", "/dashboard"));

    expect(result.current.getSessionData("returnTo")).toBe("/dashboard");
    expect(window.localStorage.getItem("session_returnTo")).toBeNull();
  });
});
