import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

import { getProduct } from "@/lib/catalog";
import { site } from "@/lib/site";
import { waLink, generalMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { piece?: string } => {
    const piece = s["piece"];
    return typeof piece === "string" && piece ? { piece } : {};
  },
  head: () => ({
    meta: [
      { title: "Contact — the rootSS" },
      { name: "description", content: `Orders, enquiries and custom requests. WhatsApp ${site.phoneDisplay} or email ${site.email}.` },
      { property: "og:title", content: "Contact the rootSS" },
      { property: "og:description", content: "For orders, enquiries and custom requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

const topics = ["Order a piece", "Pre-order", "Custom request", "Bulk / corporate", "Trade / export", "Shipping & delivery", "Something else"];

function ContactPage() {
  const { piece } = Route.useSearch();
  const product = piece ? getProduct(piece) : undefined;
  return (
    <>
      <PageHero
        kicker="Connect with us"
        title={
          <>
            For orders, enquiries <em>and custom requests</em>
          </>
        }
        intro="Call or message us on WhatsApp with the product code to place your order, or write to us below."
      />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 md:px-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <a href={waLink(generalMessage("your collection"))} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 border border-border p-6 transition-colors hover:border-forest">
            <MessageCircle className="mt-1 h-5 w-5 text-whatsapp" />
            <span>
              <span className="eyebrow block text-muted-foreground">Call / WhatsApp</span>
              <span className="mt-1 block font-display text-2xl group-hover:text-rust">{site.phoneDisplay}</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="group flex items-start gap-4 border border-border p-6 transition-colors hover:border-forest">
            <Mail className="mt-1 h-5 w-5 text-rust" />
            <span>
              <span className="eyebrow block text-muted-foreground">Email</span>
              <span className="mt-1 block font-display text-2xl group-hover:text-rust">{site.email}</span>
            </span>
          </a>
          <div className="border border-border bg-paper p-6 text-sm text-muted-foreground">
            <p className="eyebrow text-foreground">We also offer</p>
            <ul className="mt-3 space-y-2">
              <li>Customised size, finish and design</li>
              <li>Corporate & event gifting</li>
              <li>Pan-India & international shipping</li>
              <li>Bulk orders (min 10 qty)</li>
              <li>Gift wrapping on request</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm
            kind="contact"
            fields={["name", "email", "phone", "topic", "message"]}
            topics={topics}
            {...(product ? { defaultTopic: "Order a piece", defaultMessage: `I'd like to order "${product.name}"${product.code ? ` (${product.code})` : ""}.`, productCodes: [product.code ?? product.name] } : {})}
          />
        </div>
      </section>
    </>
  );
}
