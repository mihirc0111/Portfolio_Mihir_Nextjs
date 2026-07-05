import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token || undefined,
});

console.log(`✅ Connected to Sanity: ${projectId}/${dataset}\n`);

const sampleProjects = [
  {
    _type: "project",
    title: "Portfolio Website",
    slug: { current: "portfolio-website" },
    description:
      "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include Sanity CMS integration, responsive design, and optimized performance.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
    liveUrl: "https://mihir-chavan.vercel.app",
    githubUrl: "https://github.com/mihirc0111/Portfolio_Mihir_Nextjs",
    status: "completed",
    orderPriority: 1,
  },
  {
    _type: "project",
    title: "E-Commerce Dashboard",
    slug: { current: "ecommerce-dashboard" },
    description:
      "A comprehensive admin dashboard for managing products, orders, and analytics. Built with React and integrated with a REST API.",
    techStack: ["React", "Redux Toolkit", "Chart.js", "REST API", "CSS Modules"],
    liveUrl: "",
    githubUrl: "https://github.com/mihirc0111",
    status: "completed",
    orderPriority: 2,
  },
];

const sampleAchievements = [
  {
    _type: "achievement",
    title: "Frontend Developer at Axis Bank",
    description:
      "Working as a Frontend Developer at Axis Bank, building modern web applications with React and TypeScript.",
    date: "2023-06-01",
    category: "achievement",
    issuer: "Axis Bank",
    icon: "Award",
    orderPriority: 1,
  },
  {
    _type: "achievement",
    title: "React Certification",
    description: "Certified React Developer with expertise in modern React patterns and best practices.",
    date: "2023-01-15",
    category: "certification",
    issuer: "Meta",
    icon: "GraduationCap",
    orderPriority: 2,
  },
];

const sampleBooks = [
  {
    _type: "book",
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    review:
      "A must-read for every developer. Teaches how to write clean, maintainable, and efficient code.",
    status: "read",
    startDate: "2024-01-01",
    endDate: "2024-02-15",
    orderPriority: 1,
  },
  {
    _type: "book",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    rating: 5,
    review: "Essential reading for software craftsmanship and career growth.",
    status: "read",
    startDate: "2024-03-01",
    endDate: "2024-04-10",
    orderPriority: 2,
  },
];

async function seed() {
  console.log("🌱 Seeding Sanity CMS...\n");

  try {
    // Seed projects
    console.log("📦 Creating projects...");
    for (const project of sampleProjects) {
      const result = await client.create(project);
      console.log(`  ✓ Created: ${result.title}`);
    }

    // Seed achievements
    console.log("\n🏆 Creating achievements...");
    for (const achievement of sampleAchievements) {
      const result = await client.create(achievement);
      console.log(`  ✓ Created: ${result.title}`);
    }

    // Seed books
    console.log("\n📚 Creating books...");
    for (const book of sampleBooks) {
      const result = await client.create(book);
      console.log(`  ✓ Created: ${result.title}`);
    }

    console.log("\n✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();