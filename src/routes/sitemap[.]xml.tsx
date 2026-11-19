import { createFileRoute } from "@tanstack/react-router";

import { careTopics } from "@/lib/care";
import { collections, lines, posts, products } from "@/lib/catalog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/shop",
          "/exclusive",
          "/living-with-art",
          "/crafts",
          "/about",
          "/artisans",
          "/trade",
          "/bespoke",
          "/journal",
          "/contact",
          "/care",
          ...collections.map((c) => `/collections/${c.slug}`),
          ...lines.map((l) => `/crafts/${l.slug}`),
          ...products.map((p) => `/shop/${p.slug}`),
          ...posts.map((p) => `/journal/${p.slug}`),
          ...careTopics.map((t) => `/care/${t.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
