import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AnnouncementBar, SiteHeader } from "../components/site/SiteHeader";
import { WhatsAppFloat } from "../components/site/WhatsApp";
import { ShortlistProvider } from "../lib/shortlist";
import { SiteFooter } from "../components/site/SiteFooter";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { catalogueQuery } from "../lib/catalogue-live";
import { supabase } from "../integrations/supabase/client";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-6 py-24">
      <div className="max-w-md text-center">
        <p className="eyebrow text-rust">Page not found</p>
        <h1 className="mt-4 text-5xl">This path has no piece at its end.</h1>
        <p className="mt-4 text-muted-foreground">The page may have moved, or the link may be mistyped.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="eyebrow bg-forest px-6 py-4 text-forest-foreground">Return home</Link>
          <Link to="/shop" className="eyebrow border border-foreground px-6 py-4">Browse the collection</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Owner edits from the admin area, merged over the printed catalogue by every page.
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogueQuery),
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "the rootSS — Rooted in heritage. Crafted with heart." },
      { name: "description", content: "Authentic handmade Indian craft for contemporary homes, beginning with Dhokra brass hand-cast by artisan families of Bengal." },
      { name: "author", content: "the rootSS" },
      { property: "og:site_name", content: "the rootSS" },
      { property: "og:title", content: "the rootSS — Rooted in heritage. Crafted with heart." },
      { property: "og:description", content: "Authentic handmade Indian craft for contemporary homes, beginning with Dhokra brass hand-cast by artisan families of Bengal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <ShortlistProvider>
        {isAdmin ? (
          <Outlet />
        ) : (
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            <SiteFooter />
            <WhatsAppFloat />
          </div>
        )}
        <Toaster position="top-center" />
      </ShortlistProvider>
    </QueryClientProvider>
  );
}
