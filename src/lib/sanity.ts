import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

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

export function urlFor(source: SanityImageSource) {
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

export const heroQuery = `*[_type == "hero"][0] {
  _id,
  greeting,
  name,
  tagline,
  description,
  ctaPrimary,
  ctaSecondary,
  profileImage
}`;

export const aboutQuery = `*[_type == "about"][0] {
  _id,
  content
}`;

export const skillCategoriesQuery = `*[_type == "skillCategory"] | order(orderPriority asc) {
  _id,
  title,
  skills
}`;

export const whatsNextQuery = `*[_type == "whatsNext"][0] {
  _id,
  title,
  subtitle,
  items[] | order(order asc) {
    title,
    description,
    status,
    eta,
    order
  }
}`;

export const skillsRadarQuery = `*[_type == "skillsRadar"][0] {
  _id,
  title,
  subtitle,
  items[] | order(order asc) {
    name,
    category,
    description,
    resourceUrl,
    priority,
    order
  }
}`;

export const technicalOverviewQuery = `*[_type == "technicalOverview"][0] {
  _id,
  title,
  subtitle,
  techStack[] | order(order asc) {
    name,
    description,
    icon,
    version,
    website,
    category,
    order
  },
  aiTools[] | order(order asc) {
    name,
    description,
    icon,
    website,
    order
  },
  architecture[] | order(order asc) {
    name,
    description,
    icon,
    website,
    order
  },
  highlights[] | order(order asc) {
    name,
    description,
    icon,
    website,
    order
  },
  deployment[] | order(order asc) {
    name,
    description,
    icon,
    website,
    order
  }
}`;
