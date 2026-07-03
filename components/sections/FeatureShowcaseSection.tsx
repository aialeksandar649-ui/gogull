import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MapIcon, PinIcon, RouteIcon, ShareCodeIcon } from "./icons";

export function FeatureShowcaseSection() {
  const t = useTranslations("showcase");

  return (
    <section className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {/* Row 1: Interactive map */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <FeatureCopy
                icon={<MapIcon />}
                label={t("map.label")}
                title={t("map.title")}
                description={t("map.description")}
              />
            </Reveal>
            <Reveal delay={120}>
              <MapMockup t={t} />
            </Reveal>
          </div>

          {/* Row 2: Day planner */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:order-1">
              <FeatureCopy
                icon={<RouteIcon />}
                label={t("planner.label")}
                title={t("planner.title")}
                description={t("planner.description")}
              />
            </Reveal>
            <Reveal delay={120}>
              <PlannerMockup t={t} />
            </Reveal>
          </div>

          {/* Row 3: Share code */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <FeatureCopy
                icon={<ShareCodeIcon />}
                label={t("share.label")}
                title={t("share.title")}
                description={t("share.description")}
              />
            </Reveal>
            <Reveal delay={120}>
              <ShareMockup t={t} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

type Translator = ReturnType<typeof useTranslations<"showcase">>;

function FeatureCopy({
  icon,
  label,
  title,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
        {label}
      </span>
      <div className="mt-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MapMockup({ t }: { t: Translator }) {
  const chips = ["beaches", "food", "nature", "views"] as const;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl shadow-primary/10">
        <div className="flex items-center gap-2 border-b border-primary/10 px-4 py-3">
          <SearchGlyph />
          <span className="text-sm text-text-muted/70">{t("map.search")}</span>
        </div>

        <div className="flex gap-2 overflow-hidden px-4 py-3">
          {chips.map((key, i) => (
            <span
              key={key}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                i === 0
                  ? "bg-accent text-white"
                  : "bg-primary/5 text-text-muted"
              }`}
            >
              {t(`map.chips.${key}`)}
            </span>
          ))}
        </div>

        <div className="relative aspect-[4/3]">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-cyan-100 to-teal-200" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 0h400v90c-40 25-70 15-105 40s-15 55-60 70-80-5-120 15-70 50-115 60V0z"
              fill="#efe9df"
            />
            <path
              d="M0 0h400v90c-40 25-70 15-105 40s-15 55-60 70-80-5-120 15-70 50-115 60V0z"
              fill="none"
              stroke="#0f4c5c"
              strokeOpacity="0.15"
              strokeWidth="2"
            />
            <path
              d="M60 40c60 40 90 30 130 70s90 40 150 50"
              fill="none"
              stroke="#0f4c5c"
              strokeOpacity="0.12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 8"
            />
          </svg>

          <MapPin x={68} y={62} label={t("map.pins.beach")} active />
          <MapPin x={30} y={30} label={t("map.pins.tavern")} />
          <MapPin x={55} y={18} label={t("map.pins.viewpoint")} />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <div>
              <p className="text-sm font-semibold text-text">
                {t("map.pins.beach")}
              </p>
              <p className="text-xs text-text-muted">{t("map.crowd")}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("map.open")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPin({
  x,
  y,
  label,
  active = false,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex flex-col items-center">
        <span
          className={`mb-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold shadow ${
            active ? "bg-accent text-white" : "bg-white text-text"
          }`}
        >
          {label}
        </span>
        <div className="relative flex h-6 w-6 items-center justify-center">
          {active && (
            <span className="animate-radar absolute h-6 w-6 rounded-full border-2 border-accent/50" />
          )}
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ${
              active ? "bg-accent" : "bg-primary"
            }`}
          >
            <PinGlyph />
          </span>
        </div>
      </div>
    </div>
  );
}

function PlannerMockup({ t }: { t: Translator }) {
  const stops = ["coffee", "beach", "lunch"] as const;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
          <p className="font-display text-base font-bold text-primary">
            {t("planner.cardTitle")}
          </p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("planner.vibe")}
          </span>
        </div>

        <div className="relative px-5 py-4">
          <div
            className="absolute bottom-6 left-[4.2rem] top-6 w-px border-l-2 border-dashed border-primary/20"
            aria-hidden
          />
          <ul className="flex flex-col gap-4">
            {stops.map((key) => (
              <li key={key} className="relative flex items-center gap-4">
                <span className="w-10 shrink-0 text-right text-xs font-semibold text-text-muted">
                  {t(`planner.stops.${key}.time`)}
                </span>
                <span className="relative z-10 h-3 w-3 shrink-0 rounded-full border-2 border-white bg-accent shadow" />
                <span className="flex-1 text-sm font-medium text-text">
                  {t(`planner.stops.${key}.name`)}
                </span>
                <span className="text-xs font-semibold text-text-muted">
                  {t(`planner.stops.${key}.cost`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-5 mb-4 flex items-start gap-2.5 rounded-2xl bg-accent/8 px-4 py-3">
          <SparkleGlyph />
          <p className="text-xs leading-relaxed text-text-muted">
            {t("planner.aiTip")}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 px-5 py-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white shadow-md shadow-accent/25">
            <SparkleGlyph light />
            {t("planner.optimize")}
          </span>
          <span className="text-sm font-semibold text-primary">
            {t("planner.total")}
          </span>
        </div>
      </div>
    </div>
  );
}

const SHARE_CODE = ["A", "7", "K", "2", "P", "9"];

function ShareMockup({ t }: { t: Translator }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#0a3a47] p-8 shadow-2xl shadow-primary/20 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          {t("share.codeLabel")}
        </p>

        <div className="mt-4 flex gap-2">
          {SHARE_CODE.map((ch, i) => (
            <span
              key={i}
              className="flex h-12 w-10 items-center justify-center rounded-xl bg-white/10 font-display text-xl font-bold text-white ring-1 ring-white/15 sm:h-14 sm:w-12 sm:text-2xl"
            >
              {ch}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
          {t("share.hint")}
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <div className="flex -space-x-2">
            {["bg-accent", "bg-sky-400", "bg-emerald-400", "bg-amber-400"].map(
              (c) => (
                <span
                  key={c}
                  className={`h-7 w-7 rounded-full border-2 border-primary ${c}`}
                />
              ),
            )}
          </div>
          <span className="text-xs font-medium text-white/70">
            {t("share.shared")}
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-text-muted/60" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleGlyph({ light = false }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mt-0.5 h-4 w-4 shrink-0 ${light ? "text-white" : "text-accent"}`}
      fill="currentColor"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2zM19 15l.9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15z" />
    </svg>
  );
}
