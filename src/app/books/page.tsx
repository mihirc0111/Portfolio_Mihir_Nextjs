import type { Metadata } from "next";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityFetch, sanityFetchSingle, readingBookQuery, readBooksQuery } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { BookOpen, Star, Calendar } from "lucide-react";
import ReadMore from "@/components/ReadMore";

export const metadata: Metadata = {
  title: "Books",
  description: "Books I have read and recommend.",
};

export const revalidate = 60;

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage?: SanityImageSource;
  rating?: number;
  genre?: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

async function getBooks(): Promise<{ reading: Book | null; read: Book[] }> {
  const [reading, read] = await Promise.all([
    sanityFetchSingle<Book>(readingBookQuery),
    sanityFetch<Book>(readBooksQuery),
  ]);
  return { reading, read };
}

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-warning fill-warning" : "text-muted/30"}
        />
      ))}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <div className="group rounded-xl border border-border bg-surface p-4 hover:border-primary/30 transition-colors">
      {/* Cover */}
      <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden mb-3">
        {book.coverImage && urlFor(book.coverImage) ? (
          <Image
            src={urlFor(book.coverImage)!.width(200).height(300).url()}
            alt={book.title}
            width={200}
            height={300}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen size={32} className="text-muted/40" />
        )}
      </div>

      {/* Info */}
      <h4 className="font-semibold text-sm leading-tight mb-0.5 line-clamp-2">
        {book.title}
      </h4>
      <p className="text-xs text-muted mb-0.5">{book.author}</p>
      {book.genre && (
        <p className="text-xs text-muted/60 mb-1.5 italic">{book.genre}</p>
      )}
      <StarRating rating={book.rating} />
      {book.description && (
        <div className="mt-2">
          <ReadMore text={book.description} maxLines={2} />
        </div>
      )}
    </div>
  );
}

export default async function BooksPage() {
  const { reading, read } = await getBooks();

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10">
          <h1>Books</h1>
          <p className="text-lg text-muted mt-1 max-w-2xl">
            Books that have shaped my thinking and skills.
          </p>
        </div>

        {/* Currently Reading */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-primary" />
            Currently Reading
          </h2>

          {reading ? (
            <div className="max-w-xs">
              <div className="group rounded-xl border-2 border-primary/30 bg-surface p-4 hover:border-primary/60 transition-colors relative">
                {/* Currently Reading Badge */}
                <span className="absolute top-2 right-2 z-10 text-xs font-medium px-2 py-0.5 rounded-full bg-primary text-white">
                  Reading
                </span>
                {/* Cover */}
                <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden mb-3">
                  {reading.coverImage && urlFor(reading.coverImage) ? (
                    <Image
                      src={urlFor(reading.coverImage)!.width(200).height(300).url()}
                      alt={reading.title}
                      width={200}
                      height={300}
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen size={32} className="text-muted/40" />
                  )}
                </div>
                {/* Info */}
                <h4 className="font-semibold text-sm leading-tight mb-0.5 line-clamp-2">
                  {reading.title}
                </h4>
                <p className="text-xs text-muted mb-0.5">{reading.author}</p>
                {reading.genre && (
                  <p className="text-xs text-muted/60 mb-1.5 italic">{reading.genre}</p>
                )}
                <StarRating rating={reading.rating} />
                {reading.startDate && (
                  <p className="text-xs text-muted mt-2 flex items-center gap-1">
                    <Calendar size={12} />
                    Started{" "}
                    {new Date(reading.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {reading.description && (
                  <div className="mt-2">
                    <ReadMore text={reading.description} maxLines={2} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-xs">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-muted text-sm">
                  Not reading anything at the moment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Books I've Read */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Books I've Read</h2>

          {read.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {read.map((book: Book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-muted/30 mb-4" />
              <h3 className="text-lg font-semibold mb-1">No books yet</h3>
              <p className="text-sm text-muted max-w-sm mx-auto">
                Books I've read will appear here once I add them through
                the CMS.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
