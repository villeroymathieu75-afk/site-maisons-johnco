export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const BRAND_NAV = {
  label: 'Maison John&Co Marketing',
  href: '/',
};

export const ACCOUNT_NAV = {
  label: 'Compte',
  href: '/tableau-de-bord-client',
};

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: 'À propos',
    href: '/a-propos',
    children: [
      { label: 'Équipe dirigeante', href: '/equipe-dirigeante' },
      { label: 'Notre agence', href: '/notre-agence' },
      { label: 'Méthode & engagements', href: '/methode-engagements' },
      { label: 'Carrières', href: '/carrieres' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Services entreprises',
        href: '/services-proposes-pour-les-entreprises',
        children: [
          {
            label: 'Stratégie Digitale & Accompagnement',
            href: '/strategie-digitale-accompagnement',
            children: [
              { label: 'Consulting Stratégique Digital', href: '/consulting-strategique-digital' },
              { label: 'Audit Digital', href: '/audit-digital' },
              { label: 'Coaching & Accompagnements', href: '/coaching-accompagnements' },
              { label: 'Veille Stratégique Digitale', href: '/veille-strategique-digitale' },
              { label: 'Plan de Communication Digitale', href: '/plan-de-communication-digitale' },
              {
                label: 'Accompagnement à la Transformation Digitale',
                href: '/accompagnement-a-la-transformation-digitale',
              },
            ],
          },
          {
            label: 'Création Digitale & Identité',
            href: '/creation-digitale-identite',
            children: [
              { label: 'Création de Contenu Digital', href: '/creation-de-contenu-digital' },
              { label: 'Webdesign & UI Design', href: '/webdesign-ui-design' },
              {
                label: 'UX Design & Expérience Utilisateur',
                href: '/ux-design-experience-utilisateur',
              },
              {
                label: 'Création et Optimisation de Sites Web',
                href: '/creation-et-optimisation-de-sites-web',
              },
              {
                label: 'Création de Boutique e-Commerce',
                href: '/creation-de-boutique-e-commerce',
              },
              { label: 'Création de Landing Pages', href: '/creation-de-landing-pages' },
              { label: 'Création de Tunnel de Vente', href: '/creation-de-tunnel-de-vente' },
              {
                label: 'Optimisation Mobile & Responsive',
                href: '/optimisation-mobile-responsive',
              },
            ],
          },
          {
            label: 'Publicité Digitale',
            href: '/publicite-digitale',
            children: [
              { label: 'Publicité en Ligne (PPC)', href: '/publicite-en-ligne-ppc' },
              {
                label: 'Publicité ADS Réseaux Sociaux',
                href: '/publicite-ads-reseaux-sociaux',
              },
              { label: 'Display Programmatique', href: '/display-programmatique' },
              { label: 'Retargeting & Remarketing', href: '/retargeting-remarketing' },
              { label: 'Publicité Native', href: '/publicite-native' },
              { label: 'Publicité Vidéo', href: '/publicite-video' },
            ],
          },
          {
            label: 'Référencement & Visibilité',
            href: '/referencement-visibilite',
            children: [
              { label: 'SOE / Référencement', href: '/soe-referencement' },
              { label: 'Référencement Local', href: '/referencement-local' },
              { label: 'Stratégie de Contenu SEO', href: '/strategie-de-contenu-seo' },
              {
                label: 'Optimisation Fiche Google Business Profile',
                href: '/optimisation-fiche-google-business-profile',
              },
            ],
          },
          {
            label: 'Contenu & Rédaction',
            href: '/contenu-redaction',
            children: [
              {
                label: 'Copywriting & Rédaction Commerciale',
                href: '/copywriting-redaction-commerciale',
              },
              {
                label: 'Rédaction SEO & Articles de Blog',
                href: '/redaction-seo-articles-de-blog',
              },
              {
                label: 'Création de Scripts Vidéo Publicitaires',
                href: '/creation-de-scripts-video-publicitaires',
              },
            ],
          },
          {
            label: 'Automatisation & CRM',
            href: '/automatisation-crm',
            children: [
              { label: 'Email Marketing', href: '/email-marketing' },
              { label: 'Marketing Automation', href: '/marketing-automation' },
              {
                label: 'CRM & Gestion de la Relation Client',
                href: '/crm-gestion-de-la-relation-client',
              },
              {
                label: 'SMS Marketing & Notifications Push',
                href: '/sms-marketing-notifications-push',
              },
            ],
          },
          {
            label: 'Analyse & Performance',
            href: '/analyse-performance',
            children: [
              {
                label: 'Webanalyse & Suivi des Conversions',
                href: '/webanalyse-suivi-des-conversions',
              },
              {
                label: 'A/B Testing & Optimisation de Conversion',
                href: '/a-b-testing-optimisation-de-conversion',
              },
              {
                label: 'Reporting Stratégique & Tableaux de Bord',
                href: '/reporting-strategique-tableaux-de-bord',
              },
            ],
          },
          {
            label: 'Influence, Social Media & Communauté',
            href: '/influence-social-media-communaute',
            children: [
              { label: 'Gestion des Réseaux Sociaux', href: '/gestion-des-reseaux-sociaux' },
              { label: 'Social Media Management', href: '/social-media-management' },
              {
                label: 'Stratégie d’Influence Digitale',
                href: '/strategie-dinfluence-digitale',
              },
              {
                label: 'Création de Communauté Digitale',
                href: '/creation-de-communaute-digitale',
              },
            ],
          },
        ],
      },
      { label: 'Services influenceurs', href: '/services-influenceurs' },
      { label: 'Services particuliers', href: '/services-particuliers' },
    ],
  },
  {
    label: 'Offres & tarifs',
    href: '/offres-tarifs',
    children: [
      {
        label: 'Packs Professionnels (TPE/PME/ETI)',
        href: '/packs-professionnels-tpe-pme-eti',
      },
      { label: 'Offres Créateurs de contenu', href: '/offres-createurs-de-contenu' },
      {
        label: 'Offres particuliers & personal branding',
        href: '/offres-particuliers-personal-branding',
      },
      { label: 'Devis sur mesure', href: '/devis-sur-mesure' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      { label: 'Études de cas', href: '/etudes-de-cas' },
      { label: 'Blog & ressources', href: '/blog-ressources' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'LXEDC',
    href: '/lxedc',
    children: [
      {
        label: 'Digital Influence Management – Spécial Influenceurs',
        href: '/digital-influence-management-special-influenceurs',
      },
      {
        label: 'Digital Influence Management – Spécial Discothèques',
        href: '/digital-influence-management-special-discotheques',
      },
      { label: '2 page secret', href: '/0-page-secret' },
    ],
  },
];

/**
 * Builds the Shadow-DOM <mjc-site-header> custom element injected at the top
 * of every page. Completely CSS-isolated so page stylesheets (Tailwind CDN,
 * custom page CSS, Gutenberg styles) never interfere with the navigation bar,
 * and the navigation bar never overrides page styles.
 */
export function buildSiteHeaderSnippet(currentRoute: string): string {
  const payload = JSON.stringify({
    brand: BRAND_NAV,
    account: ACCOUNT_NAV,
    items: MAIN_NAVIGATION,
    currentRoute,
  }).replace(/</g, '\\u003c');

  return `<mjc-site-header></mjc-site-header>
<script>
(() => {
  if (customElements.get('mjc-site-header')) return;
  const CONFIG = ${payload};

  const CHEVRON_DOWN = '<svg class="chev chev-down" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  const CHEVRON_RIGHT = '<svg class="chev chev-right" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  const ACCOUNT_ICON = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  const MENU_ICON = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  const CLOSE_ICON = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function norm(path) {
    if (!path || path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  const activeRoute = norm(CONFIG.currentRoute || window.location.pathname);

  function isTreeActive(item) {
    if (norm(item.href) === activeRoute) return true;
    if (item.children && item.children.length) {
      return item.children.some(isTreeActive);
    }
    return false;
  }

  function renderDesktopSubmenu(items, level) {
    return '<ul class="submenu level-' + level + '" role="menu">' +
      items.map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const active = norm(item.href) === activeRoute;
        const branchActive = !active && isTreeActive(item);
        const cls = ['sub-item', hasChildren ? 'has-sub' : '', active ? 'is-active' : '', branchActive ? 'is-branch-active' : ''].filter(Boolean).join(' ');
        if (!hasChildren) {
          return '<li class="' + cls + '" role="none">' +
            '<a class="sub-link" role="menuitem" href="' + esc(item.href) + '">' +
              '<span class="sub-label">' + esc(item.label) + '</span>' +
            '</a>' +
          '</li>';
        }
        return '<li class="' + cls + '" role="none">' +
          '<div class="sub-row">' +
            '<a class="sub-link" role="menuitem" href="' + esc(item.href) + '">' +
              '<span class="sub-label">' + esc(item.label) + '</span>' +
            '</a>' +
            '<button class="sub-arrow-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Afficher le sous-menu ' + esc(item.label) + '">' +
              CHEVRON_RIGHT +
            '</button>' +
          '</div>' +
          renderDesktopSubmenu(item.children, level + 1) +
        '</li>';
      }).join('') +
    '</ul>';
  }

  function renderDesktopNav(items) {
    return items.map((item) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      const active = norm(item.href) === activeRoute;
      const branchActive = !active && isTreeActive(item);
      const cls = ['nav-item', hasChildren ? 'has-sub' : '', active ? 'is-active' : '', branchActive ? 'is-branch-active' : ''].filter(Boolean).join(' ');
      if (!hasChildren) {
        return '<li class="' + cls + '" role="none">' +
          '<a class="nav-link" href="' + esc(item.href) + '">' + esc(item.label) + '</a>' +
        '</li>';
      }
      return '<li class="' + cls + '" role="none">' +
        '<div class="nav-trigger">' +
          '<a class="nav-link" href="' + esc(item.href) + '">' + esc(item.label) + '</a>' +
          '<button class="nav-arrow-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Ouvrir le menu ' + esc(item.label) + '">' +
            CHEVRON_DOWN +
          '</button>' +
        '</div>' +
        renderDesktopSubmenu(item.children, 1) +
      '</li>';
    }).join('');
  }

  function renderMobileTree(items, depth) {
    return '<ul class="m-list m-depth-' + depth + '">' +
      items.map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const active = norm(item.href) === activeRoute;
        const branchActive = !active && isTreeActive(item);
        const openByDefault = branchActive;
        const cls = ['m-item', hasChildren ? 'm-has-sub' : '', openByDefault ? 'm-open' : '', active ? 'is-active' : '', branchActive ? 'is-branch-active' : ''].filter(Boolean).join(' ');
        if (!hasChildren) {
          return '<li class="' + cls + '">' +
            '<a class="m-link" href="' + esc(item.href) + '">' + esc(item.label) + '</a>' +
          '</li>';
        }
        return '<li class="' + cls + '">' +
          '<div class="m-row">' +
            '<a class="m-link" href="' + esc(item.href) + '">' + esc(item.label) + '</a>' +
            '<button class="m-toggle" type="button" aria-expanded="' + (openByDefault ? 'true' : 'false') + '" aria-label="Déplier ' + esc(item.label) + '">' +
              CHEVRON_DOWN +
            '</button>' +
          '</div>' +
          '<div class="m-panel">' +
            renderMobileTree(item.children, depth + 1) +
          '</div>' +
        '</li>';
      }).join('') +
    '</ul>';
  }

  class MjcSiteHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.closeTimers = new WeakMap();
      this.mobileOpen = false;
    }

    connectedCallback() {
      this.render();
      this.bindEvents();
    }

    openLi(li) {
      const timer = this.closeTimers.get(li);
      if (timer) {
        clearTimeout(timer);
        this.closeTimers.delete(li);
      }
      // Close sibling dropdowns at the same level immediately
      const parentList = li.parentElement;
      if (parentList) {
        Array.from(parentList.children).forEach((sib) => {
          if (sib !== li && sib.classList.contains('is-open')) {
            this.closeLiImmediate(sib);
          }
        });
      }
      li.classList.add('is-open');
      const btn = li.querySelector(':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn');
      if (btn) btn.setAttribute('aria-expanded', 'true');

      const submenu = li.querySelector(':scope > .submenu');
      if (submenu) {
        this.adjustSubmenuPosition(submenu);
      }
    }

    scheduleCloseLi(li) {
      const existing = this.closeTimers.get(li);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => {
        this.closeLiImmediate(li);
        this.closeTimers.delete(li);
      }, 240);
      this.closeTimers.set(li, timer);
    }

    closeLiImmediate(li) {
      const timer = this.closeTimers.get(li);
      if (timer) {
        clearTimeout(timer);
        this.closeTimers.delete(li);
      }
      li.classList.remove('is-open', 'is-pinned');
      const btn = li.querySelector(':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      li.querySelectorAll('.is-open').forEach((child) => {
        child.classList.remove('is-open', 'is-pinned');
        const cb = child.querySelector(':scope > .sub-row > .sub-arrow-btn');
        if (cb) cb.setAttribute('aria-expanded', 'false');
      });
    }

    closeAllDesktop() {
      this.shadowRoot.querySelectorAll('.desktop-nav .is-open').forEach((li) => {
        this.closeLiImmediate(li);
      });
    }

    adjustSubmenuPosition(submenu) {
      submenu.classList.remove('flip-left', 'align-right');
      submenu.style.top = '';
      const rect = submenu.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (submenu.classList.contains('level-1')) {
        if (rect.right > vw - 16) {
          submenu.classList.add('align-right');
        }
      } else {
        if (rect.right > vw - 16) {
          submenu.classList.add('flip-left');
        }
        if (rect.bottom > vh - 16) {
          const overflow = rect.bottom - (vh - 16);
          const currentTop = parseFloat(getComputedStyle(submenu).top) || 0;
          const nextTop = Math.max(-rect.top + 80, currentTop - overflow);
          submenu.style.top = nextTop + 'px';
        }
      }
    }

    setMobileOpen(open) {
      this.mobileOpen = open;
      const drawer = this.shadowRoot.querySelector('.m-drawer');
      const backdrop = this.shadowRoot.querySelector('.m-backdrop');
      const burger = this.shadowRoot.querySelector('.burger-btn');
      if (drawer) drawer.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('open', open);
      if (burger) {
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        burger.innerHTML = open ? CLOSE_ICON : MENU_ICON;
      }
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }

    bindEvents() {
      const desktopItems = this.shadowRoot.querySelectorAll('.desktop-nav li.has-sub');
      desktopItems.forEach((li) => {
        li.addEventListener('mouseenter', () => {
          this.openLi(li);
        });
        li.addEventListener('mouseleave', () => {
          if (!li.classList.contains('is-pinned')) {
            this.scheduleCloseLi(li);
          }
        });

        const arrowBtn = li.querySelector(':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn');
        if (arrowBtn) {
          arrowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const willOpen = !li.classList.contains('is-pinned');
            if (willOpen) {
              this.openLi(li);
              li.classList.add('is-pinned');
            } else {
              this.closeLiImmediate(li);
            }
          });
        }
      });

      // Mobile drawer controls
      const burger = this.shadowRoot.querySelector('.burger-btn');
      const backdrop = this.shadowRoot.querySelector('.m-backdrop');
      const closeBtn = this.shadowRoot.querySelector('.m-close');
      if (burger) burger.addEventListener('click', () => this.setMobileOpen(!this.mobileOpen));
      if (backdrop) backdrop.addEventListener('click', () => this.setMobileOpen(false));
      if (closeBtn) closeBtn.addEventListener('click', () => this.setMobileOpen(false));

      // Mobile nested accordions
      this.shadowRoot.querySelectorAll('.m-toggle').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const item = btn.closest('.m-item');
          if (!item) return;
          const isOpen = item.classList.toggle('m-open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      });

      // Close on outside click or Escape
      document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(this)) {
          this.closeAllDesktop();
        }
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllDesktop();
          if (this.mobileOpen) this.setMobileOpen(false);
        }
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1080 && this.mobileOpen) {
          this.setMobileOpen(false);
        }
      });
    }

    render() {
      const accountActive = norm(CONFIG.account.href) === activeRoute ? ' is-active' : '';
      this.shadowRoot.innerHTML = \`
        <style>
          :host {
            all: initial;
            display: block;
            width: 100%;
            font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #0A1628;
            --mjc-h: 72px;
            --mjc-ink: #0A1628;
            --mjc-muted: #334155;
            --mjc-accent: #7C3AED;
            --mjc-accent-soft: #F5F3FF;
            --mjc-border: #E5E7EB;
            --mjc-surface: rgba(255, 255, 255, 0.97);
          }
          *, *::before, *::after { box-sizing: border-box; }

          .spacer {
            height: var(--mjc-h);
            width: 100%;
          }

          .bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--mjc-h);
            background: var(--mjc-surface);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--mjc-border);
            z-index: 2147483000;
            box-shadow: 0 1px 12px rgba(10, 22, 40, 0.05);
          }

          .inner {
            max-width: 1320px;
            height: 100%;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }

          .brand {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: var(--mjc-ink);
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.02em;
            white-space: nowrap;
            flex-shrink: 0;
            padding: 6px 0;
            transition: color 0.16s ease;
          }
          .brand:hover { color: var(--mjc-accent); }
          .brand:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: 4px; border-radius: 6px; }

          /* Desktop horizontal navigation */
          .desktop-nav {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
          }
          .nav-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .nav-item {
            position: relative;
          }
          .nav-trigger {
            display: inline-flex;
            align-items: center;
          }
          .nav-link {
            display: inline-flex;
            align-items: center;
            padding: 9px 10px 9px 12px;
            color: var(--mjc-muted);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.2;
            white-space: nowrap;
            border-radius: 7px;
            transition: color 0.15s ease, background-color 0.15s ease;
          }
          .nav-item:not(.has-sub) > .nav-link {
            padding: 9px 12px;
          }
          .nav-arrow-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 26px;
            height: 32px;
            margin-left: -4px;
            padding: 0;
            border: none;
            background: transparent;
            color: #64748B;
            cursor: pointer;
            border-radius: 6px;
            transition: color 0.15s ease, transform 0.16s ease, background-color 0.15s ease;
          }
          .nav-item:hover > .nav-trigger > .nav-link,
          .nav-item.is-open > .nav-trigger > .nav-link,
          .nav-item.is-active > .nav-trigger > .nav-link,
          .nav-item.is-branch-active > .nav-trigger > .nav-link,
          .nav-item:hover > .nav-link,
          .nav-item.is-active > .nav-link {
            color: var(--mjc-accent);
          }
          .nav-item:hover > .nav-trigger > .nav-arrow-btn,
          .nav-item.is-open > .nav-trigger > .nav-arrow-btn,
          .nav-item.is-branch-active > .nav-trigger > .nav-arrow-btn {
            color: var(--mjc-accent);
          }
          .nav-item.is-open > .nav-trigger > .nav-arrow-btn .chev-down {
            transform: rotate(180deg);
          }
          .nav-link:focus-visible,
          .nav-arrow-btn:focus-visible {
            outline: 2px solid var(--mjc-accent);
            outline-offset: 2px;
          }

          /* Dropdown menus (Level 1, 2, 3) */
          .submenu {
            list-style: none;
            margin: 0;
            padding: 8px;
            position: absolute;
            min-width: 256px;
            background: #FFFFFF;
            border: 1px solid var(--mjc-border);
            border-radius: 10px;
            box-shadow: 0 18px 42px rgba(10, 22, 40, 0.13), 0 4px 12px rgba(10, 22, 40, 0.05);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.15s ease;
          }
          .submenu.level-1 {
            top: calc(100% + 10px);
            left: 0;
            transform: translateY(6px);
            z-index: 10;
          }
          /* Invisible hover bridge between top bar item and level-1 dropdown */
          .submenu.level-1::before {
            content: '';
            position: absolute;
            top: -14px;
            left: 0;
            right: 0;
            height: 14px;
          }
          .submenu.level-1.align-right {
            left: auto;
            right: 0;
          }

          .submenu.level-2,
          .submenu.level-3 {
            top: -8px;
            left: calc(100% + 8px);
            min-width: 300px;
            max-width: 340px;
            transform: translateX(6px);
            z-index: 20;
          }
          .submenu.level-3 {
            z-index: 30;
          }
          /* Invisible hover bridge between parent item and flyout submenu */
          .submenu.level-2::before,
          .submenu.level-3::before {
            content: '';
            position: absolute;
            top: -8px;
            bottom: -8px;
            left: -14px;
            width: 14px;
          }
          .submenu.level-2.flip-left,
          .submenu.level-3.flip-left {
            left: auto;
            right: calc(100% + 8px);
            transform: translateX(-6px);
          }
          .submenu.level-2.flip-left::before,
          .submenu.level-3.flip-left::before {
            left: auto;
            right: -14px;
          }

          .nav-item.is-open > .submenu.level-1,
          .sub-item.is-open > .submenu {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translate(0, 0);
          }

          .sub-item {
            position: relative;
          }
          .sub-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 7px;
            transition: background-color 0.14s ease;
          }
          .sub-link {
            display: flex;
            align-items: center;
            flex: 1;
            padding: 9px 12px;
            color: #1E293B;
            text-decoration: none;
            font-size: 13.5px;
            font-weight: 500;
            line-height: 1.35;
            border-radius: 7px;
            transition: color 0.14s ease, background-color 0.14s ease;
          }
          .sub-item.has-sub > .sub-row > .sub-link {
            padding-right: 6px;
          }
          .sub-arrow-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 34px;
            flex-shrink: 0;
            margin-right: 4px;
            border: none;
            background: transparent;
            color: #64748B;
            cursor: pointer;
            border-radius: 6px;
            transition: color 0.14s ease, transform 0.15s ease;
          }
          .sub-item:not(.has-sub) > .sub-link:hover,
          .sub-item.has-sub:hover > .sub-row,
          .sub-item.has-sub.is-open > .sub-row,
          .sub-item.is-active > .sub-link,
          .sub-item.is-active > .sub-row,
          .sub-item.is-branch-active > .sub-row {
            background: var(--mjc-accent-soft);
          }
          .sub-item:not(.has-sub) > .sub-link:hover,
          .sub-item.has-sub:hover > .sub-row > .sub-link,
          .sub-item.has-sub.is-open > .sub-row > .sub-link,
          .sub-item.is-active > .sub-link,
          .sub-item.is-active > .sub-row > .sub-link,
          .sub-item.is-branch-active > .sub-row > .sub-link {
            color: var(--mjc-accent);
          }
          .sub-item.has-sub:hover > .sub-row > .sub-arrow-btn,
          .sub-item.has-sub.is-open > .sub-row > .sub-arrow-btn,
          .sub-item.is-branch-active > .sub-row > .sub-arrow-btn {
            color: var(--mjc-accent);
            transform: translateX(2px);
          }
          .sub-link:focus-visible,
          .sub-arrow-btn:focus-visible {
            outline: 2px solid var(--mjc-accent);
            outline-offset: -2px;
          }

          /* Right controls: Account icon + mobile burger */
          .right-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }
          .account-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid var(--mjc-border);
            background: #FFFFFF;
            color: var(--mjc-ink);
            text-decoration: none;
            transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease;
          }
          .account-btn:hover,
          .account-btn.is-active {
            border-color: var(--mjc-accent);
            color: var(--mjc-accent);
            background: var(--mjc-accent-soft);
          }
          .account-btn:focus-visible {
            outline: 2px solid var(--mjc-accent);
            outline-offset: 2px;
          }

          .burger-btn {
            display: none;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 8px;
            border: 1px solid var(--mjc-border);
            background: #FFFFFF;
            color: var(--mjc-ink);
            cursor: pointer;
          }
          .burger-btn:hover {
            border-color: var(--mjc-accent);
            color: var(--mjc-accent);
          }
          .burger-btn:focus-visible {
            outline: 2px solid var(--mjc-accent);
            outline-offset: 2px;
          }

          /* Mobile drawer */
          .m-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(10, 22, 40, 0.45);
            z-index: 2147483001;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s ease, visibility 0.2s ease;
          }
          .m-backdrop.open { opacity: 1; visibility: visible; }

          .m-drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: min(390px, 92vw);
            background: #FFFFFF;
            z-index: 2147483002;
            transform: translateX(100%);
            transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            box-shadow: -12px 0 36px rgba(10, 22, 40, 0.18);
          }
          .m-drawer.open { transform: translateX(0); }

          .m-header {
            height: 64px;
            padding: 0 16px 0 20px;
            border-bottom: 1px solid var(--mjc-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
          }
          .m-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--mjc-ink);
          }
          .m-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid var(--mjc-border);
            background: #FFFFFF;
            color: var(--mjc-ink);
            cursor: pointer;
          }

          .m-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px 14px 28px;
          }
          .m-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .m-depth-1 {
            padding-left: 12px;
            border-left: 1px solid #E2E8F0;
            margin: 2px 0 6px 12px;
          }
          .m-depth-2 {
            padding-left: 12px;
            border-left: 1px solid #DDD6FE;
            margin: 2px 0 6px 10px;
          }
          .m-depth-3 {
            padding-left: 12px;
            border-left: 1px solid #E2E8F0;
            margin: 2px 0 6px 10px;
          }
          .m-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4px;
          }
          .m-link {
            display: block;
            flex: 1;
            padding: 10px 10px;
            color: #1E293B;
            text-decoration: none;
            font-size: 14.5px;
            font-weight: 500;
            line-height: 1.35;
            border-radius: 7px;
          }
          .m-depth-0 > .m-item > .m-row > .m-link,
          .m-depth-0 > .m-item > .m-link {
            font-weight: 600;
            color: var(--mjc-ink);
          }
          .m-depth-2 > .m-item > .m-row > .m-link {
            font-size: 13.5px;
            font-weight: 600;
          }
          .m-depth-3 > .m-item > .m-link {
            font-size: 13px;
            color: #475569;
          }
          .m-item.is-active > .m-link,
          .m-item.is-active > .m-row > .m-link,
          .m-item.is-branch-active > .m-row > .m-link {
            color: var(--mjc-accent);
            background: var(--mjc-accent-soft);
          }
          .m-toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            border: none;
            background: transparent;
            color: #64748B;
            border-radius: 7px;
            cursor: pointer;
          }
          .m-toggle:hover { background: #F1F5F9; color: var(--mjc-accent); }
          .m-toggle .chev-down { transition: transform 0.18s ease; }
          .m-item.m-open > .m-row > .m-toggle .chev-down { transform: rotate(180deg); color: var(--mjc-accent); }
          .m-panel { display: none; }
          .m-item.m-open > .m-panel { display: block; }

          .m-footer {
            padding: 14px 16px;
            border-top: 1px solid var(--mjc-border);
            background: #F8FAFC;
            flex-shrink: 0;
          }
          .m-account-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 11px 16px;
            border-radius: 8px;
            background: var(--mjc-ink);
            color: #FFFFFF;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          }
          .m-account-link:hover { background: var(--mjc-accent); }

          @media (max-width: 1079px) {
            :host { --mjc-h: 64px; }
            .inner { padding: 0 16px; gap: 12px; }
            .brand { font-size: 15px; }
            .desktop-nav { display: none; }
            .burger-btn { display: inline-flex; }
            .account-btn { width: 42px; height: 42px; }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition: none !important; }
          }
        </style>

        <div class="spacer" aria-hidden="true"></div>

        <header class="bar" role="banner">
          <div class="inner">
            <a class="brand" href="\${esc(CONFIG.brand.href)}">\${esc(CONFIG.brand.label)}</a>

            <nav class="desktop-nav" aria-label="Navigation principale">
              <ul class="nav-list">
                \${renderDesktopNav(CONFIG.items)}
              </ul>
            </nav>

            <div class="right-actions">
              <a
                class="account-btn\${accountActive}"
                href="\${esc(CONFIG.account.href)}"
                aria-label="Compte — Accéder à mon espace client"
                title="Compte / Connexion"
              >
                \${ACCOUNT_ICON}
              </a>
              <button
                class="burger-btn"
                type="button"
                aria-expanded="false"
                aria-label="Ouvrir le menu"
              >
                \${MENU_ICON}
              </button>
            </div>
          </div>
        </header>

        <div class="m-backdrop"></div>
        <aside class="m-drawer" aria-label="Menu mobile">
          <div class="m-header">
            <span class="m-title">\${esc(CONFIG.brand.label)}</span>
            <button class="m-close" type="button" aria-label="Fermer le menu">\${CLOSE_ICON}</button>
          </div>
          <div class="m-body">
            \${renderMobileTree(CONFIG.items, 0)}
          </div>
          <div class="m-footer">
            <a class="m-account-link" href="\${esc(CONFIG.account.href)}">
              \${ACCOUNT_ICON}
              <span>Mon compte / Connexion</span>
            </a>
          </div>
        </aside>
      \`;
    }
  }

  customElements.define('mjc-site-header', MjcSiteHeader);
})();
</script>`;
}
