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

const sampleData = {
  hero: {
    _type: "hero",
    greeting: "Hi, I'm",
    name: "Mihir Chavan",
    tagline: "Software Developer",
    description:
      "I build fast, scalable, and user-centric web applications...",
    ctaPrimary: "View My Work",
    ctaSecondary: "Download Resume",
  },
  about: {
    _type: "about",
    content:
      "I'm someone who genuinely enjoys building software and continuously improving as an engineer. I like understanding how systems work, solving challenging problems, and writing code that's easy to maintain. Whether I'm exploring new technologies, learning system design, or refining my problem-solving skills, I believe continuous learning is one of the most valuable qualities in software engineering. Outside of work, I enjoy playing football and chess, cycling, and wildlife photography. I'm also an avid reader of mystery, thriller, and self-help books, and a longtime fan of One Piece, whose themes of perseverance, ambition, and teamwork inspire my approach to both learning and collaboration.",
  },
  skillCategories: [
    {
      _type: "skillCategory",
      title: "Frontend",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Redux Toolkit",
        "Tailwind CSS",
        "CSS Modules",
      ],
      orderPriority: 1,
    },
    {
      _type: "skillCategory",
      title: "Backend & APIs",
      skills: [
        "Node.js",
        "Next.js API Routes",
        "REST APIs",
      ],
      orderPriority: 2,
    },
    {
      _type: "skillCategory",
      title: "Database & CMS",
      skills: [
        "PostgreSQL",
        "Supabase",
        "Sanity CMS",
      ],
      orderPriority: 3,
    },
    {
      _type: "skillCategory",
      title: "Tools & Platforms",
      skills: [
        "Git & GitHub",
        "Vercel",
        "Google Analytics 4",
      ],
      orderPriority: 4,
    },
    {
      _type: "skillCategory",
      title: "Core Concepts",
      skills: [
        "SSR / SSG",
        "Performance Optimization",
        "Responsive Design",
        "Accessibility (WCAG)",
        "Web Vitals",
        "Secure Frontend Practices",
        "SEO",
      ],
      orderPriority: 5,
    },
  ],
  projects: [
    {
      _type: "project",
      title: "React Portfolio",
      slug: { current: "react-portfolio" },
      description:
        "A professionally designed portfolio website, utilizing the latest technologies such as ReactJS, Tailwind CSS, Framer-Motion, React-Slick, and React-Scroll to deliver an interactive and visually compelling user experience. The website showcases my skills and achievements through dynamic transitions, intuitive navigation, and engaging animations.",
      techStack: ["ReactJS", "Tailwind CSS", "Framer-Motion", "React-Slick", "React-Scroll"],
      liveUrl: "https://portfolio-mihir-react-tailwind.vercel.app/",
      githubUrl: "https://github.com/mihirc0111/Portfolio-Mihir-React-Tailwind",
      status: "completed",
      orderPriority: 1,
    },
    {
      _type: "project",
      title: "Mi-Blog-Van",
      slug: { current: "mi-blog-van" },
      description:
        "This is a blog website with a MongoDB database.",
      techStack: ["MongoDB", "Node.js", "Express", "React"],
      liveUrl: "https://mihirs-blog-website.onrender.com/",
      githubUrl: "https://github.com/mihirc0111/Mi-Blog-Van",
      status: "completed",
      orderPriority: 2,
    },
    {
      _type: "project",
      title: "After School Diaries",
      slug: { current: "after-school-diaries" },
      description:
        "To create a website which plays Cartoon/Show songs' audio when user clicks on a particular cartoon image. Using HTML, CSS, JS, Bootstrap to bundle the songs we loved during our childhood!",
      techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      liveUrl: "https://mihirc0111.github.io/AfterSchoolDiaries-HTML-CSS-JS-BootStrap-Website/",
      githubUrl: "https://github.com/mihirc0111/AfterSchoolDiaries-HTML-CSS-JS-BootStrap-Website",
      status: "completed",
      orderPriority: 3,
    },
  ],
  achievements: [
    {
      _type: "achievement",
      title: "Software Developer at Axis Bank",
      description:
        "Working as a Software Developer at Axis Bank, building modern web applications with React and TypeScript.",
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
  ],
  books: [
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
  ],
  whatsNext: {
    _type: "whatsNext",
    title: "What's Next",
    subtitle: "Upcoming features and additions planned for this portfolio.",
    items: [
      {
        title: "Blog Section",
        description: "A dedicated blog to share technical articles, tutorials, and insights about frontend development, React, and Next.js.",
        status: "in-progress",
        eta: "Q1 2026",
        order: 1,
      },
      {
        title: "Favourite Movies & Series List",
        description: "A curated list of my favourite movies and series with ratings, reviews, and recommendations — a fun personal touch to the portfolio.",
        status: "planned",
        eta: "Q2 2026",
        order: 2,
      },
      {
        title: "Travel Photography Gallery",
        description: "A visual gallery of travel photos with location tags and stories from memorable trips.",
        status: "planned",
        eta: "Q2 2026",
        order: 3,
      },
    ],
  },
  skillsRadar: {
    _type: "skillsRadar",
    title: "Skills on my Radar",
    subtitle: "Skills and technologies I am planning to learn or currently exploring.",
    items: [
      {
        name: "AWS Certified Developer – Associate",
        category: "Cloud & DevOps",
        description: "Earning the AWS Certified Developer – Associate certification to deepen cloud infrastructure, serverless architecture, and deployment automation expertise.",
        resourceUrl: "https://aws.amazon.com/certification/",
        priority: "high",
        order: 1,
      },
      {
        name: "System Architecture & Design",
        category: "Architecture",
        description: "Studying distributed systems, microservices patterns, and large-scale system design for building robust, scalable applications.",
        priority: "high",
        order: 2,
      },
    ],
  },
  technicalOverview: {
    _type: "technicalOverview",
    title: "Technical Overview",
    subtitle: "How this portfolio was built and the technologies behind it.",
    techStack: [
      { name: "Next.js", description: "React framework for server-rendered and static web applications.", icon: "Layers", version: "16", website: "https://nextjs.org", category: "Frontend", order: 1 },
      { name: "React", description: "Component-based UI library for building interactive interfaces.", icon: "Code2", version: "19", website: "https://react.dev", category: "Frontend", order: 2 },
      { name: "TypeScript", description: "Type-safe JavaScript for scalable, maintainable code.", icon: "Code2", version: "5", website: "https://www.typescriptlang.org", category: "Frontend", order: 3 },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development.", icon: "Palette", version: "4", website: "https://tailwindcss.com", category: "Styling", order: 4 },
      { name: "Supabase", description: "Open-source Firebase alternative for auth, database, and storage.", icon: "Database", website: "https://supabase.com", category: "Backend / Database", order: 5 },
      { name: "Sanity", description: "Headless CMS for structured content management.", icon: "Server", website: "https://sanity.io", category: "CMS", order: 6 },
      { name: "Google Analytics 4", description: "Web analytics for tracking visitor behavior and performance.", icon: "BarChart3", website: "https://analytics.google.com", category: "Analytics", order: 7 },
      { name: "Vercel", description: "Cloud platform for frontend frameworks and static sites.", icon: "Cloud", website: "https://vercel.com", category: "Deployment", order: 8 },
    ],
    aiTools: [
      { name: "OpenCode", description: "AI-powered coding assistant for rapid development and debugging.", icon: "Bot", website: "https://opencode.ai", order: 1 },
      { name: "DeepSeek", description: "LLM used for code generation, architecture planning, and problem-solving.", icon: "Brain", order: 2 },
      { name: "Gemini", description: "Google's AI model used for content drafting and research.", icon: "Sparkles", order: 3 },
      { name: "GPT", description: "OpenAI's language model for code reviews and technical writing.", icon: "Brain", order: 4 },
    ],
    architecture: [
      { name: "Next.js + Sanity + Supabase", description: "Full-stack architecture with server-side rendering, headless CMS, and database.", icon: "Layers", order: 1 },
      { name: "GA4 Integration", description: "Client-side analytics with custom event tracking and web vitals.", icon: "BarChart3", order: 2 },
      { name: "ISR Strategy", description: "Incremental Static Regeneration for optimal performance and freshness.", icon: "Zap", order: 3 },
    ],
    highlights: [
      { name: "Responsive Design", description: "Mobile-first layout with slide-out drawer, flexible grids, and adaptive spacing.", icon: "Smartphone", order: 1 },
      { name: "SEO Optimized", description: "Meta tags, Open Graph, semantic HTML, and structured data for search engines.", icon: "Search", order: 2 },
      { name: "Performance", description: "Optimized images, code splitting, and ISR for fast load times.", icon: "Gauge", order: 3 },
      { name: "Accessibility", description: "WCAG-compliant with ARIA labels, keyboard navigation, and screen reader support.", icon: "Shield", order: 4 },
      { name: "Dark Mode", description: "Theme toggle with system preference detection and localStorage persistence.", icon: "Monitor", order: 5 },
    ],
    deployment: [
      { name: "Vercel", description: "Zero-config deployment with automatic previews and CI/CD.", icon: "Cloud", website: "https://vercel.com", order: 1 },
    ],
  },
};

