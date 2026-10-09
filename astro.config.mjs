import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Custom domain home.biochef.app served by GitHub Pages from the
  // ieeta-pt/BiochefPage repo. Custom domain means the site lives at the
  // root, no /BiochefPage/ base path. The SPA at /Biochef/ stays in its
  // own repo (ieeta-pt/Biochef) and continues serving from
  // ieeta-pt.github.io/Biochef/.
  site: 'https://home.biochef.app',
  integrations: [react(), mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
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
