export const siteConfig = {
  name: "GoGull",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gogull.app",
  webappUrl: process.env.NEXT_PUBLIC_WEBAPP_URL ?? "https://gogull.app",
  contactEmail: "hello@gogull.app",
  social: {
    instagram: "https://instagram.com/gogull",
    tiktok: "https://tiktok.com/@gogull",
    linkedin: "https://linkedin.com/company/gogull",
  },
  legal: {
    terms: "/hr/terms",
    privacy: "/hr/privacy",
  },
} as const;
