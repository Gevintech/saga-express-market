import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yjcwgqtzgqaiqtpsafoc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqY3dncXR6Z3FhaXF0cHNhZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzMxNzgsImV4cCI6MjA4MTMwOTE3OH0.AfoU0zl99gro3S0Ad2npGOtup4NQqtxU3up0FKCZMsg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
