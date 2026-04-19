export { supabase } from "./client";
export {
  signUpWithSupabase,
  signInWithSupabase,
  signOutWithSupabase,
  getSupabaseSession,
  onSupabaseAuthStateChange,
} from "./auth";
export type { SupabaseSignUpParams, SupabaseSignInParams } from "./auth";