import { z } from "zod";

export const enquiryKinds = [
  "contact",
  "product",
  "preorder",
  "shortlist",
  "trade",
  "bespoke",
  "newsletter",
  "line-interest",
] as const;

export type EnquiryKind = (typeof enquiryKinds)[number];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const enquirySchema = z.object({
  kind: z.enum(enquiryKinds),
  name: optionalText(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: optionalText(40),
  country: optionalText(80),
  topic: optionalText(160),
  quantity: optionalText(60),
  budget: optionalText(80),
  productCodes: z.array(z.string().trim().max(160)).max(100).default([]),
  message: optionalText(5000),
  sourcePage: optionalText(300),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
