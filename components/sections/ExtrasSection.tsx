import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  CrowdIcon,
  DeviceIcon,
  GlobeIcon,
  NestIcon,
  QuizIcon,
  CollabIcon,
} from "./icons";

export function ExtrasSection() {
  const t = useTranslations("extras");

  const items = [
    { key: "nest", icon: <NestIcon /> },
    { key: "quiz", icon: <QuizIcon /> },
    { key: "community", icon: <CollabIcon /> },
    { key: "languages", icon: <GlobeIcon /> },
    { key: "crowd", icon: <CrowdIcon /> },
    { key: "platforms", icon: <DeviceIcon /> },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon }, i) => (
            <Reveal key={key} delay={(i % 3) * 90}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-primary/10 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
