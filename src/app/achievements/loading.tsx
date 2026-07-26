export default function AchievementsLoading() {
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-40 bg-border rounded mb-2" />
          <div className="h-5 w-56 bg-border rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-border" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-border rounded" />
                  <div className="h-3 w-20 bg-border rounded" />
                </div>
              </div>
              <div className="h-4 w-full bg-border rounded mb-2" />
              <div className="h-4 w-3/4 bg-border rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}