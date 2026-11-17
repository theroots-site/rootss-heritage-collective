import { site } from "@/lib/site";
import { EnquiryForm } from "./EnquiryForm";

export function Newsletter() {
  const socials = [
    { label: "Instagram", href: site.social.instagram },
    { label: "Facebook", href: site.social.facebook },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));
  return (
    <section className="border-t border-border bg-sand/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow text-rust">The rootSS Circle</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            First word on new pieces, pre-orders and <em>artisan stories</em>.
          </h2>
          {socials.length > 0 && (
            <div className="mt-8 flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <EnquiryForm
          kind="newsletter"
          fields={["email"]}
          submitLabel="Join the circle"
          successTitle="Welcome to the circle."
          successText="We'll write when there's something worth sharing."
        />
      </div>
    </section>
  );
}
