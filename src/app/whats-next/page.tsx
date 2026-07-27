import type { Metadata } from "next";
import { sanityFetchSingle, whatsNextQuery } from "@/lib/sanity";
import { Sparkles, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "What's Next",
  description: "Upcoming features, pages, and projects planned for this portfolio.",
};

export const revalidate = 60;

interface WhatsNextItem {
  title: string;
  description: string;
  status: string;
  eta?: string;
  order: number;
}

interface WhatsNextData {
  _id: string;
  title: string;
  subtitle?: string;
  items: WhatsNextItem[];
}

async function getData(): Promise<WhatsNextData | null> {
  return sanityFetchSingle<WhatsNextData>(whatsNextQuery);
}

const statusColors: Record<string, string> = {
  completed: "bg-accent/10 text-accent",
  "in-progress": "bg-warning/10 text-warning",
  "coming-soon": "bg-secondary/10 text-secondary",
  planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusIcons: Record<string, string> = {
  completed: "✅",
  "in-progress": "🔄",
  "coming-soon": "🔜",
  planned: "📋",
};

function WhatsNextCard({ item }: { item: WhatsNextItem }) {
  const colorClass = statusColors[item.status] || "bg-secondary/10 text-secondary";
  const icon = statusIcons[item.status] || "📋";

  return (
    <div className="group rounded-xl border border-border bg-surface p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold leading-tight">{item.title}</h3>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${colorClass}`}>
          {icon} {item.status.replace("-", " ")}
        </span>
      </div>

      <p className="text-sm text-muted leading-relaxed">{item.description}</p>

      {item.eta && (
        <p className="text-xs text-muted mt-3 flex items-center gap-1.5">
          <Calendar size={12} />
          Target: {item.eta}
        </p>
      )}
    </div>
  );
}

export default async function WhatsNextPage() {
  const data = await getData();

  const title = data?.title || "What's Next";
  const subtitle = data?.subtitle || "Upcoming features and additions planned for this portfolio.";

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10">
          <h1>{title}</h1>
          <p className="text-lg text-muted mt-1 max-w-2xl">{subtitle}</p>
        </div>

        {data?.items && data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.items.map((item) => (
              <WhatsNextCard key={item.title} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Sparkles size={48} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nothing planned yet</h3>
            <p className="text-muted max-w-md mx-auto">
              Upcoming features will appear here once I add them through the CMS. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}