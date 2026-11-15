import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import artisanHands from "@/assets/artisan-hands.jpg";
import terracotta from "@/assets/craft-terracotta.jpg";
import { PageIntro } from "@/components/site/PageIntro";
import { crafts } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Rootss, Indian Heritage Crafts" },
      {
        name: "description",
        content: "Why Rootss exists: preserving India's traditional crafts and supporting artisan livelihoods through conscious buying.",
      },
      { property: "og:title", content: "Our Story — Rootss" },
      {
        property: "og:description",
        content: "Bridging traditional craftsmanship with contemporary lifestyles — and the artisans who make it possible.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { title: "Authenticity", body: "Every piece is genuinely handmade by traditional artisans — never machine copies of a craft." },
  { title: "Fair livelihoods", body: "We buy directly from artisan families and clusters, so more of each sale returns to the maker." },
  { title: "Preservation", body: "When a craft has buyers, its next generation keeps learning. Conscious buying keeps traditions alive." },
  { title: "Accessible luxury", body: "Exclusive, artistic pieces priced for people who value meaning — not inflated luxury mark-ups." },
];

function About() {
  return (
    <>
      <PageIntro eyebrow="Our Story" title={<>We are the <em className="text-primary">roots</em> behind the room.</>}>
        Rootss began with a simple belief: India's crafts deserve a place in modern homes — not as souvenirs, but as
        art you live with every day.
      </PageIntro>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:px-10 lg:grid-cols-12">
        <img
          src={artisanHands}
          alt="An artisan shaping a Dokra brass figure"
          width={1152}
          height={1408}
          className="aspect-[4/5] w-full object-cover lg:col-span-7"
        />
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:pt-16">
          <p className="font-display text-3xl leading-snug text-foreground">
            “Our audience doesn't simply buy products. They invest in stories, heritage, individuality — and the future of
            Indian craft.”
          </p>
          <p>
            Across India, artisan communities hold knowledge that has passed from parent to child for generations: how to
            cast brass from wax, how to read river clay, how to tell a forest's story in dots of pigment.
          </p>
          <p>
            Mass production threatens all of it. Rootss exists to connect these makers with a discerning audience —
            collectors, designers, architects and people who simply love beautiful, meaningful things.
          </p>
        </div>
      </section>

      <section className="bg-umber text-umber-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="eyebrow text-brass">What we stand for</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-umber-foreground/20 pt-6">
                <span className="font-display text-2xl italic text-brass">0{i + 1}</span>
                <h2 className="mt-3 text-3xl">{v.title}</h2>
                <p className="mt-3 opacity-70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-primary">The crafts we champion</p>
          <h2 className="mt-4 text-5xl leading-tight">Five traditions, hundreds of hands.</h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {crafts.map((c) => (
              <li key={c.slug}>
                <Link to="/shop" search={{ craft: c.slug }} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-2xl group-hover:text-primary">{c.name}</span>
                  <span className="eyebrow text-muted-foreground">{c.origin}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <img src={terracotta} alt="Handmade Bankura terracotta vessels" loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-28 text-center">
        <div className="motif-line mx-auto w-24" />
        <h2 className="mt-10 text-5xl leading-tight">Bring a story home.</h2>
        <Link
          to="/shop"
          className="eyebrow mt-8 inline-flex items-center gap-3 bg-primary px-8 py-4 text-primary-foreground shadow-soft"
        >
          Explore the collection <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
