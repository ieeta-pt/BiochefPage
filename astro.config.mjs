import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Project GitHub Pages site at https://ieeta-pt.github.io/BiochefPage/.
  // The SPA stays at /Biochef/ (separate repo); this marketing site lives
  // alongside it under /BiochefPage/.
  site: 'https://ieeta-pt.github.io',
  base: '/BiochefPage',
  integrations: [react(), tailwind({ applyBaseStyles: false }), mdx(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      langs: ['tsx', 'js', 'json', 'bash', 'yaml', 'md']
    }
  }
});
