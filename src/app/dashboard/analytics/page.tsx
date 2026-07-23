"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import { Eye, Users, Calendar, TrendingUp, Monitor, Smartphone, Tablet, Globe, Activity } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const VITAL_THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

interface DashboardData {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    periodViews: number;
    todayViews: number;
  };
  dailyViews: { date: string; views: number }[];
  topPages: { page: string; views: number }[];
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

function PieChartCard({ title, data, icon: Icon }: { title: string; data: { name: string; count: number }[]; icon: React.ElementType }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-primary" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {data.length > 0 ? (
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={48} dataKey="count" paddingAngle={2}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-1.5">
            {data.slice(0, 5).map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-muted truncate max-w-[100px]">{item.name}</span>
                </div>
                <span className="font-medium">{Math.round((item.count / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted text-center py-6">No data yet</p>
      )}
    </div>
  );
}

function VitalsCard({ vitals }: { vitals: Record<string, { value: number; rating: string }> }) {
  const metrics = ["LCP", "FCP", "CLS", "INP", "TTFB"];

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-primary" />
        <h3 className="text-sm font-semibold">Web Vitals</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {metrics.map((name) => {
          const vital = vitals[name];
          const thresholds = VITAL_THRESHOLDS[name];
          const value = vital?.value ?? 0;
          const rating = vital?.rating ?? "good";

          const colorMap = { good: "text-green-500", "needs-improvement": "text-yellow-500", poor: "text-red-500" };
          const bgMap = { good: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800", "needs-improvement": "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800", poor: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" };

          return (
            <div key={name} className={`p-3 rounded-lg border ${bgMap[rating as keyof typeof bgMap] || bgMap.good}`}>
              <p className="text-xs text-muted mb-1">{name}</p>
              <p className={`text-lg font-bold ${colorMap[rating as keyof typeof colorMap] || colorMap.good}`}>
                {thresholds?.unit === "ms" ? `${Math.round(value)}ms` : value.toFixed(2)}
              </p>
              <p className="text-xs text-muted capitalize mt-0.5">{rating.replace("-", " ")}</p>
            </div>
          );
        })}
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
        <div className="flex gap-2">
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

      {/* Daily Views Chart */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">Daily Page Views</h3>
        </div>
        {data.dailyViews.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(val) => val.slice(5)} stroke="var(--muted)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted text-center py-12">No page view data yet. Visit some pages to start tracking.</p>
        )}
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
              <div key={page.page} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xs text-muted w-5">{i + 1}.</span>
                  <span className="text-foreground">{page.page}</span>
                </div>
                <span className="text-sm font-medium">{page.views}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted text-center py-6">No page data yet</p>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PieChartCard title="Devices" data={data.deviceBreakdown} icon={Monitor} />
        <PieChartCard title="Browsers" data={data.browserBreakdown} icon={Smartphone} />
        <PieChartCard title="Operating Systems" data={data.osBreakdown} icon={Tablet} />
      </div>

      {/* Web Vitals */}
      <VitalsCard vitals={data.webVitals} />
    </div>
  );
}