const DUPLICATE_TYPES = ["hero", "about", "skillCategory", "project", "achievement", "book"];

async function seed() {
  console.log("🌱 Seeding Sanity CMS...\n");

  try {
    // Clean up existing documents to prevent duplicates
    console.log("🧹 Cleaning up existing documents...");
    for (const type of DUPLICATE_TYPES) {
      const ids = await client.fetch(`*[_type == "${type}"]._id`);
      if (ids.length > 0) {
        await client.delete({ query: `*[_type == "${type}"]` });
        console.log(`  ✓ Deleted ${ids.length} existing "${type}" document(s)`);
      }
    }

    // Seed hero
    console.log("\n🎯 Creating hero...");
    await client.create(sampleData.hero);
    console.log("  ✓ Created hero");

    // Seed about
    console.log("\n📝 Creating about...");
    await client.create(sampleData.about);
    console.log("  ✓ Created about");

    // Seed skill categories
    console.log("\n💻 Creating skill categories...");
    for (const category of sampleData.skillCategories) {
      await client.create(category);
      console.log(`  ✓ Created: ${category.title}`);
    }

    // Seed projects
    console.log("\n📦 Creating projects...");
    for (const project of sampleData.projects) {
      await client.create(project);
      console.log(`  ✓ Created: ${project.title}`);
    }

    // Seed achievements
    console.log("\n🏆 Creating achievements...");
    for (const achievement of sampleData.achievements) {
      await client.create(achievement);
      console.log(`  ✓ Created: ${achievement.title}`);
    }

    // Seed books
    console.log("\n📚 Creating books...");
    for (const book of sampleData.books) {
      await client.create(book);
      console.log(`  ✓ Created: ${book.title}`);
    }

    // Seed what's next (singleton — create or update)
    console.log("\n🔮 Seeding what's next...");
    let existingSingletons = await client.fetch('*[_type == "whatsNext"][0]._id');
    const whatsNextData = sampleData.whatsNext;
    if (existingSingletons) {
      await client.patch(existingSingletons).set(whatsNextData).commit();
      console.log("  ✓ Updated what's next");
    } else {
      await client.create(whatsNextData);
      console.log("  ✓ Created what's next");
    }

    // Seed skills on radar (singleton — create or update)
    console.log("\n🎯 Seeding skills on my radar...");
    existingSingletons = await client.fetch('*[_type == "skillsRadar"][0]._id');
    const skillsData = sampleData.skillsRadar;
    if (existingSingletons) {
      await client.patch(existingSingletons).set(skillsData).commit();
      console.log("  ✓ Updated skills on my radar");
    } else {
      await client.create(skillsData);
      console.log("  ✓ Created skills on my radar");
    }

    // Seed technical overview (singleton — create or update)
    console.log("\n🔧 Seeding technical overview...");
    const existing = await client.fetch('*[_type == "technicalOverview"][0]._id');
    const { _type, ...rest } = sampleData.technicalOverview;
    if (existing) {
      await client.patch(existing).set(rest).commit();
      console.log("  ✓ Updated technical overview");
    } else {
      await client.create(sampleData.technicalOverview);
      console.log("  ✓ Created technical overview");
    }

    console.log("\n✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();