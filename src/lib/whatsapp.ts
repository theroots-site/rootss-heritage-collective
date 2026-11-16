import { site } from "./site";

export type ProductRef = { name: string; code: string | null };

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

function label(p: ProductRef): string {
  return p.code ? `${p.name} (${p.code})` : `${p.name} (product code to be confirmed)`;
}

export function productMessage(p: ProductRef, intent: "order" | "pre-order" | "enquire"): string {
  const opener =
    intent === "pre-order"
      ? "Hello the rootSS, I'd like to pre-order"
      : intent === "order"
        ? "Hello the rootSS, I'd like to order"
        : "Hello the rootSS, I'd like to know more about";
  return `${opener}: ${label(p)}. Could you share the price, availability and delivery details?`;
}

export function shortlistMessage(items: ProductRef[], note?: string): string {
  const lines = items.map((p, i) => `${i + 1}. ${label(p)}`);
  const parts = [
    "Hello the rootSS, I'd like to enquire about these pieces from my shortlist:",
    ...lines,
  ];
  if (note && note.trim()) parts.push("", note.trim());
  parts.push("", "Could you share prices, availability and delivery details?");
  return parts.join("\n");
}

export function generalMessage(topic: string): string {
  return `Hello the rootSS, I have an enquiry about ${topic}.`;
}
