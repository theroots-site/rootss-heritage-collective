// Merges owner edits from the admin area (products and collection status in Lovable Cloud)
// over the curated catalogue in ./catalog.ts. A database row with the same slug replaces the
// catalogue entry; rows with new slugs are pieces the owner added.
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { Database } from "@/integrations/supabase/types";
import {
  availabilities,
  collections as baseCollections,
  lines,
  products as baseProducts,
  type Availability,
  type Collection,
  type CollectionSlug,
  type LineSlug,
  type Product,
} from "./catalog";
import { getCatalogueOverrides } from "./catalogue.functions";

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type CollectionSettingRow = Database["public"]["Tables"]["collection_settings"]["Row"];
export type CatalogueOverrides = { products: ProductRow[]; collections: CollectionSettingRow[] };

export type CollectionStatus = "live" | "coming-soon" | "hidden";
export const collectionStatuses: CollectionStatus[] = ["live", "coming-soon", "hidden"];
export const collectionStatusLabel: Record<CollectionStatus, string> = {
  live: "Live",
  "coming-soon": "Coming soon",
  hidden: "Hidden",
};

export type LiveCollection = Collection & { status: CollectionStatus };
export type ManagedProduct = Product & {
  hidden: boolean;
  /** "catalogue" = from the printed catalogue; "added" = created in the admin area. */
  source: "catalogue" | "added";
  edited: boolean;
  updatedAt: string | null;
};

const collectionSlugs = new Set<string>(baseCollections.map((c) => c.slug));
const lineSlugs = new Set<string>(lines.map((l) => l.slug));

export function rowToProduct(r: ProductRow): Product | null {
  if (!collectionSlugs.has(r.collection)) return null;
  const availability = (availabilities as string[]).includes(r.availability)
    ? (r.availability as Availability)
    : "on-enquiry";
  const p: Product = {
    slug: r.slug,
    name: r.name,
    code: r.code?.trim() ? r.code.trim() : null,
    line: (lineSlugs.has(r.line) ? r.line : "dhokra") as LineSlug,
    collection: r.collection as CollectionSlug,
    size: r.size?.trim() ? r.size.trim() : null,
    craft: r.craft,
    material: r.material,
    description: r.description,
    images: r.images.filter(Boolean),
    availability,
    price: r.price == null ? null : Number(r.price),
    moreDesigns: r.more_designs,
    featured: r.featured,
  };
  if (r.options?.trim()) p.options = r.options.trim();
  return p;
}

export function mergeCatalogue(o: CatalogueOverrides) {
  const rows = new Map(o.products.map((r) => [r.slug, r]));
  const all: ManagedProduct[] = [];
  for (const p of baseProducts) {
    const r = rows.get(p.slug);
    rows.delete(p.slug);
    const fromRow = r ? rowToProduct(r) : null;
    if (r && fromRow) all.push({ ...fromRow, hidden: r.hidden, source: "catalogue", edited: true, updatedAt: r.updated_at });
    else all.push({ ...p, hidden: false, source: "catalogue", edited: false, updatedAt: null });
  }
  const added = [...rows.values()].sort((a, b) => a.created_at.localeCompare(b.created_at));
  for (const r of added) {
    const p = rowToProduct(r);
    if (p) all.push({ ...p, hidden: r.hidden, source: "added", edited: true, updatedAt: r.updated_at });
  }

  const statusBySlug = new Map(o.collections.map((c) => [c.slug, c.status as CollectionStatus]));
  const allCollections: LiveCollection[] = baseCollections.map((c) => ({
    ...c,
    status: statusBySlug.get(c.slug) ?? "live",
  }));
  const liveSlugs = new Set(allCollections.filter((c) => c.status === "live").map((c) => c.slug));

  // Shoppers see pieces that are not hidden and belong to a live collection.
  const products: Product[] = all.filter((p) => !p.hidden && liveSlugs.has(p.collection));
  const collections = allCollections.filter((c) => c.status !== "hidden");

  return {
    all,
    allCollections,
    products,
    collections,
    liveCollections: allCollections.filter((c) => c.status === "live"),
    getProduct: (slug: string) => products.find((p) => p.slug === slug),
    getCollection: (slug: string) => collections.find((c) => c.slug === slug),
    getCollectionProducts: (slug: string) => products.filter((p) => p.collection === slug),
  };
}

export type LiveCatalogue = ReturnType<typeof mergeCatalogue>;

export const catalogueQuery = queryOptions({
  queryKey: ["catalogue"],
  queryFn: () => getCatalogueOverrides(),
  staleTime: 60_000,
});

export function useCatalogue(): LiveCatalogue {
  const { data } = useSuspenseQuery(catalogueQuery);
  return useMemo(() => mergeCatalogue(data), [data]);
}
