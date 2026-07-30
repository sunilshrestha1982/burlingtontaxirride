ALTER TABLE public.page_content
  ADD COLUMN IF NOT EXISTS draft_meta_title text,
  ADD COLUMN IF NOT EXISTS draft_meta_description text,
  ADD COLUMN IF NOT EXISTS draft_eyebrow text,
  ADD COLUMN IF NOT EXISTS draft_hero_title text,
  ADD COLUMN IF NOT EXISTS draft_hero_highlight text,
  ADD COLUMN IF NOT EXISTS draft_hero_description text,
  ADD COLUMN IF NOT EXISTS draft_hero_image text,
  ADD COLUMN IF NOT EXISTS draft_body text,
  ADD COLUMN IF NOT EXISTS has_draft boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS draft_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS published_at timestamptz;

UPDATE public.page_content SET published_at = COALESCE(published_at, updated_at);

-- Public (anon) readers may only read published columns, never draft columns.
REVOKE SELECT ON public.page_content FROM anon;
GRANT SELECT (slug, nav_label, sort_order, meta_title, meta_description, eyebrow,
              hero_title, hero_highlight, hero_description, hero_image, body,
              updated_at, published_at)
  ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;