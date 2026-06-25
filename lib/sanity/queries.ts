import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    webappUrl,
    contactEmail,
    socialInstagram,
    socialTiktok,
    socialLinkedin,
    termsUrl,
    privacyUrl
  }
`;

export const landingPageQuery = groq`
  *[_type == "landingPage"][0]{
    heroVideoUrl,
    heroPoster{asset->{url}},
    usersMockup{asset->{url}}
  }
`;
