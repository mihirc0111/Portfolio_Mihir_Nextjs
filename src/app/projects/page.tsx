import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I have built using modern web technologies.",
};

export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="mb-4">Projects</h1>
        <p className="text-lg text-muted mb-8">
          A collection of projects showcasing my skills in frontend development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-surface">
            <h3 className="font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted">
              Projects will be loaded from CMS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
