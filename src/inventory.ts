import fs from 'node:fs';
import path from 'node:path';

export type PageKind =
  | 'full-document'
  | 'styled-fragment'
  | 'gutenberg-content'
  | 'plugin-shortcode'
  | 'empty';

export interface PageRecord {
  filename: string;
  filePath: string;
  slug: string;
  wpId: string | null;
  primaryRoute: string;
  aliases: string[];
  title: string;
  kind: PageKind;
  bytes: number;
  hasStyle: boolean;
  hasScript: boolean;
}

export interface AssetRecord {
  relativePath: string;
  urlPath: string;
  wpUploadPath: string;
  ext: string;
  bytes: number;
}

export interface MissingLinkRecord {
  path: string;
  category: 'missing-page' | 'missing-asset' | 'wp-legacy';
  count: number;
  sources: string[];
}

export interface ExternalDomainRecord {
  hostname: string;
  category: 'cdn-library' | 'external-media' | 'external-service';
  count: number;
  sampleUrls: string[];
  sources: string[];
}

export interface SiteInventory {
  pages: PageRecord[];
  assets: AssetRecord[];
  routeMap: Map<string, PageRecord>;
  assetPathSet: Set<string>;
  missingLinks: MissingLinkRecord[];
  externalDomains: ExternalDomainRecord[];
  stats: {
    totalPages: number;
    fullDocuments: number;
    styledFragments: number;
    gutenbergPages: number;
    pluginShortcodePages: number;
    emptyPages: number;
    totalAssets: number;
    resolvedInternalLinks: number;
    missingInternalLinkTargets: number;
    externalDomainCount: number;
  };
}

/**
 * Alias routes derived from existing internal links found in the 132 HTML files.
 * Maps a link path to the target page slug (before `--<id>.html`).
 */
export const ROUTE_ALIASES: Record<string, string> = {
  '/accueil': 'accueil',
  '/services/entreprises': 'services-proposes-pour-les-entreprises',
  '/services/influenceurs': 'services-influenceurs',
  '/services/particuliers': 'services-particuliers',
  '/packs-pros': 'packs-professionnels-tpe-pme-eti',
  '/offres-createurs': 'offres-createurs-de-contenu',
  '/offres-particuliers': 'offres-particuliers-personal-branding',
  '/blog': 'blog-ressources',
  '/nos-projets': 'tous-les-projet',
  '/espace-client': 'tableau-de-bord-client',
  '/politique-confidentialite': 'politique-de-confidentialite',
  '/rgpd': 'politique-de-confidentialite',
  '/products/lxedc': 'lxedc',
  '/seo-referencement': 'soe-referencement',
  '/compte': 'tableau-de-bord-client',
  '/mon-compte': 'tableau-de-bord-client',
  '/2-page-secret': '0-page-secret',
};

const CDN_HOSTS = new Set([
  'unpkg.com',
  'cdn.tailwindcss.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
]);

const MEDIA_HOSTS = new Set([
  'static.photos',
  'images.unsplash.com',
  'randomuser.me',
  'www.accile.com',
]);

export const SITE_ORIGIN = 'https://maison-johnco-marketing.fr';

const OWN_DOMAIN_REGEX = /^https?:\/\/(?:www\.)?maison-johnco-marketing\.fr(\/.*)?$/i;

export function normalizePathname(rawPath: string): string {
  const withoutQuery = rawPath.split(/[?#]/)[0] || '/';
  const cleaned = withoutQuery.replace(/\/{2,}/g, '/');
  if (cleaned === '/' || cleaned === '') return '/';
  return cleaned.endsWith('/') ? cleaned.slice(0, -1) : cleaned;
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function formatSlugTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function extractTitle(html: string, slug: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const t = decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' '));
    if (t.length > 0) return t;
  }

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const t = decodeHtmlEntities(h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' '));
    if (t.length > 0 && t.length < 140) return t;
  }

  return formatSlugTitle(slug);
}

