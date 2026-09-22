ALTER TABLE public.page_content
  ADD COLUMN IF NOT EXISTS id uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS draft_slug text,
  ADD COLUMN IF NOT EXISTS page_type text NOT NULL DEFAULT 'main',
  ADD COLUMN IF NOT EXISTS destination_name text,
  ADD COLUMN IF NOT EXISTS content jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS draft_content jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS page_content_id_key ON public.page_content (id);
CREATE UNIQUE INDEX IF NOT EXISTS page_content_slug_key ON public.page_content (slug);
CREATE INDEX IF NOT EXISTS page_content_page_type_sort_idx ON public.page_content (page_type, sort_order);

CREATE TABLE public.page_redirects (
  old_slug text PRIMARY KEY,
  new_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_redirects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_redirects TO authenticated;
GRANT ALL ON public.page_redirects TO service_role;
ALTER TABLE public.page_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read page redirects" ON public.page_redirects FOR SELECT USING (true);
CREATE POLICY "Admins can insert page redirects" ON public.page_redirects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update page redirects" ON public.page_redirects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete page redirects" ON public.page_redirects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT ON public.page_content FROM anon;
GRANT SELECT (id, slug, nav_label, sort_order, page_type, destination_name,
              meta_title, meta_description, eyebrow, hero_title, hero_highlight,
              hero_description, hero_image, body, content, updated_at, published_at)
  ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;