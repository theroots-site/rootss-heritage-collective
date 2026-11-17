import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2 } from "lucide-react";

import { submitEnquiry } from "@/lib/enquiries.functions";
import { enquirySchema, type EnquiryKind } from "@/lib/enquiry-schema";

const field =
  "w-full border-b border-foreground/30 bg-transparent px-1 py-3 text-base placeholder:text-muted-foreground/70 focus:border-forest focus:outline-hidden";

export type EnquiryField = "name" | "email" | "phone" | "country" | "topic" | "quantity" | "budget" | "message";

export function EnquiryForm({
  kind,
  fields = ["name", "email", "phone", "topic", "message"],
  topics,
  defaultTopic,
  defaultMessage = "",
  productCodes = [],
  budgets,
  submitLabel = "Send enquiry",
  successTitle = "Thank you.",
  successText = "Your enquiry has reached the rootSS team. We'll be in touch personally.",
  messageLabel = "Message",
  messagePlaceholder = "Tell us a little about what you're looking for",
  onSent,
}: {
  kind: EnquiryKind;
  fields?: EnquiryField[];
  topics?: string[];
  defaultTopic?: string;
  defaultMessage?: string;
  productCodes?: string[];
  budgets?: string[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  onSent?: () => void;
}) {
  const send = useServerFn(submitEnquiry);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const has = (f: EnquiryField) => fields.includes(f);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v : undefined;
    };
    const parsed = enquirySchema.safeParse({
      kind,
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      topic: get("topic"),
      quantity: get("quantity"),
      budget: get("budget"),
      message: get("message"),
      productCodes,
      sourcePage: typeof window !== "undefined" ? window.location.pathname + window.location.search : undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setState("sending");
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setState("sent");
        onSent?.();
      } else {
        setError(res.error);
        setState("idle");
      }
    } catch {
      setError("We couldn't send this just now. Please try WhatsApp or email.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-border bg-card p-10" role="status">
        <p className="font-display text-4xl italic text-forest">{successTitle}</p>
        <p className="mt-3 text-muted-foreground">{successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        {has("name") && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Name</span>
            <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
          </label>
        )}
        {has("email") && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Email</span>
            <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
          </label>
        )}
        {has("phone") && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Phone / WhatsApp</span>
            <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+91 …" />
          </label>
        )}
        {has("country") && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">City & country</span>
            <input name="country" autoComplete="country-name" className={field} placeholder="e.g. Mumbai, India" />
          </label>
        )}
        {has("topic") && topics && topics.length > 0 && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Enquiry type</span>
            <select name="topic" defaultValue={defaultTopic ?? topics[0]} className={field}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        )}
        {has("quantity") && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Quantity</span>
            <input name="quantity" className={field} placeholder="e.g. 25 pieces" />
          </label>
        )}
        {has("budget") && budgets && (
          <label className="grid gap-1">
            <span className="eyebrow text-muted-foreground">Budget range</span>
            <select name="budget" defaultValue="" className={field}>
              <option value="">Prefer not to say</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      {has("message") && (
        <label className="grid gap-1">
          <span className="eyebrow text-muted-foreground">{messageLabel}</span>
          <textarea
            name="message"
            rows={4}
            defaultValue={defaultMessage}
            className={`${field} resize-none`}
            placeholder={messagePlaceholder}
          />
        </label>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="eyebrow inline-flex w-fit items-center gap-3 bg-forest px-8 py-4 text-forest-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitLabel} {state !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
