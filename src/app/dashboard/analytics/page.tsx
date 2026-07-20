import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function AnalyticsPage() {
  // Fetch page views count
  const { data: pageViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact" });

  const totalViews = pageViews?.length || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted">
          Track your portfolio performance and visitor insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted mb-2">Total Page Views</h3>
          <p className="text-3xl font-bold text-primary">{totalViews}</p>
        </div>
      </div>
    </div>
  );
}