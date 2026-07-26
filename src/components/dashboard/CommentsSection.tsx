"use client";

import dynamic from "next/dynamic";

const CommentDisplay = dynamic(() => import("@/components/forms/CommentDisplay"), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded-lg border border-border bg-background/60" />,
});

export default function DashboardComments({ currentUserRole }: { currentUserRole?: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">All Comments</h2>
      <CommentDisplay currentUserRole={currentUserRole} />
    </div>
  );
}