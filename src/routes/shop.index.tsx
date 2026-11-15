import { createFileRoute, Link } from "@tanstack/react-router";

import { crafts, products, type CraftSlug } from "@/lib/catalog";
import { PageIntro } from "@/components/site/PageIntro";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): { craft?: CraftSlug } => {
    const c = search["craft"];
    return crafts.some((x) => x.slug === c) ? { craft: c as CraftSlug } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop Handcrafted Indian Art & Décor — Rootss" },
      {
        name: "description",
        content: "Shop Dokra sculptures, terracotta, Gond and Warli art, carved artefacts and handcrafted jewellery.",
      },
      { property: "og:title", content: "Shop the Rootss Collection" },
      {
        property: "og:description",
        content: "Authentic, artisan-made pieces from across India — in small batches, never mass produced.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { craft } = Route.useSearch();
  const list = craft ? products.filter((p) => p.craft === craft) : products;
  const active = crafts.find((c) => c.slug === craft);

  const chip = "eyebrow border px-4 py-2.5 transition-colors";
  const on = "border-foreground bg-foreground text-background";
  const off = "border-border text-muted-foreground hover:border-foreground hover:text-foreground";

  return (
    <>
      <PageIntro eyebrow="The Collection" title={active ? active.name : <>Pieces with a <em>past</em>.</>}>
        {active ? active.blurb : "Small-batch, artisan-made objects from across India. Each one comes with its story."}
      </PageIntro>

      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <div className="flex flex-wrap gap-3 border-y border-border py-6">
          <Link to="/shop" className={`${chip} ${!craft ? on : off}`}>
            All
          </Link>
          {crafts.map((c) => (
            <Link key={c.slug} to="/shop" search={{ craft: c.slug }} className={`${chip} ${craft === c.slug ? on : off}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
