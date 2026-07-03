import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/Reveal";

import { SectionHeading } from "./SectionHeading";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    { key: "discover", n: "01" },
    { key: "plan", n: "02" },
    { key: "share", n: "03" },
  ] as const;

  return (
    <section className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />

        <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent sm:block"
            aria-hidden
          />

          {steps.map(({ key, n }, i) => (
            <Reveal key={key} delay={i * 120}>
              <div className="flex flex-col items-center gap-4 text-center">
                <Badge
                  className="relative z-10 h-16 w-16 justify-center rounded-full border-transparent bg-primary px-0 font-display text-xl font-bold text-white shadow-lg shadow-primary/25 ring-8 ring-white hover:bg-primary"
                >
                  {n}
                </Badge>
                <h3 className="font-display text-xl font-semibold text-primary">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-text-muted">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
