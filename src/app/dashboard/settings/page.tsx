"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Name
            </label>
            <p className="text-foreground">{session?.user?.name || "Not set"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Email
            </label>
            <p className="text-foreground">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}