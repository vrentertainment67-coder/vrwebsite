-- ════════════════════════════════════════════════════════════════
-- VR Entertainment — database schema
-- Run this in the Supabase SQL editor (project srvznhpfgynwxqmpfdmf).
-- Safe to re-run: uses IF NOT EXISTS / idempotent policy drops.
-- ════════════════════════════════════════════════════════════════

-- LEADS: strategy-call / contact form
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  segment text,            -- venue | artist | brand | event | other
  message text,
  source text,             -- homepage | service-page | referral | the-vic-fix | ads
  created_at timestamptz default now()
);

-- AUDIT REQUESTS: free-audit lead magnet
create table if not exists audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  website_url text,
  instagram text,
  segment text,
  created_at timestamptz default now()
);

-- NEWSLETTER
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- OPTIONAL CONTENT TABLES (lightweight CMS so content edits don't need a redeploy)
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  segment text,
  summary text,
  problem text,
  approach text,
  result text,
  metric_label text,       -- e.g. "SEO score"
  metric_before text,      -- e.g. "38"
  metric_after text,       -- e.g. "92"
  cover_image text,
  before_image text,
  after_image text,
  sort_order int default 0,
  published boolean default false
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar text,
  sort_order int default 0,
  published boolean default false
);

-- BLOG / insights (lightweight CMS — edit rows in the Supabase dashboard)
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_md text,            -- markdown, rendered with `marked`
  cover_image text,
  published boolean default false,
  published_at timestamptz default now(),
  sort_order int default 0
);

-- ─────────────────  Row Level Security  ─────────────────
-- Inserts happen server-side via the service role key (which bypasses RLS),
-- so there are NO public insert/select policies on the lead tables.
alter table leads enable row level security;
alter table audit_requests enable row level security;
alter table subscribers enable row level security;
alter table case_studies enable row level security;
alter table testimonials enable row level security;
alter table blog_posts enable row level security;

-- Public may READ published content only:
drop policy if exists "public read published case studies" on case_studies;
create policy "public read published case studies" on case_studies
  for select using (published = true);

drop policy if exists "public read published testimonials" on testimonials;
create policy "public read published testimonials" on testimonials
  for select using (published = true);

drop policy if exists "public read published blog posts" on blog_posts;
create policy "public read published blog posts" on blog_posts
  for select using (published = true);

-- No public policies on leads / audit_requests / subscribers (server-side writes only).
