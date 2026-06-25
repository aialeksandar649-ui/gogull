import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  /** "light" on cream/white backgrounds, "dark" on the teal section. */
  tone?: "light" | "dark";
};

export function FeatureCard({
  title,
  description,
  icon,
  tone = "light",
}: FeatureCardProps) {
  const dark = tone === "dark";

  return (
    <Card
      size="sm"
      className={cn(
        "group relative h-full gap-4 py-6 shadow-none transition-all duration-300 hover:-translate-y-1.5",
        dark
          ? "border-white/10 bg-white/[0.06] ring-white/10 hover:border-white/25 hover:bg-white/[0.1] hover:ring-white/25"
          : "border-primary/10 bg-white shadow-sm ring-primary/10 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/5 hover:ring-accent/20"
      )}
    >
      <CardContent className="flex flex-col gap-4 pt-0">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300",
            dark
              ? "bg-accent/15 text-accent group-hover:bg-accent group-hover:text-white"
              : "bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white"
          )}
        >
          {icon}
        </div>
        <h3
          className={cn(
            "text-lg font-semibold",
            dark ? "text-white" : "text-text"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            dark ? "text-white/70" : "text-text-muted"
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
