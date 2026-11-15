import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import heroDokra from "@/assets/hero-dokra.jpg";
import artisanHands from "@/assets/artisan-hands.jpg";
import interior from "@/assets/interior-styled.jpg";
import { crafts, posts, products, type CraftSlug } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { JoinCircle } from "@/components/site/JoinCircle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rootss — Handcrafted Indian Heritage, Thoughtfully Curated" },
      {
        name: "description",
        content:
          "Dokra metal art, terracotta, tribal art, sculpture and handcrafted jewellery made by India's artisans. Affordable luxury rooted in heritage.",
      },
      { property: "og:title", content: "Rootss — Handcrafted Indian Heritage" },
      {
        property: "og:description",
        content:
          "Invest in stories, heritage and individuality. Authentic Indian crafts for considered homes and personal style.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marquee = ["Dokra", "Terracotta", "Gond", "Warli", "Bastar Iron", "Stone Carving", "Tribal Jewellery", "Pattachitra"];

function Index() {
  return (
    <>
      <Hero />
      <CraftMarquee />
      <Collections />
      <Featured />
      <ArtisanStory />
      <Spaces />
      <Philosophy />
      <JournalTeaser />
      <JoinCircle />
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 md:pb-28">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="animate-rise lg:col-span-5 lg:pb-10">
          <p className="eyebrow text-primary">Handcrafted in India</p>
          <h1 className="mt-6 text-6xl leading-[0.95] md:text-7xl xl:text-8xl">
            Art that carries
            <br />
            its <em className="text-primary">roots</em> home.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Dokra, terracotta, tribal art and handmade jewellery — each piece shaped by generations of
            artisans, curated for homes and wardrobes with character.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/shop"
              className="eyebrow inline-flex items-center gap-3 bg-primary px-8 py-4 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="eyebrow border-b border-foreground pb-1 transition-colors hover:border-primary hover:text-primary"
            >
              Meet the makers
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="absolute -left-4 -top-4 hidden h-full w-full border border-brass md:block" />
          <img
            src={heroDokra}
            alt="Dokra brass sculpture of a tribal figure leading a horse, on a terracotta plinth"
            width={1536}
            height={1024}
            className="relative aspect-[4/3] w-full object-cover shadow-soft"
          />
          <Link
            to="/shop/$slug"
            params={{ slug: "dokra-rider-and-horse" }}
            className="group absolute -bottom-8 right-6 max-w-[15rem] bg-card p-5 shadow-soft md:right-10"
          >
            <p className="eyebrow text-muted-foreground">Featured craft</p>
            <p className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">
              Dokra — the 4,000-year-old lost-wax art
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CraftMarquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-6">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl italic text-foreground/80">
            {m}
            <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Collections() {
  const feature = crafts[0]!;
  const rest = crafts.slice(1);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-primary">The Collections</p>
          <h2 className="mt-4 max-w-2xl text-5xl leading-tight md:text-6xl">
            Crafts that hold <em>generations</em> of knowing.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Every piece is made by hand, in small batches, by artisan communities whose skills have been
          passed down for centuries.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CraftCard craft={feature} className="md:col-span-2 lg:row-span-2" tall />
        {rest.map((c) => (
          <CraftCard key={c.slug} craft={c} />
        ))}
      </div>
    </section>
  );
}

function CraftCard({
  craft,
  className = "",
  tall = false,
}: {
  craft: { slug: CraftSlug; name: string; origin: string; img: string };
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link to="/shop" search={{ craft: craft.slug }} className={`group relative block overflow-hidden ${className}`}>
      <img
        src={craft.img}
        alt={craft.name}
        loading="lazy"
        className={`img-zoom w-full object-cover ${tall ? "aspect-[4/5] h-full lg:aspect-auto" : "aspect-[4/5]"}`}
      />
      <div className="bg-umber-fade absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-umber-foreground">
        <div>
          <p className="eyebrow opacity-80">{craft.origin}</p>
          <h3 className={`mt-2 ${tall ? "text-4xl md:text-5xl" : "text-2xl"}`}>{craft.name}</h3>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function Featured() {
  const picks = [products[1], products[3], products[5], products[8]].filter((p) => p !== undefined);
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-primary">New arrivals</p>
            <h2 className="mt-4 text-5xl leading-tight">This season's edit</h2>
          </div>
          <Link to="/shop" className="eyebrow hidden border-b border-foreground pb-1 hover:text-primary sm:inline">
            View all pieces
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtisanStory() {
  const pillars = [
    { title: "Made by hand", body: "No moulds, no machines. Each object carries the small irregularities of a human hand." },
    { title: "Fair to the maker", body: "We work directly with artisan clusters to support sustainable, dignified livelihoods." },
    { title: "Rooted in story", body: "Every piece arrives with its origin, its craft and the community that shaped it." },
  ];
  return (
    <section className="bg-umber text-umber-foreground">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img
            src={artisanHands}
            alt="An artisan's hands shaping a Dokra brass figure with wax threads"
            width={1152}
            height={1408}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 border border-brass lg:block" />
        </div>
        <div>
          <p className="eyebrow text-brass">Our Story</p>
          <h2 className="mt-6 text-5xl leading-tight md:text-6xl">
            Behind every piece, a pair of hands — and a <em className="text-brass">lineage</em>.
          </h2>
          <p className="mt-8 text-lg leading-relaxed opacity-80">
            Rootss bridges traditional craftsmanship with contemporary living. We seek out master artisans
            across India and bring their work to people who value authenticity over mass production — so
            these crafts don't just survive, they thrive.
          </p>
          <div className="mt-12 space-y-8">
            {pillars.map((p, i) => (
              <div key={p.title} className="flex gap-6 border-t border-umber-foreground/15 pt-6">
                <span className="font-display text-2xl italic text-brass">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="mt-2 opacity-70">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="eyebrow mt-12 inline-flex items-center gap-3 border-b border-brass pb-1 text-brass">
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <section className="relative">
      <img
        src={interior}
        alt="A living room styled with Dokra sculptures, terracotta vases and a framed Warli painting"
        width={1600}
        height={1008}
        loading="lazy"
        className="h-[80vh] min-h-[520px] w-full object-cover"
      />
      <div className="bg-umber-fade absolute inset-0" />
      <div className="absolute inset-0 mx-auto flex max-w-7xl items-end px-6 pb-16 md:px-10 md:pb-24">
        <div className="max-w-xl text-umber-foreground">
          <p className="eyebrow text-brass">For homes & designers</p>
          <h2 className="mt-4 text-5xl leading-tight md:text-6xl">
            Give your space a <em>soul</em>, not just a style.
          </h2>
          <p className="mt-6 text-lg opacity-85">
            Statement sculptures, artistic accents and culturally rooted décor for home makeovers, interior
            projects and architectural spaces.
          </p>
          <Link
            to="/trade"
            className="eyebrow mt-8 inline-flex items-center gap-3 bg-paper px-8 py-4 text-foreground transition-transform hover:-translate-y-0.5"
          >
            Trade & styling enquiries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center md:py-36">
      <div className="motif-line mx-auto w-24" />
      <p className="mt-10 font-display text-4xl leading-snug md:text-5xl lg:text-6xl">
        Exclusive, never inaccessible. Luxury measured not in price — but in{" "}
        <em className="text-primary">craft, story and soul</em>.
      </p>
      <p className="eyebrow mt-10 text-muted-foreground">The Rootss promise</p>
    </section>
  );
}

function JournalTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
      <div className="flex items-end justify-between gap-6 border-t border-border pt-16">
        <h2 className="text-5xl">From the Journal</h2>
        <Link to="/journal" className="eyebrow border-b border-foreground pb-1 hover:text-primary">
          All stories
        </Link>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
            <div className="overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" className="img-zoom aspect-[3/2] w-full object-cover" />
            </div>
            <p className="eyebrow mt-5 text-primary">{p.category}</p>
            <h3 className="mt-2 text-3xl leading-tight group-hover:text-primary">{p.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.dek}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
