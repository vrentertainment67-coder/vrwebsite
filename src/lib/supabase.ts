import { createClient } from '@supabase/supabase-js';

/**
 * SERVER-ONLY Supabase client.
 *
 * Uses the service role key, which bypasses Row Level Security. It must ONLY
 * be imported inside Astro API routes (`src/pages/api/*.ts`) — never in a
 * component, `.astro` frontmatter that ships to the client, or anything that
 * runs in the browser. Tables have RLS enabled with NO public insert policies,
 * so every public form write goes through these routes.
 */

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  // Fail loudly at call time (not build time) so missing env in dev is obvious.
  console.warn(
    '[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'Form submissions will fail until these are configured in .env.'
  );
}

export function getServerClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('Supabase server credentials are not configured.');
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Optional read-only client for published content tables (case_studies,
 * testimonials). Falls back to the public URL/anon flow only if ever needed.
 * Public read policies are defined in supabase/schema.sql.
 */
export function getReadClient() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL || SUPABASE_URL;
  // For now reads also use the server client context; swap to an anon key here
  // if you ever need build-time or client-safe reads.
  if (!url || !SERVICE_ROLE_KEY) {
    throw new Error('Supabase read credentials are not configured.');
  }
  return createClient(url, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
