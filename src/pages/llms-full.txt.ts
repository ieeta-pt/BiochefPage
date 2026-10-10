// Served at /llms-full.txt. The text lives in src/templates/llms-full.txt; the
// catalogue numbers are filled in from the registry at build time.
import type { APIRoute } from 'astro';
import template from '../templates/llms-full.txt?raw';
import { getCatalogStats } from '../utils/catalog';

export const GET: APIRoute = async () => {
  const catalog = await getCatalogStats();
  const body = template
    .replaceAll('{{RECIPES}}', String(catalog.recipes))
    .replaceAll('{{NATIVE}}', String(catalog.native))
    .replaceAll('{{GTO_OPS}}', String(catalog.operationsByRecipe.gto ?? 57));
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
