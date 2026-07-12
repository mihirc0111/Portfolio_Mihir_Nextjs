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

      {/* Recent Comments */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
        {comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.slice(0, 5).map((comment) => (
              <div
                key={comment.id}
                className="border-b border-border last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{comment.name}</p>
                    <p className="text-sm text-muted">{comment.email}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      comment.status === "pending"
                        ? "bg-warning/10 text-warning"
                        : comment.status === "replied"
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {comment.status}
                  </span>
                </div>
                <p className="text-sm text-muted mt-2">{comment.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-8">No comments yet</p>
        )}
      </div>
    </div>
  );
}