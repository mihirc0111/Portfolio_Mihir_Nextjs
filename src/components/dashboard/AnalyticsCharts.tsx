"use client";

import type { ElementType } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Activity, Monitor, Smartphone, Tablet, Share2 } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const VITAL_THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

interface DashboardData {
  dailyViews: { date: string; views: number }[];
  sourceBreakdown: { name: string; count: number }[];
  deviceBreakdown: { name: string; count: number }[];
  browserBreakdown: { name: string; count: number }[];
  osBreakdown: { name: string; count: number }[];
  webVitals: Record<string, { value: number; rating: string }>;
}

function PieChartCard({ title, data, icon: Icon }: { title: string; data: { name: string; count: number }[]; icon: ElementType }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-primary" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0">
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
    <div className="bg-surface border border-border rounded-xl p-5 mt-8">
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

export default function AnalyticsCharts({ data }: { data: DashboardData }) {
  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PieChartCard title="Traffic Sources" data={data.sourceBreakdown} icon={Share2} />
        <PieChartCard title="Devices" data={data.deviceBreakdown} icon={Monitor} />
        <PieChartCard title="Browsers" data={data.browserBreakdown} icon={Smartphone} />
        <PieChartCard title="Operating Systems" data={data.osBreakdown} icon={Tablet} />
      </div>

      <VitalsCard vitals={data.webVitals} />
    </div>
  );
}
