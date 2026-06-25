import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page Media",
  type: "document",
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      description: "Direct URL to MP4 (e.g. from Sanity assets or CDN)",
      type: "url",
    }),
    defineField({
      name: "heroPoster",
      title: "Hero Video Poster",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "usersMockup",
      title: "App Mockup (Users section)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
