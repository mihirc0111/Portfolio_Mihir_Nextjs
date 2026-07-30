"use client";

import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { useSession } from "next-auth/react";

const RESUME_ROLES = ["admin", "super_guest"];

interface Props {
  ctaPrimary: string;
  ctaSecondary: string;
}

export default function HeroCtas({ ctaPrimary, ctaSecondary }: Props) {
  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string })?.role;
  const canViewResume = !!userRole && RESUME_ROLES.includes(userRole);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center sm:justify-start items-center">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
      >
        {ctaPrimary}
        <ArrowDown size={18} />
      </Link>
      {canViewResume && (
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-surface transition-colors"
        >
          {ctaSecondary}
          <Download size={18} />
        </Link>
      )}
    </div>
  );
}
