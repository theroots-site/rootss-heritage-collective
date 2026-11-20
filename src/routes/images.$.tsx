import { createFileRoute } from "@tanstack/react-router";

import { IMAGE_BUCKET, isSafeImagePath } from "@/lib/images";
import { createPublicDb } from "@/lib/public-db";

// Serves every brand image at a stable link: /images/<folder>/<file>.
export const Route = createFileRoute("/images/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = decodeURIComponent(params._splat ?? "");
        if (!isSafeImagePath(path)) return new Response("Not found", { status: 404 });
        const db = createPublicDb();
        if (!db) return new Response("Image storage is not configured", { status: 503 });
        const { data, error } = await db.storage.from(IMAGE_BUCKET).download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "Content-Type": data.type || "application/octet-stream",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
