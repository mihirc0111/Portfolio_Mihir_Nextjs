import { sanityFetchSingle, aboutQuery } from "@/lib/sanity";

interface AboutData {
  content?: string;
}

async function getAboutData(): Promise<AboutData | null> {
  return sanityFetchSingle<AboutData>(aboutQuery);
}

export default async function About() {
  const about = await getAboutData();

  const content =
    about?.content ||
    "I am a passionate frontend developer with over 2 years of experience building modern web applications. I specialize in React, Next.js, and TypeScript, with a strong focus on performance, accessibility, and user experience.";

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="prose prose-lg text-muted">
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}