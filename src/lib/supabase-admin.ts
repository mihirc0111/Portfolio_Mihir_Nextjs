import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("⚠️ Supabase service role key not found. Server-side admin operations will fail.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
