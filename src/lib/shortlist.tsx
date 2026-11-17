import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// The visitor's shortlist of product slugs, kept in this browser only. It is read after
// hydration so the server render and first client render match.
const KEY = "rootss-shortlist";

type Ctx = {
  slugs: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const ShortlistContext = createContext<Ctx | null>(null);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setSlugs(parsed.filter((s): s is string => typeof s === "string"));
    } catch {
      /* ignore unreadable storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {
      /* storage may be full or blocked */
    }
  }, [slugs, ready]);

  const toggle = useCallback(
    (slug: string) => setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug])),
    [],
  );
  const remove = useCallback((slug: string) => setSlugs((s) => s.filter((x) => x !== slug)), []);
  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo<Ctx>(
    () => ({ slugs, ready, has: (slug) => slugs.includes(slug), toggle, remove, clear }),
    [slugs, ready, toggle, remove, clear],
  );

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used inside ShortlistProvider");
  return ctx;
}
