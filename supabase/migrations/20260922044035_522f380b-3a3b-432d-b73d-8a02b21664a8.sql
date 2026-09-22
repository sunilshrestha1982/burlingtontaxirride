CREATE OR REPLACE FUNCTION public.publish_page_content(_page_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  page_row public.page_content%ROWTYPE;
  next_slug text;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  SELECT * INTO page_row
  FROM public.page_content
  WHERE id = _page_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Page not found'; END IF;
  IF NOT page_row.has_draft THEN RAISE EXCEPTION 'There are no pending changes to publish'; END IF;

  next_slug := COALESCE(NULLIF(page_row.draft_slug, ''), page_row.slug);
  IF EXISTS (SELECT 1 FROM public.page_content WHERE slug = next_slug AND id <> _page_id) THEN
    RAISE EXCEPTION 'That URL is already used by another page';
  END IF;

  IF next_slug <> page_row.slug THEN
    INSERT INTO public.page_redirects (old_slug, new_slug)
    VALUES (page_row.slug, next_slug)
    ON CONFLICT (old_slug) DO UPDATE SET new_slug = EXCLUDED.new_slug;
    UPDATE public.page_redirects SET new_slug = next_slug WHERE new_slug = page_row.slug;
  END IF;

  UPDATE public.page_content SET
    slug = next_slug,
    nav_label = COALESCE(NULLIF(page_row.draft_nav_label, ''), page_row.nav_label),
    destination_name = COALESCE(NULLIF(page_row.draft_destination_name, ''), page_row.destination_name),
    meta_title = page_row.draft_meta_title,
    meta_description = page_row.draft_meta_description,
    eyebrow = page_row.draft_eyebrow,
    hero_title = page_row.draft_hero_title,
    hero_highlight = page_row.draft_hero_highlight,
    hero_description = page_row.draft_hero_description,
    hero_image = page_row.draft_hero_image,
    body = page_row.draft_body,
    content = COALESCE(page_row.draft_content, '{}'::jsonb),
    draft_slug = NULL,
    draft_nav_label = NULL,
    draft_destination_name = NULL,
    draft_meta_title = NULL,
    draft_meta_description = NULL,
    draft_eyebrow = NULL,
    draft_hero_title = NULL,
    draft_hero_highlight = NULL,
    draft_hero_description = NULL,
    draft_hero_image = NULL,
    draft_body = NULL,
    draft_content = NULL,
    has_draft = false,
    draft_updated_at = NULL,
    published_at = now()
  WHERE id = _page_id;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_page_content(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_page_content(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_page_content(uuid) TO service_role;