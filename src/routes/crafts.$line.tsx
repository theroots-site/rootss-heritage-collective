import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { collections, getLine, lines, products } from "@/lib/catalog";
import { photo } from "@/lib/images";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/crafts/$line")({
  loader: ({ params }) => {
    const line = getLine(params.line);
    if (!line) throw notFound();
    return { line };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Craft not found — the rootSS" }, { name: "robots", content: "noindex" }] };
    const l = loaderData.line;
    const title = l.status === "live" ? `${l.name} — ${l.collectionName} | the rootSS` : `${l.name} — Coming soon | the rootSS`;
    return {
      meta: [
        { title },
        { name: "description", content: l.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: l.summary },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LinePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">Craft line not found</h1>
      <Link to="/crafts" className="eyebrow mt-8 inline-block bg-forest px-6 py-4 text-forest-foreground">All craft lines</Link>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">This page didn't load</h1>
      <p className="mt-3 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
    </div>
  ),
});

function LinePage() {
  const { line } = Route.useLoaderData();
  const others = lines.filter((l) => l.slug !== line.slug);

  if (line.status === "coming-soon") {
    return (
      <>
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-rust">the rootSS · Coming soon</p>
              <h1 className="mt-5 text-6xl leading-[1] md:text-8xl">{line.name}</h1>
              <p className="mt-3 font-display text-2xl italic text-muted-foreground">{line.origin}</p>
              <p className="mt-8 max-w-lg text-lg text-muted-foreground">{line.summary}</p>
              <p className="mt-4 max-w-lg text-muted-foreground">
                We are working with artisan communities to build this line with the same care as our Dhokra collection.
                Leave your email and we'll tell you first when it opens.
              </p>
            </div>
            <div className="border border-border bg-paper p-8 md:p-10 lg:col-span-6">
              <p className="eyebrow text-muted-foreground">Register interest</p>
              <div className="mt-6">
                <EnquiryForm
                  kind="line-interest"
                  fields={["name", "email", "country", "message"]}
                  productCodes={[`Line: ${line.name}`]}
                  messageLabel="What would you love to see? (optional)"
                  messagePlaceholder="e.g. large terracotta vessels for a hotel lobby"
                  submitLabel="Notify me"
                  successTitle="You're on the list."
                  successText={`We'll write as soon as ${line.name} opens.`}
                />
              </div>
            </div>
          </div>
        </section>
        <OtherLines others={others} />
      </>
    );
  }

  const lineCollections = collections.filter((c) => c.line === line.slug);
  const featured = products.filter((p) => p.line === line.slug && p.featured).slice(0, 4);
  return (
    <>
      <PageHero
        kicker={`${line.collectionName} · ${line.origin}`}
        title={
          <>
            {line.name}, <em>authentic & hand-cast</em>
          </>
        }
        intro={line.summary}
        image={photo("cover-durga-family")}
        imageAlt="Dhokra Durga family in brass"
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-12">
        <div className="space-y-5 text-lg text-muted-foreground lg:col-span-7">
          {line.story.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <div className="lg:col-span-5">
          <Link to="/crafts" className="eyebrow link-underline inline-flex items-center gap-2">
            The six stages of making <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="eyebrow text-rust">Collections</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {lineCollections.map((c) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group relative block overflow-hidden">
                <img src={c.banner} alt={c.name} loading="lazy" className="img-zoom aspect-[4/5] w-full object-cover" />
                <div className="bg-forest-fade absolute inset-0" />
                <p className="absolute inset-x-0 bottom-0 p-5 font-display text-2xl text-forest-foreground">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <p className="eyebrow text-rust">Featured</p>
        <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <OtherLines others={others} />
    </>
  );
}

function OtherLines({ others }: { others: ReturnType<typeof getLine>[] }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <p className="eyebrow text-muted-foreground">Other lines from the house</p>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {others.map((l) =>
            l ? (
              <Link key={l.slug} to="/crafts/$line" params={{ line: l.slug }} className="font-display text-2xl hover:text-rust">
                {l.name}
                <span className="eyebrow ml-3 text-muted-foreground">{l.status === "live" ? "Available" : "Coming soon"}</span>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
