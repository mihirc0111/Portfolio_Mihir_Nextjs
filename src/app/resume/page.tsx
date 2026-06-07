import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download my professional resume.",
};

export default function ResumePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1>Resume</h1>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        <div className="p-8 rounded-xl border border-border bg-surface min-h-[600px] flex items-center justify-center">
          <p className="text-muted text-lg">
            Resume content will be displayed here.
          </p>
        </div>
      </div>
    </section>
  );
}
