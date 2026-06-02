// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// Default output is 'static' (fast, prerendered marketing pages).
// API routes opt into SSR with `export const prerender = false`, which keeps
// the Supabase service-role key server-side only. The Netlify adapter handles
// those server endpoints as on-demand functions.
export default defineConfig({
  site: 'https://vrentertainment.digital',
  adapter: netlify(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
