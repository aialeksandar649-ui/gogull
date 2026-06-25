import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "webappUrl",
      title: "Webapp URL (CTA)",
      type: "url",
      initialValue: "https://gogull.app",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "hello@gogull.app",
    }),
    defineField({
      name: "socialInstagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "socialTiktok",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "socialLinkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "termsUrl",
      title: "Terms URL (override)",
      type: "url",
    }),
    defineField({
      name: "privacyUrl",
      title: "Privacy URL (override)",
      type: "url",
    }),
  ],
});
