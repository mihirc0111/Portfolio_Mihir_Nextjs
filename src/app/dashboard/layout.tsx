import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-surface min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="text-sm text-muted mt-1">{session.user?.email}</p>
          </div>

          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-background transition-colors"
            >
              Overview
            </a>
            <a
              href="/dashboard/comments"
              className="block px-4 py-2 rounded-lg hover:bg-background transition-colors"
            >
              Comments
            </a>
            <a
              href="/dashboard/analytics"
              className="block px-4 py-2 rounded-lg hover:bg-background transition-colors"
            >
              Analytics
            </a>
            <a
              href="/dashboard/settings"
              className="block px-4 py-2 rounded-lg hover:bg-background transition-colors"
            >
              Settings
            </a>
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg border border-border hover:bg-background transition-colors text-sm"
              >
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}