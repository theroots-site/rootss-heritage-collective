import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

import { getCollection, getProduct, type Product } from "@/lib/catalog";
import { site } from "@/lib/site";
import { useShortlist } from "@/lib/shortlist";
import { shortlistMessage, waLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: "Your Shortlist — the rootSS" },
      { name: "description", content: "Send the pieces you love to the rootSS as one enquiry." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Your Shortlist — the rootSS" },
      { property: "og:description", content: "Send the pieces you love as one enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShortlistPage,
});

function ShortlistPage() {
  const { slugs, ready, remove, clear } = useShortlist();
  const [note, setNote] = useState("");
  const items = slugs.map(getProduct).filter((p): p is Product => Boolean(p));
  const refs = items.map((p) => ({ name: p.name, code: p.code }));
  const codes = items.map((p) => (p.code ? `${p.name} (${p.code})` : p.name));

  return (
    <>
      <PageHero
        kicker="Your shortlist"
        title={<>Pieces you've <em>set aside</em></>}
        intro="Send your whole shortlist to us as one enquiry — on WhatsApp or by email — and we'll reply with prices, availability and delivery details."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        {!ready ? null : items.length === 0 ? (
          <div className="border border-border bg-paper p-12 text-center">
            <p className="font-display text-3xl">Your shortlist is empty.</p>
            <p className="mt-3 text-muted-foreground">Tap the heart on any piece to add it here.</p>
            <Link to="/shop" className="eyebrow mt-8 inline-block bg-forest px-7 py-4 text-forest-foreground">
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between border-b border-border pb-4">
                <p className="eyebrow text-muted-foreground">
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </p>
                <button type="button" onClick={clear} className="eyebrow text-muted-foreground hover:text-rust">
                  Clear all
                </button>
              </div>
              <ul className="divide-y divide-border">
                {items.map((p) => (
                  <li key={p.slug} className="grid grid-cols-[6rem_minmax(0,1fr)_auto] items-center gap-5 py-5">
                    <Link to="/shop/$slug" params={{ slug: p.slug }}>
                      <img src={p.images[0]} alt={p.name} className="aspect-square w-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <p className="eyebrow text-muted-foreground">{getCollection(p.collection)?.name}</p>
                      <Link to="/shop/$slug" params={{ slug: p.slug }} className="mt-1 block font-display text-2xl leading-tight hover:text-rust">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{p.code ?? "Code confirmed on enquiry"}</p>
                    </div>
                    <button type="button" onClick={() => remove(p.slug)} aria-label={`Remove ${p.name}`} className="flex h-10 w-10 items-center justify-center hover:text-rust">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10 lg:col-span-5">
              <div className="border border-border bg-paper p-8">
                <p className="eyebrow text-rust">Send on WhatsApp</p>
                <label className="mt-5 grid gap-1">
                  <span className="eyebrow text-muted-foreground">Add a note (optional)</span>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. delivery to Bengaluru, gift wrapping for two pieces"
                    className="w-full resize-none border-b border-foreground/30 bg-transparent px-1 py-3 focus:outline-hidden"
                  />
                </label>
                <a
                  href={waLink(shortlistMessage(refs, note))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow mt-6 flex w-full items-center justify-center gap-3 bg-forest px-7 py-4 text-forest-foreground hover:bg-forest-deep"
                >
                  Send shortlist on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Shortlist enquiry")}&body=${encodeURIComponent(shortlistMessage(refs, note))}`}
                  className="eyebrow mt-3 flex w-full items-center justify-center gap-3 border border-foreground/30 px-7 py-4 hover:border-foreground"
                >
                  Send by email
                </a>
              </div>
              <div>
                <p className="eyebrow text-rust">Or send it through the site</p>
                <div className="mt-6">
                  <EnquiryForm
                    kind="shortlist"
                    fields={["name", "email", "phone", "country", "message"]}
                    productCodes={codes}
                    defaultMessage={note}
                    submitLabel="Send shortlist"
                    successText="Your shortlist has reached the rootSS team. We'll reply personally with prices and availability."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
