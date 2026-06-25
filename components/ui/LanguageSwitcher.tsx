"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
  };

  return (
    <div className="flex gap-1 rounded-full bg-white/10 p-1 text-xs font-semibold">
      {(["hr", "en"] as const).map((loc) => (
        <Button
          key={loc}
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => switchLocale(loc)}
          aria-current={locale === loc ? "true" : undefined}
          className={cn(
            "rounded-full px-3 uppercase",
            locale === loc
              ? "bg-white text-primary hover:bg-white hover:text-primary"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          )}
        >
          {loc}
        </Button>
      ))}
    </div>
  );
}
