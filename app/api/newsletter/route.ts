import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const locale = typeof body.locale === "string" ? body.locale : "hr";

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    if (!supabase) {
      console.info("[newsletter] signup (no Supabase):", { email, locale });
      return NextResponse.json({ ok: true, stored: false });
    }

    const { error } = await supabase.from("newsletter_signups").insert({
      email,
      locale,
      created_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      console.error("[newsletter]", error);
      return NextResponse.json({ error: "Storage failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