function classifyPage(rawHtml: string): PageKind {
  const trimmed = rawHtml.trim();
  if (trimmed.length === 0) return 'empty';

  const withoutWpComments = trimmed
    .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '')
    .trim();

  if (
    withoutWpComments.length === 0 ||
    withoutWpComments.replace(/<p>\s*<\/p>/gi, '').trim().length === 0
  ) {
    if (/<!--\s*wp:(?:surecart|tutor)/i.test(trimmed)) {
      return 'plugin-shortcode';
    }
    return 'empty';
  }

  if (
    /^\[[a-z0-9_]+(?:\s[^\]]*)?\]$/i.test(withoutWpComments) ||
    (/<!--\s*wp:surecart\//i.test(trimmed) && !/<style[\s>]/i.test(trimmed))
  ) {
    return 'plugin-shortcode';
  }

  if (/<!doctype\s+html/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) {
    return 'full-document';
  }

  if (/<style[\s>]/i.test(trimmed) || /<link[^>]+stylesheet/i.test(trimmed)) {
    return 'styled-fragment';
  }

  return 'gutenberg-content';
}

function walkFiles(dir: string, baseDir: string, out: AssetRecord[]): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, baseDir, out);
    } else if (entry.isFile()) {
      const rel = path.relative(baseDir, fullPath).split(path.sep).join('/');
      const stat = fs.statSync(fullPath);
      const urlPath = `/assets/${rel}`;
      const wpUploadPath = rel.startsWith('uploads/')
        ? `/wp-content/${rel}`
        : urlPath;
      out.push({
        relativePath: rel,
        urlPath,
        wpUploadPath,
        ext: path.extname(entry.name).toLowerCase(),
        bytes: stat.size,
      });
    }
  }
}

