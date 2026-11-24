import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { Request, Response } from 'express';
import { buildInventory, normalizePathname } from './src/inventory.ts';
import { renderAutonomousPage, renderInventoryHtml } from './src/renderer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const app = express();

const inventory = buildInventory(__dirname);

// Serve local 2026 assets and map legacy WordPress uploads path to local assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/wp-content/uploads', express.static(path.join(__dirname, 'assets', 'uploads')));

// Lightweight JSON inventory endpoint for the navigation drawer and audit API
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

// Inventory & missing/external links audit dashboard
app.get(['/_inventaire', '/inventaire'], (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderInventoryHtml(inventory));
});

// Route all 132 autonomous HTML pages (primary slugs, aliases, and /pages/<file>.html)
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
    const rawHtml = fs.readFileSync(page.filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderAutonomousPage(page, rawHtml, inventory.stats.totalPages));
    return;
  }

  // Fallback to the exported custom 404 page
  const page404 = inventory.routeMap.get('/page-404');
  if (page404) {
    const raw404 = fs.readFileSync(page404.filePath, 'utf8');
    res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderAutonomousPage(page404, raw404, inventory.stats.totalPages));
    return;
  }

  res.status(404).send('Page introuvable');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Maison John&Co Marketing server running on http://0.0.0.0:${PORT} (${inventory.stats.totalPages} pages indexed, ${inventory.stats.totalAssets} assets)`
  );
});
