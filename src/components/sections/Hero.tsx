import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
            YN
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <span className="text-primary">Your Name</span>
          </h1>

          <p className="text-xl text-muted max-w-2xl">
            Frontend Developer specializing in building modern web applications
            with Next.js, TypeScript, and React. I craft performant,
            accessible, and beautiful digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              View My Work
              <ArrowDown size={18} />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-surface transition-colors"
            >
              Download Resume
              <Download size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
