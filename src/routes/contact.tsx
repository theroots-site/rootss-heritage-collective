import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/site/PageIntro";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getProduct } from "@/lib/catalog";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { piece?: string } =>
    typeof search.piece === "string" ? { piece: search.piece } : {},
  head: () => ({
    meta: [
      { title: "Contact Rootss — Enquiries, Orders & Collaborations" },
      { name: "description", content: "Get in touch with Rootss about a piece, an order, gifting, or artisan collaborations." },
      { property: "og:title", content: "Contact Rootss" },
      { property: "og:description", content: "Questions about a piece, orders or collaborations — we'd love to hear from you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { piece } = Route.useSearch();
  const product = piece ? getProduct(piece) : undefined;

  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Let's <em>talk</em>.</>}>
        Questions about a piece, an order, gifting or working with our artisans — write to us and we'll reply personally.
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 md:px-10 lg:grid-cols-12">
        <aside className="space-y-10 lg:col-span-4">
          <div>
            <p className="eyebrow text-muted-foreground">Write to us</p>
            <p className="mt-2 font-display text-2xl">hello@rootss.in</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Studio hours</p>
            <p className="mt-2">Monday – Saturday, 10am – 6pm IST</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Gifting & corporate</p>
            <p className="mt-2 text-muted-foreground">Curated hampers and bulk orders for weddings, festivals and companies.</p>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <EnquiryForm
            key={piece ?? "general"}
            topics={["A specific piece", "An existing order", "Gifting & corporate", "Artisan collaboration", "Something else"]}
            defaultTopic={product ? "A specific piece" : undefined}
            defaultMessage={product ? `I'd like to purchase "${product.name}".` : ""}
          />
        </div>
      </section>
    </>
  );
}
