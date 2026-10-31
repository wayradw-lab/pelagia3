import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const out = new URL('../dist/', import.meta.url);
if (existsSync(out)) await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const name of ['index.html', 'enhancements.js', 'README.md', 'CREDITS.md', 'CHANGELOG.md', 'package.json', 'vercel.json', 'netlify.toml', '_redirects', 'assets', 'css', 'js', 'vendor', 'media', 'sitemap.xml', 'robots.txt']) {
  const src = new URL('../' + name, import.meta.url);
  if (existsSync(src)) await cp(src, new URL(name, out), { recursive: true });
}
console.log('PELAGIA static build created in dist/.');
