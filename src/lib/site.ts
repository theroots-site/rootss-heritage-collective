// Brand contact details in one place. Social links stay null until the owner supplies them;
// components render nothing for a null link rather than a dead button.
export const site = {
  name: "the rootSS",
  tagline: "Rooted in heritage. Crafted with heart.",
  email: "contact@therootss.in",
  whatsappDigits: "917450015180",
  phoneDisplay: "+91 74500 15180",
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;
