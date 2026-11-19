import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/lib/images";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { WhatsAppCta } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/bespoke")({
  head: () => ({
    meta: [
      { title: "Bespoke & Gifting — Custom Dhokra, Wedding & Corporate Gifts | the rootSS" },
      {
        name: "description",
        content:
          "Custom sizes, finishes and designs in Dhokra brass; wedding, festive, corporate and event gifting; bulk orders from 10 pieces. Gift wrapping on request.",
      },
      { property: "og:title", content: "Bespoke & Gifting — the rootSS" },
      { property: "og:description", content: "Handmade heritage for occasions, companies and celebrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BespokePage,
});

const services = [
  { title: "Custom sizes, finishes & designs", text: "Size, finish and design on request — including the polish on unpolished Exclusive pieces.", img: "durga-sacred-arch" },
  { title: "Wedding & festive gifting", text: "Pieces for weddings, Durga Puja, Diwali and family celebrations. Gift wrapping is available on request.", img: "palanquin" },
  { title: "Corporate & event gifting", text: "Considered gifts for clients, teams and events, from desk pieces to statement sculpture.", img: "ashtray-penstand" },
  { title: "Bulk orders", text: "We accept bulk orders from a minimum of 10 pieces.", img: "musical-ganesha" },
];

function BespokePage() {
  return (
    <>
      <PageHero
        kicker="Bespoke creations & gifting"
        title={
          <>
            Heritage, <em>made for your occasion</em>
          </>
        }
        intro="Custom work and gifting in authentic Dhokra — every detail discussed with you personally."
        image={photo("lakshmi-saraswati")}
        imageAlt="Lakshmi and Saraswati in Dhokra brass"
      >
        <WhatsAppCta tone="light" message="Hello the rootSS, I'd like to discuss a custom / gifting order." label="Discuss on WhatsApp" />
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="grid gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <img src={photo(s.img)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              <div>
                <h2 className="text-3xl leading-tight">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              kicker="Bespoke enquiry"
              title="Tell us what you have in mind"
              intro="Timelines and pricing depend on the piece and quantity; we confirm both with you before anything is made."
            />
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm
              kind="bespoke"
              fields={["name", "email", "phone", "topic", "quantity", "budget", "message"]}
              topics={["Custom size / finish / design", "Wedding gifting", "Festive gifting", "Corporate gifting", "Event gifting", "Bulk order"]}
              budgets={["Under ₹25,000", "₹25,000 – ₹1,00,000", "₹1,00,000 – ₹5,00,000", "Above ₹5,00,000"]}
              messageLabel="Requirement"
              messagePlaceholder="The occasion, pieces of interest, any custom details and when you need them"
              submitLabel="Send bespoke enquiry"
            />
          </div>
        </div>
      </section>
    </>
  );
}
