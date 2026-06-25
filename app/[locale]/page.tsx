import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ForUsersSection } from "@/components/sections/ForUsersSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FreshnessSection } from "@/components/sections/FreshnessSection";
import { ForBusinessSection } from "@/components/sections/ForBusinessSection";
import { ForCreatorsSection } from "@/components/sections/ForCreatorsSection";
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
      <HowItWorksSection />
      <FreshnessSection />
      <ForBusinessSection />
      <ForCreatorsSection webappUrl={webappUrl} />
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GoGull",
            url: siteConfig.url,
            inLanguage: routing.locales,
          }),
        }}
      />
    </>
  );
}
