# Burlington Taxi Location CMS

## Goal
Rework **Website Pages** into a clearer two-pane back office inspired by the reference site, and make every Vermont destination a fully editable Burlington Taxi landing page.

## Back-office layout
- Keep the existing protected admin sidebar and draft/publish workflow.
- Replace the long page list with a searchable, grouped page manager for Main Pages and Location Pages.
- Add page-status filters for Published and Draft, plus a clear **Add location page** action.
- Organize each editor into focused sections:
  - Page identity: page name and editable URL slug
  - Search appearance: meta title, meta description, canonical preview, and length guidance
  - Hero: badge, heading, highlighted text, description, and image
  - Main content: introduction heading and paragraphs, service details, benefits, and call-to-action copy
  - Review: draft preview, save draft, discard, and publish
- Show the final public URL and prevent invalid or duplicate slugs before saving.

## Location pages
- Add every destination in the existing Vermont destination catalogue to the CMS.
- Use canonical URLs in the selected format: `/burlington-to-{town}-taxi`.
- Generate useful Burlington Taxi defaults for every page, including unique page names, headings, meta titles, meta descriptions, and destination-specific copy.
- Preserve the assigned destination image and existing booking actions on each page.
- Update destination links and the XML sitemap to use the new canonical URLs.
- Keep every previous destination URL working with a permanent redirect to its new URL, protecting existing bookmarks and search visibility.

## Publishing behavior
- Extend the current draft model so URL and all content-section edits remain private until **Publish to website** is selected.
- On publish, atomically apply the slug and content changes.
- Public visitors and search engines will only receive published values.
- If a URL changes, preserve the prior URL as a permanent redirect rather than creating a broken page.

## Technical details
- Give each CMS page a stable ID so changing the URL does not change the page identity.
- Store published and draft structured page sections separately, while retaining compatibility with existing rows.
- Add server-side slug normalization, uniqueness checks, reserved-path protection, and admin authorization.
- Make the dynamic location page resolve database-managed canonical slugs and render all editable sections with built-in defaults as fallback.
- Seed all destination rows in a database migration with explicit grants and existing row-level access rules preserved.
- Keep main fixed routes such as Home and Contact URL-locked; URL editing applies to location landing pages.
- Add unique back-office page metadata and retain `noindex` for admin screens.

## Validation
- Verify saving a draft does not change the public page.
- Verify publishing changes the URL, metadata, hero, and page sections together.
- Verify an old URL redirects permanently to the new canonical URL.
- Verify all Vermont destination pages appear in the back office and sitemap.
- Check the editor and a sample location page at desktop and mobile widths.
