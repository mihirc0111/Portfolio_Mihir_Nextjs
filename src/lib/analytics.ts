"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (command: string, target: string, config?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua) && !isMobile;

  let deviceType = "desktop";
  if (isMobile) deviceType = "mobile";
  if (isTablet) deviceType = "tablet";

  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";

  let os = "Unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS")) os = "iOS";

  return { deviceType, browser, os };
}

async function trackPageView(pagePath: string) {
  try {
    const deviceInfo = getDeviceInfo();

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "page_view",
        pagePath,
        deviceInfo,
        timestamp: new Date().toISOString(),
      }),
    });

    // Send to GA4 if configured
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("config", GA_ID, {
        page_path: pagePath,
      });
    }
  } catch {
    // Silently fail — analytics should never block the user experience
  }
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackedPath = useRef("");

  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (currentPath === trackedPath.current) return;
    trackedPath.current = currentPath;

    trackPageView(currentPath);
  }, [pathname, searchParams]);
}

export function initGA() {
  if (!GA_ID || typeof window === "undefined") return;

  // Prevent duplicate injection
  if (document.querySelector(`script[src*="${GA_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date().toISOString());
  window.gtag("config", GA_ID, {
    page_path: window.location.pathname,
  });
}