import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/site/PageIntro";
import { posts } from "@/lib/catalog";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Stories of Indian Craft | Rootss" },
      { name: "description", content: "Stories on Indian crafts, artisans, and styling heritage pieces in modern homes." },
      { property: "og:title", content: "The Rootss Journal" },
      { property: "og:description", content: "Craft histories, artisan stories and styling notes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageIntro eyebrow="The Journal" title={<>Stories worth <em>keeping</em>.</>}>
        Craft histories, artisan stories and notes on living with handmade things.
      </PageIntro>
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        {lead && (
          <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group grid gap-10 border-t border-border pt-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden">
              <img src={lead.img} alt={lead.title} className="img-zoom aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <p className="eyebrow text-primary">{lead.category} · {lead.readTime}</p>
              <h2 className="mt-4 text-5xl leading-tight group-hover:text-primary md:text-6xl">{lead.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{lead.dek}</p>
            </div>
          </Link>
        )}
        <div className="mt-20 grid gap-12 md:grid-cols-2">
          {rest.map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="img-zoom aspect-[3/2] w-full object-cover" />
              </div>
              <p className="eyebrow mt-5 text-primary">{p.category} · {p.readTime}</p>
              <h2 className="mt-2 text-4xl leading-tight group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.dek}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
