/**
 * Post-build step: write real HTML files for every SPA route and a 404 page.
 *
 * Vite emits a single dist/index.html. Crawlers and link previews would
 * otherwise see the home-page title/description on every URL, and Netlify
 * would return 200 for paths that do not exist. This script copies the app
 * shell, swaps in route metadata from src/data/page-meta.json, strips the
 * home-only FAQ schema, and creates dist/404.html.
 *
 * Runs automatically as part of `npm run build`.
 */
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const pageMeta = JSON.parse(readFileSync(join(root, 'src', 'data', 'page-meta.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function replace(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

const TITLE = /<title>[\s\S]*?<\/title>/;
const DESCRIPTION = /<meta\s+name="description"\s+content="[^"]*"\s*\/>/;
const OG_TITLE = /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/;
const OG_DESCRIPTION = /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/;
const OG_URL = /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/;
const TWITTER_TITLE = /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/;
const TWITTER_DESCRIPTION = /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/;
const CANONICAL = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/;
const FAQ_SCHEMA =
  /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>\s*/;

function withMeta(html, meta) {
  const url = `https://freizy.com${meta.path}`;
  let out = html;
  out = replace(out, TITLE, `<title>${esc(meta.title)}</title>`, 'title');
  out = replace(out, DESCRIPTION, `<meta name="description" content="${esc(meta.description)}" />`, 'description');
  out = replace(out, OG_TITLE, `<meta property="og:title" content="${esc(meta.title)}" />`, 'og:title');
  out = replace(
    out,
    OG_DESCRIPTION,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    'og:description'
  );
  out = replace(out, OG_URL, `<meta property="og:url" content="${url}" />`, 'og:url');
  out = replace(
    out,
    TWITTER_TITLE,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    'twitter:title'
  );
  out = replace(
    out,
    TWITTER_DESCRIPTION,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    'twitter:description'
  );
  out = replace(out, CANONICAL, `<link rel="canonical" href="${url}" />`, 'canonical');
  return out;
}

const routes = Object.entries(pageMeta)
  .filter(([key]) => key !== 'notFound')
  .map(([key, meta]) => [key, key === 'home' ? 'index.html' : `${meta.path.slice(1)}.html`]);

for (const [key, file] of routes) {
  const meta = pageMeta[key];
  // The FAQ schema describes the home page only; remove it from other routes.
  const source = key === 'home' ? template : template.replace(FAQ_SCHEMA, '');
  writeFileSync(join(dist, file), withMeta(source, meta));
  console.log(`prerendered dist/${file} (${meta.path})`);
}

const notFound = withMeta(template.replace(FAQ_SCHEMA, ''), pageMeta.notFound).replace(CANONICAL, '');
writeFileSync(
  join(dist, '404.html'),
  notFound.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>')
);
console.log('prerendered dist/404.html (noindex)');

// Keep Netlify's routing in sync with the generated files. Without these
// rewrites, a direct request for /about only works when Netlify's Pretty URLs
// setting is enabled; the 301s also collapse the .html and trailing-slash
// duplicates onto one canonical URL.
const redirects = [
  '# Generated from src/data/page-meta.json by scripts/prerender.mjs.',
  '/index.html  /  301!',
  ...routes
    .filter(([key]) => key !== 'home')
    .flatMap(([key, file]) => {
      const path = pageMeta[key].path;
      return [
        `/${file}  ${path}  301!`,
        `${path}  /${file}  200`,
        `${path}/  ${path}  301!`,
      ];
    }),
];
appendFileSync(join(dist, '_redirects'), `\n${redirects.join('\n')}\n`);
console.log(`appended ${redirects.length - 1} route rules to dist/_redirects`);
