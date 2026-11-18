import { createFileRoute, Link } from "@tanstack/react-router";

import { exclusiveFinishNote, getCollection, getCollectionProducts } from "@/lib/catalog";
import { productMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/site/PageHero";
import { ShortlistButton } from "@/components/site/ShortlistButton";
import { WhatsAppCta } from "@/components/site/WhatsApp";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/exclusive")({
  head: () => ({
    meta: [
      { title: "The Exclusive Collection — Pre-order Heirloom Dhokra | the rootSS" },
      {
        name: "description",
        content:
          "Surya Chala Durga, Durga Darbar, Aagomoni and Shingra Utsav: statement Dhokra pieces handcrafted in limited numbers, available by pre-order.",
      },
      { property: "og:title", content: "The Exclusive Collection — the rootSS" },
      { property: "og:description", content: "Heirloom Dhokra masterpieces, handcrafted in limited numbers. Pre-order only." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExclusivePage,
});

function ExclusivePage() {
  const collection = getCollection("exclusive");
  const pieces = getCollectionProducts("exclusive");
  return (
    <>
      <PageHero
        kicker="The Exclusive Collection · Pre-order only"
        title={
          <>
            Statement pieces, <em>cast by hand</em>
          </>
        }
        intro="An heirloom of divine grace, painstakingly handcrafted in limited numbers. Pre-order a timeless symbol of protection and heritage, cherished for generations."
        {...(collection ? { image: collection.banner } : {})}
        imageAlt="Exclusive Collection Dhokra masterpiece"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 border border-border bg-paper p-8 md:grid-cols-3 md:p-10">
          <div>
            <p className="eyebrow text-rust">How pre-order works</p>
          </div>
          <ol className="grid gap-6 text-muted-foreground sm:grid-cols-3 md:col-span-2">
            <li><span className="font-display block text-3xl text-forest">01</span>Choose a piece and send us its code on WhatsApp or through the form.</li>
            <li><span className="font-display block text-3xl text-forest">02</span>We confirm price, finish and the making and dispatch date with you.</li>
            <li><span className="font-display block text-3xl text-forest">03</span>Your piece is cast by hand, quality-checked and packed for the journey.</li>
          </ol>
          <p className="border-t border-border pt-6 text-sm italic text-muted-foreground md:col-span-3">
            A note on finish — {exclusiveFinishNote}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-28 px-6 pb-24 md:px-10">
        {pieces.map((p, i) => (
          <article key={p.slug} className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Link
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className={`group block overflow-hidden lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}
            >
              <img src={p.images[0]} alt={`${p.name}, Exclusive Collection Dhokra brass`} loading={i === 0 ? "eager" : "lazy"} className="img-zoom aspect-[4/3] w-full object-cover" />
            </Link>
            <div className="lg:col-span-5">
              <p className="eyebrow text-rust">Pre-order · {p.code}</p>
              <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{p.name}</h2>
              <p className="mt-5 text-lg text-muted-foreground">{p.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
                <div><dt className="eyebrow text-muted-foreground">Size (H × W)</dt><dd className="mt-1">{p.size ?? "Confirmed on enquiry"}</dd></div>
                <div><dt className="eyebrow text-muted-foreground">Material</dt><dd className="mt-1">{p.material}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppCta message={productMessage({ name: p.name, code: p.code }, "pre-order")} label="Pre-order on WhatsApp" />
                <ShortlistButton slug={p.slug} name={p.name} variant="full" />
              </div>
              <Link to="/shop/$slug" params={{ slug: p.slug }} className="eyebrow link-underline mt-6 inline-block">
                View piece details
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-border bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brass">Reserve yours</p>
            <h2 className="mt-4 text-4xl leading-tight">Pre-order request</h2>
            <p className="mt-4 opacity-80">Tell us which piece you'd like and where it will be delivered. We'll reply personally.</p>
          </div>
          <div className="rounded-none bg-background p-8 text-foreground lg:col-span-7">
            <EnquiryForm
              kind="preorder"
              fields={["name", "email", "phone", "country", "topic", "message"]}
              topics={pieces.map((p) => `${p.name} (${p.code})`)}
              messageLabel="Finish, delivery or other notes"
              messagePlaceholder="e.g. polished finish, delivery to Singapore by October"
              submitLabel="Request pre-order"
            />
          </div>
        </div>
      </section>
    </>
  );
}
