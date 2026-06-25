-- Run in Supabase SQL editor for newsletter signups
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'hr',
  created_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

-- Service role inserts via API route only
create policy "Service role full access"
  on public.newsletter_signups
  for all
  using (false)
  with check (false);
