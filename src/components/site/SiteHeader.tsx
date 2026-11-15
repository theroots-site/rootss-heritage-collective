import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Wordmark } from "./Wordmark";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/trade", label: "For Designers" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" aria-label="Rootss home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="eyebrow text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "eyebrow text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/shop"
          search={{}}
          className="eyebrow hidden border border-foreground px-5 py-3 transition-colors hover:bg-foreground hover:text-background lg:inline-flex"
        >
          Shop the edit
        </Link>
        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-6 border-b border-border bg-background px-6 py-8 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-3xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
