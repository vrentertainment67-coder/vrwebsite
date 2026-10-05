// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// Static by default (fast). API routes opt into SSR with `export const prerender = false`,
// which keeps the Supabase service-role key server-side only.
export default defineConfig({
  site: 'https://vrentertainment.digital',
  adapter: netlify(),
  integrations: [sitemap()],
  // 301s from the old URLs live in netlify.toml (splat redirects, applied by Netlify).
});
