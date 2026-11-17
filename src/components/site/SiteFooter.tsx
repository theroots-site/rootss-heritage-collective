import { Link } from "@tanstack/react-router";

import { careTopics } from "@/lib/care";
import { collections } from "@/lib/catalog";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { Wordmark } from "./Logo";

const linkCls = "opacity-75 transition-opacity hover:opacity-100";

export function SiteFooter() {
  const socials = [
    { label: "Instagram", href: site.social.instagram },
    { label: "Facebook", href: site.social.facebook },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Wordmark className="text-5xl" />
          <p className="eyebrow mt-4 text-brass">{site.tagline}</p>
          <p className="mt-6 max-w-sm opacity-70">
            A house for India's living craft traditions, bringing authentic handmade work into contemporary homes.
          </p>
          <div className="mt-8 grid gap-2 text-sm">
            <a href={waLink("Hello the rootSS, I have an enquiry.")} target="_blank" rel="noopener noreferrer" className={linkCls}>
              WhatsApp / Call · {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className={linkCls}>
              {site.email}
            </a>
          </div>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`eyebrow ${linkCls}`}>
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          <div className="flex flex-col gap-3 text-sm">
            <p className="eyebrow mb-2 text-brass">Shop</p>
            {collections.map((c) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className={linkCls}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="eyebrow mb-2 text-brass">The House</p>
            <Link to="/about" className={linkCls}>Our Story</Link>
            <Link to="/crafts" className={linkCls}>The Art of Craft</Link>
            <Link to="/artisans" className={linkCls}>Meet the Artisans</Link>
            <Link to="/living-with-art" className={linkCls}>Living with Art</Link>
            <Link to="/journal" className={linkCls}>Journal</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="eyebrow mb-2 text-brass">Services</p>
            <Link to="/exclusive" className={linkCls}>Exclusive Pre-orders</Link>
            <Link to="/trade" className={linkCls}>Designers, Bulk & Export</Link>
            <Link to="/bespoke" className={linkCls}>Bespoke & Gifting</Link>
            <Link to="/shortlist" className={linkCls}>Your Shortlist</Link>
            <Link to="/contact" className={linkCls}>Contact</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="eyebrow mb-2 text-brass">Client Care</p>
            {careTopics.map((t) => (
              <Link key={t.slug} to="/care/$topic" params={{ topic: t.slug }} className={linkCls}>
                {t.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10">
        <div className="eyebrow mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 opacity-55 sm:flex-row sm:justify-between md:px-10">
          <span>© {new Date().getFullYear()} the rootSS</span>
          <span>Authentic Dhokra · Every piece is one of a kind</span>
        </div>
      </div>
    </footer>
  );
}
