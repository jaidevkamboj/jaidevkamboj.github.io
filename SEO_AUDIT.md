# SEO audit and follow-up

Audit date: 2026-10-12  
Site: <https://jaidevkamboj.github.io/>  
Hosting: GitHub Pages, static single-page portfolio

## Completed in the local project

- Kept the current single-page design and section URLs. The page has one canonical homepage URL, an index/follow robots directive, a sitemap containing the canonical URL, and semantic section anchors.
- Confirmed the head includes a descriptive page title and description, canonical URL, Open Graph/X metadata, language, and indexable robots settings.
- Kept the existing `WebSite`, `ProfilePage`, and `Person` JSON-LD; added the public GitHub and LinkedIn profile URLs as `sameAs` links.
- Updated the sitemap `<lastmod>` to `2026-10-12` for this content update.
- Added a lossless WebP source for the mobile hero, retaining the PNG as the browser fallback. Added a lossless WebP footer artwork option while retaining the PNG fallback and the current desktop/mobile layout rules.
- Reviewed section heading levels and image alternatives. Meaningful content images have descriptive `alt` text; decorative artwork and icons are hidden from assistive technology.
- Local image asset sizes: mobile hero PNG 1,157,800 bytes → WebP 753,674 bytes (34.9% smaller); footer banner PNG 2,206,471 bytes → WebP 1,276,622 bytes (42.1% smaller). The source images are unchanged; the WebP encodes are lossless.

## Public checks and limits

- The public homepage is reachable from a web search crawl. The crawl snapshot returned content from a prior version (for example, the older Software Engineer / Web Developer hero content), while the local project contains newer R&D and embedded engineering content. The snapshot reports it was crawled last week, so it is not proof of current origin content. Publish the local updates, then use Search Console URL Inspection to request a recrawl.
- The project files allow all crawlers and reference the sitemap. The web fetch used for this audit could not independently retrieve the deployed `robots.txt` or sitemap, so their live HTTP status/content still needs verification after deployment.
- Search Console is not connected to the available tools, and no verification token or account access was provided. Property verification, sitemap submission, indexing reports, and search query/performance review remain account actions.
- No PageSpeed Insights field or lab report was available to measure LCP, INP, or CLS; no numerical Core Web Vitals claim is made. Run PSI on mobile and desktop after the image changes are published. Targets for “good” CWV are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile.
- The ISRO/IIRS verifier responded publicly. LinkedIn rate-limited the audit fetch; Coursera and GitHub returned cache misses in the web tool. Those results do not indicate broken links, but their destinations were not confirmed. GitHub Pages response headers/redirects and visual rendering at device widths also need live/browser checks after publishing.

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

- Publish these local changes to GitHub Pages.
- Complete Search Console verification and submit the sitemap from the owner account.
- Obtain a current PSI report and confirm deployed mobile/tablet/desktop rendering and external-link destinations.
- Add full, original project/article landing pages if more search entry points are desired; the current one-page section anchors are not separate indexable documents.
