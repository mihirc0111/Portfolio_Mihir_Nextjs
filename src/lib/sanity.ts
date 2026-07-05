import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ─── Queries ────────────────────────────────────────────────────────

export const projectsQuery = `*[_type == "project"] | order(orderPriority asc) {
  _id,
  title,
  slug,
  description,
  techStack,
  liveUrl,
  githubUrl,
  coverImage,
  status
}`;

export const achievementsQuery = `*[_type == "achievement"] | order(orderPriority asc) {
  _id,
  title,
  description,
  date,
  category,
  issuer,
  certificateUrl,
  icon
}`;

export const booksQuery = `*[_type == "book"] | order(orderPriority asc) {
  _id,
  title,
  author,
  coverImage,
  rating,
  review,
  status,
  startDate,
  endDate
}`;

export const readingBookQuery = `*[_type == "book" && status == "reading"][0] {
  _id,
  title,
  author,
  coverImage,
  rating,
  review,
  status,
  startDate
}`;

export const readBooksQuery = `*[_type == "book" && status == "read"] | order(orderPriority asc) {
  _id,
  title,
  author,
  coverImage,
  rating,
  review,
  status,
  startDate,
  endDate
}`;
