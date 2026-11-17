import { Heart } from "lucide-react";

import { useShortlist } from "@/lib/shortlist";

export function ShortlistButton({
  slug,
  name,
  variant = "icon",
}: {
  slug: string;
  name: string;
  variant?: "icon" | "full";
}) {
  const { has, toggle } = useShortlist();
  const on = has(slug);
  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={on}
        className="eyebrow inline-flex items-center justify-center gap-3 border border-foreground/30 px-6 py-4 transition-colors hover:border-foreground"
      >
        <Heart className={`h-4 w-4 ${on ? "fill-rust text-rust" : ""}`} />
        {on ? "On your shortlist" : "Add to shortlist"}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from shortlist` : `Add ${name} to shortlist`}
      className="flex h-10 w-10 items-center justify-center bg-background/85 backdrop-blur-sm transition-colors hover:bg-background"
    >
      <Heart className={`h-4 w-4 ${on ? "fill-rust text-rust" : "text-foreground"}`} />
    </button>
  );
}
