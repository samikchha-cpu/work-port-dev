// Regenerates sitemap.xml from the real CMS content files, so it's never
// hand-typed and never goes stale. Re-run this any time a blog post or
// service is added, removed, or renamed (its slug changes).
//
// Usage (from the project root, where this file and content/ both live):
//   node generate-sitemap.js
//
// This only touches sitemap.xml — nothing else. Safe to re-run anytime.

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://roypiyush.com';

function readJSON(relPath) {
  const full = path.join(__dirname, relPath);
  if (!fs.existsSync(full)) {
    console.warn(`Warning: ${relPath} not found — skipping its URLs.`);
    return null;
  }
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

const urls = [];

// Static pages — always present.
urls.push({ loc: '/', changefreq: 'weekly', priority: '1.0' });
urls.push({ loc: '/blog', changefreq: 'weekly', priority: '0.8' });
urls.push({ loc: '/services', changefreq: 'monthly', priority: '0.8' });
urls.push({ loc: '/privacy', changefreq: 'yearly', priority: '0.2' });

// Blog posts.
const postsData = readJSON('content/posts.json');
if (postsData && Array.isArray(postsData.posts)) {
  postsData.posts.forEach(p => {
    if (p.slug) {
      urls.push({
        loc: `/post/${p.slug}`,
        lastmod: p.date ? new Date(p.date).toISOString().slice(0, 10) : undefined,
        changefreq: 'monthly',
        priority: '0.6'
      });
    }
  });
}

// Services.
const servicesData = readJSON('content/services.json');
if (servicesData && Array.isArray(servicesData.services)) {
  servicesData.services.forEach(s => {
    if (s.slug) {
      urls.push({ loc: `/service/${s.slug}`, changefreq: 'monthly', priority: '0.9' });
    }
  });
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u => [
    '  <url>',
    `    <loc>${SITE_URL}${u.loc}</loc>`,
    u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
    `    <changefreq>${u.changefreq}</changefreq>`,
    `    <priority>${u.priority}</priority>`,
    '  </url>'
  ].filter(Boolean).join('\n')),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml written with ${urls.length} URLs.`);
