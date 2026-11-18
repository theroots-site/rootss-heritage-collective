import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { photo } from "@/lib/images";
import { PageHero, SectionHeading } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — the rootSS, a House of Indian Heritage Craft" },
      {
        name: "description",
        content:
          "Why the rootSS exists: to bring authentic Indian craftsmanship into contemporary homes, support artisan families and keep traditional crafts alive.",
      },
      { property: "og:title", content: "Our Story — the rootSS" },
      { property: "og:description", content: "Rooted in heritage. Crafted with heart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { title: "Authenticity", text: "Real craft, made by hand by the communities who carry it — never mass-produced imitation." },
  { title: "Artisan dignity", text: "Bringing artisans' work to new homes so they can earn a dignified living from their skill." },
  { title: "One of a kind", text: "We celebrate the small variations that make every handmade piece unique." },
  { title: "Made for today", text: "Heritage chosen and presented for contemporary homes, in India and around the world." },
];

function About() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title={
          <>
            Rooted in heritage. <em>Crafted with heart.</em>
          </>
        }
        intro="the rootSS brings India's traditional craftsmanship into contemporary homes and lifestyles — as affordable luxury, made by hand."
        image={photo("durga-parivar")}
        imageAlt="Durga Parivar in Dhokra brass"
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading kicker="Our philosophy" title="Objects shaped by time, meant to be lived with" />
        </div>
        <div className="space-y-5 text-lg text-muted-foreground lg:col-span-7">
          <p>
            The works in our collection are not decorative artifacts. They are living expressions of lineage — objects
            shaped by time, meant to be lived with rather than observed from a distance.
          </p>
          <p>
            We believe a home is richer for the stories it holds. A Dhokra Durga cast in a mould that was broken to set
            it free; an owl whose every feather was first a thread of wax — these are pieces of heritage you can live
            beside every day.
          </p>
        </div>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brass">Why the rootSS exists</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Keeping the art alive, <em>one piece at a time</em>.
            </h2>
          </div>
          <div className="space-y-5 text-lg opacity-85">
            <p>Dhokra is a slow, skilled craft. One piece can take days or weeks to make.</p>
            <p>Many master artisans struggle to find buyers, and young people are leaving the craft.</p>
            <p>
              We bring their work to new homes, helping artisans earn a dignified living and giving the next generation a
              reason to carry the art forward. Every purchase supports an artisan family.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 md:grid-cols-2">
        <div className="border border-border p-10">
          <p className="eyebrow text-rust">Vision</p>
          <p className="mt-5 font-display text-3xl leading-snug">
            A world where India's living craft traditions are valued, collected and lived with — in homes everywhere.
          </p>
        </div>
        <div className="border border-border p-10">
          <p className="eyebrow text-rust">Mission</p>
          <p className="mt-5 font-display text-3xl leading-snug">
            To make authentic, handmade Indian craft accessible as affordable luxury, while supporting the artisan
            families who make it.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <SectionHeading kicker="Our values" title="What we hold to" />
          <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="bg-paper p-8">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-3 text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:items-center">
        <img src={photo("artisans-at-work")} alt="Artisans in a Dhokra workshop" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div>
          <SectionHeading
            kicker="A house of many crafts"
            title="Beginning with Dhokra"
            intro="Our first line, The Heritage Collection, is authentic Dhokra metal craft sourced from the artisans of Bengal. Terracotta, tribal art and sculpture will follow."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/crafts" className="eyebrow inline-flex items-center gap-3 bg-forest px-7 py-4 text-forest-foreground">
              The art of craft <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="eyebrow inline-flex items-center gap-3 border border-foreground px-7 py-4">
              Shop the collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
