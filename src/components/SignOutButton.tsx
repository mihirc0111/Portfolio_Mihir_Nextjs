"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signOut({ callbackUrl: "/login" });
      }}
    >
      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg border border-border hover:bg-background transition-colors text-sm"
      >
        Sign Out
      </button>
    </form>
  );
}