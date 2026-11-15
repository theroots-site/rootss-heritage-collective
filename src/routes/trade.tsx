import { createFileRoute } from "@tanstack/react-router";

import interior from "@/assets/interior-styled.jpg";
import sculpture from "@/assets/craft-sculpture.jpg";
import { PageIntro } from "@/components/site/PageIntro";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/trade")({
  head: () => ({
    meta: [
      { title: "For Interior Designers & Architects — Rootss Trade" },
      {
        name: "description",
        content: "Trade sourcing, commissions and styling with authentic Indian crafts for residential, hospitality and commercial projects.",
      },
      { property: "og:title", content: "Rootss for Designers & Architects" },
      {
        property: "og:description",
        content: "Statement pieces, custom commissions and curated styling — straight from India's artisan communities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Trade,
});

const services = [
  { title: "Trade sourcing", body: "Access to our full artisan network and trade pricing for registered designers and architects." },
  { title: "Custom commissions", body: "Scaled Dokra installations, bespoke terracotta and site-specific tribal murals, made to brief." },
  { title: "Curated styling", body: "Room-by-room curation for home makeovers, hotels, restaurants and offices." },
];

const steps = ["Share your brief", "Receive a curated proposal", "Artisans make your pieces", "Delivered & installed"];

function Trade() {
  return (
    <>
      <PageIntro eyebrow="For Designers & Architects" title={<>Character, <em>commissioned</em>.</>}>
        Partner with Rootss to bring authentic Indian craft into residential, hospitality and commercial spaces.
      </PageIntro>

      <section className="relative">
        <img src={interior} alt="A styled interior with Indian heritage décor" width={1600} height={1008} className="h-[60vh] min-h-[420px] w-full object-cover" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="border-t border-foreground pt-6">
              <h2 className="text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="eyebrow text-primary">How it works</p>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s}>
                <span className="font-display text-6xl italic text-primary">{i + 1}</span>
                <p className="mt-2 text-xl font-display">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-10 lg:grid-cols-2">
        <div>
          <h2 className="text-5xl leading-tight">Start a project with us.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Tell us about your space, timeline and the feeling you want to create. We'll respond with ideas and a curated
            selection.
          </p>
          <img src={sculpture} alt="Carved sculptures and artefacts on a console" loading="lazy" className="mt-10 hidden aspect-[4/3] w-full object-cover lg:block" />
        </div>
        <EnquiryForm
          topics={["Trade account", "Custom commission", "Styling a space", "Hospitality / commercial project"]}
          submitLabel="Send project brief"
        />
      </section>
    </>
  );
}
