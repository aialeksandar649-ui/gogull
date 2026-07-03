import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ForUsersSection } from "@/components/sections/ForUsersSection";
import { FeatureShowcaseSection } from "@/components/sections/FeatureShowcaseSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ExtrasSection } from "@/components/sections/ExtrasSection";
import { FreshnessSection } from "@/components/sections/FreshnessSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import { landingPageQuery, siteSettingsQuery } from "@/lib/sanity/queries";
import type { LandingPageMedia, SiteSettings } from "@/lib/sanity/types";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = siteConfig.url;

  return {
    title: t("title"),
    description: t("description"),
    keywords:
      locale === "hr"
        ? [
            "Dalmacija",
            "Split",
            "plaže Split",
            "izleti Dalmacija",
            "skrivena mjesta Dalmacija",
            "planer izleta",
            "interaktivna karta Dalmacije",
            "lokalni vodič Split",
            "što raditi u Splitu",
          ]
        : [
            "Dalmatia",
            "Split Croatia",
            "Split beaches",
            "Dalmatia day trips",
            "hidden gems Dalmatia",
            "trip planner Croatia",
            "interactive map Dalmatia",
            "local guide Split",
            "things to do in Split",
          ],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        hr: `${baseUrl}/hr`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/hr`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "GoGull",
      locale: locale === "hr" ? "hr_HR" : "en_US",
      type: "website",
      images: [{ url: "/GoGull_logo.png", width: 512, height: 512, alt: "GoGull" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let settings: SiteSettings | null = null;
  let media: LandingPageMedia | null = null;

  if (sanityConfigured) {
    try {
      [settings, media] = await Promise.all([
        sanityClient.fetch<SiteSettings>(siteSettingsQuery),
        sanityClient.fetch<LandingPageMedia>(landingPageQuery),
      ]);
    } catch {
      /* fallback to defaults */
    }
  }

  const webappUrl = settings?.webappUrl ?? siteConfig.webappUrl;

  return (
    <>
      <Header webappUrl={webappUrl} />
      <HeroSection
        webappUrl={webappUrl}
        heroVideoUrl={media?.heroVideoUrl}
        heroPosterUrl={media?.heroPoster?.asset?.url}
      />
      <ForUsersSection />
      <FeatureShowcaseSection />
      <HowItWorksSection />
      <ExtrasSection />
      <FreshnessSection />
      <FooterSection
        locale={locale}
        webappUrl={webappUrl}
        contactEmail={settings?.contactEmail}
        social={{
          instagram: settings?.socialInstagram ?? siteConfig.social.instagram,
          tiktok: settings?.socialTiktok ?? siteConfig.social.tiktok,
          linkedin: settings?.socialLinkedin ?? siteConfig.social.linkedin,
        }}
        termsUrl={settings?.termsUrl}
        privacyUrl={settings?.privacyUrl}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GoGull",
              url: siteConfig.url,
              inLanguage: routing.locales,
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GoGull",
              applicationCategory: "TravelApplication",
              operatingSystem: "Web, Android",
              url: webappUrl,
              inLanguage: ["hr", "en", "de", "es", "fr", "it"],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Splitsko-dalmatinska županija, Croatia",
              },
              featureList: [
                "Interactive map of Dalmatia",
                "Short video location guides",
                "AI day trip planner",
                "Trip sharing via 6-character code",
                "Location quizzes and fun facts",
                "Community reviews",
              ],
            },
          ]),
        }}
      />
    </>
  );
}
