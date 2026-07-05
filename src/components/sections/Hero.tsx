import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { sanityFetchSingle, heroQuery, urlFor } from "@/lib/sanity";

interface HeroData {
  greeting?: string;
  name?: string;
  tagline?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  profileImage?: any;
}

async function getHeroData(): Promise<HeroData | null> {
  return sanityFetchSingle<HeroData>(heroQuery);
}

export default async function Hero() {
  const hero = await getHeroData();

  const greeting = hero?.greeting || "Hi, I'm";
  const name = hero?.name || "Your Name";
  const tagline = hero?.tagline || "Frontend Developer";
  const description =
    hero?.description ||
    "Frontend Developer specializing in building modern web applications with Next.js, TypeScript, and React. I craft performant, accessible, and beautiful digital experiences.";
  const ctaPrimary = hero?.ctaPrimary || "View My Work";
  const ctaSecondary = hero?.ctaSecondary || "Download Resume";

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary overflow-hidden">
            {hero?.profileImage && urlFor(hero.profileImage) ? (
              <img
                src={urlFor(hero.profileImage)!.width(128).height(128).url()}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {greeting}{" "}
            <span className="text-primary">{name}</span>
          </h1>

          {tagline && (
            <p className="text-xl text-primary font-medium">{tagline}</p>
          )}

          <p className="text-xl text-muted max-w-2xl">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              {ctaPrimary}
              <ArrowDown size={18} />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium hover:bg-surface transition-colors"
            >
              {ctaSecondary}
              <Download size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}