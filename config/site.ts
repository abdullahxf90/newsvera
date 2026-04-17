export const siteConfig = {
  name: "Newsvera",
  tagline: "News you can trust. Truth without noise.",
  description:
    "Newsvera is a specialized technology-and-business news publication covering AI, startups, markets, cybersecurity, and innovation.",
  url: "https://newsvera.com",
  ogImage: "https://newsvera.com/og.jpg",
  email: {
    general: "abdullah.xf90@gmail.com",
    tips: "abdullah.xf90@gmail.com",
    ads: "abdullah.xf90@gmail.com",
    press: "abdullah.xf90@gmail.com",
  },
  foundingYear: 2026,
  niche: "Technology & Business",
  categories: [
    { name: "Technology", slug: "technology" },
    { name: "World", slug: "world" },
    { name: "Politics", slug: "politics" },
    { name: "AI & Innovation", slug: "ai-innovation" },
    { name: "Cybersecurity", slug: "cybersecurity" },
    { name: "Gadgets", slug: "gadgets" },
    { name: "Markets", slug: "markets" },
    { name: "Opinion", slug: "opinion" },
  ],
  social: {
    twitter: "https://twitter.com/newsvera",
    facebook: "https://facebook.com/newsvera",
    linkedin: "https://linkedin.com/company/newsvera",
    instagram: "https://instagram.com/newsvera",
  },
  colors: {
    primary: "#0A2540",
    accent: "#C9A961",
  },
  adsense: {
    clientId: "ca-pub-XXXXXXXXXXXXXXXXX", // Replace with your AdSense client ID
  },
  analytics: {
    gaId: "G-XXXXXXXXXX", // Replace with your GA4 ID
  },
  verification: {
    google: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    bing: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
};

export type SiteConfig = typeof siteConfig;
