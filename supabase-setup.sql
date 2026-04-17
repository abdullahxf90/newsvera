-- =====================================================
-- STEP 1: Run this in Supabase → SQL Editor
-- =====================================================

create table if not exists articles (
  id              text primary key default gen_random_uuid()::text,
  title           text not null,
  slug            text unique not null,
  excerpt         text,
  content         text,
  featured_image  text,
  image_caption   text,
  image_credit    text,
  category        text,
  category_slug   text,
  tags            text[],
  author          text,
  published_at    timestamptz default now(),
  updated_at      timestamptz default now(),
  read_time       int default 5,
  sources         jsonb,
  fact_checker    text,
  is_featured     boolean default false,
  is_breaking     boolean default false,
  is_trending     boolean default false,
  is_editors_pick boolean default false
);

-- Enable Row Level Security
alter table articles enable row level security;

-- Anyone can read articles (public news site)
create policy "Public can read articles"
  on articles for select
  using (true);

-- Only logged-in admins can insert/update/delete
create policy "Authenticated users can insert articles"
  on articles for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update articles"
  on articles for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete articles"
  on articles for delete
  using (auth.role() = 'authenticated');


-- =====================================================
-- STEP 2: Create Storage bucket for images
-- Go to: Storage → New bucket
--   Name: article-images
--   Public bucket: YES (toggle on)
-- Then run this SQL to allow authenticated uploads:
-- =====================================================

create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (bucket_id = 'article-images' AND auth.role() = 'authenticated');

create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "Authenticated users can delete images"
  on storage.objects for delete
  using (bucket_id = 'article-images' AND auth.role() = 'authenticated');


-- =====================================================
-- STEP 3: Create your admin account
-- Go to: Authentication → Users → Add User
--   Enter your email and password
--   That's it — you can now log in at yoursite.com/admin
-- =====================================================
