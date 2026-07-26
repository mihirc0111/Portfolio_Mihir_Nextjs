export default function BooksLoading() {
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-24 bg-border rounded mb-2" />
          <div className="h-5 w-72 bg-border rounded" />
        </div>

        {/* Currently Reading Skeleton */}
        <div className="mb-12">
          <div className="h-7 w-44 bg-border rounded mb-6" />
          <div className="max-w-md">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-20 aspect-[2/3] rounded-lg bg-border" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-40 bg-border rounded" />
                  <div className="h-4 w-28 bg-border rounded" />
                  <div className="h-3 w-24 bg-border rounded mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid Skeleton */}
        <div>
          <div className="h-7 w-36 bg-border rounded mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-4">
                <div className="aspect-[2/3] rounded-lg bg-border mb-3" />
                <div className="h-4 w-full bg-border rounded mb-1" />
                <div className="h-3 w-20 bg-border rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}