import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) return null;
  return builder.image(source);
}

export async function sanityFetch<T>(query: string): Promise<T[]> {
  if (!client) return [];
  try {
    return await client.fetch(query);
  } catch {
    return [];
  }
}

export async function sanityFetchSingle<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch(query);
  } catch {
    return null;
  }
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
