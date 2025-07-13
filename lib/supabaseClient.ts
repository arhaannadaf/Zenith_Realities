import { createClient } from "@supabase/supabase-js"

// Create a single Supabase client for client-side usage
// This client uses the public anon key and is safe to expose
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// Create a separate Supabase client for server-side usage (e.g., API routes, Server Actions)
// This client uses the service_role key and should NEVER be exposed to the client
export const supabaseServerClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)
