# SEO audit and follow-up

## Update — 2026-10-27

- Refined the homepage title and description to identify Jaidev Kamboj as an embedded software and R&D engineer, with Karnal, India and core specialties included in natural language. Open Graph, X/Twitter, and `ProfilePage` metadata now use the same summary.
- Corrected `Person.sameAs` to point to the matching public GitHub profile and LinkedIn profile, and added the X profile linked from GitHub. LinkedIn and GitHub Profile identities and the portfolio URL cross-reference were checked publicly.
- Linked the `Person` entity back to the site's `ProfilePage`; kept the one-page canonical URL and added the visible content update date to the sitemap. The Google verification file is at the site root (commit `fb871f8`); the SEO updates are in commit `2f21075`.
- No visual layout or CSS changes were made in this SEO update.
- Still unverified: the live Google URL Inspection result, Search Console property and sitemap status, manual actions/security reports, and PageSpeed field data. These require the site owner's Search Console account. GitHub `main` has the SEO commit, but the public search preview still showed the old title from a crawl last week and this environment could not fetch the verification file or sitemap from GitHub Pages, so live deployment and Google recrawl need confirmation.
- Content opportunity: the four “Latest Insights” cards are previews, not article pages. Add original, accurate article pages with their own canonical URLs, descriptions, and sitemap entries when the underlying technical details are ready; the current hash sections are not separate indexable pages.

Audit date: 2026-10-27
Site: <https://jaidevkamboj.github.io/>
Hosting: GitHub Pages, static single-page portfolio

## Lighthouse calculator values supplied by the user

The screenshot shows a mobile calculator score of 79 with FCP 907 ms, Speed Index 3,655 ms, LCP 5,424 ms, TBT 0 ms, and CLS 0.00. These are calculator inputs, not a fresh Lighthouse or PageSpeed run against the deployed site. They indicate that LCP and visual completion are the clearest opportunities; blocking time and layout shift are already strong.

## Completed in the local project

- Kept the current single-page design and section URLs. The page has one canonical homepage URL, an index/follow robots directive, a sitemap containing the canonical URL, and semantic section anchors.
- Confirmed the head includes a descriptive page title and description, canonical URL, Open Graph/X metadata, language, and indexable robots settings.
- Kept the existing `WebSite`, `ProfilePage`, and `Person` JSON-LD; `Person.sameAs` now links to the public GitHub, LinkedIn, and X profiles.
- Updated the sitemap `<lastmod>` to `2026-10-27` for the title, description, and profile-entity update. The footer Sitemap link points to `/sitemap.xml`.
- Added a lossless WebP source for the mobile hero, retaining the PNG as the browser fallback. Added a lossless WebP footer artwork option while retaining the PNG fallback and the current desktop/mobile layout rules.
- Preloaded the responsive hero portrait with high fetch priority and marked it eager; preloaded the CSS hero artwork early at low priority on mobile so it does not compete with the portrait. On mobile and tablet, changed the footer banner from an eager CSS background request to the same lossless image in a lazy-loaded decorative `<picture>`, so it does not compete with initial rendering. The desktop footer background retains its original positioning and PNG fallback.
- Reviewed section heading levels and image alternatives. Meaningful content images have descriptive `alt` text; decorative artwork and icons are hidden from assistive technology.
- Local image asset sizes: mobile hero PNG 1,157,800 bytes → WebP 753,674 bytes (34.9% smaller); footer banner PNG 2,206,471 bytes → WebP 1,276,622 bytes (42.1% smaller). The source images are unchanged; the WebP encodes are lossless.

## Public checks and limits

- Local HTML inspection: one H1; valid JSON syntax in the JSON-LD block; no duplicate IDs or broken hash links; no missing image `alt` attributes; and no missing local image, CSS, JavaScript, resume, or certificate references. This is source validation, not a live rendered-page test.
- Local `robots.txt` allows crawling and references the root sitemap. The sitemap contains only the canonical homepage, which is correct for the current one-page site. The public crawler snapshot is old and direct fetches of the deployed robots file, sitemap, and Google verification path were unavailable in this audit; live HTTP status and redirect behavior remain unconfirmed.
- The supplied Google verification file is committed at the site root, but Search Console is not connected to the available tools. Property verification, sitemap submission/processing, indexing status, manual actions, security issues, and exact-name query performance remain account checks.
- The public search lookup available here surfaced GitHub and LinkedIn profiles for the exact-name query but did not reliably surface the portfolio domain. The public homepage snapshot showed an older title and reports a crawl from last week; this does not establish whether Google currently indexes the new version.
- No PageSpeed Insights field or lab report was available to measure LCP, INP, or CLS; no numerical Core Web Vitals claim is made. Run PSI on mobile and desktop after the image changes are published. Targets for “good” CWV are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile.
- Public checks of every external destination were not available. Local links and assets resolve in the repository, but external certificate destinations and GitHub Pages response headers/redirects are not confirmed by this source audit.

## Keyword and content opportunities

These are relevant topic/query ideas inferred from the portfolio content, not search-volume or ranking claims:

- Embedded software engineer: embedded C/C++, STM32 firmware, ARM Cortex-M, ESP32, FreeRTOS, real-time systems.
- Audio software engineer: JUCE audio plugin development, real-time audio DSP, low-latency audio processing, VST3.
- R&D engineer: embedded prototyping, hardware/software integration, system design, robotics and IoT.
- Portfolio-specific: STM32 real-time embedded platform, ESP32 industrial IoT gateway, JUCE DJ player, UAV flight-control system.

Use these phrases in useful project write-ups and dedicated article pages when there is original detail to share. Avoid adding repeated keyword lists to the page. The current blog cards are previews rather than crawlable full articles; publish unique article pages with stable URLs, author/date details, and links back to relevant projects when those articles are ready. Keep the existing anchors and design while adding those pages only if desired.

## Search Console checklist after deployment

1. Verify the Domain property `jaidevkamboj.github.io` in Google Search Console (or verify the URL-prefix property `https://jaidevkamboj.github.io/`). Complete DNS or HTML-file verification as directed by Google.
2. Submit `https://jaidevkamboj.github.io/sitemap.xml` and confirm its discovered URL count and last read status.
3. Inspect `https://jaidevkamboj.github.io/` and request indexing once the deployed source reflects this update. Review the selected canonical and rendered page.
4. Review Page Indexing, HTTPS, Core Web Vitals, and Search results reports over time; resolve specific errors surfaced there.
5. Run Google PageSpeed Insights for the public URL on mobile and desktop, record field and lab values, then prioritize measured bottlenecks.

## Sustainable off-page work

- Ask collaborators, employers, course providers, and project maintainers to link to the relevant portfolio or project page where a citation genuinely helps their readers.
- Publish technical notes and project documentation that provide original implementation details; share them with relevant engineering communities without mass posting or paid/spam link schemes.
- Keep public professional profiles consistent and link them to the portfolio. Seek relevant mentions through real project contributions, talks, and technical communities.

## Still outstanding

- Confirm the latest GitHub commit is served by GitHub Pages; the search snapshot has not refreshed yet.
- Complete Search Console verification, submit the sitemap, inspect the homepage's Google-selected canonical, and review Page Indexing, Manual Actions, Security Issues, and query performance from the owner account.
- Obtain a current PSI report on mobile and desktop, then prioritize measured Core Web Vitals issues.
- Confirm live HTTP status/redirects and any external certification destinations that matter to visitors.
- Add full, original project/article landing pages if more search entry points are desired; the current one-page section anchors are not separate indexable documents.
