"use client";

import CommentDisplay from "@/components/forms/CommentDisplay";

export default function DashboardComments() {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">All Comments</h2>
      <CommentDisplay />
    </div>
  );
}