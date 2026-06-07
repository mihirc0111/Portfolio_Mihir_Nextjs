const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "CSS Modules",
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      "Node.js",
      "Next.js API Routes",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "Vercel",
      "Sanity CMS",
      "Google Analytics",
      "Figma",
      "Playwright",
    ],
  },
  {
    title: "Core Concepts",
    skills: [
      "SSR/SSG",
      "Web Vitals",
      "WCAG Accessibility",
      "XSS Prevention",
      "Performance Optimization",
      "Responsive Design",
    ],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="text-center mb-12">Skills & Technologies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-xl border border-border bg-surface hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
