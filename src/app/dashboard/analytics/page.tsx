"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Eye, Users, Calendar, TrendingUp, Globe } from "lucide-react";

const AnalyticsCharts = dynamic(() => import("@/components/dashboard/AnalyticsCharts"), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-xl border border-border bg-surface" />
        ))}
      </div>
    </div>
  ),
});

interface DashboardData {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    periodViews: number;
    todayViews: number;
  };
  dailyViews: { date: string; views: number }[];
  topPages: { page: string; views: number }[];
  sourceBreakdown: { name: string; count: number }[];
  deviceBreakdown: { name: string; count: number }[];
  browserBreakdown: { name: string; count: number }[];
  osBreakdown: { name: string; count: number }[];
  webVitals: Record<string, { value: number; rating: string }>;
}

function StatCard({ title, value, icon: Icon, subtitle }: { title: string; value: string | number; icon: React.ElementType; subtitle?: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{title}</p>
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
        </div>
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/analytics/dashboard?period=${period}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [period]);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted">Loading analytics data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 w-20 bg-border rounded mb-3" />
              <div className="h-8 w-16 bg-border rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted">Failed to load analytics data.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted">Track your portfolio performance and visitor insights.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "24h", label: "24H" },
            { value: "7d", label: "7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "90 Days" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                period === opt.value
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Page Views" value={data.summary.totalViews} icon={Eye} />
        <StatCard title="Unique Visitors" value={data.summary.uniqueVisitors} icon={Users} />
        <StatCard title={`Views (${period})`} value={data.summary.periodViews} icon={Calendar} subtitle={`Last ${period}`} />
        <StatCard title="Today" value={data.summary.todayViews} icon={TrendingUp} subtitle="Views today" />
      </div>

      {/* Top Pages */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">Top Pages</h3>
        </div>
        {data.topPages.length > 0 ? (
          <div className="space-y-2">
            {data.topPages.map((page, i) => (
              <div key={page.page} className="flex items-center justify-between py-1.5 gap-2">
                <div className="flex items-center gap-2 text-sm min-w-0">
                  <span className="text-xs text-muted w-5 shrink-0">{i + 1}.</span>
                  <span className="text-foreground truncate">{page.page}</span>
                </div>
                <span className="text-sm font-medium">{page.views}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted text-center py-6">No page data yet</p>
        )}
      </div>

      <AnalyticsCharts data={data} />
    </div>
  );
}