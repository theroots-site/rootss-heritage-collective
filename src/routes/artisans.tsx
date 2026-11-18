import { createFileRoute, Link } from "@tanstack/react-router";

import { photo } from "@/lib/images";
import { PageHero } from "@/components/site/PageHero";

// Verified artisan profiles. Only add a profile once the artisan has approved their name,
// photograph and story; an empty list shows the "being recorded" state.
type Artisan = { name: string; location: string; craft: string; photo: string; story: string; work: string[] };
const artisans: Artisan[] = [];

export const Route = createFileRoute("/artisans")({
  head: () => ({
    meta: [
      { title: "Meet the Artisans — the rootSS" },
      { name: "description", content: "The artisan families of Bengal behind the rootSS Dhokra collection." },
      { property: "og:title", content: "Meet the Artisans — the rootSS" },
      { property: "og:description", content: "The hands behind the heritage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArtisansPage,
});

function ArtisansPage() {
  return (
    <>
      <PageHero
        kicker="Meet the artisans"
        title={
          <>
            The hands behind <em>the heritage</em>
          </>
        }
        intro="Our Dhokra is made by artisan families of Bengal. Each family's story will be shared here in their own words, with their permission."
        image={photo("artisans-at-work")}
        imageAlt="Artisans at work"
      />
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        {artisans.length === 0 ? (
          <div className="grid gap-10 border border-border bg-paper p-10 md:grid-cols-2 md:p-14">
            <div>
              <p className="eyebrow text-rust">Profiles being recorded</p>
              <h2 className="mt-4 text-4xl leading-tight">Their stories, told with care</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We are visiting the families we work with to record their names, villages, specialisations and the
                pieces they make. Profiles will appear here once each artisan has reviewed and approved them.
              </p>
              <p>
                Meanwhile, every piece in our collection carries the work of these hands.{" "}
                <Link to="/shop" className="link-underline text-forest">Browse the collection</Link>.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-16">
            {artisans.map((a) => (
              <article key={a.name} className="grid gap-10 md:grid-cols-2">
                <img src={a.photo} alt={a.name} className="aspect-[4/5] w-full object-cover" />
                <div>
                  <p className="eyebrow text-rust">{a.craft} · {a.location}</p>
                  <h2 className="mt-4 text-5xl">{a.name}</h2>
                  <p className="mt-5 text-lg text-muted-foreground">{a.story}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
