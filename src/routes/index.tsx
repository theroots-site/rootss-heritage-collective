import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { collections, dhokraProcess, posts, products, rooms, exclusiveFinishNote } from "@/lib/catalog";
import { photo } from "@/lib/images";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";
import { WhatsAppCta } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "the rootSS — Authentic Dhokra & Indian Heritage Décor, Handmade" },
      {
        name: "description",
        content:
          "Rooted in heritage. Crafted with heart. Authentic Dhokra brass sculpture, deities, lighting and jewellery, hand-cast by artisan families of Bengal.",
      },
      { property: "og:title", content: "the rootSS — Rooted in heritage. Crafted with heart." },
      {
        property: "og:description",
        content: "Authentic handmade Dhokra metal craft for contemporary homes in India and around the world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Collections />
      <Featured />
      <ArtOfMaking />
      <Hands />
      <LivingWithArt />
      <Exclusive />
      <Bespoke />
      <Purpose />
      <Journal />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <img
        src={photo("cover-durga-family")}
        alt="Dhokra brass Durga with her divine family beneath sunburst arches, lit by candles"
        className="animate-slow-zoom absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="bg-hero-fade absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[calc(100svh-9rem)] max-w-7xl flex-col justify-end px-6 pb-16 pt-24 md:px-10 md:pb-24">
        <p className="eyebrow animate-rise text-brass">The Heritage Collection · Authentic Dhokra</p>
        <h1 className="animate-rise mt-6 max-w-3xl text-6xl leading-[0.98] md:text-8xl">
          Rooted in heritage.
          <br />
          <em className="text-brass">Crafted with heart.</em>
        </h1>
        <p className="animate-rise mt-8 max-w-lg text-lg opacity-85">
          India's living craft traditions, made for the way we live today — beginning with Dhokra, hand-cast in brass
          by artisan families of Bengal.
        </p>
        <div className="animate-rise mt-10 flex flex-wrap gap-4">
          <Link to="/shop" className="eyebrow inline-flex items-center gap-3 bg-forest-foreground px-8 py-4 text-forest transition-colors hover:bg-paper">
            Explore Collections <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="eyebrow inline-flex items-center gap-3 border border-forest-foreground/60 px-8 py-4 transition-colors hover:bg-forest-foreground/10">
            Discover Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-6">
        <SectionHeading
          kicker="the rootSS"
          title={
            <>
              The beauty of heritage, <em>made for today</em>
            </>
          }
        />
        <div className="mt-8 space-y-5 text-lg text-muted-foreground">
          <p>
            The works in our collection are not decorative artifacts. They are living expressions of lineage — objects
            shaped by time, meant to be lived with rather than observed from a distance.
          </p>
          <p>
            the rootSS is a house for India's traditional crafts. We work with artisan families to bring authentic,
            handmade pieces into contemporary homes — in India and around the world — with no two pieces ever the same.
          </p>
        </div>
        <Link to="/about" className="eyebrow link-underline mt-10 inline-flex items-center gap-2 text-forest">
          Read our story <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative lg:col-span-6">
        <img
          src={photo("palanquin-living")}
          alt="The Palanquin Bearers in Dhokra brass on a living-room table"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <p className="eyebrow mt-4 text-muted-foreground">The Palanquin Bearers · DKR-DU-002</p>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section className="border-t border-border bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Shop by collection" title="Seven ways into the craft" />
          <Link to="/shop" className="eyebrow link-underline inline-flex items-center gap-2">
            View all pieces <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className={`group relative block overflow-hidden bg-muted ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <img
                src={c.banner}
                alt={`${c.name} — Dhokra collection`}
                loading="lazy"
                className={`img-zoom w-full object-cover ${i === 0 ? "aspect-[4/5] lg:h-full lg:aspect-auto" : "aspect-[4/5]"}`}
              />
              <div className="bg-forest-fade absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-forest-foreground">
                <p className="eyebrow text-brass">{c.slug === "exclusive" ? "Pre-order" : `0${i + 1}`}</p>
                <h3 className={`mt-2 leading-tight ${i === 0 ? "text-4xl" : "text-2xl"}`}>{c.name}</h3>
                <p className="mt-1 text-sm opacity-80">{c.kicker}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const featured = products.filter((p) => p.featured && p.collection !== "exclusive").slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <SectionHeading
        kicker="Featured creations"
        title="Pieces that hold a story"
        intro="Each one cast once, in a mould that is broken to set it free."
      />
      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

function ArtOfMaking() {
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-brass">The art of making</p>
          <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">
            Four thousand years of lost-wax casting, <em>by hand</em>.
          </h2>
          <p className="mt-6 text-lg opacity-80">
            Dhokra is one of the world's oldest metal-casting methods — the Dancing Girl of Mohenjo-daro was made this
            way. Each piece is brass, bronze and bell metal, poured into a mould of river clay and beeswax.
          </p>
          <img src={photo("artisans-at-work")} alt="Artisans finishing Dhokra castings in their workshop" loading="lazy" className="mt-10 aspect-[4/3] w-full object-cover" />
        </div>
        <ol className="grid gap-px self-start bg-forest-foreground/15 sm:grid-cols-2 lg:col-span-7">
          {dhokraProcess.map((s) => (
            <li key={s.n} className="bg-forest p-8">
              <p className="font-display text-5xl text-brass">{s.n}</p>
              <h3 className="eyebrow mt-6">{s.title}</h3>
              <p className="mt-3 opacity-75">{s.text}</p>
            </li>
          ))}
          <li className="bg-forest p-8 sm:col-span-2">
            <Link to="/crafts" className="eyebrow link-underline inline-flex items-center gap-2 text-brass">
              Explore the art of craft <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Hands() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-12 border border-border p-8 md:p-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading kicker="Meet the hands behind the heritage" title="Every piece begins with a family of makers" />
          <p className="mt-6 text-lg text-muted-foreground">
            Dhokra is a slow, skilled craft; one piece can take days or weeks to make. We are recording the stories of
            the artisan families we work with, and will share each profile only with their permission.
          </p>
          <Link to="/artisans" className="eyebrow link-underline mt-8 inline-flex items-center gap-2">
            About our artisans <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["Artisan profile", "Artisan profile", "Artisan profile"].map((t, i) => (
            <div key={i} className="flex aspect-[3/4] flex-col items-center justify-center border border-dashed border-foreground/25 bg-paper p-4 text-center">
              <p className="font-display text-lg italic text-muted-foreground">{t}</p>
              <p className="eyebrow mt-2 text-[0.55rem] text-muted-foreground">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LivingWithArt() {
  const picks = rooms.slice(0, 3);
  return (
    <section className="border-t border-border bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Living with art"
            title={
              <>
                How to <em>live</em> with heritage
              </>
            }
            intro="Room by room, how hand-cast pieces bring character to entrances, living spaces and sacred corners."
          />
          <Link to="/living-with-art" className="eyebrow link-underline inline-flex items-center gap-2">
            The styling guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {picks.map((r) => (
            <Link key={r.slug} to="/living-with-art" hash={r.slug} className="group block">
              <div className="overflow-hidden">
                <img src={r.image} alt={`${r.name} styled with Dhokra pieces`} loading="lazy" className="img-zoom aspect-[4/5] w-full object-cover" />
              </div>
              <p className="eyebrow mt-4 text-rust">{r.kicker}</p>
              <h3 className="mt-1 text-3xl">{r.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exclusive() {
  const pieces = products.filter((p) => p.collection === "exclusive");
  return (
    <section className="bg-forest-deep text-forest-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brass">The Exclusive Collection · Pre-order only</p>
            <h2 className="mt-4 text-4xl leading-[1.05] md:text-6xl">
              An heirloom of divine grace, <em>handcrafted in limited numbers</em>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="opacity-80">{exclusiveFinishNote}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/exclusive" className="eyebrow inline-flex items-center gap-3 bg-forest-foreground px-7 py-4 text-forest">
                View the collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pieces.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden">
                <img src={p.images[0]} alt={`${p.name}, Exclusive Collection Dhokra`} loading="lazy" className="img-zoom aspect-[4/5] w-full object-cover" />
              </div>
              <p className="eyebrow mt-4 text-brass">{p.code}</p>
              <h3 className="mt-1 text-2xl leading-tight">{p.name}</h3>
              {p.size && <p className="mt-1 text-sm opacity-70">{p.size}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const offers = [
  { title: "Customised options", text: "Size, finish and design on request." },
  { title: "Corporate & event gifting", text: "Festivals, weddings and companies." },
  { title: "Bulk orders", text: "We accept bulk orders, from a minimum of 10 pieces." },
  { title: "Pan-India & international shipping", text: "Packed with care for the journey." },
];

function Bespoke() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            kicker="Bespoke creations & gifting"
            title={
              <>
                Made for an occasion, <em>or for a space</em>
              </>
            }
            intro="For weddings and festivals, corporate gifting, hospitality projects and export buyers."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/bespoke" className="eyebrow inline-flex items-center gap-3 bg-forest px-7 py-4 text-forest-foreground">
              Bespoke & gifting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/trade" className="eyebrow inline-flex items-center gap-3 border border-foreground px-7 py-4">
              Trade & export
            </Link>
          </div>
        </div>
        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-7">
          {offers.map((o) => (
            <li key={o.title} className="bg-background p-8">
              <ArrowUpRight className="h-5 w-5 text-rust" />
              <h3 className="mt-6 text-2xl">{o.title}</h3>
              <p className="mt-2 text-muted-foreground">{o.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section className="border-y border-border bg-sand/50">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <p className="eyebrow dot-rule justify-center text-rust">Our purpose</p>
        <h2 className="mt-6 text-4xl leading-[1.08] md:text-6xl">
          Keeping the art alive, <em>one piece at a time</em>.
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-8 text-left text-muted-foreground md:grid-cols-3">
          <p>Dhokra is a slow, skilled craft. One piece can take days or weeks to make.</p>
          <p>Many master artisans struggle to find buyers, and young people are leaving the craft.</p>
          <p>
            We bring their work to new homes, helping artisans earn a dignified living and giving the next generation a
            reason to carry the art forward.
          </p>
        </div>
        <p className="font-display mt-12 text-2xl italic text-forest">Every purchase supports an artisan family.</p>
        <WhatsAppCta className="mt-10" message="Hello the rootSS, I'd like to know more about your collection." label="Talk to us on WhatsApp" />
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="Journal & stories" title="Notes on craft, culture and living" />
        <Link to="/journal" className="eyebrow link-underline inline-flex items-center gap-2">
          All stories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
            <div className="overflow-hidden">
              <img src={p.img} alt="" loading="lazy" className="img-zoom aspect-[3/2] w-full object-cover" />
            </div>
            <p className="eyebrow mt-5 text-rust">
              {p.category} · {p.readTime}
            </p>
            <h3 className="mt-2 text-3xl leading-tight group-hover:text-rust">{p.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.dek}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
