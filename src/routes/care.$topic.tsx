import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";

import { careTopics, getCareTopic } from "@/lib/care";
import { WhatsAppCta } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/care/$topic")({
  loader: ({ params }) => {
    const topic = getCareTopic(params.topic);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — the rootSS" }, { name: "robots", content: "noindex" }] };
    const t = loaderData.topic;
    const faq =
      t.slug === "faqs"
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: t.sections.map((s) => ({
                  "@type": "Question",
                  name: s.heading,
                  acceptedAnswer: { "@type": "Answer", text: s.body.join(" ") },
                })),
              }),
            },
          ]
        : [];
    return {
      meta: [
        { title: `${t.title} — Client Care | the rootSS` },
        { name: "description", content: t.summary },
        { property: "og:title", content: `${t.title} — the rootSS` },
        { property: "og:description", content: t.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
      scripts: faq,
    };
  },
  component: CareTopicPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <Link to="/care" className="eyebrow mt-8 inline-block bg-forest px-6 py-4 text-forest-foreground">Client care</Link>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">This page didn't load</h1>
      <p className="mt-3 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
    </div>
  ),
});

function CareTopicPage() {
  const { topic } = Route.useLoaderData();
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <p className="eyebrow text-muted-foreground">Client care</p>
        <ul className="mt-5 space-y-3">
          {careTopics.map((t) => (
            <li key={t.slug}>
              <Link
                to="/care/$topic"
                params={{ topic: t.slug }}
                className={t.slug === topic.slug ? "font-medium text-rust" : "text-muted-foreground hover:text-foreground"}
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="lg:col-span-7">
        <h1 className="text-5xl leading-tight md:text-6xl">{topic.title}</h1>
        <p className="mt-4 font-display text-2xl italic text-muted-foreground">{topic.summary}</p>
        {topic.pendingApproval && (
          <p className="mt-6 border-l-2 border-brass bg-paper p-4 text-sm text-muted-foreground">
            Conditions apply. Please confirm the details for your order with us on WhatsApp before you buy.
          </p>
        )}
        <div className="mt-10 divide-y divide-border border-y border-border">
          {topic.sections.map((s) => (
            <div key={s.heading} className="py-8">
              <h2 className="text-2xl">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-muted-foreground">
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <WhatsAppCta className="mt-10" message={`Hello the rootSS, I have a question about ${topic.title.toLowerCase()}.`} label="Ask us on WhatsApp" />
      </div>
    </section>
  );
}
