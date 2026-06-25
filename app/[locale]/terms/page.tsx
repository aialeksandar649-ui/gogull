import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isHr = locale === "hr";

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-primary">
        {isHr ? "Uvjeti korištenja" : "Terms of Service"}
      </h1>
      <p className="mt-4 text-text-muted">
        {isHr
          ? "Pravni tekst bit će objavljen uskoro. Za upite kontaktirajte hello@gogull.app."
          : "Legal text will be published soon. For inquiries contact hello@gogull.app."}
      </p>
    </article>
  );
}
