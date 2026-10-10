// Catalogue numbers read from the public BioChef Registry at build time, so the
// site never drifts from what the app actually offers. The registry serves the
// verified catalogue the app loads (biochef-plugins-index:latest). If it cannot
// be reached, the build falls back to the last known numbers below instead of
// failing.

const REGISTRY = 'https://registry.biochef.app/v2';
const INDEX = 'biochef-plugins-index';
const CATALOG_MEDIA_TYPE = 'application/vnd.biochef.verified-catalog+json';

export interface CatalogStats {
  /** Recipes (tools), e.g. samtools, minimap2. */
  recipes: number;
  /** Operations across all recipes; one recipe can expose several. */
  operations: number;
  /** Recipes with a native build the agent can run. */
  native: number;
  /** Operations per recipe id. */
  operationsByRecipe: Record<string, number>;
  /** Where the numbers came from. */
  source: 'registry' | 'fallback';
}

const FALLBACK: CatalogStats = {
  recipes: 31,
  operations: 176,
  native: 12,
  operationsByRecipe: { gto: 57 },
  source: 'fallback'
};

interface CatalogEntry {
  package?: string;
  runtime?: { modes?: string[] };
}

async function fetchJson(url: string, accept: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: accept }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return res.json();
}

async function load(): Promise<CatalogStats> {
  try {
    const manifest = (await fetchJson(
      `${REGISTRY}/${INDEX}/manifests/latest`,
      'application/vnd.oci.image.manifest.v1+json'
    )) as { layers?: { mediaType: string; digest: string }[] };
    const layer = manifest.layers?.find((l) => l.mediaType === CATALOG_MEDIA_TYPE);
    if (!layer) throw new Error('catalogue layer missing from the index manifest');

    const catalog = (await fetchJson(`${REGISTRY}/${INDEX}/blobs/${layer.digest}`, CATALOG_MEDIA_TYPE)) as {
      package_prefix?: string;
      packages?: Record<string, CatalogEntry>;
    };
    const prefix = catalog.package_prefix ?? 'biochef-plugins-';
    const entries = Object.entries(catalog.packages ?? {});
    if (entries.length === 0) throw new Error('catalogue has no packages');

    const operationsByRecipe: Record<string, number> = {};
    const native = new Set<string>();
    for (const [key, entry] of entries) {
      const recipe = (entry.package ?? key).replace(prefix, '').split('.')[0];
      operationsByRecipe[recipe] = (operationsByRecipe[recipe] ?? 0) + 1;
      if (entry.runtime?.modes?.includes('native')) native.add(recipe);
    }

    return {
      recipes: Object.keys(operationsByRecipe).length,
      operations: entries.length,
      native: native.size,
      operationsByRecipe,
      source: 'registry'
    };
  } catch (error) {
    console.warn(`[catalog] using fallback numbers: ${(error as Error).message}`);
    return FALLBACK;
  }
}

let cached: Promise<CatalogStats> | undefined;

/** Fetched once per build and shared by every page that asks. */
export function getCatalogStats(): Promise<CatalogStats> {
  cached ??= load();
  return cached;
}
