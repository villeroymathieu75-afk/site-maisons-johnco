(() => {
  if (customElements.get('mjc-site-header')) return;

  // Derive the site root cleanly from this script's own URL (.../assets/js/site-header.js -> .../)
  const currentScript =
    document.currentScript ||
    document.querySelector('script[src*="site-header.js"]');
  let siteRoot = '/';
  if (currentScript && currentScript.src) {
    try {
      const rootUrl = new URL('../../', currentScript.src);
      siteRoot = rootUrl.pathname.endsWith('/') ? rootUrl.pathname : rootUrl.pathname + '/';
    } catch {
      siteRoot = '/';
    }
  }

  function resolveHref(target) {
    if (!target || target === '/') return siteRoot;
    return siteRoot + target.replace(/^\/+/, '');
  }

  function syncHeaderMetrics() {
    const h = window.innerWidth < 1080 ? 64 : 72;
    document.documentElement.style.setProperty('--mjc-header-height', h + 'px');
    return h;
  }

  function ensureGlobalGuardStyle() {
    if (document.getElementById('mjc-header-layout-guard')) return;
    const style = document.createElement('style');
    style.id = 'mjc-header-layout-guard';
    style.textContent = [
      ':root { --mjc-header-height: 72px; }',
      '@media (max-width: 1079px) { :root { --mjc-header-height: 64px; } }',
      'html { scroll-padding-top: calc(var(--mjc-header-height, 72px) + 12px); }',
      'mjc-site-header { display: block !important; width: 100% !important; max-width: none !important; flex: 0 0 auto !important; align-self: stretch !important; margin: 0 !important; padding: 0 !important; position: relative !important; z-index: 2147483000 !important; box-sizing: border-box !important; }',
    ].join('\n');
    (document.head || document.documentElement).appendChild(style);
  }

  ensureGlobalGuardStyle();
  syncHeaderMetrics();

  const BRAND = {
    label: 'Maison John&Co Marketing',
    target: '/',
  };

  const ACCOUNT = {
    label: 'Compte',
    target: 'pages/tableau-de-bord-client--23.html',
  };

  const MENU = [
    {
      label: 'À propos',
      target: 'pages/a-propos--31.html',
      children: [
        { label: 'Équipe dirigeante', target: 'pages/equipe-dirigeante--37.html' },
        { label: 'Notre agence', target: 'pages/notre-agence--35.html' },
        { label: 'Méthode & engagements', target: 'pages/methode-engagements--38.html' },
        { label: 'Carrières', target: 'pages/carrieres--39.html' },
      ],
    },
    {
      label: 'Services',
      target: 'pages/services--40.html',
      children: [
        {
          label: 'Services entreprises',
          target: 'pages/services-proposes-pour-les-entreprises--395.html',
          children: [
            {
              label: 'Stratégie Digitale & Accompagnement',
              target: 'pages/strategie-digitale-accompagnement--396.html',
              children: [
                {
                  label: 'Consulting Stratégique Digital',
                  target: 'pages/consulting-strategique-digital--340.html',
                },
                { label: 'Audit Digital', target: 'pages/audit-digital--341.html' },
                {
                  label: 'Coaching & Accompagnements',
                  target: 'pages/coaching-accompagnements--342.html',
                },
                {
                  label: 'Veille Stratégique Digitale',
                  target: 'pages/veille-strategique-digitale--339.html',
                },
                {
                  label: 'Plan de Communication Digitale',
                  target: 'pages/plan-de-communication-digitale--338.html',
                },
                {
                  label: 'Accompagnement à la Transformation Digitale',
                  target: 'pages/accompagnement-a-la-transformation-digitale--337.html',
                },
              ],
            },
            {
              label: 'Création Digitale & Identité',
              target: 'pages/creation-digitale-identite--397.html',
              children: [
                {
                  label: 'Création de Contenu Digital',
                  target: 'pages/creation-de-contenu-digital--130.html',
                },
                { label: 'Webdesign & UI Design', target: 'pages/webdesign-ui-design--329.html' },
                {
                  label: 'UX Design & Expérience Utilisateur',
                  target: 'pages/ux-design-experience-utilisateur--330.html',
                },
                {
                  label: 'Création et Optimisation de Sites Web',
                  target: 'pages/creation-et-optimisation-de-sites-web--332.html',
                },
                {
                  label: 'Création de Boutique e-Commerce',
                  target: 'pages/creation-de-boutique-e-commerce--336.html',
                },
                {
                  label: 'Création de Landing Pages',
                  target: 'pages/creation-de-landing-pages--334.html',
                },
                {
                  label: 'Création de Tunnel de Vente',
                  target: 'pages/creation-de-tunnel-de-vente--333.html',
                },
                {
                  label: 'Optimisation Mobile & Responsive',
                  target: 'pages/optimisation-mobile-responsive--331.html',
                },
              ],
            },
            {
              label: 'Publicité Digitale',
              target: 'pages/publicite-digitale--398.html',
              children: [
                {
                  label: 'Publicité en Ligne (PPC)',
                  target: 'pages/publicite-en-ligne-ppc--146.html',
                },
                {
                  label: 'Publicité ADS Réseaux Sociaux',
                  target: 'pages/publicite-ads-reseaux-sociaux--147.html',
                },
                {
                  label: 'Display Programmatique',
                  target: 'pages/display-programmatique--149.html',
                },
                {
                  label: 'Retargeting & Remarketing',
                  target: 'pages/retargeting-remarketing--151.html',
                },
                { label: 'Publicité Native', target: 'pages/publicite-native--259.html' },
                { label: 'Publicité Vidéo', target: 'pages/publicite-video--253.html' },
              ],
            },
            {
              label: 'Référencement & Visibilité',
              target: 'pages/referencement-visibilite--399.html',
              children: [
                { label: 'SOE / Référencement', target: 'pages/soe-referencement--261.html' },
                { label: 'Référencement Local', target: 'pages/referencement-local--262.html' },
                {
                  label: 'Stratégie de Contenu SEO',
                  target: 'pages/strategie-de-contenu-seo--260.html',
                },
                {
                  label: 'Optimisation Fiche Google Business Profile',
                  target: 'pages/optimisation-fiche-google-business-profile--263.html',
                },
              ],
            },
            {
              label: 'Contenu & Rédaction',
              target: 'pages/contenu-redaction--400.html',
              children: [
                {
                  label: 'Copywriting & Rédaction Commerciale',
                  target: 'pages/copywriting-redaction-commerciale--266.html',
                },
                {
                  label: 'Rédaction SEO & Articles de Blog',
                  target: 'pages/redaction-seo-articles-de-blog--264.html',
                },
                {
                  label: 'Création de Scripts Vidéo Publicitaires',
                  target: 'pages/creation-de-scripts-video-publicitaires--265.html',
                },
              ],
            },
            {
              label: 'Automatisation & CRM',
              target: 'pages/automatisation-crm--401.html',
              children: [
                { label: 'Email Marketing', target: 'pages/email-marketing--269.html' },
                {
                  label: 'Marketing Automation',
                  target: 'pages/marketing-automation--268.html',
                },
                {
                  label: 'CRM & Gestion de la Relation Client',
                  target: 'pages/crm-gestion-de-la-relation-client--270.html',
                },
                {
                  label: 'SMS Marketing & Notifications Push',
                  target: 'pages/sms-marketing-notifications-push--267.html',
                },
              ],
            },
            {
              label: 'Analyse & Performance',
              target: 'pages/analyse-performance--402.html',
              children: [
                {
                  label: 'Webanalyse & Suivi des Conversions',
                  target: 'pages/webanalyse-suivi-des-conversions--271.html',
                },
                {
                  label: 'A/B Testing & Optimisation de Conversion',
                  target: 'pages/a-b-testing-optimisation-de-conversion--273.html',
                },
                {
                  label: 'Reporting Stratégique & Tableaux de Bord',
                  target: 'pages/reporting-strategique-tableaux-de-bord--272.html',
                },
              ],
            },
            {
              label: 'Influence, Social Media & Communauté',
              target: 'pages/influence-social-media-communaute--403.html',
              children: [
                {
                  label: 'Gestion des Réseaux Sociaux',
                  target: 'pages/gestion-des-reseaux-sociaux--276.html',
                },
                {
                  label: 'Social Media Management',
                  target: 'pages/social-media-management--274.html',
                },
                {
                  label: 'Stratégie d’Influence Digitale',
                  target: 'pages/strategie-dinfluence-digitale--275.html',
                },
                {
                  label: 'Création de Communauté Digitale',
                  target: 'pages/creation-de-communaute-digitale--277.html',
                },
              ],
            },
          ],
        },
        { label: 'Services influenceurs', target: 'pages/services-influenceurs--988.html' },
        { label: 'Services particuliers', target: 'pages/services-particuliers--989.html' },
      ],
    },
    {
      label: 'Offres & tarifs',
      target: 'pages/offres-tarifs--45.html',
      children: [
        {
          label: 'Packs Professionnels (TPE/PME/ETI)',
          target: 'pages/packs-professionnels-tpe-pme-eti--51.html',
        },
        {
          label: 'Offres Créateurs de contenu',
          target: 'pages/offres-createurs-de-contenu--46.html',
        },
        {
          label: 'Offres particuliers & personal branding',
          target: 'pages/offres-particuliers-personal-branding--47.html',
        },
        { label: 'Devis sur mesure', target: 'pages/devis-sur-mesure--48.html' },
      ],
    },
    {
      label: 'Portfolio',
      target: 'pages/portfolio--57.html',
      children: [
        { label: 'Études de cas', target: 'pages/etudes-de-cas--49.html' },
        { label: 'Blog & ressources', target: 'pages/blog-ressources--58.html' },
      ],
    },
    {
      label: 'Contact',
      target: 'pages/contact--895.html',
    },
    {
      label: 'LXEDC',
      target: 'pages/lxedc--156.html',
      children: [
        {
          label: 'Digital Influence Management – Spécial Influenceurs',
          target: 'pages/digital-influence-management-special-influenceurs--468.html',
        },
        {
          label: 'Digital Influence Management – Spécial Discothèques',
          target: 'pages/digital-influence-management-special-discotheques--469.html',
        },
        { label: '2 page secret', target: 'pages/0-page-secret--181.html' },
      ],
    },
  ];

  const CHEVRON_DOWN =
    '<svg class="chev chev-down" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  const CHEVRON_RIGHT =
    '<svg class="chev chev-right" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  const ACCOUNT_ICON =
    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  const MENU_ICON =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  const CLOSE_ICON =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function extractSlug(pathname) {
    const clean = (pathname || '/').split(/[?#]/)[0].replace(/\/+$/, '');
    if (!clean || clean === '/index.html' || clean.endsWith('/index.html')) return '';
    const last = clean.split('/').pop() || '';
    return last.replace(/--\d+\.html$/, '').replace(/\.html$/, '');
  }

  const currentSlug = extractSlug(window.location.pathname);

  function isItemActive(item) {
    const itemSlug = extractSlug(item.target);
    if (!itemSlug) return currentSlug === '' || currentSlug === 'accueil';
    return currentSlug === itemSlug;
  }

  function isTreeActive(item) {
    if (isItemActive(item)) return true;
    if (item.children && item.children.length) {
      return item.children.some(isTreeActive);
    }
    return false;
  }

  function renderDesktopSubmenu(items, level) {
    const hasNestedSubmenus = items.some(
      (item) => Array.isArray(item.children) && item.children.length > 0
    );
    const listClass = ['submenu', 'level-' + level, hasNestedSubmenus ? 'has-nested' : 'is-leaf']
      .filter(Boolean)
      .join(' ');

    return (
      '<ul class="' +
      listClass +
      '" role="menu">' +
      items
        .map((item) => {
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;
          const active = isItemActive(item);
          const branchActive = !active && isTreeActive(item);
          const cls = [
            'sub-item',
            hasChildren ? 'has-sub' : '',
            active ? 'is-active' : '',
            branchActive ? 'is-branch-active' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const href = resolveHref(item.target);
          if (!hasChildren) {
            return (
              '<li class="' +
              cls +
              '" role="none">' +
              '<a class="sub-link" role="menuitem" href="' +
              esc(href) +
              '">' +
              '<span class="sub-label">' +
              esc(item.label) +
              '</span>' +
              '</a>' +
              '</li>'
            );
          }
          return (
            '<li class="' +
            cls +
            '" role="none">' +
            '<div class="sub-row">' +
            '<a class="sub-link" role="menuitem" href="' +
            esc(href) +
            '">' +
            '<span class="sub-label">' +
            esc(item.label) +
            '</span>' +
            '</a>' +
            '<button class="sub-arrow-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Afficher le sous-menu ' +
            esc(item.label) +
            '">' +
            CHEVRON_RIGHT +
            '</button>' +
            '</div>' +
            renderDesktopSubmenu(item.children, level + 1) +
            '</li>'
          );
        })
        .join('') +
      '</ul>'
    );
  }

  function renderDesktopNav(items) {
    return items
      .map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const active = isItemActive(item);
        const branchActive = !active && isTreeActive(item);
        const cls = [
          'nav-item',
          hasChildren ? 'has-sub' : '',
          active ? 'is-active' : '',
          branchActive ? 'is-branch-active' : '',
        ]
          .filter(Boolean)
          .join(' ');
        const href = resolveHref(item.target);
        if (!hasChildren) {
          return (
            '<li class="' +
            cls +
            '" role="none">' +
            '<a class="nav-link" href="' +
            esc(href) +
            '">' +
            esc(item.label) +
            '</a>' +
            '</li>'
          );
        }
        return (
          '<li class="' +
          cls +
          '" role="none">' +
          '<div class="nav-trigger">' +
          '<a class="nav-link" href="' +
          esc(href) +
          '">' +
          esc(item.label) +
          '</a>' +
          '<button class="nav-arrow-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Ouvrir le menu ' +
          esc(item.label) +
          '">' +
          CHEVRON_DOWN +
          '</button>' +
          '</div>' +
          renderDesktopSubmenu(item.children, 1) +
          '</li>'
        );
      })
      .join('');
  }

  function renderMobileTree(items, depth) {
    return (
      '<ul class="m-list m-depth-' +
      depth +
      '">' +
      items
        .map((item) => {
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;
          const active = isItemActive(item);
          const branchActive = !active && isTreeActive(item);
          const cls = [
            'm-item',
            hasChildren ? 'm-has-sub' : '',
            branchActive ? 'm-open' : '',
            active ? 'is-active' : '',
            branchActive ? 'is-branch-active' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const href = resolveHref(item.target);
          if (!hasChildren) {
            return (
              '<li class="' +
              cls +
              '">' +
              '<a class="m-link" href="' +
              esc(href) +
              '">' +
              esc(item.label) +
              '</a>' +
              '</li>'
            );
          }
          return (
            '<li class="' +
            cls +
            '">' +
            '<div class="m-row">' +
            '<a class="m-link" href="' +
            esc(href) +
            '">' +
            esc(item.label) +
            '</a>' +
            '<button class="m-toggle" type="button" aria-expanded="' +
            (branchActive ? 'true' : 'false') +
            '" aria-label="Déplier ' +
            esc(item.label) +
            '">' +
            CHEVRON_DOWN +
            '</button>' +
            '</div>' +
            '<div class="m-panel">' +
            renderMobileTree(item.children, depth + 1) +
            '</div>' +
            '</li>'
          );
        })
        .join('') +
      '</ul>'
    );
  }

  class MjcSiteHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.closeTimers = new WeakMap();
      this.mobileOpen = false;
      this.lastPointerType = 'mouse';
      this.savedHtmlOverflow = '';
      this.savedBodyOverflow = '';
    }

    connectedCallback() {
      ensureGlobalGuardStyle();
      syncHeaderMetrics();
      this.guardBodyLayout();
      this.render();
      this.bindEvents();
    }

    guardBodyLayout() {
      if (!document.body) return;
      try {
        const cs = window.getComputedStyle(document.body);
        if (cs.display === 'flex' && cs.flexDirection === 'row') {
          document.body.style.flexDirection = 'column';
        }
      } catch {
        // Ignore computed style issues
      }
    }

    openLi(li) {
      const timer = this.closeTimers.get(li);
      if (timer) {
        clearTimeout(timer);
        this.closeTimers.delete(li);
      }
      const parentList = li.parentElement;
      if (parentList) {
        Array.from(parentList.children).forEach((sib) => {
          if (sib !== li && sib.classList.contains('is-open')) {
            this.closeLiImmediate(sib);
          }
        });
      }
      li.classList.add('is-open');
      const btn = li.querySelector(
        ':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn'
      );
      if (btn) btn.setAttribute('aria-expanded', 'true');

      const submenu = li.querySelector(':scope > .submenu');
      if (submenu) this.adjustSubmenuPosition(submenu);
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
      const btn = li.querySelector(
        ':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn'
      );
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
      submenu.style.left = '';
      submenu.style.right = '';

      const headerH = syncHeaderMetrics();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = 12;

      let rect = submenu.getBoundingClientRect();

      if (submenu.classList.contains('level-1')) {
        if (rect.right > vw - pad) {
          submenu.classList.add('align-right');
          rect = submenu.getBoundingClientRect();
        }
        if (rect.left < pad) {
          const shift = pad - rect.left;
          submenu.style.left = shift + 'px';
          submenu.style.right = 'auto';
        }
      } else {
        if (rect.right > vw - pad) {
          submenu.classList.add('flip-left');
          rect = submenu.getBoundingClientRect();
          // If flipping left would clip off the left edge on compact laptops, clamp inside viewport
          if (rect.left < pad) {
            const parentRect = submenu.parentElement.getBoundingClientRect();
            const desiredLeft = Math.max(pad, Math.min(vw - rect.width - pad, parentRect.left + 20));
            submenu.classList.remove('flip-left');
            submenu.style.left = desiredLeft - parentRect.left + 'px';
            submenu.style.right = 'auto';
            rect = submenu.getBoundingClientRect();
          }
        }
        if (rect.bottom > vh - pad) {
          const overflow = rect.bottom - (vh - pad);
          const currentTop = parseFloat(getComputedStyle(submenu).top) || 0;
          const minTop = currentTop - (rect.top - (headerH + 8));
          const nextTop = Math.max(minTop, currentTop - overflow);
          submenu.style.top = nextTop + 'px';
        }
      }
    }

    setMobileOpen(open) {
      if (open === this.mobileOpen) return;
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
      if (open) {
        this.savedHtmlOverflow = document.documentElement.style.overflow;
        this.savedBodyOverflow = document.body ? document.body.style.overflow : '';
        document.documentElement.style.overflow = 'hidden';
        if (document.body) document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = this.savedHtmlOverflow;
        if (document.body) document.body.style.overflow = this.savedBodyOverflow;
      }
    }

    bindEvents() {
      this.shadowRoot.addEventListener(
        'pointerdown',
        (e) => {
          this.lastPointerType = e.pointerType || 'mouse';
        },
        { passive: true }
      );

      this.shadowRoot.querySelectorAll('.desktop-nav li.has-sub').forEach((li) => {
        li.addEventListener('mouseenter', () => {
          if (this.lastPointerType !== 'touch') this.openLi(li);
        });
        li.addEventListener('mouseleave', () => {
          if (!li.classList.contains('is-pinned')) this.scheduleCloseLi(li);
        });

        const arrowBtn = li.querySelector(
          ':scope > .nav-trigger > .nav-arrow-btn, :scope > .sub-row > .sub-arrow-btn'
        );
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

        // On touchscreens >= 1080px (e.g. iPad Pro landscape), first tap opens submenu; second tap navigates
        const parentLink = li.querySelector(
          ':scope > .nav-trigger > .nav-link, :scope > .sub-row > .sub-link'
        );
        if (parentLink) {
          parentLink.addEventListener('click', (e) => {
            if (this.lastPointerType === 'touch' && !li.classList.contains('is-open')) {
              e.preventDefault();
              this.openLi(li);
              li.classList.add('is-pinned');
            }
          });
        }
      });

      // Keyboard navigation for desktop menus
      const desktopNav = this.shadowRoot.querySelector('.desktop-nav');
      if (desktopNav) {
        desktopNav.addEventListener('keydown', (e) => {
          const activeEl = this.shadowRoot.activeElement;
          if (!activeEl) return;
          const currentLi = activeEl.closest('li');
          if (!currentLi) return;

          if (e.key === 'ArrowDown') {
            if (currentLi.classList.contains('nav-item') && currentLi.classList.contains('has-sub')) {
              e.preventDefault();
              this.openLi(currentLi);
              currentLi.classList.add('is-pinned');
              const firstLink = currentLi.querySelector(':scope > .submenu > li a');
              if (firstLink) firstLink.focus();
            } else if (currentLi.classList.contains('sub-item')) {
              e.preventDefault();
              const nextLi = currentLi.nextElementSibling || currentLi.parentElement.firstElementChild;
              const nextLink = nextLi && nextLi.querySelector(':scope > a, :scope > .sub-row > a');
              if (nextLink) nextLink.focus();
            }
          } else if (e.key === 'ArrowUp' && currentLi.classList.contains('sub-item')) {
            e.preventDefault();
            const prevLi = currentLi.previousElementSibling || currentLi.parentElement.lastElementChild;
            const prevLink = prevLi && prevLi.querySelector(':scope > a, :scope > .sub-row > a');
            if (prevLink) prevLink.focus();
          } else if (e.key === 'ArrowRight' && currentLi.classList.contains('sub-item') && currentLi.classList.contains('has-sub')) {
            e.preventDefault();
            this.openLi(currentLi);
            currentLi.classList.add('is-pinned');
            const firstChild = currentLi.querySelector(':scope > .submenu > li a');
            if (firstChild) firstChild.focus();
          } else if (e.key === 'ArrowLeft' && currentLi.classList.contains('sub-item')) {
            const parentLi = currentLi.parentElement && currentLi.parentElement.closest('li.has-sub');
            if (parentLi) {
              e.preventDefault();
              this.closeLiImmediate(parentLi);
              const trigger = parentLi.querySelector(':scope > .sub-row > a, :scope > .nav-trigger > a');
              if (trigger) trigger.focus();
            }
          }
        });
      }

      const burger = this.shadowRoot.querySelector('.burger-btn');
      const backdrop = this.shadowRoot.querySelector('.m-backdrop');
      const closeBtn = this.shadowRoot.querySelector('.m-close');
      if (burger) burger.addEventListener('click', () => this.setMobileOpen(!this.mobileOpen));
      if (backdrop) backdrop.addEventListener('click', () => this.setMobileOpen(false));
      if (closeBtn) closeBtn.addEventListener('click', () => this.setMobileOpen(false));

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

      this.shadowRoot.querySelectorAll('.m-link, .m-account-link').forEach((link) => {
        link.addEventListener('click', () => {
          if (this.mobileOpen) this.setMobileOpen(false);
        });
      });

      document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(this)) this.closeAllDesktop();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllDesktop();
          if (this.mobileOpen) {
            this.setMobileOpen(false);
            if (burger) burger.focus();
          }
        }
      });
      window.addEventListener('resize', () => {
        syncHeaderMetrics();
        if (window.innerWidth >= 1080 && this.mobileOpen) this.setMobileOpen(false);
        this.shadowRoot.querySelectorAll('.desktop-nav .is-open > .submenu').forEach((sm) => {
          this.adjustSubmenuPosition(sm);
        });
      });
    }

    render() {
      const accountHref = resolveHref(ACCOUNT.target);
      const accountActive = isItemActive(ACCOUNT) ? ' is-active' : '';
      const brandHref = resolveHref(BRAND.target);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            all: initial;
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
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

          .spacer { display: block; height: var(--mjc-h); width: 100%; flex-shrink: 0; }

          .bar {
            position: fixed;
            top: 0; left: 0; right: 0;
            width: 100%;
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
            min-width: 0;
            padding: 6px 0;
            transition: color 0.16s ease;
          }
          .brand:hover { color: var(--mjc-accent); }
          .brand:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: 4px; border-radius: 6px; }

          .desktop-nav {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
            min-width: 0;
          }
          .nav-list {
            list-style: none;
            margin: 0; padding: 0;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .nav-item { position: relative; }
          .nav-trigger { display: inline-flex; align-items: center; }
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
          .nav-item:not(.has-sub) > .nav-link { padding: 9px 12px; }
          .nav-arrow-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 26px; height: 32px;
            margin-left: -4px; padding: 0;
            border: none; background: transparent;
            color: #64748B; cursor: pointer; border-radius: 6px;
            transition: color 0.15s ease, transform 0.16s ease;
          }
          .nav-item:hover > .nav-trigger > .nav-link,
          .nav-item.is-open > .nav-trigger > .nav-link,
          .nav-item.is-active > .nav-trigger > .nav-link,
          .nav-item.is-branch-active > .nav-trigger > .nav-link,
          .nav-item:hover > .nav-link,
          .nav-item.is-active > .nav-link,
          .nav-item:hover > .nav-trigger > .nav-arrow-btn,
          .nav-item.is-open > .nav-trigger > .nav-arrow-btn,
          .nav-item.is-branch-active > .nav-trigger > .nav-arrow-btn {
            color: var(--mjc-accent);
          }
          .nav-item.is-open > .nav-trigger > .nav-arrow-btn .chev-down { transform: rotate(180deg); }
          .nav-link:focus-visible, .nav-arrow-btn:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: 2px; }

          .submenu {
            list-style: none;
            margin: 0; padding: 8px;
            position: absolute;
            min-width: 256px;
            max-width: calc(100vw - 24px);
            background: #FFFFFF;
            border: 1px solid var(--mjc-border);
            border-radius: 10px;
            box-shadow: 0 18px 42px rgba(10, 22, 40, 0.13), 0 4px 12px rgba(10, 22, 40, 0.05);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.15s ease;
          }
          .submenu.is-leaf {
            max-height: calc(100vh - var(--mjc-h) - 24px);
            overflow-y: auto;
            overscroll-behavior: contain;
          }
          .submenu.has-nested {
            overflow: visible;
          }
          .submenu.level-1 { top: calc(100% + 10px); left: 0; transform: translateY(6px); z-index: 10; }
          .submenu.level-1::before { content: ''; position: absolute; top: -14px; left: 0; right: 0; height: 14px; }
          .submenu.level-1.align-right { left: auto; right: 0; }

          .submenu.level-2, .submenu.level-3 {
            top: -8px;
            left: calc(100% + 8px);
            min-width: 292px;
            max-width: min(340px, calc(100vw - 24px));
            transform: translateX(6px);
            z-index: 20;
          }
          .submenu.level-3 { z-index: 30; }
          .submenu.level-2::before, .submenu.level-3::before {
            content: ''; position: absolute; top: -8px; bottom: -8px; left: -14px; width: 14px;
          }
          .submenu.level-2.flip-left, .submenu.level-3.flip-left {
            left: auto; right: calc(100% + 8px); transform: translateX(-6px);
          }
          .submenu.level-2.flip-left::before, .submenu.level-3.flip-left::before { left: auto; right: -14px; }

          .nav-item.is-open > .submenu.level-1,
          .sub-item.is-open > .submenu {
            opacity: 1; visibility: visible; pointer-events: auto; transform: translate(0, 0);
          }

          .sub-item { position: relative; }
          .sub-row { display: flex; align-items: center; justify-content: space-between; border-radius: 7px; transition: background-color 0.14s ease; }
          .sub-link {
            display: flex; align-items: center; flex: 1;
            padding: 9px 12px;
            color: #1E293B; text-decoration: none;
            font-size: 13.5px; font-weight: 500; line-height: 1.35;
            border-radius: 7px;
            transition: color 0.14s ease, background-color 0.14s ease;
          }
          .sub-item.has-sub > .sub-row > .sub-link { padding-right: 6px; }
          .sub-arrow-btn {
            display: inline-flex; align-items: center; justify-content: center;
            width: 30px; height: 34px; flex-shrink: 0; margin-right: 4px;
            border: none; background: transparent; color: #64748B; cursor: pointer; border-radius: 6px;
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
            color: var(--mjc-accent); transform: translateX(2px);
          }
          .sub-link:focus-visible, .sub-arrow-btn:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: -2px; }

          .right-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
          .account-btn {
            display: inline-flex; align-items: center; justify-content: center;
            width: 40px; height: 40px; border-radius: 999px;
            border: 1px solid var(--mjc-border); background: #FFFFFF; color: var(--mjc-ink);
            text-decoration: none;
            transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease;
          }
          .account-btn:hover, .account-btn.is-active {
            border-color: var(--mjc-accent); color: var(--mjc-accent); background: var(--mjc-accent-soft);
          }
          .account-btn:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: 2px; }

          .burger-btn {
            display: none; align-items: center; justify-content: center;
            width: 44px; height: 44px; border-radius: 8px;
            border: 1px solid var(--mjc-border); background: #FFFFFF; color: var(--mjc-ink); cursor: pointer;
          }
          .burger-btn:hover { border-color: var(--mjc-accent); color: var(--mjc-accent); }
          .burger-btn:focus-visible { outline: 2px solid var(--mjc-accent); outline-offset: 2px; }

          .m-backdrop {
            position: fixed; inset: 0; background: rgba(10, 22, 40, 0.45);
            z-index: 2147483001; opacity: 0; visibility: hidden;
            transition: opacity 0.2s ease, visibility 0.2s ease;
          }
          .m-backdrop.open { opacity: 1; visibility: visible; }

          .m-drawer {
            position: fixed; top: 0; right: 0; bottom: 0;
            width: min(390px, 92vw);
            max-width: 100vw;
            background: #FFFFFF; z-index: 2147483002;
            transform: translateX(100%);
            transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex; flex-direction: column;
            box-shadow: -12px 0 36px rgba(10, 22, 40, 0.18);
          }
          .m-drawer.open { transform: translateX(0); }

          .m-header {
            height: 64px; padding: 0 16px 0 20px;
            border-bottom: 1px solid var(--mjc-border);
            display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-shrink: 0;
          }
          .m-title { font-size: 15px; font-weight: 700; color: var(--mjc-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .m-close {
            display: inline-flex; align-items: center; justify-content: center;
            width: 40px; height: 40px; flex-shrink: 0; border-radius: 8px;
            border: 1px solid var(--mjc-border); background: #FFFFFF; color: var(--mjc-ink); cursor: pointer;
          }

          .m-body { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; padding: 12px 14px 28px; }
          .m-list { list-style: none; margin: 0; padding: 0; }
          .m-depth-1 { padding-left: 12px; border-left: 1px solid #E2E8F0; margin: 2px 0 6px 12px; }
          .m-depth-2 { padding-left: 12px; border-left: 1px solid #DDD6FE; margin: 2px 0 6px 10px; }
          .m-depth-3 { padding-left: 12px; border-left: 1px solid #E2E8F0; margin: 2px 0 6px 10px; }
          .m-row { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
          .m-link {
            display: block; flex: 1; min-width: 0; padding: 10px;
            color: #1E293B; text-decoration: none;
            font-size: 14.5px; font-weight: 500; line-height: 1.35; border-radius: 7px;
            word-break: break-word;
          }
          .m-depth-0 > .m-item > .m-row > .m-link,
          .m-depth-0 > .m-item > .m-link { font-weight: 600; color: var(--mjc-ink); }
          .m-depth-2 > .m-item > .m-row > .m-link { font-size: 13.5px; font-weight: 600; }
          .m-depth-3 > .m-item > .m-link { font-size: 13px; color: #475569; }
          .m-item.is-active > .m-link,
          .m-item.is-active > .m-row > .m-link,
          .m-item.is-branch-active > .m-row > .m-link {
            color: var(--mjc-accent); background: var(--mjc-accent-soft);
          }
          .m-toggle {
            display: inline-flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; flex-shrink: 0;
            border: none; background: transparent; color: #64748B; border-radius: 7px; cursor: pointer;
          }
          .m-toggle:hover { background: #F1F5F9; color: var(--mjc-accent); }
          .m-toggle .chev-down { transition: transform 0.18s ease; }
          .m-item.m-open > .m-row > .m-toggle .chev-down { transform: rotate(180deg); color: var(--mjc-accent); }
          .m-panel { display: none; }
          .m-item.m-open > .m-panel { display: block; }

          .m-footer {
            padding: 14px 16px calc(14px + env(safe-area-inset-bottom, 0px));
            border-top: 1px solid var(--mjc-border);
            background: #F8FAFC;
            flex-shrink: 0;
          }
          .m-account-link {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            width: 100%; padding: 12px 16px; border-radius: 8px;
            background: var(--mjc-ink); color: #FFFFFF; text-decoration: none;
            font-size: 14px; font-weight: 600;
          }
          .m-account-link:hover { background: var(--mjc-accent); }

          /* Compact laptop / landscape tablet refinement (1080px–1220px) */
          @media (min-width: 1080px) and (max-width: 1220px) {
            .inner { padding: 0 18px; gap: 14px; }
            .brand { font-size: 15px; }
            .nav-list { gap: 2px; }
            .nav-link { padding: 9px 7px 9px 9px; font-size: 13.5px; }
            .nav-item:not(.has-sub) > .nav-link { padding: 9px 10px; }
            .submenu.level-2, .submenu.level-3 { min-width: 268px; max-width: 300px; }
          }

          /* Enlarged touch targets for coarse pointers (touch laptops / tablets in landscape) */
          @media (pointer: coarse) {
            .nav-arrow-btn { width: 34px; height: 38px; }
            .sub-arrow-btn { width: 38px; height: 40px; }
            .sub-link { padding: 11px 12px; }
          }

          /* Tablet & Mobile breakpoint */
          @media (max-width: 1079px) {
            :host { --mjc-h: 64px; }
            .inner { padding: 0 16px; gap: 12px; }
            .brand { font-size: 15px; flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; }
            .desktop-nav { display: none; }
            .burger-btn { display: inline-flex; }
            .account-btn { width: 42px; height: 42px; }
          }

          /* Small phone protection (<= 380px) */
          @media (max-width: 380px) {
            .inner { padding: 0 12px; gap: 8px; }
            .brand { font-size: 13.5px; }
            .right-actions { gap: 6px; }
            .account-btn { width: 38px; height: 38px; }
            .burger-btn { width: 40px; height: 40px; }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition: none !important; }
          }
        </style>

        <div class="spacer" aria-hidden="true"></div>

        <header class="bar" role="banner">
          <div class="inner">
            <a class="brand" href="${esc(brandHref)}">${esc(BRAND.label)}</a>

            <nav class="desktop-nav" aria-label="Navigation principale">
              <ul class="nav-list">
                ${renderDesktopNav(MENU)}
              </ul>
            </nav>

            <div class="right-actions">
              <a
                class="account-btn${accountActive}"
                href="${esc(accountHref)}"
                aria-label="Compte — Accéder à mon espace client"
                title="Compte / Connexion"
              >
                ${ACCOUNT_ICON}
              </a>
              <button class="burger-btn" type="button" aria-expanded="false" aria-label="Ouvrir le menu">
                ${MENU_ICON}
              </button>
            </div>
          </div>
        </header>

        <div class="m-backdrop"></div>
        <aside class="m-drawer" aria-label="Menu mobile">
          <div class="m-header">
            <span class="m-title">${esc(BRAND.label)}</span>
            <button class="m-close" type="button" aria-label="Fermer le menu">${CLOSE_ICON}</button>
          </div>
          <div class="m-body">
            ${renderMobileTree(MENU, 0)}
          </div>
          <div class="m-footer">
            <a class="m-account-link" href="${esc(accountHref)}">
              ${ACCOUNT_ICON}
              <span>Mon compte / Connexion</span>
            </a>
          </div>
        </aside>
      `;
    }
  }

  customElements.define('mjc-site-header', MjcSiteHeader);
})();
