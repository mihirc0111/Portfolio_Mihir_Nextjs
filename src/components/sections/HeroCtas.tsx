"use client";

import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { useSource } from "@/contexts/SourceContext";

interface Props {
  ctaPrimary: string;
  ctaSecondary: string;
}

export default function HeroCtas({ ctaPrimary, ctaSecondary }: Props) {
  const { isResumeHidden } = useSource();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
      >
        {ctaPrimary}
        <ArrowDown size={18} />
      </Link>
      {!isResumeHidden && (
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
