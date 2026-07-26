import DashboardComments from "@/components/dashboard/CommentsSection";
import { auth } from "@/lib/auth";

export default async function CommentsPage() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Comments</h1>
        <p className="text-muted">
          Manage and review all visitor comments.
        </p>
      </div>
      <DashboardComments currentUserRole={role} />
    </div>
  );
}