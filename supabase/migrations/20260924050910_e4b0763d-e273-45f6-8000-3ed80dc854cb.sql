UPDATE public.page_content
SET
  meta_title = regexp_replace(destination_name, ',?\s*VT\s*$', '', 'i') || ', VT Airport Taxi Shuttle, BTV Airport Transfers, 24-7',
  meta_description = 'Book a 24-7 taxi shuttle from Burlington Airport (BTV) to ' || regexp_replace(destination_name, ',?\s*VT\s*$', '', 'i') || ', VT with Burlington VT Taxi Ride. Enjoy reliable airport transfers, comfortable rides, and upfront fixed rates. Call 802-448-0707.',
  draft_meta_title = CASE
    WHEN has_draft THEN regexp_replace(COALESCE(draft_destination_name, destination_name), ',?\s*VT\s*$', '', 'i') || ', VT Airport Taxi Shuttle, BTV Airport Transfers, 24-7'
    ELSE draft_meta_title
  END,
  draft_meta_description = CASE
    WHEN has_draft THEN 'Book a 24-7 taxi shuttle from Burlington Airport (BTV) to ' || regexp_replace(COALESCE(draft_destination_name, destination_name), ',?\s*VT\s*$', '', 'i') || ', VT with Burlington VT Taxi Ride. Enjoy reliable airport transfers, comfortable rides, and upfront fixed rates. Call 802-448-0707.'
    ELSE draft_meta_description
  END,
  updated_at = now()
WHERE page_type = 'location'
  AND destination_name IS NOT NULL;

UPDATE public.page_content
SET
  meta_title = 'Burlington VT to Montreal Taxi Shuttle. YUL Airport. 24-7.',
  meta_description = 'Book a 24-7 taxi shuttle from Burlington, VT to Montreal (YUL). Reliable door-to-door airport transfers, comfortable rides, upfront fixed rates, and easy booking.',
  draft_meta_title = CASE WHEN has_draft THEN 'Burlington VT to Montreal Taxi Shuttle. YUL Airport. 24-7.' ELSE draft_meta_title END,
  draft_meta_description = CASE WHEN has_draft THEN 'Book a 24-7 taxi shuttle from Burlington, VT to Montreal (YUL). Reliable door-to-door airport transfers, comfortable rides, upfront fixed rates, and easy booking.' ELSE draft_meta_description END,
  updated_at = now()
WHERE slug IN ('/burlington-montreal-shuttle', '/burlington-to-montreal-taxi');