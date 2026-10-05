-- ════════════════════════════════════════════════════════════════
-- VR Entertainment — database schema
-- Run in the Supabase SQL editor (project srvznhpfgynwxqmpfdmf).
-- RLS is on with NO public policies: all writes go through the server API
-- routes using the service-role key (which bypasses RLS). The anon key never
-- writes, and the lead tables are never publicly selectable.
-- ════════════════════════════════════════════════════════════════

-- ── Phase 1 (run now) ────────────────────────────────────────────

create table if not exists score_requests (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  email text not null,
  utm jsonb,
  score int,
  report jsonb,
  created_at timestamptz default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  business_type text check (business_type in ('venue','artist','hospitality','events','other')),
  message text,
  source text,
  created_at timestamptz default now()
);

alter table score_requests enable row level security;
alter table enquiries enable row level security;

-- ── Phase 3 (concierge + feedback loop — needs the pgvector extension) ──
-- Uncomment when building /lab. kb_chunks stores retrieved knowledge per tenant.
--
-- create extension if not exists vector;
--
-- create table if not exists kb_chunks (
--   id bigserial primary key,
--   tenant text not null,
--   content text not null,
--   embedding vector(1024),
--   updated_at timestamptz default now()
-- );
--
-- create table if not exists unanswered_questions (
--   id bigserial primary key,
--   tenant text,
--   question text,
--   created_at timestamptz default now()
-- );
--
-- alter table kb_chunks enable row level security;
-- alter table unanswered_questions enable row level security;
