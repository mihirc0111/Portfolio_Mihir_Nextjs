import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Seeding Supabase database...\n");

  try {
    // Create admin user
    console.log("👤 Creating admin user...");
    const { data: admin, error: adminError } = await supabase
      .from("users")
      .insert([
        {
          email: "admin@example.com",
          password_hash: "password123", // In production, use bcrypt!
          name: "Admin User",
          role: "admin",
          company: "Portfolio",
        },
      ])
      .select();

    if (adminError) {
      console.log("  ⚠️  Admin user might already exist:", adminError.message);
    } else {
      console.log("  ✓ Created admin user: admin@example.com / password123");
    }

    // Create sample comments
    console.log("\n💬 Creating sample comments...");
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .insert([
        {
          name: "John Doe",
          email: "john@example.com",
          message: "Great portfolio! I really liked your projects.",
          status: "pending",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          message: "Impressive work on the React projects. Would love to collaborate!",
          status: "replied",
          reply_message: "Thanks Jane! I'd be happy to collaborate. Let's connect!",
        },
      ])
      .select();

    if (commentsError) {
      console.log("  ⚠️  Comments might already exist:", commentsError.message);
    } else {
      console.log(`  ✓ Created ${comments?.length || 0} sample comments`);
    }

    console.log("\n✅ Seeding complete!");
    console.log("\n📋 Next steps:");
    console.log("1. Go to your Supabase dashboard: https://supabase.com/dashboard");
    console.log("2. Navigate to your project");
    console.log("3. Go to SQL Editor and run the SQL from docs/supabase-schema.sql");
    console.log("4. Add environment variables to Vercel");
    console.log("5. Test the login at /login");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();