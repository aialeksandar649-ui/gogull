import { type ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CtaButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
};

const sizes = {
  sm: "h-9 gap-1.5 px-4 text-xs",
  md: "h-11 gap-2 px-6 text-sm",
  lg: "h-14 gap-2.5 px-8 text-base",
};

const variants = {
  primary:
    "border-transparent bg-gradient-to-r from-accent to-[#ff8566] text-white shadow-lg shadow-accent/30 hover:bg-gradient-to-r hover:from-accent hover:to-[#ff8566] hover:shadow-xl hover:shadow-accent/40 hover:brightness-105 active:brightness-95",
  secondary:
    "border-transparent bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
  ghost:
    "border-transparent bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  outline:
    "border-2 border-primary/20 bg-white text-primary hover:border-accent/40 hover:bg-accent/5",
};

/** Landing-page CTA link — shadcn Button with brand styling. */
export function CtaButton({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...props
}: CtaButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "rounded-full font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        sizes[size],
        variants[variant],
        className
      )}
    >
      <a {...props}>
        {children}
        {arrow && (
          <ArrowRight
            className="size-4 shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5"
            aria-hidden
          />
        )}
      </a>
    </Button>
  );
}
