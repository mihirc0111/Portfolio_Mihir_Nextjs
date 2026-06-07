import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/yourusername", label: "GitHub" },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { href: "https://twitter.com/yourusername", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
