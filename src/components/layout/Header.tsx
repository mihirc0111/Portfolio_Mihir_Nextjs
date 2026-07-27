"use client";

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, LayoutDashboard, User, Sun, Moon, MoreHorizontal, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";

const RESUME_ROLES = ["admin", "super_guest"];

const primaryNavLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/books", label: "Books" },
  { href: "/technical-overview", label: "Tech Overview" },
  { href: "/resume", label: "Resume" },
];

const moreLinks = [
  { href: "/whats-next", label: "What's Next" },
  { href: "/skills-on-my-radar", label: "Skills on my Radar" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isDashboard = pathname.startsWith("/dashboard");
  const { theme, toggleTheme } = useTheme();

  const userRole = (session?.user as { role?: string })?.role;
  const canViewResume = !!userRole && RESUME_ROLES.includes(userRole);

  const visiblePrimaryLinks = primaryNavLinks.filter(
    (link) => canViewResume || link.href !== "/resume"
  );
  const visibleMoreLinks = moreLinks.filter(
    (link) => canViewResume || link.href !== "/resume"
  );

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen]);

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

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {visiblePrimaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {link.label}
            </Link>
          ))}

          {visibleMoreLinks.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground transition-colors"
                aria-expanded={moreOpen}
                aria-label="More links"
              >
                More
                <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg z-50">
                  <div className="py-2">
                    {visibleMoreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-surface transition-colors"
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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

        {!isDashboard && (
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {mobileOpen && !isDashboard && (
        <nav className="md:hidden border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {[...visiblePrimaryLinks, ...visibleMoreLinks].map((link) => (
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
