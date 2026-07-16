import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, 'dist');
const PORT = 5757;

const ROUTES = [
  '/',
  '/projets',
  '/projets/spotme',
  '/projets/guestly',
  '/projets/cockpit',
  '/projets/area',
  '/a-propos',
  '/contact',
];

function serveStatic(req, res) {
  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const candidates = [
    join(dist, urlPath),
    join(dist, urlPath, 'index.html'),
    join(dist, 'index.html'), // SPA fallback
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      const ext = candidate.split('.').pop();
      const mime = { html: 'text/html', js: 'application/javascript', css: 'text/css', png: 'image/png', svg: 'image/svg+xml' }[ext] ?? 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(readFileSync(candidate));
      return;
    }
  }

  res.writeHead(404);
  res.end('Not found');
}

const server = createServer(serveStatic);

server.listen(PORT, async () => {
  console.log(`Prerender server on :${PORT}`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      const html = await page.content();

      const segments = route === '/' ? [] : route.split('/').filter(Boolean);
      const filePath = join(dist, ...segments, 'index.html');
      const dir = dirname(filePath);

      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(filePath, html, 'utf-8');
      console.log(`✓ ${route}`);
    } catch (err) {
      console.error(`✗ ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('Prerendering done.');
});
