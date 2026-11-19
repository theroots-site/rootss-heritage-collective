<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Product, craft and journal content lives in `src/lib/catalog.ts` as static data; pages read from it so content edits happen in one place.
- Shared header/footer render in `src/routes/__root.tsx`; pages render only their own sections.
- Catalogue photos are CDN pointers in `src/assets/catalogue/`, resolved by name via `photo()` in `src/lib/images.ts`; keeps product data free of 50+ imports.
- Craft lines, collections and products are separate layers (`lines` → `collections` → `products`) so new craft lines need data only, no redesign.
- Price is `null` unless the owner confirmed it; UI shows "Enquire for price". Missing catalogue code/size stays `null` and shows "Confirmed on enquiry" — never invent values.
- Contact details and social links live in `src/lib/site.ts`; null social links render nothing (no dead buttons).
- WhatsApp messages are built in `src/lib/whatsapp.ts` and always include product name + code; covered by `src/test/whatsapp.test.ts`.
- All forms submit through `submitEnquiry` (`src/lib/enquiries.functions.ts`) into the `enquiries` table; visitors have insert-only access (no read policy), using the publishable key rather than the admin client.
- Shortlist is browser-local (`src/lib/shortlist.tsx`), read after hydration to avoid SSR mismatch.
- Client-care copy lives in `src/lib/care.ts`; topics with catalogue "conditions apply" terms set `pendingApproval` and show a notice.
