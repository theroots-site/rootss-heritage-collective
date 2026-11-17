import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { enquirySchema } from "./enquiry-schema";

// Visitors may only insert (row-level security has no read policy), so this uses the
// publishable key behind the insert-only policy rather than the admin client.
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquirySchema.parse(d))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("Enquiry storage is not configured");
      return { ok: false as const, error: "We couldn't send this just now. Please try WhatsApp or email." };
    }
    const client = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await client.from("enquiries").insert({
      kind: data.kind,
      email: data.email,
      name: data.name ?? null,
      phone: data.phone ?? null,
      country: data.country ?? null,
      topic: data.topic ?? null,
      quantity: data.quantity ?? null,
      budget: data.budget ?? null,
      product_codes: data.productCodes,
      message: data.message ?? null,
      source_page: data.sourcePage ?? null,
    });

    if (error) {
      console.error("Enquiry insert failed", error.message);
      return { ok: false as const, error: "We couldn't send this just now. Please try WhatsApp or email." };
    }
    return { ok: true as const };
  });
