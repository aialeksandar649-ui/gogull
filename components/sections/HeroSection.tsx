"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { StreamVideo } from "@/components/ui/StreamVideo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  webappUrl?: string;
  heroVideoUrl?: string;
  heroPosterUrl?: string;
};

// bunny.net Stream library (ID 579625). Public HLS playback needs only the
// CDN hostname + video GUID — no API key.
const BUNNY_HOST = "vz-01272802-98c.b-cdn.net";
const stream = (guid: string) => `https://${BUNNY_HOST}/${guid}/playlist.m3u8`;

type LocaleText = { category: string; name: string; description: string };

type HeroLocation = {
  id: string;
  /** bunny.net Stream URL for the real-life foreground video (.m3u8 or .mp4) */
  foregroundVideo: string;
  /** bunny.net Stream URL for the Google Earth fly-over background (.m3u8 or .mp4) */
  backgroundVideo: string;
  /** Tailwind gradient shown behind a video while it loads / as fallback */
  gradient: string;
  /** Pulsing map-pin position over the background, in % of the frame */
  pin: { x: number; y: number };
  text: { hr: LocaleText; en: LocaleText };
};

// ─────────────────────────────────────────────────────────────────────────────
// SWAP HERE: paste your bunny.net Stream URLs + edit text. Add/remove entries
// freely — the carousel adapts to the array length.
// ─────────────────────────────────────────────────────────────────────────────
const LOCATIONS: HeroLocation[] = [
  {
    id: "beach",
    foregroundVideo: stream("91c3899c-d1c5-4237-b950-bd6f974f034b"),
    backgroundVideo: "/bg-beach.mp4",
    gradient: "from-cyan-400 via-sky-500 to-blue-800",
    pin: { x: 58, y: 46 },
    text: {
      hr: {
        category: "Plaža",
        name: "Plaža Kašjuni",
        description: "Šljunčana plaža ispod marjanske borove šume — bistro more i beach bar u srcu Splita.",
      },
      en: {
        category: "Beach",
        name: "Kašjuni Beach",
        description: "A pebble beach below Marjan's pine forest — clear sea and a beach bar in the heart of Split.",
      },
    },
  },
  {
    id: "restaurant",
    foregroundVideo: stream("0a567027-2858-4053-9c96-372db640620b"),
    backgroundVideo: "/bg-restaurant.mp4",
    gradient: "from-amber-400 via-orange-500 to-red-700",
    pin: { x: 44, y: 52 },
    text: {
      hr: {
        category: "Konoba",
        name: "Konoba Argola",
        description: "Obiteljska konoba iznad Podstrane s pogledom na Split — domaća peka i prava dalmatinska kuhinja.",
      },
      en: {
        category: "Tavern",
        name: "Konoba Argola",
        description: "A family-run tavern above Podstrana overlooking Split — homemade peka and authentic Dalmatian cooking.",
      },
    },
  },
  {
    id: "rafting",
    foregroundVideo: stream("8462b381-d4e8-47db-ad87-e379a694c5ea"),
    backgroundVideo: "/bg-rafting.mp4",
    gradient: "from-emerald-400 via-teal-500 to-teal-900",
    pin: { x: 50, y: 38 },
    text: {
      hr: {
        category: "Avantura",
        name: "Rafting Vukasović",
        description: "Brzaci, slapovi i skokovi u kristalnu Cetinu — tri sata avanture iznad Omiša.",
      },
      en: {
        category: "Adventure",
        name: "Rafting Vukasović",
        description: "Rapids, waterfalls and cliff jumps into the crystal-clear Cetina — three hours of adventure near Omiš.",
      },
    },
  },
];

const AUTO_ADVANCE_MS = 8500; // set to 0 to disable auto-rotation

export function HeroSection({
  webappUrl = siteConfig.webappUrl,
}: HeroSectionProps) {
  const t = useTranslations("hero");
  const locale = useLocale() as "hr" | "en";

  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);

  const count = LOCATIONS.length;
  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-rotate; the `active` dependency resets the timer on manual navigation.
  useEffect(() => {
    if (AUTO_ADVANCE_MS <= 0) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, count]);

  const current = LOCATIONS[active];
  const copy = current.text[locale];

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-primary text-white">
      {/* Background fly-over layers — all mounted, crossfaded for instant switching */}
      {LOCATIONS.map((loc, i) => (
        <div
          key={loc.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${loc.gradient}`} />
          <StreamVideo
            src={loc.backgroundVideo}
            active={i === active}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Readability overlay — keeps the left text legible, lets the aerial breathe */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto grid min-h-[88vh] max-w-6xl gap-x-8 gap-y-6 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Headline */}
        <h1 className="order-1 font-display text-[2.7rem] font-bold leading-[1.03] tracking-tight sm:text-6xl lg:col-start-1 lg:row-start-1 lg:text-7xl">
          <span className="text-accent">GoGull</span> {t("headline")}
        </h1>

        {/* Phone mockup — below the headline on mobile, right column on desktop */}
        <div className="order-2 mx-auto w-full max-w-[170px] sm:max-w-[220px] lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:ml-auto lg:mr-0 lg:max-w-[280px] lg:self-center">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[2.5rem] border-[6px] border-black/80 bg-black shadow-2xl ring-1 ring-white/10">
            {/* Notch */}
            <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90" />

            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${loc.gradient}`} />
                <StreamVideo
                  src={loc.foregroundVideo}
                  active={i === active}
                  muted={muted}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}

            {/* Mute toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? t("unmute") : t("mute")}
              className="absolute bottom-3 right-3 z-20 rounded-full border-transparent bg-black/55 text-white backdrop-blur hover:bg-black/75"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Location info + CTA — below the video on mobile, left column on desktop */}
        <div className="order-3 flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
          {/* Dynamic per-location copy */}
          <div key={current.id} className="flex flex-col gap-3 animate-[fadeIn_0.4s_ease]">
            <Badge
              className="h-auto w-fit gap-2 rounded-full border-transparent bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {copy.category}
            </Badge>
            <p className="text-2xl font-semibold sm:text-3xl">{copy.name}</p>
            <p className="max-w-md text-sm text-white/85 sm:text-base">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <CtaButton
              href={webappUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              arrow
              className="btn-shimmer btn-glow"
            >
              {t("cta")}
            </CtaButton>
            <p className="max-w-md text-xs text-white/65">{t("disclaimer")}</p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        onClick={() => go(-1)}
        aria-label={t("prev")}
        className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border-transparent bg-white/15 text-white backdrop-blur hover:bg-white/30 sm:left-6"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        onClick={() => go(1)}
        aria-label={t("next")}
        className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border-transparent bg-white/15 text-white backdrop-blur hover:bg-white/30 sm:right-6"
      >
        <ChevronRight className="size-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {LOCATIONS.map((loc, i) => (
          <Button
            key={loc.id}
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setActive(i)}
            aria-label={loc.text[locale].name}
            aria-current={i === active}
            className={cn(
              "h-2 min-w-0 rounded-full p-0 transition-all",
              i === active
                ? "w-7 bg-accent hover:bg-accent"
                : "w-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </section>
  );
}
