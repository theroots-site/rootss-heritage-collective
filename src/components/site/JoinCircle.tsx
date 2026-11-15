import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function JoinCircle() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  }

  return (
    <section className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-primary">The Rootss Circle</p>
          <h2 className="mt-4 text-5xl leading-tight">First access to new collections & artisan stories.</h2>
        </div>
        {joined ? (
          <p className="font-display text-3xl italic text-primary">Welcome to the circle. We'll write soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row">
            <label htmlFor="circle-email" className="sr-only">Email address</label>
            <input
              id="circle-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 border-b border-foreground bg-transparent px-1 py-4 text-lg placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="eyebrow inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-background transition-colors hover:bg-primary"
            >
              Join <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
