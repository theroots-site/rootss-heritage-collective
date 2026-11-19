import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

import {
  availabilityLabel,
  collections,
  products,
  searchProducts,
  type Availability,
  type CollectionSlug,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";

type Sort = "curated" | "name-asc" | "name-desc" | "size-desc";

type ShopSearch = {
  q?: string | undefined;
  collection?: CollectionSlug | undefined;
  availability?: Availability | undefined;
  sort?: Sort | undefined;
};

const collectionSlugs = collections.map((c) => c.slug) as string[];
const availabilities: Availability[] = ["on-enquiry", "made-to-order", "pre-order"];
const sorts: { value: Sort; label: string }[] = [
  { value: "curated", label: "Curated" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "size-desc", label: "Largest first" },
];

function sortProducts(list: Product[], sort: Sort | undefined): Product[] {
  const height = (p: Product) => {
    const m = p.size?.match(/(\d+(?:\.\d+)?)/);
    return m ? Number(m[1]) : -1;
  };
  const copy = [...list];
  if (sort === "name-asc") copy.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") copy.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "size-desc") copy.sort((a, b) => height(b) - height(a));
  return copy;
}

export const Route = createFileRoute("/shop/")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => {
    const out: ShopSearch = {};
    const q = s["q"];
    if (typeof q === "string" && q.trim()) out.q = q.slice(0, 80);
    const c = s["collection"];
    if (typeof c === "string" && collectionSlugs.includes(c)) out.collection = c as CollectionSlug;
    const a = s["availability"];
    if (typeof a === "string" && (availabilities as string[]).includes(a)) out.availability = a as Availability;
    const so = s["sort"];
    if (typeof so === "string" && sorts.some((x) => x.value === so)) out.sort = so as Sort;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Shop Authentic Dhokra Art & Handmade Brass Décor — the rootSS" },
      {
        name: "description",
        content:
          "Browse handmade Dhokra brass deities, folk figures, animal sculptures, lighting, tableware and jewellery. Every piece one of a kind; prices on enquiry.",
      },
      { property: "og:title", content: "Shop the collection — the rootSS" },
      { property: "og:description", content: "Authentic Dhokra brass, hand-cast by artisan families of Bengal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const chipCls = (active: boolean) =>
  `eyebrow whitespace-nowrap border px-4 py-2.5 transition-colors ${
    active ? "border-forest bg-forest text-forest-foreground" : "border-border hover:border-foreground"
  }`;

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  let list = products;
  if (search.collection) list = list.filter((p) => p.collection === search.collection);
  if (search.availability) list = list.filter((p) => p.availability === search.availability);
  list = sortProducts(searchProducts(list, search.q ?? ""), search.sort);

  return (
    <>
      <PageHero
        kicker="Shop · The Heritage Collection"
        title={
          <>
            Every piece, <em>one of a kind</em>
          </>
        }
        intro="Authentic Dhokra metal craft, hand-cast in brass, bronze and bell metal. Prices are shared personally on enquiry — add pieces to your shortlist and send them to us in one message."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="sticky top-[4.6rem] z-20 -mx-6 border-y border-border bg-background/95 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10 lg:top-[8.1rem]">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <Link to="/shop" search={{ ...search, collection: undefined }} className={chipCls(!search.collection)}>
                All
              </Link>
              {collections.map((c) => (
                <Link key={c.slug} to="/shop" search={{ ...search, collection: c.slug }} className={chipCls(search.collection === c.slug)}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = new FormData(e.currentTarget).get("q");
                  void navigate({ to: ".", search: (prev) => ({ ...prev, q: typeof v === "string" && v.trim() ? v.trim() : undefined }) });
                }}
                className="flex items-center gap-2 border-b border-foreground/30"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  key={search.q ?? ""}
                  name="q"
                  defaultValue={search.q ?? ""}
                  placeholder="Search name or code"
                  aria-label="Search pieces"
                  className="w-44 bg-transparent py-2 text-sm focus:outline-hidden"
                />
              </form>
              <select
                aria-label="Availability"
                value={search.availability ?? ""}
                onChange={(e) =>
                  void navigate({
                    to: ".",
                    search: (prev) => ({ ...prev, availability: (e.target.value || undefined) as Availability | undefined }),
                  })
                }
                className="border-b border-foreground/30 bg-transparent py-2 text-sm"
              >
                <option value="">All availability</option>
                {availabilities.map((a) => (
                  <option key={a} value={a}>
                    {availabilityLabel[a]}
                  </option>
                ))}
              </select>
              <select
                aria-label="Sort"
                value={search.sort ?? "curated"}
                onChange={(e) =>
                  void navigate({
                    to: ".",
                    search: (prev) => ({ ...prev, sort: e.target.value === "curated" ? undefined : (e.target.value as Sort) }),
                  })
                }
                className="border-b border-foreground/30 bg-transparent py-2 text-sm"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="eyebrow mt-8 text-muted-foreground">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
          {search.q ? ` matching “${search.q}”` : ""}
        </p>

        {list.length === 0 ? (
          <div className="mt-10 border border-border bg-paper p-12 text-center">
            <p className="font-display text-3xl">No pieces match that search.</p>
            <p className="mt-3 text-muted-foreground">Try another name or product code, or ask us — more designs are available than are shown here.</p>
            <Link to="/shop" className="eyebrow mt-6 inline-block bg-forest px-6 py-4 text-forest-foreground">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
