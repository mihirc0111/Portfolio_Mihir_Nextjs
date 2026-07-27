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
import { Activity, Monitor, Smartphone, Tablet, Share2, Globe } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const VITAL_THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

const METRICS = ["LCP", "FCP", "CLS", "INP", "TTFB"];

interface DashboardData {
  dailyViews: { date: string; views: number }[];
  sourceBreakdown: { name: string; count: number }[];
  deviceBreakdown: { name: string; count: number }[];
  browserBreakdown: { name: string; count: number }[];
  osBreakdown: { name: string; count: number }[];
  webVitals: Record<string, Record<string, { value: number; rating: string }>>;
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

function formatVitalValue(name: string, value: number): string {
  const thresholds = VITAL_THRESHOLDS[name];
  return thresholds?.unit === "ms" ? `${Math.round(value)}ms` : value.toFixed(2);
}

const ratingColor = { good: "text-green-500", "needs-improvement": "text-yellow-500", poor: "text-red-500" };
const ratingDot = { good: "bg-green-500", "needs-improvement": "bg-yellow-500", poor: "bg-red-500" };
const ratingLabel = { good: "Good", "needs-improvement": "Needs Improvement", poor: "Poor" };

function PageVitalsTable({ vitals }: { vitals: Record<string, Record<string, { value: number; rating: string }>> }) {
  const pages = Object.entries(vitals);

  if (pages.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={16} className="text-primary" />
        <h3 className="text-sm font-semibold">Web Vitals by Page</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 text-muted font-medium text-xs uppercase tracking-wider">Page</th>
              {METRICS.map((m) => (
                <th key={m} className="text-right py-2 px-2 text-muted font-medium text-xs uppercase tracking-wider">{m}</th>
              ))}
              <th className="text-right py-2 pl-2 text-muted font-medium text-xs uppercase tracking-wider">Remark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pages.map(([page, metrics]) => (
              <tr key={page} className="hover:bg-background/50 transition-colors">
                <td className="py-3 pr-4 font-medium text-xs truncate max-w-[160px]">{page}</td>
                {METRICS.map((metricName) => {
                  const vital = metrics[metricName];
                  if (!vital) {
                    return <td key={metricName} className="text-right py-3 px-2 text-muted">—</td>;
                  }
                  const dotClass = ratingDot[vital.rating as keyof typeof ratingDot] || ratingDot.good;
                  const colorClass = ratingColor[vital.rating as keyof typeof ratingColor] || ratingColor.good;
                  return (
                    <td key={metricName} className={`text-right py-3 px-2 ${colorClass}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
                        {formatVitalValue(metricName, vital.value)}
                      </span>
                    </td>
                  );
                })}
                <td className="text-right py-3 pl-2">
                  {(() => {
                    const ratings = METRICS.map((m) => metrics[m]?.rating).filter(Boolean);
                    const worst = ratings.includes("poor") ? "poor" : ratings.includes("needs-improvement") ? "needs-improvement" : "good";
                    const dotClass = ratingDot[worst as keyof typeof ratingDot] || ratingDot.good;
                    const colorClass = ratingColor[worst as keyof typeof ratingColor] || ratingColor.good;
                    return (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${colorClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
                        {ratingLabel[worst as keyof typeof ratingLabel] || "Good"}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <PageVitalsTable vitals={data.webVitals} />
    </div>
  );
}