import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

import {
  availabilityLabel,
  careSteps,
  exclusiveFinishNote,
  formatPrice,
  getCollection,
  getLine,
  getProduct,
  handmadeNotice,
  products,
} from "@/lib/catalog";
import { site } from "@/lib/site";
import { productMessage } from "@/lib/whatsapp";
import { ProductCard } from "@/components/site/ProductCard";
import { ShortlistButton } from "@/components/site/ShortlistButton";
import { WhatsAppCta } from "@/components/site/WhatsApp";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Piece not found — the rootSS" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const desc = `${p.description.slice(0, 150)}${p.description.length > 150 ? "…" : ""}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      ...(p.code ? { sku: p.code } : {}),
      description: p.description,
      material: p.material,
      brand: { "@type": "Brand", name: "the rootSS" },
      category: getCollection(p.collection)?.name,
    };
    return {
      meta: [
        { title: `${p.name}${p.code ? ` (${p.code})` : ""} — Handmade Dhokra | the rootSS` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — the rootSS` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="eyebrow text-rust">Piece not found</p>
      <h1 className="mt-4 text-5xl">This piece isn't in the collection.</h1>
      <Link to="/shop" className="eyebrow mt-8 inline-block bg-forest px-6 py-4 text-forest-foreground">Browse all pieces</Link>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">This piece didn't load</h1>
      <p className="mt-3 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
    </div>
  ),
});

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Mobile: swipeable strip */}
      <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 md:hidden">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${name}, view ${i + 1}`}
            className="aspect-[4/5] w-[85%] shrink-0 snap-center object-cover"
          />
        ))}
      </div>
      {/* Desktop: main image with thumbnails */}
      <div className="hidden md:block">
        <div className="overflow-hidden bg-muted">
          <img src={images[active] ?? images[0]} alt={`${name}, handmade Dhokra brass`} className="aspect-[4/5] w-full object-cover" />
        </div>
        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-5 gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show view ${i + 1}`}
                className={`overflow-hidden border-2 ${i === active ? "border-forest" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 border-b border-border py-3.5 text-sm">
      <dt className="eyebrow pt-0.5 text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const collection = getCollection(p.collection);
  const line = getLine(p.line);
  const preorder = p.availability === "pre-order";
  const ref = { name: p.name, code: p.code };
  const related = products.filter((x) => x.collection === p.collection && x.slug !== p.slug).slice(0, 4);
  const fill = related.length < 4 ? products.filter((x) => x.featured && x.slug !== p.slug && x.collection !== p.collection).slice(0, 4 - related.length) : [];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 md:pt-12">
        <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex flex-wrap gap-2 text-muted-foreground">
          <Link to="/shop" className="hover:text-rust">Shop</Link>
          <span>/</span>
          {collection && (
            <Link to="/collections/$slug" params={{ slug: collection.slug }} className="hover:text-rust">
              {collection.name}
            </Link>
          )}
        </nav>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Gallery images={p.images} name={p.name} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <p className="eyebrow text-rust">
                {line?.name} · {collection?.name}
              </p>
              <h1 className="mt-4 text-5xl leading-[1.02] md:text-6xl">{p.name}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="font-display text-2xl">{formatPrice(p)}</p>
                <span className="eyebrow border border-border px-3 py-1.5 text-muted-foreground">{availabilityLabel[p.availability]}</span>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.description}</p>

              <dl className="mt-8 border-t border-border">
                <Spec label="Product code" value={p.code ?? "Confirmed on enquiry"} />
                <Spec label="Size (H × W)" value={p.size ?? "Confirmed on enquiry"} />
                <Spec label="Craft" value={p.craft} />
                <Spec label="Material" value={p.material} />
                {p.options && <Spec label="Options" value={p.options} />}
              </dl>
              {p.moreDesigns && (
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">More designs & sizes available.</span> Ask us to see more.
                </p>
              )}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <WhatsAppCta
                  message={productMessage(ref, preorder ? "pre-order" : "order")}
                  label={preorder ? "Pre-order on WhatsApp" : "Order on WhatsApp"}
                  className="sm:col-span-2"
                />
                {!preorder && (
                  <WhatsAppCta message={productMessage(ref, "pre-order")} label="Pre-order" tone="outline" />
                )}
                <ShortlistButton slug={p.slug} name={p.name} variant="full" />
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${p.name}${p.code ? ` (${p.code})` : ""}`)}`}
                  className={`eyebrow inline-flex items-center justify-center gap-3 border border-foreground/30 px-6 py-4 hover:border-foreground ${preorder ? "" : "sm:col-span-2"}`}
                >
                  <Mail className="h-4 w-4" /> Email us
                </a>
              </div>
              <p className="mt-6 border-l-2 border-brass pl-4 text-sm italic text-muted-foreground">
                {preorder ? exclusiveFinishNote : handmadeNotice}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 lg:grid-cols-3">
          <div>
            <p className="eyebrow text-rust">The story behind this creation</p>
            <h2 className="mt-4 text-3xl leading-tight">Cast once, in a mould broken to set it free</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              {line?.story.slice(0, 2).map((t) => <p key={t}>{t}</p>)}
            </div>
            <Link to="/crafts" className="eyebrow link-underline mt-6 inline-block">How Dhokra is made</Link>
          </div>
          <div>
            <p className="eyebrow text-rust">Caring for your piece</p>
            <ul className="mt-5 space-y-3">
              {careSteps.map((c) => (
                <li key={c} className="border-b border-border pb-3">{c}</li>
              ))}
            </ul>
            <Link to="/care/$topic" params={{ topic: "product-care" }} className="eyebrow link-underline mt-6 inline-block">Product care</Link>
          </div>
          <div>
            <p className="eyebrow text-rust">Ordering & shipping</p>
            <div className="mt-5 space-y-3 text-muted-foreground">
              <p>Message us with the product code to order. We confirm price, availability and dispatch date personally.</p>
              <p>Shipped across India with tracking, and internationally on request. In-stock pieces dispatch in 2–3 working days; pre-order and Exclusive dates are confirmed on WhatsApp.</p>
            </div>
            <Link to="/care/$topic" params={{ topic: "shipping" }} className="eyebrow link-underline mt-6 inline-block">Shipping details</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-rust">{preorder ? "Reserve this piece" : "Prefer email?"}</p>
            <h2 className="mt-4 text-4xl leading-tight">
              {preorder ? "Send a pre-order request" : "Send an enquiry about this piece"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              We'll reply with price, availability and delivery details for your city or country.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              kind={preorder ? "preorder" : "product"}
              fields={["name", "email", "phone", "country", "message"]}
              productCodes={[p.code ? `${p.name} (${p.code})` : p.name]}
              defaultMessage={`I'm interested in ${p.name}${p.code ? ` (${p.code})` : ""}.`}
              submitLabel={preorder ? "Request pre-order" : "Send enquiry"}
            />
          </div>
        </div>
      </section>

      {related.length + fill.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <p className="eyebrow text-rust">You may also love</p>
            <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {[...related, ...fill].map((x) => (
                <ProductCard key={x.slug} product={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
