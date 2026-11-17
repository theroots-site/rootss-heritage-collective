import { MessageCircle } from "lucide-react";

import { waLink } from "@/lib/whatsapp";

/** Floating WhatsApp access on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hello the rootSS, I'd like to know more about your collection.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the rootSS on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-whatsapp py-3 pl-3 pr-3 text-forest-foreground shadow-soft transition-all hover:pr-5 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="eyebrow hidden max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-40 md:inline">
        WhatsApp us
      </span>
    </a>
  );
}

export function WhatsAppCta({
  message,
  label,
  tone = "solid",
  className = "",
}: {
  message: string;
  label: string;
  tone?: "solid" | "outline" | "light";
  className?: string;
}) {
  const styles =
    tone === "solid"
      ? "bg-forest text-forest-foreground hover:bg-forest-deep"
      : tone === "light"
        ? "bg-forest-foreground text-forest hover:bg-paper"
        : "border border-current hover:bg-foreground hover:text-background";
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`eyebrow inline-flex items-center justify-center gap-3 px-7 py-4 transition-colors ${styles} ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
