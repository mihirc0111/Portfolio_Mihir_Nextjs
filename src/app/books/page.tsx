import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "Books I have read and recommend.",
};

export default function BooksPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="mb-4">Books</h1>

        <div className="mb-12">
          <h2 className="text-2xl mb-4">Currently Reading</h2>
          <div className="p-6 rounded-xl border border-border bg-surface max-w-md">
            <p className="text-muted">No book selected yet.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Books I&apos;ve Read</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg border border-border bg-surface text-center">
              <p className="text-sm text-muted">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
