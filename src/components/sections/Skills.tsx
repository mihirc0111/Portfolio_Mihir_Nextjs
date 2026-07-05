import { sanityFetch, skillCategoriesQuery } from "@/lib/sanity";

interface SkillCategory {
  _id: string;
  title: string;
  skills: string[];
}

async function getSkillCategories(): Promise<SkillCategory[]> {
  return sanityFetch<SkillCategory>(skillCategoriesQuery);
}

export default async function Skills() {
  const categories = await getSkillCategories();

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="text-center mb-12">Skills & Technologies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
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