import { describe, expect, it } from "vitest";

import { productMessage, shortlistMessage, waLink } from "@/lib/whatsapp";
import { enquirySchema } from "@/lib/enquiry-schema";

describe("WhatsApp ordering", () => {
  it("opens a chat with +91 74500 15180 in international format", () => {
    expect(waLink("hi")).toMatch(/^https:\/\/wa\.me\/917450015180\?text=hi$/);
  });

  it("puts the product name and code in an order message", () => {
    const msg = productMessage({ name: "Durga Parivar", code: "DKR-SI-007" }, "order");
    expect(msg).toContain("order");
    expect(msg).toContain("Durga Parivar (DKR-SI-007)");
  });

  it("says pre-order for a pre-order message", () => {
    expect(productMessage({ name: "Aagomoni", code: "DKR-EP-003" }, "pre-order")).toContain("pre-order: Aagomoni (DKR-EP-003)");
  });

  it("lists every shortlisted piece with its code in one message", () => {
    const msg = shortlistMessage([
      { name: "Takia Ganesh", code: "DKR-SI-009" },
      { name: "Pecha – The Owl Collection", code: null },
    ]);
    expect(msg).toContain("1. Takia Ganesh (DKR-SI-009)");
    expect(msg).toContain("2. Pecha – The Owl Collection (product code to be confirmed)");
  });
});

describe("Enquiry validation", () => {
  it("rejects an enquiry without a valid email", () => {
    expect(enquirySchema.safeParse({ kind: "contact", email: "not-an-email" }).success).toBe(false);
  });
});
