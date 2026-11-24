import { SITE_ORIGIN } from './inventory.ts';
import type { PageRecord, SiteInventory } from './inventory.ts';
import { buildSiteHeaderSnippet } from './navigation.ts';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 o';
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

function buildCanonicalUrl(route: string): string {
  return route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
}

/**
 * Strips WordPress Gutenberg block comment delimiters and rewrites
 * absolute maison-johnco-marketing.fr links into local paths so
 * navigation stays inside the application without altering page design.
 */
export function prepareAutonomousHtml(rawHtml: string): string {
  let html = rawHtml.replace(/<!--\s*\/?wp:[\s\S]*?-->\s*/g, '');

  // Rewrite attribute links pointing to maison-johnco-marketing.fr
  html = html.replace(
    /\b(href|src|action)=(["'])https?:\/\/(?:www\.)?maison-johnco-marketing\.fr(\/[^"']*)?\2/gi,
    (_full, attr: string, quote: string, subPath: string | undefined) => {
      const target = subPath && subPath.length > 0 ? subPath : '/';
      if (target.startsWith('/wp-content/uploads/')) {
        return `${attr}=${quote}${target.replace('/wp-content/uploads/', '/assets/uploads/')}${quote}`;
      }
      return `${attr}=${quote}${target}${quote}`;
    }
  );

  // Rewrite JS window.location redirects pointing to maison-johnco-marketing.fr
  html = html.replace(
    /(window\.location(?:\.href)?\s*=\s*)(["'])https?:\/\/(?:www\.)?maison-johnco-marketing\.fr(\/[^"']*)?\2/gi,
    (_full, prefix: string, quote: string, subPath: string | undefined) => {
      const target = subPath && subPath.length > 0 ? subPath : '/';
      return `${prefix}${quote}${target}${quote}`;
    }
  );

  return html;
}

export function renderAutonomousPage(
  page: PageRecord,
  rawHtml: string,
  _totalPages: number
): string {
  const headerSnippet = buildSiteHeaderSnippet(page.primaryRoute);
  const canonicalUrl = escapeHtml(buildCanonicalUrl(page.primaryRoute));
  const seoMetaBlock = `<link rel="canonical" href="${canonicalUrl}">\n  <meta property="og:url" content="${canonicalUrl}">`;

  if (page.kind === 'empty' || page.kind === 'plugin-shortcode') {
    const rawPreview = rawHtml.trim();
    const isAccountPortal = page.slug === 'tableau-de-bord-client';
    const statusLabel = isAccountPortal
      ? 'Espace client & Compte utilisateur'
      : page.kind === 'empty'
        ? 'Page source vide dans l’export initial'
        : 'Bloc/Shortcode WordPress externe conservé tel quel';
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)} — Maison John&amp;Co Marketing</title>
  <meta name="description" content="Maison John&amp;Co Marketing — ${escapeHtml(page.title)}">
  ${seoMetaBlock}
  <meta property="og:title" content="${escapeHtml(page.title)} — Maison John&amp;Co Marketing">
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif; background: #f8fafc; color: #0f172a; line-height: 1.6; }
    main { max-width: 740px; margin: 56px auto; padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; }
    .kicker { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6d28d9; margin-bottom: 8px; }
    h1 { margin: 0 0 12px; font-size: 26px; letter-spacing: -0.02em; }
    p { margin: 0 0 16px; color: #475569; }
    pre { background: #0f172a; color: #e2e8f0; padding: 14px 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
    a.btn { display: inline-block; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; }
    a.primary { background: #0f172a; color: #ffffff; }
    a.secondary { background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; }
  </style>
</head>
<body>
  ${headerSnippet}
  <main>
    <div class="kicker">${escapeHtml(statusLabel)}</div>
    <h1>${escapeHtml(page.title)}</h1>
    <p>Fichier source : <code>pages/${escapeHtml(page.filename)}</code> (${formatBytes(page.bytes)}). Cette page a été conservée telle quelle depuis l'export WordPress d'origine.</p>
    ${rawPreview ? `<pre>${escapeHtml(rawPreview)}</pre>` : '<p><em>Ce fichier HTML est actuellement vide (0 octet).</em></p>'}
    <div class="actions">
      <a class="btn primary" href="/">Retour à l'accueil</a>
      <a class="btn secondary" href="/contact">Contacter l'agence</a>
    </div>
  </main>
</body>
</html>`;
  }

  const cleanedHtml = prepareAutonomousHtml(rawHtml);

  if (page.kind === 'full-document') {
    let output = cleanedHtml;
    const headTags: string[] = [];
    if (!/<link\b[^>]*rel=["']canonical["']/i.test(output)) {
      headTags.push(`<link rel="canonical" href="${canonicalUrl}">`);
    }
    if (!/<meta\b[^>]*property=["']og:url["']/i.test(output)) {
      headTags.push(`<meta property="og:url" content="${canonicalUrl}">`);
    }
    if (headTags.length > 0 && /<\/head>/i.test(output)) {
      output = output.replace(/<\/head>/i, `  ${headTags.join('\n  ')}\n</head>`);
    }
    if (/<body\b[^>]*>/i.test(output)) {
      return output.replace(/<body\b[^>]*>/i, (match) => `${match}\n${headerSnippet}`);
    }
    return `${headerSnippet}\n${output}`;
  }

  if (page.kind === 'styled-fragment') {
    // Hoist external <link> tags (Google Fonts, icon stylesheets) to <head>
    const headLinks: string[] = [];
    const bodyHtml = cleanedHtml.replace(/<link\b[^>]*>/gi, (tag) => {
      headLinks.push(tag);
      return '';
    });

    const pageTitle = escapeHtml(
      page.slug === 'accueil'
        ? 'Maison John&Co Marketing — Agence de Marketing Digital'
        : `${page.title} — Maison John&Co Marketing`
    );

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="Maison John&amp;Co Marketing — ${escapeHtml(page.title)}">
  ${seoMetaBlock}
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="Maison John&amp;Co Marketing — ${escapeHtml(page.title)}">
  ${headLinks.join('\n  ')}
  <style>html, body { margin: 0; padding: 0; }</style>
</head>
<body>
${headerSnippet}
${bodyHtml}
</body>
</html>`;
  }

  // Gutenberg editorial content page (no embedded <style>)
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)} — Maison John&amp;Co Marketing</title>
  <meta name="description" content="Maison John&amp;Co Marketing — ${escapeHtml(page.title)}">
  ${seoMetaBlock}
  <meta property="og:title" content="${escapeHtml(page.title)} — Maison John&amp;Co Marketing">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #ffffff; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif; line-height: 1.72; }
    article { max-width: 880px; margin: 0 auto; padding: 56px 24px 96px; }
    h1, h2, h3, h4 { color: #0f172a; line-height: 1.25; margin-top: 2em; margin-bottom: 0.7em; }
    h1:first-child { margin-top: 0; }
    p { margin: 0 0 1.15em; }
    ul, ol { padding-left: 1.5em; margin: 0 0 1.25em; }
    li { margin-bottom: 0.45em; }
    hr { border: 0; border-top: 1px solid #e2e8f0; margin: 2em 0; }
    a { color: #6d28d9; }
    table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 14px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; }
    th { background: #f8fafc; font-weight: 600; }
    blockquote { margin: 1.5em 0; padding: 12px 20px; border-left: 3px solid #7c3aed; background: #f8fafc; }
  </style>
</head>
<body>
  ${headerSnippet}
  <article>
${cleanedHtml}
  </article>
</body>
</html>`;
}

export function renderInventoryHtml(inventory: SiteInventory): string {
  const { stats, pages, missingLinks, externalDomains, assets } = inventory;

  const kindLabels: Record<PageRecord['kind'], string> = {
    'full-document': 'Document HTML complet',
    'styled-fragment': 'Fragment HTML + styles',
    'gutenberg-content': 'Contenu Gutenberg',
    'plugin-shortcode': 'Shortcode / Plugin WP',
    empty: 'Vide (0 o)',
  };

  const pageRows = pages
    .map((p) => {
      const aliasBadges = p.aliases
        .map((a) => `<span class="alias">${escapeHtml(a)}</span>`)
        .join(' ');
      return `<tr data-kind="${p.kind}" data-search="${escapeHtml(
        `${p.title} ${p.filename} ${p.primaryRoute} ${p.aliases.join(' ')}`.toLowerCase()
      )}">
        <td><a class="route-link" href="${escapeHtml(p.primaryRoute)}">${escapeHtml(p.title)}</a></td>
        <td><code>${escapeHtml(p.primaryRoute)}</code>${aliasBadges ? `<div class="aliases">${aliasBadges}</div>` : ''}</td>
        <td><code class="file-name">${escapeHtml(p.filename)}</code></td>
        <td><span class="kind kind-${p.kind}">${kindLabels[p.kind]}</span></td>
        <td class="num">${formatBytes(p.bytes)}</td>
      </tr>`;
    })
    .join('\n');

  const missingRows = missingLinks
    .map((item) => {
      const catLabel =
        item.category === 'wp-legacy'
          ? 'WordPress / Thème exclu'
          : item.category === 'missing-asset'
            ? 'Ressource manquante'
            : 'Page cible absente';
      const sourcesHtml = item.sources
        .slice(0, 6)
        .map((s) => `<a href="${escapeHtml(s)}">${escapeHtml(s)}</a>`)
        .join(', ');
      const extra =
        item.sources.length > 6 ? ` (+${item.sources.length - 6} autres)` : '';
      return `<tr>
        <td><code>${escapeHtml(item.path)}</code></td>
        <td><span class="kind kind-missing">${catLabel}</span></td>
        <td class="num">${item.count}</td>
        <td>${sourcesHtml}${extra}</td>
      </tr>`;
    })
    .join('\n');

  const externalRows = externalDomains
    .map((d) => {
      const catLabel =
        d.category === 'cdn-library'
          ? 'CDN / Police / Librairie'
          : d.category === 'external-media'
            ? 'Image / Média externe'
            : 'Lien / Service externe';
      const samples = d.sampleUrls
        .slice(0, 3)
        .map(
          (u) =>
            `<a href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
              u.length > 72 ? `${u.slice(0, 72)}…` : u
            )}</a>`
        )
        .join('<br>');
      return `<tr>
        <td><strong>${escapeHtml(d.hostname)}</strong></td>
        <td><span class="kind kind-ext-${d.category}">${catLabel}</span></td>
        <td class="num">${d.count}</td>
        <td class="num">${d.sources.length}</td>
        <td class="samples">${samples}</td>
      </tr>`;
    })
    .join('\n');

  const assetRows = assets
    .map(
      (a) => `<tr>
        <td><a href="${escapeHtml(a.urlPath)}" target="_blank" rel="noopener noreferrer">${escapeHtml(a.relativePath)}</a></td>
        <td><code>${escapeHtml(a.urlPath)}</code></td>
        <td class="num">${formatBytes(a.bytes)}</td>
      </tr>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventaire &amp; Audit des liens — Maison John&amp;Co Marketing</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif; background: #f8fafc; color: #0f172a; line-height: 1.5; }
    header { background: #0a1628; color: #ffffff; padding: 28px 24px; border-bottom: 1px solid #1e293b; }
    .wrap { max-width: 1280px; margin: 0 auto; }
    header .top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; }
    h1 { margin: 0; font-size: 24px; letter-spacing: -0.02em; }
    header p { margin: 6px 0 0; color: #cbd5e1; font-size: 14px; }
    .home-btn { display: inline-block; padding: 9px 16px; border-radius: 8px; background: #7c3aed; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; }
    main { padding: 28px 24px 72px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 28px; }
    .stat { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .stat .val { font-size: 28px; font-weight: 700; color: #0f172a; line-height: 1.1; }
    .stat .lbl { font-size: 12px; color: #64748b; margin-top: 6px; }
    .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
    .tab { padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-size: 13px; font-weight: 600; cursor: pointer; }
    .tab.active { background: #0f172a; color: #ffffff; border-color: #0f172a; }
    .panel { display: none; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
    .panel.active { display: block; }
    .controls { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
    input[type="search"], select { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; background: #ffffff; color: #0f172a; }
    input[type="search"] { flex: 1; min-width: 240px; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; vertical-align: top; }
    th { background: #f8fafc; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; }
    code { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
    .file-name { color: #475569; }
    .route-link { font-weight: 600; color: #0f172a; text-decoration: none; }
    .route-link:hover { color: #6d28d9; text-decoration: underline; }
    .aliases { margin-top: 4px; display: flex; flex-wrap: wrap; gap: 4px; }
    .alias { font-size: 11px; font-family: ui-monospace, monospace; background: #ede9fe; color: #5b21b6; padding: 1px 6px; border-radius: 4px; }
    .kind { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; white-space: nowrap; }
    .kind-full-document { background: #dbeafe; color: #1e40af; }
    .kind-styled-fragment { background: #ede9fe; color: #5b21b6; }
    .kind-gutenberg-content { background: #dcfce7; color: #166534; }
    .kind-plugin-shortcode { background: #fef3c7; color: #92400e; }
    .kind-empty { background: #f1f5f9; color: #64748b; }
    .kind-missing { background: #fee2e2; color: #991b1b; }
    .kind-ext-cdn-library { background: #e0f2fe; color: #075985; }
    .kind-ext-external-media { background: #fef3c7; color: #92400e; }
    .kind-ext-external-service { background: #f3e8ff; color: #6b21a8; }
    .num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
    .samples a { color: #4338ca; word-break: break-all; }
    .note { margin: 0 0 16px; font-size: 13px; color: #475569; }
  </style>
</head>
<body>
  <header>
    <div class="wrap top">
      <div>
        <h1>Maison John&amp;Co Marketing — Inventaire &amp; Audit</h1>
        <p>Toutes les ${stats.totalPages} pages HTML exportées sont conservées et rendues individuellement avec leurs styles et scripts autonomes.</p>
      </div>
      <a class="home-btn" href="/">Ouvrir l'accueil (/)</a>
    </div>
  </header>
  <main class="wrap">
    <div class="stats">
      <div class="stat"><div class="val">${stats.totalPages}</div><div class="lbl">Pages HTML conservées (${stats.fullDocuments} complètes, ${stats.styledFragments} fragments stylés, ${stats.gutenbergPages} Gutenberg, ${stats.pluginShortcodePages} plugins, ${stats.emptyPages} vides)</div></div>
      <div class="stat"><div class="val">${stats.resolvedInternalLinks}</div><div class="lbl">Liens internes résolus vers les routes &amp; ressources locales</div></div>
      <div class="stat"><div class="val">${stats.missingInternalLinkTargets}</div><div class="lbl">Cibles internes manquantes / absentes de l'export</div></div>
      <div class="stat"><div class="val">${stats.externalDomainCount}</div><div class="lbl">Domaines externes référencés (CDN, médias, services)</div></div>
      <div class="stat"><div class="val">${stats.totalAssets}</div><div class="lbl">Ressources locales 2026 (/assets/uploads/2026/)</div></div>
    </div>

    <div class="tabs" role="tablist">
      <button class="tab active" type="button" data-tab="pages">Pages (${stats.totalPages})</button>
      <button class="tab" type="button" data-tab="missing">Ressources manquantes (${stats.missingInternalLinkTargets})</button>
      <button class="tab" type="button" data-tab="external">Ressources externes (${stats.externalDomainCount} domaines)</button>
      <button class="tab" type="button" data-tab="assets">Assets locaux 2026 (${stats.totalAssets})</button>
    </div>

    <section class="panel active" id="panel-pages">
      <div class="controls">
        <input id="pageSearch" type="search" placeholder="Rechercher par titre, route ou nom de fichier..." />
        <select id="kindFilter">
          <option value="all">Tous les types (${stats.totalPages})</option>
          <option value="full-document">Documents HTML complets (${stats.fullDocuments})</option>
          <option value="styled-fragment">Fragments HTML + styles (${stats.styledFragments})</option>
          <option value="gutenberg-content">Contenus Gutenberg (${stats.gutenbergPages})</option>
          <option value="plugin-shortcode">Shortcodes / Plugins WP (${stats.pluginShortcodePages})</option>
          <option value="empty">Fichiers vides (${stats.emptyPages})</option>
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Page</th><th>Route &amp; Alias</th><th>Fichier source</th><th>Type</th><th class="num">Taille</th></tr></thead>
          <tbody id="pagesBody">${pageRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel" id="panel-missing">
      <p class="note">Liens internes ou anciens liens WordPress qui pointent vers des pages, articles de blog, fichiers PDF ou scripts absents de cet export.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Chemin manquant</th><th>Catégorie</th><th class="num">Occurrences</th><th>Pages sources</th></tr></thead>
          <tbody>${missingRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel" id="panel-external">
      <p class="note">Ressources hébergées hors du site (bibliothèques CDN, polices Google Fonts, médias externes, formulaires tiers, réseaux sociaux).</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Domaine</th><th>Type</th><th class="num">Références</th><th class="num">Pages</th><th>Exemples d'URL</th></tr></thead>
          <tbody>${externalRows}</tbody>
        </table>
      </div>
    </section>

    <section class="panel" id="panel-assets">
      <p class="note">Fichiers locaux conservés dans <code>/assets/uploads/2026/</code> et accessibles directement (également mappés depuis <code>/wp-content/uploads/</code>).</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Fichier</th><th>Route locale</th><th class="num">Taille</th></tr></thead>
          <tbody>${assetRows}</tbody>
        </table>
      </div>
    </section>
  </main>
  <script>
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
      });
    });

    const searchInput = document.getElementById('pageSearch');
    const kindSelect = document.getElementById('kindFilter');
    const rows = Array.from(document.querySelectorAll('#pagesBody tr'));
    function applyFilter() {
      const q = (searchInput.value || '').trim().toLowerCase();
      const k = kindSelect.value;
      rows.forEach((row) => {
        const matchKind = k === 'all' || row.dataset.kind === k;
        const matchQuery = !q || (row.dataset.search || '').includes(q);
        row.style.display = matchKind && matchQuery ? '' : 'none';
      });
    }
    searchInput.addEventListener('input', applyFilter);
    kindSelect.addEventListener('change', applyFilter);
  </script>
</body>
</html>`;
}
