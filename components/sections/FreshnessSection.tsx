import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

export function FreshnessSection() {
  const t = useTranslations("freshness");

  const oldPoints = [t("old.p1"), t("old.p2"), t("old.p3")];
  const newPoints = [t("new.p1"), t("new.p2"), t("new.p3")];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-muted sm:text-lg">
            {t("paragraph")}
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Old way */}
          <Reveal>
            <Card
              className="h-full border-primary/10 bg-white/50 py-0 shadow-none ring-primary/10"
            >
              <CardContent className="p-6 sm:p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {t("old.title")}
                </span>
                <ul className="mt-5 space-y-3.5">
                  {oldPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-text-muted sm:text-base"
                    >
                      <XIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          {/* VS divider */}
          <div className="flex items-center justify-center py-2 lg:py-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white shadow-lg shadow-primary/25 lg:h-14 lg:w-14">
              VS
            </span>
          </div>

          {/* GoGull */}
          <Reveal delay={120}>
            <Card
              className={cn(
                "relative h-full border-2 border-accent/30 py-0 shadow-xl shadow-primary/5 ring-accent/20"
              )}
            >
              <Badge
                className="absolute right-4 top-4 h-auto gap-1.5 rounded-full border-transparent bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                {t("live")}
              </Badge>
              <CardContent className="p-6 sm:p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {t("new.title")}
                </span>
                <ul className="mt-5 space-y-3.5">
                  {newPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm font-medium text-text sm:text-base"
                    >
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-text-muted/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
