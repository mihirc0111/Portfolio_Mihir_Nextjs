"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, LayoutDashboard, User, Sun, Moon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useSource } from "@/contexts/SourceContext";

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
  const { theme, toggleTheme } = useTheme();
  const { isResumeHidden } = useSource();
  const visibleNavLinks = navLinks.filter(
    (link) => !isResumeHidden || link.href !== "/resume"
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
          aria-label="Portfolio home"
        >
          Portfolio
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {session ? (
            <>
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
            </>
          ) : !isLoginPage ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <LogIn size={16} />
              Login
            </Link>
          ) : null}
        </div>

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
            {visibleNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
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
