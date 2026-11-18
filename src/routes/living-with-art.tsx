import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { getProduct, rooms, type Product } from "@/lib/catalog";
import { photo } from "@/lib/images";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/living-with-art")({
  head: () => ({
    meta: [
      { title: "Living with Art — Styling Indian Heritage Décor, Room by Room | the rootSS" },
      {
        name: "description",
        content:
          "A room-by-room styling guide to Dhokra brass and handmade Indian décor, for interior designers, architects and considered homes in India and abroad.",
      },
      { property: "og:title", content: "Living with Art — the rootSS styling guide" },
      { property: "og:description", content: "Entrance, living room, sacred space, dining, study and contemporary homes abroad." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LivingPage,
});

const principles = [
  { title: "One anchor", text: "Let one statement piece set the tone of a room, with space around it to breathe." },
  { title: "Texture over colour", text: "Brass beside linen, jute, lime plaster and dark wood — craft looks richest against natural surfaces." },
  { title: "Odd numbers", text: "Group smaller figures in threes or fives, at varying heights, so they feel collected rather than arranged." },
  { title: "Warm, low light", text: "Side light and flame bring out the hand-laid wirework that overhead light flattens." },
];

function LivingPage() {
  return (
    <>
      <PageHero
        kicker="Living with Art · The styling guide"
        title={
          <>
            Heritage, <em>lived with</em> — room by room
          </>
        }
        intro="These works are meant to be lived with rather than observed from a distance. A guide for interior designers, architects and anyone shaping a home with character."
        image={rooms[1]?.image ?? photo("palanquin-living")}
        imageAlt="A living room styled with Dhokra brass"
      />

      <nav aria-label="Rooms" className="sticky top-[4.6rem] z-20 border-b border-border bg-background/95 backdrop-blur-md lg:top-[8.1rem]">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-4 md:px-10">
          {rooms.map((r) => (
            <li key={r.slug}>
              <a href={`#${r.slug}`} className="eyebrow whitespace-nowrap text-muted-foreground hover:text-rust">
                {r.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#wear" className="eyebrow whitespace-nowrap text-muted-foreground hover:text-rust">Wearing heritage</a>
          </li>
        </ul>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <SectionHeading kicker="Four principles" title="How to style handmade pieces" />
        <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title} className="bg-background p-8">
              <p className="font-display text-4xl text-brass">0{i + 1}</p>
              <h3 className="mt-5 text-2xl">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {rooms.map((r, i) => {
        const pieces = r.pieces.map(getProduct).filter((p): p is Product => Boolean(p));
        return (
          <section key={r.slug} id={r.slug} className={`scroll-mt-40 border-t border-border ${i % 2 ? "bg-paper" : ""}`}>
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={r.image} alt={`${r.name} styled with Dhokra brass`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="lg:col-span-5">
                  <p className="eyebrow text-rust">
                    0{i + 1} · {r.kicker}
                  </p>
                  <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{r.name}</h2>
                  <p className="mt-5 text-lg text-muted-foreground">{r.intro}</p>
                  <ul className="mt-6 space-y-3">
                    {r.tips.map((t) => (
                      <li key={t} className="border-l-2 border-brass pl-4">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="eyebrow mt-14 text-muted-foreground">Pieces for this space</p>
              <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {pieces.slice(0, 4).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="wear" className="scroll-mt-40 border-t border-border bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
          <img src={photo("chakra-necklace")} alt="Chakra Dhokra necklace with coral-red accents" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <div>
            <p className="eyebrow text-brass">Wearing heritage</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Jewellery, cast by the same hands</h2>
            <p className="mt-5 text-lg opacity-80">
              Necklaces, pendants, earrings, bangles and hair sticks, hand-cast by the same lost-wax method as our
              sculpture. Wear them with handloom, linen or denim.
            </p>
            <Link to="/collections/$slug" params={{ slug: "jewellery" }} className="eyebrow mt-8 inline-flex items-center gap-3 bg-forest-foreground px-7 py-4 text-forest">
              The jewellery collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="eyebrow dot-rule justify-center text-rust">For designers & architects</p>
        <h2 className="mt-5 text-4xl leading-tight md:text-5xl">Styling a project?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We work with interior designers, architects, hospitality and export buyers on curated selections, custom sizes
          and bulk orders.
        </p>
        <Link to="/trade" className="eyebrow mt-8 inline-flex items-center gap-3 bg-forest px-7 py-4 text-forest-foreground">
          Trade & export <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
