import { useTranslations } from "next-intl";
import { FeatureCard } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MapIcon, RouteIcon, VideoIcon } from "./icons";

export function ForUsersSection() {
  const t = useTranslations("users");

  const items = [
    { key: "map", icon: <MapIcon /> },
    { key: "video", icon: <VideoIcon /> },
    { key: "plan", icon: <RouteIcon /> },
  ] as const;

  return (
    <section
      id="users"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("title")}
          title={t("subtitle")}
          intro={t("intro")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {items.map(({ key, icon }, i) => (
            <Reveal key={key} delay={i * 100}>
              <FeatureCard
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
