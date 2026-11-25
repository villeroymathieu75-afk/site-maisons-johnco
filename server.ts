import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { Request, Response } from 'express';
import { buildInventory, normalizePathname } from './src/inventory.ts';
import { renderInventoryHtml } from './src/renderer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const app = express();

const inventory = buildInventory(__dirname);

// Serve static GitHub Pages assets, pages, and root files verbatim
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/wp-content/uploads', express.static(path.join(__dirname, 'assets', 'uploads')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

app.get(['/', '/index.html'], (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/robots.txt', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/404.html', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '404.html'));
});

// Lightweight JSON inventory endpoint for auditing
app.get('/api/inventory', (req: Request, res: Response) => {
  const pages = inventory.pages.map((p) => ({
    filename: p.filename,
    slug: p.slug,
    wpId: p.wpId,
    primaryRoute: p.primaryRoute,
    aliases: p.aliases,
    title: p.title,
    kind: p.kind,
    bytes: p.bytes,
  }));

  if (req.query.full === '1') {
    res.json({
      stats: inventory.stats,
      pages,
      missingLinks: inventory.missingLinks,
      externalDomains: inventory.externalDomains,
      assets: inventory.assets,
    });
    return;
  }

  res.json({ stats: inventory.stats, pages });
});

// Inventory & link audit dashboard
app.get(['/_inventaire', '/inventaire'], (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderInventoryHtml(inventory));
});

// Compatibility routing for clean slug URLs -> real static files in /pages/
app.use((req: Request, res: Response, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  let decodedPath = req.path;
  try {
    decodedPath = decodeURIComponent(req.path);
  } catch {
    // Keep raw path if malformed percent encoding
  }

  const normalized = normalizePathname(decodedPath);
  const page = inventory.routeMap.get(normalized);

  if (page) {
    if (page.slug === 'accueil') {
      const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
      res.redirect(302, `/${qs}`);
      return;
    }
    const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    res.redirect(302, `/pages/${page.filename}${qs}`);
    return;
  }

  const file404 = path.join(__dirname, '404.html');
  if (fs.existsSync(file404)) {
    res.status(404).sendFile(file404);
    return;
  }

  res.status(404).send('Page introuvable');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Maison John&Co Marketing static preview server running on http://0.0.0.0:${PORT} (${inventory.stats.totalPages} pages, ${inventory.stats.totalAssets} assets)`
  );
});
