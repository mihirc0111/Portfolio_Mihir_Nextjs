"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSource } from "@/contexts/SourceContext";

export default function ResumeGuard({ children }: { children: React.ReactNode }) {
  const { isResumeHidden } = useSource();
  const router = useRouter();

  useEffect(() => {
    if (isResumeHidden) {
      router.replace("/");
    }
  }, [isResumeHidden, router]);

  if (isResumeHidden) {
    return null;
  }

  return <>{children}</>;
}
