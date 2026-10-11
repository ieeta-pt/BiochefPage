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
  // Tutorials moved under Workflows; keep the first published links working.
  redirects: {
    '/tutorials': '/workflows#tutorials',
    '/workflows/tutorials': '/workflows#tutorials',
    '/tutorials/map-reads': '/workflows/tutorials/map-reads',
    '/tutorials/read-qc': '/workflows/tutorials/read-qc',
    '/tutorials/viral-consensus': '/workflows/tutorials/viral-consensus',
    '/tutorials/phylogeny': '/workflows/tutorials/phylogeny'
  },
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
