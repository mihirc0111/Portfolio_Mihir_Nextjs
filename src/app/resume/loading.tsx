export default function ResumeLoading() {
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-28 bg-border rounded mb-2" />
          <div className="h-5 w-64 bg-border rounded" />
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex gap-6">
              <div className="shrink-0 w-32 h-32 rounded-full bg-border" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-48 bg-border rounded" />
                <div className="h-4 w-32 bg-border rounded" />
                <div className="h-4 w-64 bg-border rounded" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="h-6 w-40 bg-border rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-border rounded" />
              <div className="h-4 w-5/6 bg-border rounded" />
              <div className="h-4 w-4/6 bg-border rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}