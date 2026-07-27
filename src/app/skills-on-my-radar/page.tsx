import type { Metadata } from "next";
import { sanityFetchSingle, skillsRadarQuery } from "@/lib/sanity";
import { Target, ExternalLink, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills on my Radar",
  description: "Skills and technologies I am planning to learn or currently exploring.",
};

export const revalidate = 60;

interface SkillsRadarItem {
  name: string;
  category: string;
  description: string;
  resourceUrl?: string;
  priority: string;
  order: number;
}

interface SkillsRadarData {
  _id: string;
  title: string;
  subtitle?: string;
  items: SkillsRadarItem[];
}

async function getData(): Promise<SkillsRadarData | null> {
  return sanityFetchSingle<SkillsRadarData>(skillsRadarQuery);
}

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

function SkillsCard({ item }: { item: SkillsRadarItem }) {
  const priorityColor = priorityColors[item.priority] || priorityColors.low;

  return (
    <div className="group rounded-xl border border-border bg-surface p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold leading-tight">{item.name}</h3>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${priorityColor}`}>
          {item.priority}
        </span>
      </div>

      <p className="text-xs text-muted uppercase tracking-wider mb-2">{item.category}</p>

      <p className="text-sm text-muted leading-relaxed">{item.description}</p>

      {item.resourceUrl && (
        <a
          href={item.resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-3"
        >
          <ExternalLink size={12} />
          Learning Resource
        </a>
      )}
    </div>
  );
}

export default async function SkillsRadarPage() {
  const data = await getData();

  const title = data?.title || "Skills on my Radar";
  const subtitle = data?.subtitle || "Skills and technologies I am planning to learn or currently exploring.";

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10">
          <h1>{title}</h1>
          <p className="text-lg text-muted mt-1 max-w-2xl">{subtitle}</p>
        </div>

        {data?.items && data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((item) => (
              <SkillsCard key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Target size={48} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No skills on the radar yet</h3>
            <p className="text-muted max-w-md mx-auto">
              Skills I'm planning to learn will appear here once I add them through the CMS. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}