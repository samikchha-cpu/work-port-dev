# Piyush Roy Portfolio

Single-file static site (`index.html`) — no build step, no dependencies.

- Content is edited via Decap CMS at `/admin` (see `admin/config.yml`).
- Blog posts and homepage content (`content/posts.json`, `content/site.json`) are fetched at runtime by `index.html`.
- Deploys automatically: push to the `main` branch on GitHub → Netlify builds and publishes.
- `robots.txt` and `sitemap.xml` reference the current `.netlify.app` URL — update both, plus the canonical/Open Graph tags in `index.html`, once the custom domain is connected.

