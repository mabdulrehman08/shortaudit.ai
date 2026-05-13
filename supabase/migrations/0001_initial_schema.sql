create extension if not exists "pgcrypto";

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_url text,
  file_size bigint not null,
  mime_type text not null,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

create table if not exists public.transcripts (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos(id) on delete cascade,
  transcript text not null,
  provider text not null default 'heuristic-whisper-fallback',
  created_at timestamptz not null default now()
);

create table if not exists public.analysis_reports (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  report jsonb not null,
  scores jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;
alter table public.transcripts enable row level security;
alter table public.analysis_reports enable row level security;

create policy "Users can manage their videos" on public.videos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can read transcripts for their videos" on public.transcripts
  for select using (exists (select 1 from public.videos where videos.id = transcripts.video_id and videos.user_id = auth.uid()));

create policy "Users can insert transcripts for their videos" on public.transcripts
  for insert with check (exists (select 1 from public.videos where videos.id = transcripts.video_id and videos.user_id = auth.uid()));

create policy "Users can manage their reports" on public.analysis_reports
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
