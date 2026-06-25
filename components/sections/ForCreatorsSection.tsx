import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

import { CollabIcon, ReachIcon } from "./icons";

type ForCreatorsSectionProps = {
  webappUrl?: string;
};

export function ForCreatorsSection({
  webappUrl = siteConfig.webappUrl,
}: ForCreatorsSectionProps) {
  const t = useTranslations("creators");

  const items = [
    { key: "reach", icon: <ReachIcon /> },
    { key: "collab", icon: <CollabIcon /> },
  ] as const;

  return (
    <section id="creators" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-[#0a3a47] p-8 sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="text-white">
                <Badge
                  variant="secondary"
                  className="h-auto gap-2 rounded-full border-transparent bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t("title")}
                </Badge>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("subtitle")}
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">
                  {t("intro")}
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

              <div className="grid gap-4 sm:grid-cols-2">
                {items.map(({ key, icon }, i) => (
                  <Reveal key={key} delay={i * 120}>
                    <Card
                      className="border-white/10 bg-white/[0.06] py-0 shadow-none ring-white/10 backdrop-blur transition-colors duration-300 hover:bg-white/[0.1]"
                    >
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                          {icon}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-white">
                          {t(`items.${key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {t(`items.${key}.description`)}
                        </p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
