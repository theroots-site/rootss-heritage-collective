import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const field =
  "w-full border-b border-foreground/40 bg-transparent px-1 py-3 text-lg placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function EnquiryForm({
  topics,
  defaultTopic,
  defaultMessage = "",
  submitLabel = "Send enquiry",
}: {
  topics: string[];
  defaultTopic?: string | undefined;
  defaultMessage?: string;
  submitLabel?: string;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-border bg-card p-10">
        <p className="font-display text-4xl italic text-primary">Thank you.</p>
        <p className="mt-3 text-muted-foreground">
          Your note has reached us. Someone from the Rootss team will reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="eyebrow text-muted-foreground">Name</span>
          <input name="name" required className={field} placeholder="Your full name" />
        </label>
        <label className="grid gap-1">
          <span className="eyebrow text-muted-foreground">Email</span>
          <input name="email" type="email" required className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="eyebrow text-muted-foreground">I'm enquiring about</span>
        <select name="topic" defaultValue={defaultTopic ?? topics[0]} className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="eyebrow text-muted-foreground">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          defaultValue={defaultMessage}
          className={`${field} resize-none`}
          placeholder="Tell us a little about what you're looking for"
        />
      </label>
      <button
        type="submit"
        className="eyebrow inline-flex w-fit items-center gap-3 bg-primary px-8 py-4 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
      >
        {submitLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
