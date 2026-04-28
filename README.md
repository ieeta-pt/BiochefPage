# BioChef · marketing site

Documentation and marketing site for the [BioChef](https://github.com/ieeta-pt/Biochef) project — a catalogue of signed bioinformatics tools that run end-to-end in your browser via WebAssembly.

**Live:** https://home.biochef.app/

The actual BioChef web app (the SPA users run) lives at https://ieeta-pt.github.io/Biochef/ in a separate repo.

## What's here

- **Why BioChef** · the case for a signed, browser-native bioinformatics catalogue
- **Architecture** · the four-station pipeline: recipes → Hub → Registry → browser
- **Workflows** · the in-browser DAG editor and the catalogue of tools you can chain
- **Developers** · how to author a recipe, run the SPA locally, and pull signed bundles
- **Community** · roadmap, team, and citation

## Tech

- [Astro 4](https://astro.build) (static SSG)
- [React 18](https://react.dev) (islands)
- [Tailwind CSS 3](https://tailwindcss.com) (Material Design palette)
- Roboto + JetBrains Mono
- MDX for inline architecture content
- Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`

## Develop locally

Requires Node 20 +.

```bash
npm install
npm run dev      # serves at http://localhost:4321/
npm run build    # static build to dist/
npm run preview  # serve the production build
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site with `npm ci && npm run build` and publishes `dist/` to GitHub Pages.

## License

Site source: MIT.
BioChef code: MIT.
BioChef paper: CC-BY 4.0 ([10.1186/s12859-026-06431-1](https://doi.org/10.1186/s12859-026-06431-1)).
