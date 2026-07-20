import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch stats
  const { data: comments } = await supabase
    .from("comments")
    .select("*", { count: "exact" });

  const { data: pageViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact" });

  const stats = {
    totalComments: comments?.length || 0,
    pendingComments: comments?.filter((c) => c.status === "pending").length || 0,
    totalViews: pageViews?.length || 0,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted">
          Welcome back, {session.user?.name || session.user?.email}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted mb-2">
            Total Comments
          </h3>
          <p className="text-3xl font-bold">{stats.totalComments}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted mb-2">
            Pending Comments
          </h3>
          <p className="text-3xl font-bold text-warning">
            {stats.pendingComments}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted mb-2">
            Total Page Views
          </h3>
          <p className="text-3xl font-bold text-primary">{stats.totalViews}</p>
        </div>
      </div>
    </div>
  );
}
