import type { Metadata } from "next";
import type { ElementType } from "react";
import {
  Code2,
  Globe,
  Database,
  Server,
  Cloud,
  Layers,
  Package,
  Cpu,
  Palette,
  Wrench,
  Lock,
  TestTube,
  Search,
  Zap,
  BarChart3,
  Smartphone,
  Monitor,
  GitBranch,
  Rocket,
  Sparkles,
  Brain,
  Bot,
  Workflow,
  Shield,
  Gauge,
  Settings,
  ExternalLink,
  Cog,
} from "lucide-react";
import { sanityFetchSingle, technicalOverviewQuery } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Technical Overview",
  description:
    "How this portfolio was built — tech stack, AI tools, architecture, and key highlights.",
};

export const revalidate = 60;

const iconMap: Record<string, ElementType> = {
  Code2,
  Globe,
  Database,
  Server,
  Cloud,
  Layers,
  Package,
  Cpu,
  Palette,
  Wrench,
  Lock,
  TestTube,
  Search,
  Zap,
  BarChart3,
  Smartphone,
  Monitor,
  GitBranch,
  Rocket,
  Sparkles,
  Brain,
  Bot,
  Workflow,
  Shield,
  Gauge,
  Settings,
  Cog,
};

interface TechItem {
  name: string;
  description: string;
  icon?: string;
  version?: string;
  website?: string;
  category?: string;
  order?: number;
}

interface SimpleItem {
  name: string;
  description: string;
  icon?: string;
  website?: string;
  order?: number;
}

function getIcon(iconName?: string): ElementType {
  if (!iconName) return Sparkles;
  return iconMap[iconName] || Sparkles;
}

function CardSection({
  title,
  emoji,
  items,
}: {
  title: string;
  emoji: string;
  items: SimpleItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const cardContent = (
            <div className="group h-full bg-surface border border-border rounded-xl p-5 transition-colors hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
                  </div>
                </div>
                {item.website && (
                  <ExternalLink size={14} className="text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          );

          if (item.website) {
            return (
              <a
                key={item.name}
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {cardContent}
              </a>
            );
          }

          return <div key={item.name}>{cardContent}</div>;
        })}
      </div>
    </div>
  );
}

function TechStackSection({ items }: { items: TechItem[] }) {
  if (!items || items.length === 0) return null;

  const grouped = items.reduce<Record<string, TechItem[]>>((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categoryOrder = [
    "Frontend",
    "Backend / Database",
    "CMS",
    "Analytics",
    "Deployment",
    "Styling",
    "Tooling",
    "Testing",
    "Other",
  ];

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>🚀</span> Tech Stack
      </h2>
      {sortedCategories.map((category) => (
        <div key={category} className="mb-8 last:mb-0">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[category].map((item) => {
              const Icon = getIcon(item.icon);
              const cardContent = (
                <div className="group h-full bg-surface border border-border rounded-xl p-5 transition-colors hover:border-primary/30 hover:bg-primary/5">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm leading-tight">{item.name}</h4>
                        {item.version && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                            v{item.version}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.website && (
                      <ExternalLink size={14} className="text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              );

              if (item.website) {
                return (
                  <a
                    key={item.name}
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {cardContent}
                  </a>
                );
              }

              return <div key={item.name}>{cardContent}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function TechnicalOverviewPage() {
  const data = await sanityFetchSingle<TechnicalOverviewQuery>(technicalOverviewQuery);

  const title = data?.title || "Technical Overview";
  const subtitle = data?.subtitle || "How this portfolio was built and the technologies behind it.";

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h1>{title}</h1>
          <p className="text-lg text-muted mt-2">{subtitle}</p>
        </div>

        <TechStackSection items={data?.techStack || []} />
        <CardSection title="AI Tools & LLMs" emoji="🤖" items={data?.aiTools || []} />
        <CardSection title="Architecture" emoji="🏗️" items={data?.architecture || []} />
        <CardSection title="Key Highlights" emoji="✨" items={data?.highlights || []} />
        <CardSection title="Deployment" emoji="📦" items={data?.deployment || []} />
      </div>
    </section>
  );
}

type TechnicalOverviewQuery = {
  title?: string;
  subtitle?: string;
  techStack?: TechItem[];
  aiTools?: SimpleItem[];
  architecture?: SimpleItem[];
  highlights?: SimpleItem[];
  deployment?: SimpleItem[];
};
