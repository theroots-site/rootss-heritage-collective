import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";

import { collections } from "@/lib/catalog";
import { site } from "@/lib/site";
import { useShortlist } from "@/lib/shortlist";
import { Wordmark } from "./Logo";

const nav = [
  { to: "/exclusive", label: "Exclusive" },
  { to: "/living-with-art", label: "Living with Art" },
  { to: "/crafts", label: "The Art of Craft" },
  { to: "/about", label: "Our Story" },
  { to: "/trade", label: "Trade & Export" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-forest-foreground">
      <p className="eyebrow mx-auto max-w-7xl truncate px-6 py-2.5 text-center text-[0.62rem] opacity-90 md:px-10">
        Authentic Dhokra<span className="hidden sm:inline">, hand-cast by artisan families of Bengal</span>
        <span className="mx-3 text-brass">·</span>
        <span className="hidden sm:inline">Shipping across India & worldwide</span>
        <span className="mx-3 hidden text-brass sm:inline">·</span>
        WhatsApp {site.phoneDisplay}
      </p>
    </div>
  );
}

function ShortlistLink() {
  const { slugs, ready } = useShortlist();
  return (
    <Link to="/shortlist" aria-label="Your shortlist" className="relative flex h-10 w-10 items-center justify-center hover:text-rust">
      <Heart className="h-5 w-5" />
      {ready && slugs.length > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rust px-1 text-[0.6rem] font-semibold text-accent-foreground">
          {slugs.length}
        </span>
      )}
    </Link>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    onClose();
    void navigate({ to: "/shop", search: { q: typeof q === "string" && q.trim() ? q.trim() : undefined } });
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="absolute inset-x-0 top-full z-40 border-b border-border bg-background shadow-soft">
      <form onSubmit={submit} className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-8">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          name="q"
          autoFocus
          placeholder="Search by name, deity or product code — e.g. Ganesha, DKR-SI-007"
          className="min-w-0 flex-1 bg-transparent font-display text-2xl placeholder:text-muted-foreground/60 focus:outline-hidden"
        />
        <button type="button" onClick={onClose} aria-label="Close search">
          <X className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-4 md:px-10">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button
            type="button"
            aria-label="Search the collection"
            onClick={() => setSearching((s) => !s)}
            className="flex h-10 w-10 items-center justify-center hover:text-rust"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <Link to="/" aria-label="the rootSS home" onClick={close} className="text-center">
          <Wordmark className="text-3xl md:text-4xl" />
        </Link>
        <div className="flex items-center justify-end gap-1">
          <ShortlistLink />
        </div>
      </div>

      <nav className="hidden border-t border-border/60 lg:block" aria-label="Main">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-10">
          <li className="group relative">
            <Link
              to="/shop"
              className="eyebrow flex items-center gap-1.5 py-4 tracking-[0.22em] text-foreground/75 transition-colors hover:text-rust"
              activeProps={{ className: "text-rust" }}
            >
              Shop <ChevronDown className="h-3 w-3" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[44rem] -translate-x-1/2 border border-border bg-background p-8 opacity-0 shadow-soft transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-[1fr_15rem] gap-8">
                <div>
                  <p className="eyebrow text-muted-foreground">The Heritage Collection · Dhokra</p>
                  <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                    {collections.map((c) => (
                      <li key={c.slug}>
                        <Link to="/collections/$slug" params={{ slug: c.slug }} className="font-display text-xl hover:text-rust">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/shop" className="font-display text-xl italic text-rust">
                        All pieces →
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-6 flex gap-6 border-t border-border pt-5">
                    <Link to="/bespoke" className="eyebrow text-muted-foreground hover:text-rust">Bespoke & Gifting</Link>
                    <Link to="/crafts" className="eyebrow text-muted-foreground hover:text-rust">Craft lines</Link>
                  </div>
                </div>
                <Link to="/exclusive" className="group/feat block">
                  <img src={collections[6]?.banner} alt="" className="aspect-[4/5] w-full object-cover" />
                  <p className="eyebrow mt-3 text-rust">Pre-order</p>
                  <p className="font-display text-xl">The Exclusive Collection</p>
                </Link>
              </div>
            </div>
          </li>
          {nav.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="eyebrow block py-4 tracking-[0.22em] text-foreground/75 transition-colors hover:text-rust"
                activeProps={{ className: "text-rust" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {searching && <SearchOverlay onClose={() => setSearching(false)} />}

      {open && (
        <nav
          className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-border bg-background px-6 pb-10 pt-6 lg:hidden"
          aria-label="Mobile"
        >
          <p className="eyebrow text-muted-foreground">Shop</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to="/collections/$slug" params={{ slug: c.slug }} onClick={close} className="font-display text-xl">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" onClick={close} className="font-display text-xl italic text-rust">All pieces</Link>
            </li>
          </ul>
          <ul className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={close} className="font-display text-3xl">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/bespoke" onClick={close} className="font-display text-3xl">Bespoke & Gifting</Link>
            </li>
            <li>
              <Link to="/care" onClick={close} className="font-display text-3xl">Client Care</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
