import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://vrentertainment.digital',
  integrations: [tailwind()],
});
