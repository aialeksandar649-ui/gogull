export type SiteSettings = {
  webappUrl?: string;
  contactEmail?: string;
  socialInstagram?: string;
  socialTiktok?: string;
  socialLinkedin?: string;
  termsUrl?: string;
  privacyUrl?: string;
};

export type LandingPageMedia = {
  heroVideoUrl?: string;
  heroPoster?: { asset?: { url?: string } };
  usersMockup?: { asset?: { url?: string } };
};
