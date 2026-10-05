/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Server-only: Supabase project URL. */
  readonly SUPABASE_URL: string;
  /** Server-only: Supabase service role key. NEVER expose to the client. */
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  /** Optional public Supabase URL (safe reads only, if ever needed). */
  readonly PUBLIC_SUPABASE_URL: string;
  /** Public: Umami analytics script URL (cookieless). */
  readonly PUBLIC_UMAMI_SCRIPT_URL: string;
  /** Public: Umami website id. */
  readonly PUBLIC_UMAMI_WEBSITE_ID: string;
  /** Server-only: ntfy.sh topic for score/enquiry notifications. Optional. */
  readonly NTFY_TOPIC: string;
  /** Server-only: Anthropic API key (Phase 3 concierge + score summary). */
  readonly ANTHROPIC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
