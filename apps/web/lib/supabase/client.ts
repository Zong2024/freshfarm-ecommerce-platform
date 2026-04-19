import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ [Supabase]: NEXT_PUBLIC_SUPABASE_URL 未設定。Supabase 認證功能將無法使用。"
  );
}
if (!supabaseAnonKey && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ [Supabase]: NEXT_PUBLIC_SUPABASE_ANON_KEY 未設定。Supabase 認證功能將無法使用。"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);