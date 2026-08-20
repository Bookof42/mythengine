-- Anonymized play log for the recursive myth engine.
-- No names, no birth data, no free-text reflections.

create table if not exists constellation (
  myth_id text primary key,
  count   int not null default 0
);

create table if not exists play_events (
  id          text primary key,
  created_at  timestamptz not null default now(),
  myth_id     text not null,
  session_len int not null,
  weights     jsonb not null,
  step_kinds  jsonb not null
);

create table if not exists content_stats (
  mechanic text not null,
  item_id  text not null,
  choice   text not null,
  plays    int not null default 0,
  primary key (mechanic, item_id, choice)
);

create table if not exists content_to_myth (
  mechanic text not null,
  item_id  text not null,
  choice   text not null,
  myth_id  text not null,
  plays    int not null default 0,
  primary key (mechanic, item_id, choice, myth_id)
);

create table if not exists omen_events (
  id         serial primary key,
  created_at timestamptz not null default now(),
  omen_id    text not null,
  response   text not null
);

-- Optional signed-in journal (per-user, never published).
create table if not exists user_journal (
  id          text primary key,
  user_id     text not null,
  started_at  timestamptz not null,
  finished_at timestamptz not null,
  myth_id     text not null,
  question    text not null,
  weights     jsonb not null,
  steps       jsonb not null
);
create index if not exists user_journal_user_idx on user_journal (user_id);
