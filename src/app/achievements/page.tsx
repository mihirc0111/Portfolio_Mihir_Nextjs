import type { Metadata } from "next";
import { client, achievementsQuery } from "@/lib/sanity";
import {
  Award,
  Trophy,
  BookOpen,
  GraduationCap,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Professional achievements, certifications, and awards.",
};

interface Achievement {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  category: string;
  issuer?: string;
  certificateUrl?: string;
  icon?: string;
}

async function getAchievements(): Promise<Achievement[]> {
  try {
    return await client.fetch(achievementsQuery);
  } catch {
    return [];
  }
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={24} />,
  Trophy: <Trophy size={24} />,
  BookOpen: <BookOpen size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Sparkles: <Sparkles size={24} />,
};

const categoryColors: Record<string, string> = {
  certification: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  award: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  achievement: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  course: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const icon = achievement.icon
    ? iconMap[achievement.icon] || <Award size={24} />
    : <Award size={24} />;

  const categoryColor = categoryColors[achievement.category] || categoryColors.achievement;

  return (
    <div className="group rounded-xl border border-border bg-surface p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${categoryColor}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-semibold leading-tight">{achievement.title}</h3>
            <span
              className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${categoryColor}`}
            >
              {achievement.category}
            </span>
          </div>

          {achievement.issuer && (
            <p className="text-sm text-muted mb-1">{achievement.issuer}</p>
          )}

          {achievement.description && (
            <p className="text-sm text-muted mt-2">{achievement.description}</p>
          )}

          <div className="flex items-center gap-4 mt-3">
            {achievement.date && (
              <span className="text-xs text-muted">
                {new Date(achievement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
            {achievement.certificateUrl && (
              <a
                href={achievement.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLink size={12} />
                View Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10">
          <h1>Achievements & Certifications</h1>
          <p className="text-lg text-muted mt-1 max-w-2xl">
            Professional milestones, certifications, and awards from my journey.
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement._id}
                achievement={achievement}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award size={48} className="mx-auto text-muted/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No achievements yet
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Achievements will appear here once I add them through the CMS.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
