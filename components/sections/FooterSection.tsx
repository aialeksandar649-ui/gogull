import { useTranslations } from "next-intl";

import { CtaButton } from "@/components/ui/CtaButton";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

type FooterSectionProps = {
  locale?: string;
  webappUrl?: string;
  contactEmail?: string;
  social?: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  termsUrl?: string;
  privacyUrl?: string;
};

export function FooterSection({
  locale = "hr",
  webappUrl = siteConfig.webappUrl,
  contactEmail = siteConfig.contactEmail,
  social = siteConfig.social,
  termsUrl,
  privacyUrl,
}: FooterSectionProps) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const socials = [
    { href: social.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: social.tiktok, label: "TikTok", icon: <TiktokIcon /> },
    { href: social.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter call-to-action band */}
      <div>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              {t("newsletterTitle")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/75">
              {t("newsletterDescription")}
            </p>
          </div>
          <div className="w-full lg:justify-self-end lg:max-w-md">
            <NewsletterForm />
          </div>
        </div>
        <Separator className="bg-white/10" />
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <span className="font-display text-2xl font-bold text-white">
            GoGull
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {t("brandTagline")}
          </p>
          <CtaButton
            href={webappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
            arrow
          >
            {t("cta")}
          </CtaButton>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            GoGull
          </p>
          <a href="#users" className="text-white/80 transition-colors hover:text-accent">
            {tn("users")}
          </a>
          <a href="#business" className="text-white/80 transition-colors hover:text-accent">
            {tn("business")}
          </a>
          <a href="#creators" className="text-white/80 transition-colors hover:text-accent">
            {tn("creators")}
          </a>
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {t("followUs")}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-white/80 transition-colors hover:text-accent"
          >
            {t("contact")}
          </a>
          <a
            href={termsUrl ?? `/${locale}/terms`}
            className="text-white/80 transition-colors hover:text-accent"
          >
            {t("terms")}
          </a>
          <a
            href={privacyUrl ?? `/${locale}/privacy`}
            className="text-white/80 transition-colors hover:text-accent"
          >
            {t("privacy")}
          </a>

          {socials.length > 0 && (
            <div className="mt-2 flex gap-3">
              {socials.map((s) => (
                <Button
                  key={s.label}
                  variant="ghost"
                  size="icon-sm"
                  asChild
                  className="rounded-full border-transparent bg-white/10 text-white hover:bg-accent hover:text-white"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-white/10" />
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-white/50 sm:px-6">
        {t("copyright", { year })}
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M16 3c.3 2.1 1.6 3.7 3.7 4v2.6c-1.3.1-2.6-.3-3.7-1v5.7a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 102 2.8V3H16z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.74 2.6 4.74 6V21H21v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-3.8z" />
    </svg>
  );
}
