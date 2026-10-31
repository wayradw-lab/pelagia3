import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const base = path.resolve(process.argv[2] || path.dirname(fileURLToPath(new URL('../index.html', import.meta.url))));
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.json':'application/json', '.md':'text/markdown; charset=utf-8', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let target = path.resolve(base, '.' + pathname);
    if (!target.startsWith(base)) throw new Error('Invalid path');
    try { const info = await stat(target); if (info.isDirectory()) target = path.join(target, 'index.html'); }
    catch { target = path.join(base, 'index.html'); }
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '0.0.0.0', () => console.log(`PELAGIA available at http://localhost:${port}`));
