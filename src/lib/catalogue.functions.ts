import { createServerFn } from "@tanstack/react-start";

import { createPublicDb, type PublicDb } from "./public-db";
import type { CatalogueOverrides } from "./catalogue-live";

export async function fetchCatalogueOverrides(db: PublicDb): Promise<CatalogueOverrides> {
  const [p, c] = await Promise.all([
    db.from("products").select("*").limit(2000),
    db.from("collection_settings").select("*"),
  ]);
  if (p.error || c.error) {
    console.error("Catalogue overrides failed", p.error?.message ?? c.error?.message);
    return { products: [], collections: [] };
  }
  return { products: p.data, collections: c.data };
}

// Public read: product edits and collection status are shown on the public site anyway.
// On failure the site falls back to the printed catalogue rather than going blank.
export const getCatalogueOverrides = createServerFn({ method: "GET" }).handler(async () => {
  const db = createPublicDb();
  if (!db) return { products: [], collections: [] } satisfies CatalogueOverrides;
  return fetchCatalogueOverrides(db);
});
