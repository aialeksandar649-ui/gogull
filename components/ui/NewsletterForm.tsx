"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("emailPlaceholder")}
        disabled={status === "loading"}
        className={cn(
          "min-h-11 flex-1 rounded-full border-white/20 bg-white/10 px-4 text-sm text-white shadow-none",
          "placeholder:text-white/50 focus-visible:border-accent/60 focus-visible:bg-white/15 focus-visible:ring-accent/30"
        )}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "min-h-11 rounded-full border-transparent bg-gradient-to-r from-accent to-[#ff8566] px-6 text-sm font-semibold text-white",
          "shadow-lg shadow-accent/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 hover:brightness-105",
          "active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
        )}
      >
        {t("submit")}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
          aria-hidden
        />
      </Button>
      {status === "success" && (
        <p className="text-sm text-green-300 sm:col-span-2">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-300 sm:col-span-2">{t("error")}</p>
      )}
    </form>
  );
}