export function buildInventory(rootDir: string): SiteInventory {
  const pagesDir = path.join(rootDir, 'pages');
  const assetsDir = path.join(rootDir, 'assets');

  const assets: AssetRecord[] = [];
  walkFiles(assetsDir, assetsDir, assets);

  const assetPathSet = new Set<string>();
  for (const asset of assets) {
    assetPathSet.add(normalizePathname(asset.urlPath));
    assetPathSet.add(normalizePathname(asset.wpUploadPath));
  }

  const files = fs.existsSync(pagesDir)
    ? fs
        .readdirSync(pagesDir)
        .filter((f) => f.endsWith('.html'))
        .sort((a, b) => a.localeCompare(b))
    : [];

  const pages: PageRecord[] = [];
  const slugMap = new Map<string, PageRecord>();
  const routeMap = new Map<string, PageRecord>();

  for (const filename of files) {
    const filePath = path.join(pagesDir, filename);
    const rawHtml = fs.readFileSync(filePath, 'utf8');
    const match = filename.match(/^(.+)--(\d+)\.html$/);
    const slug = match ? match[1] : filename.replace(/\.html$/, '');
    const wpId = match ? match[2] : null;
    const primaryRoute = slug === 'accueil' ? '/' : `/${slug}`;
    const kind = classifyPage(rawHtml);

    const record: PageRecord = {
      filename,
      filePath,
      slug,
      wpId,
      primaryRoute,
      aliases: [],
      title: extractTitle(rawHtml, slug),
      kind,
      bytes: Buffer.byteLength(rawHtml, 'utf8'),
      hasStyle: /<style[\s>]/i.test(rawHtml),
      hasScript: /<script[\s>]/i.test(rawHtml),
    };

    pages.push(record);
    slugMap.set(slug, record);
    routeMap.set(primaryRoute, record);
    routeMap.set(`/pages/${filename}`, record);
  }

  // Register explicit alias routes
  for (const [aliasPath, targetSlug] of Object.entries(ROUTE_ALIASES)) {
    const target = slugMap.get(targetSlug);
    if (target) {
      const normalized = normalizePathname(aliasPath);
      routeMap.set(normalized, target);
      if (normalized !== target.primaryRoute && !target.aliases.includes(normalized)) {
        target.aliases.push(normalized);
      }
    }
  }

  // Audit links across all 132 HTML files
  let resolvedInternalLinks = 0;
  const missingMap = new Map<
    string,
    { category: MissingLinkRecord['category']; count: number; sources: Set<string> }
  >();
  const externalMap = new Map<
    string,
    {
      category: ExternalDomainRecord['category'];
      count: number;
      urls: Set<string>;
      sources: Set<string>;
    }
  >();

  for (const page of pages) {
    const rawHtml = fs.readFileSync(page.filePath, 'utf8');
    const foundUrls: string[] = [];

    for (const m of rawHtml.matchAll(/(?:href|src|action)=["']([^"']+)["']/gi)) {
      foundUrls.push(m[1].trim());
    }
    for (const m of rawHtml.matchAll(
      /window\.location(?:\.href)?\s*=\s*["']([^"']+)["']/gi
    )) {
      foundUrls.push(m[1].trim());
    }

    for (const rawUrl of foundUrls) {
      if (
        !rawUrl ||
        rawUrl.startsWith('#') ||
        rawUrl.startsWith('mailto:') ||
        rawUrl.startsWith('tel:') ||
        rawUrl.startsWith('javascript:') ||
        rawUrl.startsWith('data:')
      ) {
        continue;
      }

      const ownMatch = rawUrl.match(OWN_DOMAIN_REGEX);
      if (ownMatch || (rawUrl.startsWith('/') && !rawUrl.startsWith('//'))) {
        const localRaw = ownMatch ? ownMatch[1] || '/' : rawUrl;
        // Ignore malformed calendar query fragments glued onto domain paths
        const cleanedPath = normalizePathname(localRaw.split('&')[0]);

        if (routeMap.has(cleanedPath) || assetPathSet.has(cleanedPath)) {
          resolvedInternalLinks++;
        } else {
          let category: MissingLinkRecord['category'] = 'missing-page';
          if (
            cleanedPath.startsWith('/wp-admin') ||
            cleanedPath.startsWith('/wp-content/themes')
          ) {
            category = 'wp-legacy';
          } else if (
            cleanedPath.startsWith('/wp-content/uploads') ||
            cleanedPath.startsWith('/assets/') ||
            /\.(pdf|png|jpe?g|webp|svg|json|css|js)$/i.test(cleanedPath)
          ) {
            category = 'missing-asset';
          }

          let entry = missingMap.get(cleanedPath);
          if (!entry) {
            entry = { category, count: 0, sources: new Set<string>() };
            missingMap.set(cleanedPath, entry);
          }
          entry.count++;
          entry.sources.add(page.primaryRoute);
        }
        continue;
      }

      if (/^https?:\/\//i.test(rawUrl)) {
        try {
          const parsed = new URL(rawUrl);
          const host = parsed.hostname.toLowerCase();
          const category: ExternalDomainRecord['category'] = CDN_HOSTS.has(host)
            ? 'cdn-library'
            : MEDIA_HOSTS.has(host)
              ? 'external-media'
              : 'external-service';

          let entry = externalMap.get(host);
          if (!entry) {
            entry = {
              category,
              count: 0,
              urls: new Set<string>(),
              sources: new Set<string>(),
            };
            externalMap.set(host, entry);
          }
          entry.count++;
          if (entry.urls.size < 8) {
            entry.urls.add(rawUrl);
          }
          entry.sources.add(page.primaryRoute);
        } catch {
          // Ignore invalid non-URL attribute strings
        }
      }
    }
  }

  const missingLinks: MissingLinkRecord[] = [...missingMap.entries()]
    .map(([missingPath, data]) => ({
      path: missingPath,
      category: data.category,
      count: data.count,
      sources: [...data.sources].sort(),
    }))
    .sort((a, b) => b.count - a.count || a.path.localeCompare(b.path));

  const externalDomains: ExternalDomainRecord[] = [...externalMap.entries()]
    .map(([hostname, data]) => ({
      hostname,
      category: data.category,
      count: data.count,
      sampleUrls: [...data.urls].sort(),
      sources: [...data.sources].sort(),
    }))
    .sort((a, b) => b.count - a.count || a.hostname.localeCompare(b.hostname));

  return {
    pages,
    assets,
    routeMap,
    assetPathSet,
    missingLinks,
    externalDomains,
    stats: {
      totalPages: pages.length,
      fullDocuments: pages.filter((p) => p.kind === 'full-document').length,
      styledFragments: pages.filter((p) => p.kind === 'styled-fragment').length,
      gutenbergPages: pages.filter((p) => p.kind === 'gutenberg-content').length,
      pluginShortcodePages: pages.filter((p) => p.kind === 'plugin-shortcode').length,
      emptyPages: pages.filter((p) => p.kind === 'empty').length,
      totalAssets: assets.length,
      resolvedInternalLinks,
      missingInternalLinkTargets: missingLinks.length,
      externalDomainCount: externalDomains.length,
    },
  };
}
