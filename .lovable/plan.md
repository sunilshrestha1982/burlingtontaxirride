# Full Taxi Page Builder

## Goal
Turn Website Pages into a full long-form taxi page builder inspired by Green Valley Taxi’s back office. Existing published pages, draft controls, page URLs, redirects, images, and search metadata remain intact.

## What will be built

### Page library
- Keep the searchable Main Pages and Location Pages lists.
- Add clear Published/Draft filters and page status indicators.
- Keep “Add location page” with an automatically suggested Burlington-to-destination taxi URL.

### Long-form block editor
- Replace the fixed destination-content form with reusable, reorderable blocks.
- Support the blocks taxi pages need: text/introduction, benefits grid, service details, route information, image with text, FAQ, call-to-action, and reservation form placement.
- Let admins add, duplicate, reorder, collapse, and remove blocks.
- Give every block the fields appropriate to its content, including headings, descriptions, images, labels, and links.
- Convert existing structured location content into blocks so current pages are not lost.

### Real-time preview
- Show a live desktop/mobile-style preview beside the editor on wide screens and below it on smaller screens.
- Update the preview immediately as text, images, blocks, or their order changes—without saving first.
- Preview the complete long page, including the hero, all blocks, CTA areas, and search-result snippet.

### Draft and publishing workflow
- Save the complete block layout as an unpublished draft.
- Publish page identity, URL, search metadata, hero, and all blocks together.
- Keep discard-draft behavior and automatic permanent redirects when a published URL changes.
- Validate duplicate/reserved URLs and required block fields before publishing.

### Public pages
- Render database-managed taxi pages from their ordered blocks.
- Keep compatible fallback rendering for existing pages while they are migrated.
- Preserve canonical metadata, share images, booking links, and destination navigation.

## Technical details
- Store ordered block data in the existing published/draft JSON content fields; no new table is required.
- Add typed block definitions and shared block rendering so admin preview and public pages use the same presentation.
- Continue using the existing protected admin actions and role checks.
- Validate the editor and a representative long Burlington-to-Stowe page at desktop and mobile sizes.
