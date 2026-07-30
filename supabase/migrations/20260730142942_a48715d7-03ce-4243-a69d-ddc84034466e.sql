
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  cover_image text,
  body text,
  author text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  sort_order integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts" ON public.blog_posts
  FOR SELECT USING (published = true);
CREATE POLICY "Admins can read all posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_page_content_updated_at();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  service text,
  pickup text,
  dropoff text,
  message text,
  handled boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a message" ON public.contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.contact_messages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.blog_posts (slug, title, excerpt, cover_image, body, author, published, published_at, meta_title, meta_description, sort_order)
VALUES (
  'how-to-book-a-taxi-in-burlington-vermont',
  'How to book a taxi in Burlington, Vermont',
  'Flat, custom-quoted fares for BTV airport transfers, long-distance trips and ski-resort shuttles — here is how booking works.',
  '/places/burlington-vt.jpg',
  E'One of the questions we hear most often is: "How do I book a reliable ride?" Burlington VT Taxi Ride offers flat, custom-quoted fares — no surge pricing, no mystery multipliers, and no last-minute price hikes during snowstorms, UVM move-in week, or Friday-night airport rushes.\n\nBTV Airport Flat Fares\nBurlington International Airport (BTV) is our most-requested destination. We use flat, distance-based fares so you know the price the moment you book. Fares are per vehicle (up to 4 passengers plus standard luggage) and include meet-and-greet, baggage assistance and tolls.\n\nLong-Distance and Ski-Resort Trips\nHeading to the mountains or out of state? Long-distance fares are quoted door-to-door and include all tolls, fuel and driver wait time at the curb. Round-trip and multi-stop discounts are available on request.\n\nHourly and As-Directed Service\nFor wine tours, wedding shuttles, conference days and multi-stop business runs we offer flexible hourly service. Your driver stays with you for the duration, with no per-mile surcharge.',
  'Burlington VT Taxi Ride',
  true,
  now(),
  'How to Book a Taxi in Burlington, Vermont',
  'Flat-rate Burlington taxi booking for BTV airport transfers, long-distance rides and ski resort shuttles. Reserve online in seconds.',
  10
);
