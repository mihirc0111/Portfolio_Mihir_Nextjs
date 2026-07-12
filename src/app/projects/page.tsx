import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch, projectsQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { ExternalLink, GitBranch, ArrowRight, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I have built using modern web technologies.",
};

export const revalidate = 60;

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: any;
  status: string;
}

async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project>(projectsQuery);
}

function ProjectCard({ project }: { project: Project }) {
  const statusColors: Record<string, string> = {
    completed: "bg-accent/10 text-accent",
    "in-progress": "bg-warning/10 text-warning",
    planned: "bg-secondary/10 text-secondary",
  };

  return (
    <div className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-colors">
      {/* Cover Image */}
      <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden">
        {project.coverImage && urlFor(project.coverImage) ? (
          <img
            src={urlFor(project.coverImage)!.width(600).height(340).url()}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Code2 size={48} className="text-muted/40" />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold leading-tight">
            {project.title}
          </h3>
          <span
            className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
              statusColors[project.status] || "bg-secondary/10 text-secondary"
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="text-sm text-muted line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-md bg-background border border-border text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              <GitBranch size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10">
          <h1>Projects</h1>
          <p className="text-lg text-muted mt-1 max-w-2xl">
            A collection of projects showcasing my skills in frontend
            development, design, and problem-solving.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Code2 size={48} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted max-w-md mx-auto">
              Projects will appear here once I add them through the CMS. Check
              back soon!
            </p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View my achievements
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
