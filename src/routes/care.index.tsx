import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { careTopics } from "@/lib/care";
import { PageHero } from "@/components/site/PageHero";
import { WhatsAppCta } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/care/")({
  head: () => ({
    meta: [
      { title: "Client Care — Ordering, Shipping, Returns & Care | the rootSS" },
      { name: "description", content: "How to order, shipping and delivery, returns and refunds, cancellation, payment, product care, order tracking and FAQs." },
      { property: "og:title", content: "Client Care — the rootSS" },
      { property: "og:description", content: "Ordering, made simple." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CareIndex,
});

function CareIndex() {
  return (
    <>
      <PageHero
        kicker="Client care"
        title={<>Ordering, <em>made simple</em></>}
        intro="Everything about ordering, delivery and caring for your piece. For anything else, we're a WhatsApp message away."
      >
        <WhatsAppCta message="Hello the rootSS, I have a question about an order." label="Ask on WhatsApp" />
      </PageHero>
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {careTopics.map((t) => (
            <li key={t.slug} className="bg-background">
              <Link to="/care/$topic" params={{ topic: t.slug }} className="group flex h-full min-h-56 flex-col justify-between p-8 hover:bg-paper">
                <div>
                  <h2 className="text-3xl leading-tight group-hover:text-rust">{t.title}</h2>
                  <p className="mt-3 text-muted-foreground">{t.summary}</p>
                </div>
                <ArrowRight className="mt-6 h-5 w-5 text-rust" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
