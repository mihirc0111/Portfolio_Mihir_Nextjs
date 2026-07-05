import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download my professional resume.",
};

export default function ResumePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1>Resume</h1>
            <p className="text-lg text-muted mt-1">
              My professional experience and qualifications
            </p>
          </div>
          <a
            href="/Mihir_Chavan_2026_FrontEnd.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors shrink-0"
          >
            <Download size={18} />
            Download PDF
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="aspect-[1/1.414] w-full max-w-[900px] mx-auto relative">
            <iframe
              src="/Mihir_Chavan_2026_FrontEnd.pdf#toolbar=1"
              className="absolute inset-0 w-full h-full border-0"
              title="Resume PDF Viewer"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/Mihir_Chavan_2026_FrontEnd.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>
      </div>
    </section>
  );
}
