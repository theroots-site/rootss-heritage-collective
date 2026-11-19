import { createFileRoute, Link } from "@tanstack/react-router";

import { journalCategories, posts, type JournalCategory } from "@/lib/catalog";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/journal/")({
  validateSearch: (s: Record<string, unknown>): { category?: JournalCategory } => {
    const c = s["category"];
    return typeof c === "string" && (journalCategories as string[]).includes(c) ? { category: c as JournalCategory } : {};
  },
  head: () => ({
    meta: [
      { title: "Journal — Craft Stories, Heritage & Living with Art | the rootSS" },
      { name: "description", content: "Stories of Dhokra craft, Indian heritage and culture, and living with handmade art." },
      { property: "og:title", content: "The rootSS Journal" },
      { property: "og:description", content: "Notes on craft, culture and living." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const { category } = Route.useSearch();
  const list = category ? posts.filter((p) => p.category === category) : posts;
  const [lead, ...rest] = list;
  return (
    <>
      <PageHero kicker="The Journal" title={<>Notes on craft, <em>culture and living</em></>} />
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-y border-border py-4">
          <Link to="/journal" search={{}} className={`eyebrow whitespace-nowrap px-4 py-2.5 ${!category ? "bg-forest text-forest-foreground" : "hover:text-rust"}`}>
            All
          </Link>
          {journalCategories.map((c) => (
            <Link key={c} to="/journal" search={{ category: c }} className={`eyebrow whitespace-nowrap px-4 py-2.5 ${category === c ? "bg-forest text-forest-foreground" : "hover:text-rust"}`}>
              {c}
            </Link>
          ))}
        </div>
        {!lead ? (
          <div className="mt-12 border border-border bg-paper p-12 text-center">
            <p className="font-display text-3xl">Stories in this section are on their way.</p>
            <p className="mt-3 text-muted-foreground">
              {category === "Artisan Stories" ? "Artisan stories will be published once each family has approved their profile." : "Check back soon."}
            </p>
          </div>
        ) : (
          <>
            <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="overflow-hidden lg:col-span-7">
                <img src={lead.img} alt="" className="img-zoom aspect-[3/2] w-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <p className="eyebrow text-rust">{lead.category} · {lead.readTime}</p>
                <h2 className="mt-4 text-5xl leading-[1.05] group-hover:text-rust">{lead.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{lead.dek}</p>
              </div>
            </Link>
            <div className="mt-20 grid gap-12 md:grid-cols-3">
              {rest.map((p) => (
                <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="overflow-hidden">
                    <img src={p.img} alt="" loading="lazy" className="img-zoom aspect-[3/2] w-full object-cover" />
                  </div>
                  <p className="eyebrow mt-5 text-rust">{p.category} · {p.readTime}</p>
                  <h3 className="mt-2 text-3xl leading-tight group-hover:text-rust">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.dek}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
