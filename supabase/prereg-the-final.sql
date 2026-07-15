-- ════════════════════════════════════════════════════════════════
-- "The Final" — PUBLIC guest pre-registration
-- Run in the Supabase SQL editor (project srvznhpfgynwxqmpfdmf).
-- ════════════════════════════════════════════════════════════════

create table if not exists public.prereg_the_final (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  whatsapp text not null,
  email text,
  party_size int not null default 1
);

-- RLS on, NO public policies. Writes happen server-side via the service-role key
-- (which bypasses RLS) through /api/prereg — so the guest list is never readable
-- by the public. Read it from the Supabase dashboard / a service-role query.
alter table public.prereg_the_final enable row level security;

-- Handy view of signups:
--   select created_at, name, whatsapp, email, party_size
--   from prereg_the_final order by created_at desc;
