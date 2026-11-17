import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { collections, exclusiveFinishNote, getCollection, getCollectionProducts, handmadeNotice } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Collection not found — the rootSS" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.collection;
    return {
      meta: [
        { title: `${c.name} — Handmade Dhokra Brass | the rootSS` },
        { name: "description", content: `${c.kicker}. ${c.description}` },
        { property: "og:title", content: `${c.name} — the rootSS` },
        { property: "og:description", content: c.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">Collection not found</h1>
      <Link to="/shop" className="eyebrow mt-8 inline-block bg-forest px-6 py-4 text-forest-foreground">Browse all pieces</Link>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">This collection didn't load</h1>
      <p className="mt-3 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
    </div>
  ),
});

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const list = getCollectionProducts(collection.slug);
  const others = collections.filter((c) => c.slug !== collection.slug);
  return (
    <>
      <PageHero
        kicker={`The Heritage Collection · ${collection.kicker}`}
        title={collection.name}
        intro={collection.description}
        image={collection.banner}
        imageAlt={`${collection.name} Dhokra collection`}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
          <p className="eyebrow text-muted-foreground">
            {list.length} {list.length === 1 ? "piece" : "pieces"} · Handmade in Bengal
          </p>
          <Link to="/shop" search={{ collection: collection.slug }} className="eyebrow link-underline">
            Sort & filter
          </Link>
        </div>
        <p className="mt-6 max-w-3xl font-display text-xl italic text-muted-foreground">
          {collection.slug === "exclusive" ? exclusiveFinishNote : handmadeNotice}
        </p>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <p className="eyebrow text-rust">Continue exploring</p>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {others.map((c) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group inline-flex items-center gap-2 font-display text-2xl hover:text-rust">
                {c.name} <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
