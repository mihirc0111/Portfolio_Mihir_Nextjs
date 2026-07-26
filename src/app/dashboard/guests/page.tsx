"use client";

import { useState, useEffect } from "react";
import { Users, Trash2, Copy, Check, UserPlus } from "lucide-react";

interface GuestUser {
  id: string;
  email: string;
  role: string;
  company: string;
  expires_at: string;
  created_at: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<GuestUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [creating, setCreating] = useState(false);
  const [newGuest, setNewGuest] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/dashboard/guests");
      const data = await res.json();
      setGuests(data.guests || []);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      await fetchGuests();
      if (cancelled) return;
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/auth/create-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewGuest({ email: data.email, password: data.password });
        setCompany("");
        setShowForm(false);
        fetchGuests();
      } else {
        alert(data.error || "Failed to create guest");
      }
    } catch {
      alert("Failed to create guest");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this guest user?")) return;
    try {
      await fetch(`/api/dashboard/guests/${id}`, { method: "DELETE" });
      fetchGuests();
    } catch {
      // Handle error silently
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Guest Users</h1>
          <p className="text-muted">
            Manage guest access for recruiters and visitors.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <UserPlus size={16} />
          Create Guest
        </button>
      </div>

      {/* New Guest Credentials */}
      {newGuest && (
        <div className="mb-6 p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
            Guest Created Successfully!
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted">Email:</span>
              <code className="flex-1 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                {newGuest.email}
              </code>
              <button
                onClick={() => copyToClipboard(newGuest.email)}
                className="p-1 hover:text-primary"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted">Password:</span>
              <code className="flex-1 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                {newGuest.password}
              </code>
              <button
                onClick={() => copyToClipboard(newGuest.password)}
                className="p-1 hover:text-primary"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          <p className="text-xs text-muted mt-2">
            Share these credentials with the guest. They expire in 7 days.
          </p>
        </div>
      )}

      {/* Create Guest Form */}
      {showForm && (
        <div className="mb-6 p-4 rounded-lg border border-border bg-surface">
          <h3 className="text-sm font-semibold mb-3">Create New Guest</h3>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company / Person name"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              disabled={creating || !company.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setCompany(""); }}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Guests List */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {guests.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-muted/30 mb-4" />
            <p className="text-muted">No guest users yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{guest.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted">{guest.company}</span>
                    <span className="text-xs text-muted">
                      Expires: {formatDate(guest.expires_at)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(guest.id)}
                  className="p-2 text-muted hover:text-red-500 transition-colors"
                  title="Delete guest"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
