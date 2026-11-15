import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { formatPrice, getCraft, getProduct, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Piece not found — Rootss" }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} — ${getCraft(p.craft).name} | Rootss`;
    return {
      meta: [
        { title },
        { name: "description", content: p.story },
        { property: "og:title", content: title },
        { property: "og:description", content: p.story },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">This piece has found a home.</h1>
      <p className="mt-4 text-muted-foreground">It may have sold, or the link is incorrect.</p>
      <Link to="/shop" className="eyebrow mt-8 inline-block border-b border-foreground pb-1">
        Back to the collection
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const craft = getCraft(product.craft);
  const related = products.filter((p) => p.craft === product.craft && p.slug !== product.slug).slice(0, 3);
  const more = related.length ? related : products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10">
        <Link to="/shop" search={{ craft: product.craft }} className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> {craft.name}
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="self-start bg-muted">
            <img src={product.img} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="animate-rise lg:pt-10">
            <p className="eyebrow text-primary">{product.region}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">{product.name}</h1>
            <p className="mt-6 text-2xl">{formatPrice(product.price)}</p>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{product.story}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-8">
              <div>
                <dt className="eyebrow text-muted-foreground">Craft</dt>
                <dd className="mt-2">{craft.name}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Material</dt>
                <dd className="mt-2">{product.material}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Dimensions</dt>
                <dd className="mt-2">{product.size}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Made</dt>
                <dd className="mt-2">By hand, one at a time</dd>
              </div>
            </dl>

            <Link
              to="/contact"
              search={{ piece: product.slug }}
              className="eyebrow mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Enquire to purchase <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Handmade pieces vary slightly — that's the mark of the maker. Each arrives with a certificate of origin.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <h2 className="text-4xl">You may also love</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
