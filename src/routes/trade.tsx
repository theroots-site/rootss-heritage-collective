import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/lib/images";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { WhatsAppCta } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/trade")({
  head: () => ({
    meta: [
      { title: "Trade, Bulk & Export — Dhokra for Designers, Architects & Retailers | the rootSS" },
      {
        name: "description",
        content:
          "Authentic Dhokra brass for interior designers, architects, hospitality, retailers and export buyers. Custom sizes and finishes, bulk orders from 10 pieces, international shipping.",
      },
      { property: "og:title", content: "Trade, Bulk & Export — the rootSS" },
      { property: "og:description", content: "Curated selections, custom work and bulk orders for projects in India and abroad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TradePage,
});

const audiences = [
  { title: "Interior designers & architects", text: "Curated selections for residences, with custom sizes and finishes for a specific wall, niche or console." },
  { title: "Hospitality & workplaces", text: "Statement pieces for hotel lobbies, restaurants and offices, and gifting for guests and teams." },
  { title: "Retailers & galleries", text: "Bulk orders for stores and concept spaces, from a minimum of 10 pieces." },
  { title: "Export buyers", text: "International shipping, packed with care for the journey. We discuss documentation and timelines with you directly." },
];

const steps = [
  { n: "01", title: "Share your brief", text: "Tell us the space, quantity, timeline and destination." },
  { n: "02", title: "Selection & samples", text: "We propose pieces from the catalogue, plus designs not shown online." },
  { n: "03", title: "Customise", text: "Size, finish and design adjusted to your project, where the craft allows." },
  { n: "04", title: "Make & ship", text: "Hand-cast, quality-checked and packed — dispatch dates confirmed with you." },
];

function TradePage() {
  return (
    <>
      <PageHero
        kicker="Trade · Bulk · Export"
        title={
          <>
            For designers, buyers <em>and the world beyond</em>
          </>
        }
        intro="We work with interior designers, architects, hospitality groups, retailers and export buyers who want authentic, handmade Indian craft for their projects."
        image={photo("durga-darbar")}
        imageAlt="Durga Darbar, a large Dhokra masterpiece"
      >
        <WhatsAppCta tone="light" message="Hello the rootSS, I'm enquiring about a trade / bulk / export order." label="Talk to us on WhatsApp" />
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionHeading kicker="Who we work with" title="Partners in craft" />
        <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <li key={a.title} className="bg-background p-8">
              <h3 className="text-2xl leading-tight">{a.title}</h3>
              <p className="mt-3 text-muted-foreground">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="eyebrow text-brass">How it works</p>
          <ol className="mt-10 grid gap-px bg-forest-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="bg-forest p-8">
                <p className="font-display text-5xl text-brass">{s.n}</p>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 opacity-75">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm opacity-70">
            Bulk orders start at 10 pieces. Prices, lead times and shipping for each project are confirmed personally —
            pre-order, bulk and Exclusive Collection dates are agreed with you before production.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading kicker="Project enquiry" title="Tell us about your project" intro="We reply personally with a selection and next steps." />
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm
            kind="trade"
            fields={["name", "email", "phone", "country", "topic", "quantity", "budget", "message"]}
            topics={["Interior design project", "Architecture / hospitality", "Retail / wholesale", "Export order", "Corporate order"]}
            budgets={["Under ₹50,000", "₹50,000 – ₹2,00,000", "₹2,00,000 – ₹10,00,000", "Above ₹10,00,000"]}
            messageLabel="Project details"
            messagePlaceholder="Space, pieces of interest (product codes help), timeline and delivery destination"
            submitLabel="Send project enquiry"
          />
        </div>
      </section>
    </>
  );
}
