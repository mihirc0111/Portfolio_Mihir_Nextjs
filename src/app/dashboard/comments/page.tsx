import DashboardComments from "@/components/dashboard/CommentsSection";

export default function CommentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Comments</h1>
        <p className="text-muted">
          Manage and review all visitor comments.
        </p>
      </div>
      <DashboardComments />
    </div>
  );
}