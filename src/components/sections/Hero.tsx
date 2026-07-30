import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityFetchSingle, heroQuery, urlFor } from "@/lib/sanity";
import HeroCtas from "./HeroCtas";

interface HeroData {
  greeting?: string;
  name?: string;
  tagline?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  profileImage?: SanityImageSource;
}

async function getHeroData(): Promise<HeroData | null> {
  return sanityFetchSingle<HeroData>(heroQuery);
}

export default async function Hero() {
  const hero = await getHeroData();

  const greeting = hero?.greeting || "Hi, I'm";
  const name = hero?.name || "Your Name";
  const tagline = hero?.tagline || "Software Developer";
  const description =
    hero?.description ||
    "Software Developer specializing in building modern web applications with Next.js, TypeScript, and React. I craft performant, accessible, and beautiful digital experiences.";
  const ctaPrimary = hero?.ctaPrimary || "View My Work";
  const ctaSecondary = hero?.ctaSecondary || "Download Resume";

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="order-1 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {greeting}{" "}
              <span className="text-primary">{name}</span>
            </h1>

            {tagline && (
              <p className="text-xl text-primary font-medium mt-2">{tagline}</p>
            )}

            <p className="text-lg text-muted mt-4 max-w-xl mx-auto lg:mx-0">{description}</p>

            <div className="mt-6">
              <HeroCtas ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} />
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-2 lg:order-2 flex justify-center">
            <div className="w-full max-w-[280px] lg:max-w-sm">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden shadow-lg">
                {hero?.profileImage && urlFor(hero.profileImage) ? (
                  <Image
                    src={urlFor(hero.profileImage)!.width(600).height(800).url()}
                    alt={name}
                    width={600}
                    height={800}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mx-auto mb-4">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <p className="text-sm text-muted">Upload your photo from Sanity CMS</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
