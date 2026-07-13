-- ════════════════════════════════════════════════════════════════
-- "The Final" — pre-bookings table
-- Run in the Supabase SQL editor (project srvznhpfgynwxqmpfdmf).
-- ════════════════════════════════════════════════════════════════

create table if not exists public.prebookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  whatsapp text not null,
  email text,
  package text,             -- entry | unlimited | vip
  guests int not null default 1,
  source text not null default 'the-final-page'
);

-- RLS on, NO public policies. Writes happen server-side via the service-role key
-- (which bypasses RLS) through /api/prebook — so the list is never selectable by
-- the public. Read the leads from the Supabase dashboard / a service-role query.
alter table public.prebookings enable row level security;

-- ── Optional ──────────────────────────────────────────────────────
-- Only needed if you ever switch to a CLIENT-SIDE anon-key insert instead of the
-- server route. Insert-only for anon; still no select/update/delete. Leave
-- commented while /api/prebook (service role) handles writes.
--
-- create policy "anon insert prebookings"
--   on public.prebookings for insert
--   to anon
--   with check (true);
