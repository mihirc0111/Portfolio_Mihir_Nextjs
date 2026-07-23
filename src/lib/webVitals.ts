"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

type MetricName = "CLS" | "FCP" | "INP" | "LCP" | "TTFB";

interface Metric {
  name: MetricName;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

function getRating(name: MetricName, value: number): Metric["rating"] {
  switch (name) {
    case "LCP":
      return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
    case "FCP":
      return value <= 1800 ? "good" : value <= 3000 ? "needs-improvement" : "poor";
    case "CLS":
      return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
    case "INP":
      return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
    case "TTFB":
      return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor";
  }
}

async function sendToAnalytics(metric: Metric) {
  try {
    await fetch("/api/analytics/web-vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metricName: metric.name,
        metricValue: metric.value,
        rating: metric.rating,
        pagePath: window.location.pathname,
      }),
    });
  } catch {
    // Silently fail
  }
}

export function useWebVitals() {
  useEffect(() => {
    onCLS((metric) => {
      sendToAnalytics({
        name: "CLS",
        value: metric.value,
        rating: getRating("CLS", metric.value),
      });
    });
    onFCP((metric) => {
      sendToAnalytics({
        name: "FCP",
        value: metric.value,
        rating: getRating("FCP", metric.value),
      });
    });
    onINP((metric) => {
      sendToAnalytics({
        name: "INP",
        value: metric.value,
        rating: getRating("INP", metric.value),
      });
    });
    onLCP((metric) => {
      sendToAnalytics({
        name: "LCP",
        value: metric.value,
        rating: getRating("LCP", metric.value),
      });
    });
    onTTFB((metric) => {
      sendToAnalytics({
        name: "TTFB",
        value: metric.value,
        rating: getRating("TTFB", metric.value),
      });
    });
  }, []);
}