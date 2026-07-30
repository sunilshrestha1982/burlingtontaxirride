CREATE TABLE public.page_content (
  slug TEXT PRIMARY KEY,
  nav_label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 100,
  meta_title TEXT,
  meta_description TEXT,
  eyebrow TEXT,
  hero_title TEXT,
  hero_highlight TEXT,
  hero_description TEXT,
  hero_image TEXT,
  body TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert page content" ON public.page_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update page content" ON public.page_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete page content" ON public.page_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_page_content_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER page_content_updated_at BEFORE UPDATE ON public.page_content
FOR EACH ROW EXECUTE FUNCTION public.touch_page_content_updated_at();

INSERT INTO public.page_content (slug, nav_label, sort_order) VALUES
  ('/', 'Home', 10),
  ('/airport-transfers', 'Airport Transfers', 20),
  ('/airports-we-serve', 'Airports We Serve', 30),
  ('/long-distance', 'Long Distance', 40),
  ('/corporate', 'Corporate', 60),
  ('/ski-resort', 'Ski Resort', 70),
  ('/book-online', 'Reservation', 80),
  ('/blog', 'Blog', 90),
  ('/contact', 'Contact Us', 100);