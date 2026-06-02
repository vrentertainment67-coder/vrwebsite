// Tailwind CSS v4 via PostCSS.
// Astro 6 ships a rolldown-bundled Vite that the @tailwindcss/vite plugin does
// not yet support (withastro/astro#16542), so we run Tailwind through PostCSS.
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [tailwindcss()],
};
