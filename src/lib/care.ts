// Client-care content, taken from the catalogue's "How to order" and "Orders, shipping
// & referral" pages. Topics marked `pendingApproval` carry the catalogue's
// "conditions apply" terms and are shown with a note until the business confirms them.

export type CareTopic = {
  slug: string;
  title: string;
  summary: string;
  pendingApproval?: boolean;
  sections: { heading: string; body: string[] }[];
};

export const careTopics: CareTopic[] = [
  {
    slug: "how-to-order",
    title: "How to Order",
    summary: "Every piece is ordered personally, by WhatsApp, phone or email, with its product code.",
    sections: [
      {
        heading: "Ordering a piece",
        body: [
          "Call or message us on WhatsApp at +91 74500 15180 with the product code to place your order. Every product page has an \"Order on WhatsApp\" button that writes the message for you, including the code.",
          "Prices are shared on enquiry. We confirm price, availability and dispatch date with you before you pay.",
        ],
      },
      {
        heading: "Several pieces at once",
        body: [
          "Add pieces to your shortlist with the heart icon, then send the whole shortlist to us as one enquiry — on WhatsApp or by email.",
        ],
      },
      {
        heading: "Custom, bulk and gifting",
        body: [
          "Custom sizes and designs, bulk and corporate gifting orders are welcome. Bulk orders start at a minimum of 10 pieces. Gift wrapping is available on request.",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery",
    summary: "Shipped across India with tracking, and internationally on request.",
    sections: [
      {
        heading: "Within India",
        body: [
          "Shipped across India with tracking. Every piece is quality-checked before packing.",
          "In-stock pieces dispatch in 2–3 working days. For pre-orders, bulk and Exclusive Collection pieces, we confirm the date on WhatsApp.",
        ],
      },
      {
        heading: "International",
        body: [
          "We ship internationally, packed with care for the journey. Delivery charges, timelines and any duties are confirmed for your country when you enquire.",
        ],
      },
    ],
  },
  {
    slug: "returns-refunds",
    title: "Returns & Refunds",
    summary: "Returns for damaged or incorrect pieces within 7 days, with an unboxing video.",
    pendingApproval: true,
    sections: [
      {
        heading: "Returns",
        body: [
          "Returns are accepted within 7 days of delivery for damaged or incorrect pieces. An unboxing video is required.",
          "Because every piece is handmade, small variations from the photograph are part of its character and are not considered defects.",
        ],
      },
      {
        heading: "Refunds",
        body: ["Refunds are paid to your original payment method within 7–15 working days of approval."],
      },
    ],
  },
  {
    slug: "cancellation",
    title: "Cancellation",
    summary: "Free until dispatch.",
    sections: [
      {
        heading: "Cancelling an order",
        body: ["Cancellation is free until dispatch. Orders cannot be cancelled once shipped."],
      },
    ],
  },
  {
    slug: "payment",
    title: "Payment",
    summary: "UPI, bank transfer, or cash on delivery on request.",
    pendingApproval: true,
    sections: [
      {
        heading: "Ways to pay",
        body: [
          "UPI, bank transfer, or cash on delivery on request. Conditions apply — please contact us for more information.",
          "We share payment details only after confirming your order personally. Online card payment is not yet available on this website.",
        ],
      },
    ],
  },
  {
    slug: "product-care",
    title: "Caring for Your Piece",
    summary: "Dust gently, keep dry, and let the patina deepen.",
    sections: [
      {
        heading: "Caring for your Dhokra piece",
        body: [
          "Dust with a soft, dry cloth.",
          "Keep away from water and chemical cleaners.",
          "The natural patina is part of its beauty.",
        ],
      },
      {
        heading: "A note on finish",
        body: [
          "Some of our exclusive pieces are unpolished to retain the originality of the product. The polish can be customised based on requirements.",
        ],
      },
    ],
  },
  {
    slug: "order-tracking",
    title: "Order Tracking",
    summary: "Tracking details are shared on WhatsApp once your piece ships.",
    sections: [
      {
        heading: "Where is my order?",
        body: [
          "Every order within India ships with tracking. We share the tracking details with you on WhatsApp once your piece is dispatched.",
          "For an update at any time, message us on WhatsApp with your name and the product code.",
        ],
      },
    ],
  },
  {
    slug: "faqs",
    title: "FAQs",
    summary: "Answers to the questions we hear most.",
    sections: [
      { heading: "Is every piece really one of a kind?", body: ["Yes. The clay mould is broken to release every casting, so no two Dhokra pieces are the same. Your piece will closely match the one pictured, with small variations unique to it."] },
      { heading: "What is Dhokra made of?", body: ["Brass, bronze and bell metal, cast by the lost-wax method in a mould of river clay and beeswax."] },
      { heading: "Why are prices not shown?", body: ["Each piece is handmade in small numbers, so we confirm price and availability personally. Message us on WhatsApp with the product code."] },
      { heading: "Can I order a different size or finish?", body: ["Custom sizes, finishes and designs are available on request. Many pieces note \"more designs & sizes available\"."] },
      { heading: "Do you ship outside India?", body: ["Yes, we ship internationally. We confirm delivery charges and timelines for your country when you enquire."] },
      { heading: "Do you take bulk or corporate orders?", body: ["Yes — bulk orders start at 10 pieces, and we welcome corporate, wedding and festive gifting."] },
      { heading: "Is there a referral programme?", body: ["Refer a friend and you both get a thank-you discount on your next order. Ask us on WhatsApp for details."] },
    ],
  },
];

export function getCareTopic(slug: string) {
  return careTopics.find((t) => t.slug === slug);
}
