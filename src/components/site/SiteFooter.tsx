import { Link } from "@tanstack/react-router";

import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-umber text-umber-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <Wordmark className="text-5xl" />
          <p className="mt-4 max-w-sm opacity-70">
            Authentic Indian art and handcrafted lifestyle, for those who invest in stories,
            heritage and individuality.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-brass">Explore</p>
          <Link to="/shop" className="opacity-75 hover:opacity-100">Shop</Link>
          <Link to="/about" className="opacity-75 hover:opacity-100">Our Story</Link>
          <Link to="/journal" className="opacity-75 hover:opacity-100">Journal</Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-brass">Connect</p>
          <Link to="/trade" className="opacity-75 hover:opacity-100">For Designers</Link>
          <Link to="/contact" className="opacity-75 hover:opacity-100">Contact</Link>
        </div>
      </div>
      <div className="border-t border-umber-foreground/10">
        <p className="eyebrow mx-auto max-w-7xl px-6 py-6 opacity-50 md:px-10">
          © {new Date().getFullYear()} Rootss · Made in India, by hand
        </p>
      </div>
    </footer>
  );
}
