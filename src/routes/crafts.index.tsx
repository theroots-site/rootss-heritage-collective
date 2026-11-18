import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { dhokraProcess, lines } from "@/lib/catalog";
import { photo } from "@/lib/images";
import { PageHero, SectionHeading } from "@/components/site/PageHero";

export const Route = createFileRoute("/crafts/")({
  head: () => ({
    meta: [
      { title: "The Art of Craft — Dhokra Lost-Wax Casting & Indian Craft Lines | the rootSS" },
      {
        name: "description",
        content:
          "How authentic Dhokra is made: 4,000 years of lost-wax casting in brass, bronze and bell metal. Plus the craft lines coming next from the rootSS.",
      },
      { property: "og:title", content: "The Art of Craft — the rootSS" },
      { property: "og:description", content: "Dhokra lost-wax casting, its history, materials and six-stage process." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CraftsPage,
});

const facts = [
  { title: "Lost-wax casting", text: "One of the world's oldest metal-casting methods. The Dancing Girl of Mohenjo-daro was made this way." },
  { title: "Dhokra Damar metalsmiths", text: "Named after them and still practised in West Bengal, Odisha, Jharkhand and Chhattisgarh." },
  { title: "Fine wire-like detail", text: "Known for its spirals, braids and dotted textures, all laid by hand in wax." },
  { title: "No two pieces the same", text: "The clay mould is broken to release every casting, so each piece is one of a kind." },
];

function CraftsPage() {
  return (
    <>
      <PageHero
        kicker="The Art of Craft"
        title={
          <>
            Dhokra: 4,000 years of metal art, <em>from the Indus Valley</em>
          </>
        }
        intro="Tribal metal art, cast by hand using the lost-wax method in brass, bronze and bell metal, poured into a mould of river clay and beeswax."
        image={photo("artisans-at-work")}
        imageAlt="Artisans at work on Dhokra castings"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <li key={f.title} className="bg-background p-8">
              <h2 className="text-2xl">{f.title}</h2>
              <p className="mt-3 text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="eyebrow text-brass">How it's made</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">Six stages, every one by hand</h2>
          <ol className="mt-14 grid gap-px bg-forest-foreground/15 sm:grid-cols-2 lg:grid-cols-6">
            {dhokraProcess.map((s) => (
              <li key={s.n} className="bg-forest p-6">
                <p className="font-display text-5xl text-brass">{s.n}</p>
                <h3 className="eyebrow mt-6">{s.title}</h3>
                <p className="mt-3 text-sm opacity-75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:items-center">
        <img src={photo("owl-wirework")} alt="Close detail of Dhokra wirework on an owl" loading="lazy" className="aspect-square w-full object-cover" />
        <div>
          <SectionHeading kicker="Materials & knowledge" title="Brass, clay, beeswax — and generations of skill" />
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              Every piece is made of brass, bronze and bell metal. The detail you see — each spiral, braid and dot — is
              first drawn in fine threads of wax, then sealed in clay, fired and cast.
            </p>
            <p>
              It is a slow, skilled craft. One piece can take days or weeks to make, and the knowledge passes from one
              generation of artisans to the next.
            </p>
          </div>
          <Link to="/collections/$slug" params={{ slug: "deities" }} className="eyebrow mt-8 inline-flex items-center gap-3 bg-forest px-7 py-4 text-forest-foreground">
            See the Dhokra collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <SectionHeading
            kicker="Our craft lines"
            title="One house, many traditions"
            intro="the rootSS begins with Dhokra. More of India's regional crafts will join the house, each as its own line."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {lines.map((l) => (
              <Link
                key={l.slug}
                to="/crafts/$line"
                params={{ line: l.slug }}
                className="group flex min-h-80 flex-col justify-between border border-border bg-background p-8 transition-colors hover:border-forest"
              >
                <div>
                  <p className={`eyebrow ${l.status === "live" ? "text-rust" : "text-muted-foreground"}`}>
                    {l.status === "live" ? "Now available" : "Coming soon"}
                  </p>
                  <h3 className="mt-5 text-4xl">{l.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{l.origin}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{l.summary}</p>
                  <span className="eyebrow mt-6 inline-flex items-center gap-2 group-hover:text-rust">
                    {l.status === "live" ? "Explore" : "Register interest"} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
