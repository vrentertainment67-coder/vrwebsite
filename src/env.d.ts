/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Server-only: Supabase project URL. */
  readonly SUPABASE_URL: string;
  /** Server-only: Supabase service role key. NEVER expose to the client. */
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  /** Optional public Supabase URL for any safe client reads. */
  readonly PUBLIC_SUPABASE_URL: string;
  /** Public Calendly scheduling URL embedded on /contact. */
  readonly PUBLIC_CALENDLY_URL: string;
  /** Server-only: MailerLite API key (optional newsletter forwarding). */
  readonly MAILERLITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
