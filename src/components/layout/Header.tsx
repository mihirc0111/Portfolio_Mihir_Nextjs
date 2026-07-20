"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, LayoutDashboard, User } from "lucide-react";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/books", label: "Books" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
        >
          Portfolio
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {session ? (
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <span className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground border-l border-border">
              <User size={16} className="text-primary" />
              {session.user?.name || session.user?.email}
            </span>
          </div>
        ) : !isLoginPage ? (
          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <LogIn size={16} />
            Login
          </Link>
        ) : null}

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border-t border-border pt-2">
                  <User size={16} className="text-primary" />
                  {session.user?.name || session.user?.email}
                </span>
              </>
            ) : !isLoginPage ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <LogIn size={16} />
                Login
              </Link>
            ) : null}
          </div>
        </nav>
      )}
    </header>
  );
}
