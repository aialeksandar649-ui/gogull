import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";

import { FeatureCard } from "./FeatureCard";
import {
  AnalyticsIcon,
  InfluencerIcon,
  SalesIcon,
  ValueIcon,
  VisibilityIcon,
} from "./icons";
import { SectionHeading } from "./SectionHeading";

export function ForBusinessSection() {
  const t = useTranslations("business");

  const items = [
    { key: "visibility", icon: <VisibilityIcon /> },
    { key: "analytics", icon: <AnalyticsIcon /> },
    { key: "sales", icon: <SalesIcon /> },
    { key: "value", icon: <ValueIcon /> },
    { key: "influencers", icon: <InfluencerIcon /> },
  ] as const;

  return (
    <section
      id="business"
      className="relative scroll-mt-20 overflow-hidden bg-primary py-20 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("title")}
          title={t("subtitle")}
          intro={t("intro")}
          tone="dark"
        />

        <Reveal className="mt-12">
          <Card
            className="border-white/10 bg-white/[0.06] py-0 shadow-none ring-white/10"
          >
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-bold text-accent sm:text-6xl">
                  {t("radius")}
                </span>
                <span className="max-w-[12rem] text-sm text-white/70">
                  {t("radiusLabel")}
                </span>
              </div>
              <p className="max-w-sm text-lg font-medium sm:text-right">
                {t("highlight")}
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon }, i) => (
            <Reveal key={key} delay={i * 80}>
              <FeatureCard
                tone="dark"
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                icon={icon}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
