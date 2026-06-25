import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <Badge
        variant="secondary"
        className={cn(
          "h-auto gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
          dark
            ? "border-transparent bg-white/10 text-accent"
            : "border-transparent bg-accent/10 text-accent"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed",
            dark ? "text-white/70" : "text-text-muted"
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
