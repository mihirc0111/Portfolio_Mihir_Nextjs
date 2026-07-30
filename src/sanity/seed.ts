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
      title: "MHT-CET Merit Ranker",
      category: "Entrance Exam",
      issuer: "Government of Maharashtra",
      description:
        "Bagged a whopping 153rd Rank out of 1.74 Lakh students that registered for the exam. Got a 99.89 percentile in PCM! Got admission in VJTI, Mumbai - top BTech college in Maharashtra.",
      date: "2020-09-01",
      orderPriority: 1,
    },
    {
      _type: "achievement",
      title: "SSC Merit Holder",
      category: "Secondary School Certificate",
      issuer: "Government of Maharashtra",
      description:
        "Bagged a whopping 94.20% in SSC exam. Awarded with a trophy by Mahesh Tutorials Coaching Institute!",
      date: "2018-03-01",
      orderPriority: 2,
    },
    {
      _type: "achievement",
      title: "Team Award - SERP Optimization Project",
      category: "award",
      issuer: "Axis Mutual Fund ACE Awards",
      description:
        "Aimed to boost organic visibility, improve keyword performance, and deliver measurable search impact. Leveraged data-driven strategies, on-page and off-page SEO, and continuous monitoring to enhance keyword rankings across key business segments, increase CTR and user engagement via optimized meta elements, and develop a scalable framework to sustain search growth.",
      date: "2025-09-12",
      orderPriority: 3,
    },
  ],
  books: [
    {
      _type: "book",
      title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
      author: "Morgan Housel",
      genre: "Personal Finance / Behavioral Economics / Self-Help",
      description:
        "Explores how psychological biases, personal history, ego, and human behavior impact financial decisions far more than technical knowledge or mathematical formulas.",
      rating: 0,
      status: "reading",
      orderPriority: 1,
    },
    {
      _type: "book",
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Philosophical Fiction / Quest",
      description:
        "Follows a young Andalusian shepherd named Santiago on his journey to the Egyptian pyramids in search of a hidden treasure, learning to listen to his heart and follow his Personal Legend along the way.",
      rating: 0,
      status: "read",
      orderPriority: 2,
    },
    {
      _type: "book",
      title: "Ikigai: The Japanese Secret to a Long and Happy Life",
      author: "Héctor García and Francesc Miralles",
      genre: "Self-Help / Philosophy",
      description:
        "Explores the Japanese concept of 'ikigai' (a reason for being) through the lifestyle, diet, habits, and mindset of the long-lived residents of Okinawa.",
      rating: 0,
      status: "read",
      orderPriority: 3,
    },
    {
      _type: "book",
      title: "Who Moved My Cheese?",
      author: "Spencer Johnson",
      genre: "Self-Help / Business Fable",
      description:
        "An allegorical tale about four characters living in a maze who face sudden changes when their supply of cheese disappears, offering practical insights on adapting to change.",
      rating: 0,
      status: "read",
      orderPriority: 4,
    },
    {
      _type: "book",
      title: "The Art of Laziness",
      author: "Library Mindset",
      genre: "Self-Help / Productivity",
      description:
        "A concise guide focused on overcoming procrastination, building effective habits, and managing focus and time efficiently without feeling overwhelmed.",
      rating: 0,
      status: "read",
      orderPriority: 5,
    },
    {
      _type: "book",
      title: "The Gita for Children",
      author: "Roopa Pai",
      genre: "Children's Non-Fiction / Mythology & Philosophy",
      description:
        "A playful and accessible retelling of the 700 verses of the Bhagavad Gita, breaking down its ancient philosophical lessons on duty, action, and mindset for young readers.",
      rating: 0,
      status: "read",
      orderPriority: 6,
    },
    {
      _type: "book",
      title: "The Monk Who Sold His Ferrari",
      author: "Robin Sharma",
      genre: "Self-Help / Fable",
      description:
        "Follows Julian Mantle, a high-profile lawyer who suffers a heart attack and embarks on a spiritual odyssey to the Himalayas, discovering core principles for a fulfilling life.",
      rating: 0,
      status: "read",
      orderPriority: 7,
    },
    {
      _type: "book",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genre: "Self-Help / Personal Growth",
      description:
        "A counterintuitive approach to living a good life that encourages readers to embrace limitations, accept responsibility, and focus energy only on what truly matters.",
      rating: 0,
      status: "read",
      orderPriority: 8,
    },
    {
      _type: "book",
      title: "The Girl on the Train",
      author: "Paula Hawkins",
      genre: "Psychological Thriller / Mystery",
      description:
        "Focuses on Rachel, a daily commuter who becomes entangled in a missing person's investigation after witnessing something shocking from her train window.",
      rating: 0,
      status: "read",
      orderPriority: 9,
    },
    {
      _type: "book",
      title: "The Illustrated Ramayana",
      author: "DK / Valmiki",
      genre: "Mythology / Indian Epic / Illustrated Reference",
      description:
        "A visual retelling of the epic journey of Prince Rama, highlighting themes of duty, devotion, righteousness, and courage through traditional artwork and commentary.",
      rating: 0,
      status: "read",
      orderPriority: 10,
    },
    {
      _type: "book",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Psychological Thriller / Suspense",
      description:
        "Centers on Alicia Berenson, a famous painter who shoots her husband five times and never speaks another word, and the criminal psychotherapist obsessed with uncovering her motive.",
      rating: 0,
      status: "read",
      orderPriority: 11,
    },
    {
      _type: "book",
      title: "Life's Amazing Secrets: How to Find Balance and Purpose in Your Life",
      author: "Gaur Gopal Das",
      genre: "Self-Help / Spirituality",
      description:
        "Shares insights on relationships, purpose, work-life balance, and inner peace through a conversational journey through Mumbai with monk Gaur Gopal Das.",
      rating: 0,
      status: "read",
      orderPriority: 12,
    },
    {
      _type: "book",
      title: "Flowers for Algernon",
      author: "Daniel Keyes",
      genre: "Science Fiction / Psychological Drama",
      description:
        "Written as progress reports by Charlie Gordon, a man with a low IQ who undergoes an experimental surgical procedure that dramatically increases his intelligence, echoing an earlier test on a laboratory mouse named Algernon.",
      rating: 0,
      status: "read",
      orderPriority: 13,
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
        status: "planned",
        eta: "November 2026",
        order: 1,
      },
      {
        title: "Favourite Movies & Series List",
        description: "A curated list of my favourite movies and series with ratings, reviews, and recommendations — a fun personal touch to the portfolio.",
        status: "planned",
        eta: "November 2026",
        order: 2,
      },
      {
        title: "Travel Photography Gallery",
        description: "A visual gallery of travel photos with location tags and stories from memorable trips.",
        status: "planned",
        eta: "November 2026",
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
        name: "Flutter & Dart",
        category: "Mobile Development",
        description: "Master cross-platform mobile application development using Flutter and Dart to build performant, natively compiled applications for iOS and Android from a single codebase.",
        priority: "high",
        order: 1,
      },
      {
        name: "System Design & Low-Level Architecture",
        category: "Software Engineering",
        description: "Deepen expertise in designing scalable, fault-tolerant distributed systems, object-oriented design patterns, caching strategies, and database indexing for high-traffic applications.",
        priority: "high",
        order: 2,
      },
      {
        name: "Kubernetes & Docker Orchestration",
        category: "Cloud & DevOps",
        description: "Master container management, auto-scaling, and microservice deployment workflows using Docker and Kubernetes to ensure smooth CI/CD pipelines and high availability.",
        priority: "medium",
        order: 3,
      },
      {
        name: "Web Vitals & Web Security (OWASP)",
        category: "Frontend & Core Web",
        description: "Optimize critical rendering paths, core web vitals, dynamic bundle sizing, and enforce security practices against common web vulnerabilities like XSS, CSRF, and data leaks.",
        priority: "high",
        order: 4,
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

const DUPLICATE_TYPES = ["hero", "about", "skillCategory"];

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

    // Seed projects (upsert by slug — preserve coverImage)
    console.log("\n📦 Upserting projects...");
    for (const project of sampleData.projects) {
      const existing = await client.fetch(`*[_type == "project" && slug.current == "${project.slug.current}"][0]`);
      if (existing) {
        // Update text fields only — never touch coverImage
        await client
          .patch(existing._id)
          .set({
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            status: project.status,
            orderPriority: project.orderPriority,
          })
          .commit();
        console.log(`  ✓ Updated: ${project.title}`);
      } else {
        await client.create(project);
        console.log(`  ✓ Created: ${project.title}`);
      }
    }

    // Seed achievements (delete all + recreate for clean replacement)
    console.log("\n🏆 Seeding achievements...");
    const existingAchievementIds = await client.fetch('*[_type == "achievement"]._id');
    if (existingAchievementIds.length > 0) {
      await client.delete({ query: '*[_type == "achievement"]' });
      console.log(`  ✓ Deleted ${existingAchievementIds.length} existing achievement(s)`);
    }
    for (const achievement of sampleData.achievements) {
      await client.create(achievement);
      console.log(`  ✓ Created: ${achievement.title}`);
    }

    // Seed books (skip if already exists)
    console.log("\n📚 Upserting books...");
    for (const book of sampleData.books) {
      const existing = await client.fetch(`*[_type == "book" && title == "${book.title}"][0]._id`);
      if (existing) {
        console.log(`  ⏭ Skipped (already exists): ${book.title}`);
      } else {
        await client.create(book);
        console.log(`  ✓ Created: ${book.title}`);
      }
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