"use client";

import { MessageSquare, ChevronLeft, ChevronRight, Loader2, Trash2, Reply, Search, X } from "lucide-react";
import { useGetCommentsQuery, useDeleteCommentMutation, useReplyCommentMutation } from "@/store/api/commentsApi";
import type { Comment } from "@/types";
import { useState } from "react";

const statusFilters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "replied", label: "Replied" },
];

function CommentCard({ comment }: { comment: Comment }) {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [replyComment, { isLoading: isReplying }] = useReplyCommentMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id).unwrap();
      setShowConfirm(false);
    } catch {
      // Error handled by RTK
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;
    try {
      await replyComment({ id: comment.id, replyMessage: replyMessage.trim() }).unwrap();
      setReplyMessage("");
      setShowReplyForm(false);
    } catch {
      // Error handled by RTK
    }
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-surface">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm truncate">{comment.name}</h4>
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
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
          <a
            href={`mailto:${comment.email}`}
            className="text-xs text-primary hover:text-primary-hover transition-colors truncate block"
          >
            {comment.email}
          </a>
          <p className="text-xs text-muted mt-0.5">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {comment.status !== "replied" && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              disabled={isReplying}
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40"
              title="Reply to comment"
            >
              <Reply size={16} />
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="p-1.5 rounded-md text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-40"
              title="Delete comment"
            >
              <Trash2 size={16} />
            </button>
            {showConfirm && (
              <div className="absolute right-0 top-full mt-2 z-10 w-48 p-3 rounded-lg border border-border bg-surface shadow-lg">
                <p className="text-xs text-muted mb-2">
                  Delete this comment?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 px-2 py-1 text-xs rounded border border-border hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed">
        {comment.message}
      </p>

      {comment.replyMessage && (
        <div className="mt-3 pl-4 border-l-2 border-primary/30">
          <p className="text-xs font-medium text-primary mb-1">Response:</p>
          <p className="text-sm text-muted">{comment.replyMessage}</p>
        </div>
      )}

      {showReplyForm && (
        <div className="mt-3 pt-3 border-t border-border">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply..."
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => { setShowReplyForm(false); setReplyMessage(""); }}
              disabled={isReplying}
              className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-surface transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReply}
              disabled={isReplying || !replyMessage.trim()}
              className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {isReplying ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-border bg-surface animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-border rounded" />
          <div className="h-3 w-16 bg-border rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-border rounded" />
        <div className="h-3 w-3/4 bg-border rounded" />
      </div>
    </div>
  );
}

export default function CommentDisplay() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;
  const { data, isLoading, isError, error } = useGetCommentsQuery({
    page,
    pageSize,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchQuery || undefined,
  });

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  if (isError) {
    const errorMessage =
      error && "data" in error
        ? (error as { data: { error: string } }).data?.error
        : "Failed to load comments";
    return (
      <div className="text-center py-8">
        <p className="text-sm text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-primary" />
          <h3 className="text-lg font-semibold">
            Comments ({data?.total ?? 0})
          </h3>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search comments..."
            className="w-48 pl-8 pr-8 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setPage(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => { setStatusFilter(filter.value); setPage(1); }}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              statusFilter === filter.value
                ? "bg-primary text-white border-primary"
                : "border-border text-muted hover:text-foreground hover:bg-surface"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : data?.comments && data.comments.length > 0 ? (
        <>
          <div className="space-y-3">
            {data.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="text-sm text-muted">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <MessageSquare
            size={40}
            className="mx-auto text-muted mb-3 opacity-50"
          />
          <p className="text-sm text-muted">
            {searchQuery
              ? "No comments match your search."
              : statusFilter !== "all"
              ? `No ${statusFilter} comments.`
              : "No comments yet. Be the first to share your thoughts!"}
          </p>
        </div>
      )}
    </div>
  );
}