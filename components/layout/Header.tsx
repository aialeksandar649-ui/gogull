"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

type HeaderProps = {
  webappUrl: string;
};

export function Header({ webappUrl }: HeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-primary/95 shadow-lg shadow-black/10 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.webp"
            alt="GoGull"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/85 md:flex">
          <a
            href="#users"
            className="transition-colors hover:text-white"
          >
            {t("users")}
          </a>
          <a
            href="#business"
            className="transition-colors hover:text-white"
          >
            {t("business")}
          </a>
          <a
            href="#creators"
            className="transition-colors hover:text-white"
          >
            {t("creators")}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <CtaButton
            href={webappUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            arrow
            className="hidden sm:inline-flex"
          >
            {t("cta")}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
