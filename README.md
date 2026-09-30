# Jaidev Kamboj Portfolio

Static portfolio built with HTML, CSS, and JavaScript. The planned GitHub Pages address is <https://jaidevkamboj.github.io/>.

## Publish with GitHub Pages

Create a public repository named `jaidevkamboj.github.io`, push the site to the `main` branch, then select **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub Pages will publish `index.html` from the repository root.

## SEO and search indexing

This is a single-page portfolio, so `sitemap.xml` lists the canonical homepage only; section links use in-page anchors. `index.html` includes a descriptive title and meta description, canonical URL, Open Graph and X/Twitter preview metadata, accessible section labels and image alternatives, and JSON-LD for the `WebSite`, `ProfilePage`, and `Person`. `robots.txt` allows crawling and points to the sitemap.

After publishing changes, verify the site in Google Search Console, inspect the homepage with URL Inspection, and submit `https://jaidevkamboj.github.io/sitemap.xml`. Project cards and article previews remain on the homepage because verified project URLs and full article content are not included in this repository; add unique, useful destination pages when that material is available.

## Contact form delivery

GitHub Pages is static and cannot send email itself. The contact popup posts through Formspree over HTTPS; the browser code contains no recipient address or mail-service secret. Create a Formspree form, set and verify the requested notification recipient in its dashboard, restrict the form to `jaidevkamboj.github.io`, then put the public form ID in the `data-form-id` attribute on `#contact-form` in `index.html`. The empty value intentionally prevents submissions until delivery is configured. The form includes client validation, an `_gotcha` honeypot, and a UTC submission timestamp.

The supplied résumé is available from the Download Resume links. The contact email, GitHub profile, and LinkedIn profile use the destinations listed in the résumé. Certificate cards link to the verification details supplied with the credentials. Project-specific repository links and full blog articles still need verified destinations or content. All artwork and certificate assets are stored in `images/` and referenced locally.
