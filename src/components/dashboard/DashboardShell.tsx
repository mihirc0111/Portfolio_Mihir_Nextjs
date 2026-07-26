"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

interface Props {
  children: React.ReactNode;
  userEmail: string;
}

const navLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/comments", label: "Comments" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/guests", label: "Guests" },
  { href: "/dashboard/settings", label: "Settings" },
];

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/books", label: "Books" },
  { href: "/resume", label: "Resume" },
];

export default function DashboardShell({ children, userEmail }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background md:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-lg font-bold">Dashboard</span>
        </div>
        <div className="flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {siteLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-border text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              {link.label}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 border-r border-border bg-surface p-6 transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="text-sm text-muted mt-1 truncate">{userEmail}</p>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-background"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <SignOutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
