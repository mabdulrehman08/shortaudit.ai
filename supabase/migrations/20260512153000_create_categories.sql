create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, category_id)
);

create index if not exists product_categories_category_id_idx on public.product_categories(category_id);
create index if not exists product_categories_product_id_idx on public.product_categories(product_id);

insert into public.categories (name, slug, description, image)
values
  ('Fat Loss', 'fat-loss', 'Research peptides frequently studied in metabolic, appetite, and body-composition models.', '/images/categories/fat-loss.jpg'),
  ('Muscle Growth', 'muscle-growth', 'Compounds organized for lean-mass, growth signaling, and performance research workflows.', '/images/categories/muscle-growth.jpg'),
  ('Recovery & Healing', 'recovery-healing', 'Peptides commonly evaluated in tissue-repair, inflammation, and recovery-focused studies.', '/images/categories/recovery-healing.jpg'),
  ('Cognitive Support', 'cognitive-support', 'Research compounds for cognition, neuroprotection, and focus-oriented laboratory models.', '/images/categories/cognitive-support.jpg'),
  ('Longevity & Anti Aging', 'longevity-anti-aging', 'Products grouped for regenerative, cellular health, and healthy-aging research protocols.', '/images/categories/longevity-anti-aging.jpg'),
  ('Research Essentials', 'research-essentials', 'Core lab essentials and high-demand compounds for repeatable research procurement.', '/images/categories/research-essentials.jpg')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  updated_at = now();
