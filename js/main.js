/* =============================================================================
   main.js — renders the whole portfolio from js/data.js (PORTFOLIO).
   You normally do NOT need to edit this file. Edit data.js for content and
   css/styles.css for look & feel.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof PORTFOLIO === 'undefined') {
    console.error('data.js did not load: check that js/data.js exists and has no syntax errors.');
    return;
  }

  var D = PORTFOLIO;
  /* Private contact details are NOT stored in the repo. On the live site the GitHub
     Action replaces the __SITE_...__ placeholders with repository secrets. For local
     preview, copy js/private.local.example.js to js/private.local.js and fill it in. */
  var PRIV = window.PRIVATE_CONTACT || {};
  ['email', 'phone'].forEach(function (k) {
    if (PRIV[k]) D[k] = PRIV[k];
    if (!D[k] || String(D[k]).indexOf('__SITE_') === 0) D[k] = '';
  });
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { role: null, filter: 'All' };

  /* ---------- tiny helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // h('div', {class:'x', text:'hi', 'aria-label':'y'}, child1, child2)  — always uses textContent (safe)
  function h(tag, props) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'style') node.setAttribute('style', v);
        else node.setAttribute(k, v === true ? '' : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }
  function append(node, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(node, c); }); return; }
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function reveal(node, i) { node.classList.add('reveal'); if (i) node.style.setProperty('--d', Math.min(i, 8) * 70 + 'ms'); return node; }
  function svgIcon(path) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '18'); s.setAttribute('height', '18');
    s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2');
    s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round'); s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', path); s.appendChild(p);
    return s;
  }
  var ICON = {
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
    copy: 'M9 9h11v11H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
    download: 'M12 3v12m0 0l-4-4m4 4l4-4M4 21h16',
    link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
    arrow: 'M5 12h14m-6-6l6 6-6 6'
  };

  /* ---------- theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var b = $('#theme-toggle');
    if (b) b.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? '#f4f7fb' : '#060b18');
    readParticleColor();
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    applyTheme(saved === 'dark' ? 'dark' : 'light');
    $('#theme-toggle').addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- hero ---------- */
  function renderHero() {
    document.title = D.name + ' | Cloud Operations & Site Reliability';
    $('#logo-mark').textContent = D.monogram;
    $('#logo-text').textContent = D.nickname + ' ' + D.name.split(' ').slice(-1)[0];
    $('#hero-hello').textContent = D.kicker || '';
    $('#hero-name').textContent = D.name;
    $('#hero-tagline').textContent = D.tagline;
    $('#hero-open').textContent = [D.location, D.openTo].filter(Boolean).join(' · ');
    $('#footer-text').textContent = '\u00A9 ' + new Date().getFullYear() + ' ' + D.name + '. Built with plain HTML, CSS and JavaScript.';
    if (D.availability) { $('#hero-badge').hidden = false; $('#hero-badge-text').textContent = D.availability; }

    var sum = $('#hero-summary'); clear(sum);
    (D.summary || []).forEach(function (p) { sum.appendChild(h('p', { text: p })); });
    var chipList = $('#hero-chips'); clear(chipList);
    (D.heroChips || []).forEach(function (c) { chipList.appendChild(h('li', { class: 'chip static', text: c })); });

    // avatar: profile.jpg if it loads, otherwise the SVG placeholder
    var img = $('#avatar-img');
    img.addEventListener('error', function onErr() { img.removeEventListener('error', onErr); img.src = 'assets/profile-placeholder.svg'; });

    // stats
    var ul = $('#stats'); clear(ul);
    D.stats.forEach(function (s, i) {
      var num = h('span', { class: 'stat-num', 'data-target': s.value, 'data-suffix': s.suffix || '', text: (s.value) + (s.suffix || '') });
      ul.appendChild(reveal(h('li', { class: 'stat glass spot' }, num, h('span', { class: 'stat-label', text: s.label }), s.sub ? h('span', { class: 'stat-sub', text: s.sub }) : null), i));
    });

    // typed role headline
    typed(D.headlineRoles || []);
  }

  function typed(words) {
    var el = $('#typed'); if (!el || !words.length) return;
    $('#typed-sr').textContent = 'Roles I fit: ' + words.join(', ') + '.';
    if (reduceMotion) { el.textContent = words[0]; return; }
    var w = 0, c = 0, del = false;
    (function tick() {
      var word = words[w];
      el.textContent = word.slice(0, c);
      var wait = del ? 28 : 62;
      if (!del && c === word.length) { del = true; wait = 1700; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      else c += del ? -1 : 1;
      setTimeout(tick, wait);
    })();
  }

  /* ---------- story ---------- */
  function renderConnect() {
    var C = D.connect;
    $('#connect-statement').textContent = C.statement;
    $('#connect-intro').textContent = C.intro;
    var wrap = $('#pillars'); clear(wrap);
    C.pillars.forEach(function (p, i) {
      wrap.appendChild(reveal(h('article', { class: 'pillar glass spot' },
        h('span', { class: 'pillar-icon', 'aria-hidden': 'true', text: p.icon }),
        h('h3', { text: p.title }),
        h('p', { text: p.text }),
        h('p', { class: 'pillar-roles', text: p.roles })
      ), i));
    });
  }

  /* ---------- role switcher ---------- */
  function renderRoles() {
    var tabs = $('#role-tabs'); clear(tabs);
    var all = [{ id: '', title: 'Overview' }].concat(D.roles);
    all.forEach(function (r, i) {
      var b = h('button', {
        class: 'role-tab', type: 'button', role: 'tab', id: 'tab-' + (r.id || 'all'),
        'data-role': r.id, 'aria-selected': 'false', tabindex: i === 0 ? '0' : '-1', 'aria-controls': 'role-panel', text: r.title
      });
      b.addEventListener('click', function () { selectRole(r.id || null, false); });
      b.addEventListener('keydown', function (e) {
        var idx = all.indexOf(r), n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (idx + 1) % all.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (idx - 1 + all.length) % all.length;
        else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = all.length - 1;
        if (n !== null) { e.preventDefault(); selectRole(all[n].id || null, true); }
      });
      tabs.appendChild(b);
    });
  }

  function selectRole(id, focusTab) {
    state.role = id;
    $$('.role-tab').forEach(function (t) {
      var on = (t.getAttribute('data-role') || null) === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('active', on);
      if (on) { $('#role-panel').setAttribute('aria-labelledby', t.id); if (focusTab) t.focus(); }
    });
    renderRolePanel();
    applyRoleHighlights();
  }

  function renderRolePanel() {
    var panel = $('#role-panel'); clear(panel);
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    var r = state.role ? byId(D.roles, state.role) : null;
    if (!r) {
      panel.appendChild(h('div', { class: 'role-main' },
        h('h3', { text: 'Overview' }),
        h('p', { class: 'pitch', text: D.tagline }),
        h('p', { class: 'muted', text: 'Eight role titles, one profile. Choose a role above to get a tailored pitch, a short list of the strongest evidence and the matching CV.' })
      ));
      return;
    }
    var cv = null; D.cv.forEach(function (c) { if (c.role === r.id) cv = c; });
    var rel = (r.projects || []).map(function (pid) { return byId(D.projects, pid); }).filter(Boolean);
    panel.appendChild(h('div', { class: 'role-main' },
      h('p', { class: 'eyebrow', text: 'My pitch as a' }),
      h('h3', { text: r.title }),
      h('p', { class: 'pitch', text: r.pitch }),
      cv ? h('a', { class: 'btn btn-primary btn-sm', href: cv.file, download: '' }, svgIcon(ICON.download), 'Download the ' + r.title + ' CV') : null
    ));
    panel.appendChild(h('div', { class: 'role-side' },
      h('h4', { text: 'Strongest evidence' }),
      h('ul', { class: 'ticks' }, r.strengths.map(function (s) { return h('li', { text: s }); })),
      rel.length ? h('h4', { text: 'Most relevant case studies' }) : null,
      rel.length ? h('div', { class: 'mini-links' }, rel.map(function (p) {
        var b = h('button', { type: 'button', class: 'mini-link', text: p.title });
        b.addEventListener('click', function () { openModal(p.id, b); });
        return b;
      })) : null
    ));
  }

  function applyRoleHighlights() {
    var r = state.role ? byId(D.roles, state.role) : null;
    var focus = r ? r.focus : [];
    // skills
    $$('.skill').forEach(function (s) {
      var hit = focus.indexOf(s.getAttribute('data-name')) !== -1;
      s.classList.toggle('hl', !!r && hit);
      s.classList.toggle('dim', !!r && !hit);
    });
    $('#skills-sub').textContent = r
      ? 'Highlighted: what matters most for a ' + r.title + '. Everything else stays visible, just quieter.'
      : 'Filter by area. Pick a role above to see what matters most for it.';
    // projects
    $$('.project').forEach(function (card) {
      var pid = card.getAttribute('data-id'), p = byId(D.projects, pid);
      var idx = r ? r.projects.indexOf(pid) : -1;
      var related = !!r && idx === -1 && (p.roles || []).indexOf(r.id) !== -1;
      card.classList.toggle('rel', idx !== -1);
      card.classList.toggle('related', related);
      card.classList.toggle('dim', !!r && idx === -1 && !related);
      card.style.order = idx !== -1 ? idx : (related ? 20 : 40 + D.projects.indexOf(p));
      var tag = $('.rel-tag', card);
      tag.textContent = idx !== -1 ? 'Most relevant' : (related ? 'Related' : '');
      tag.hidden = !(idx !== -1 || related);
    });
    // CVs
    $$('.cv-card').forEach(function (c) {
      var on = !!r && c.getAttribute('data-role') === r.id;
      c.classList.toggle('rec', on);
      $('.cv-rec', c).hidden = !on;
    });
  }

  /* ---------- skills ---------- */
  function renderSkills() {
    var f = $('#skill-filters'); clear(f);
    var groups = ['All'].concat(D.skills.map(function (g) { return g.group; }));
    groups.forEach(function (g) {
      var b = h('button', { type: 'button', class: 'chip' + (g === 'All' ? ' active' : ''), 'aria-pressed': g === 'All' ? 'true' : 'false', text: g });
      b.addEventListener('click', function () {
        state.filter = g;
        $$('.chip', f).forEach(function (c) { var on = c === b; c.classList.toggle('active', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        $$('.skill-group').forEach(function (card) { card.hidden = !(g === 'All' || card.getAttribute('data-group') === g); });
      });
      f.appendChild(b);
    });
    var grid = $('#skills-grid'); clear(grid);
    D.skills.forEach(function (g, i) {
      grid.appendChild(reveal(h('article', { class: 'skill-group glass spot', 'data-group': g.group },
        h('h3', { text: g.group }),
        h('ul', { class: 'skill-list' }, g.items.map(function (n) { return h('li', { class: 'skill', 'data-name': n, text: n }); }))
      ), i % 4));
    });
  }

  /* ---------- experience ---------- */
  function renderExperience() {
    var ol = $('#timeline'); clear(ol);
    D.experience.forEach(function (e, i) {
      ol.appendChild(reveal(h('li', { class: 'tl-item' },
        h('span', { class: 'tl-dot', 'aria-hidden': 'true' }),
        h('div', { class: 'tl-card glass spot' },
          h('p', { class: 'tl-period', text: e.period + (e.place ? ' · ' + e.place : '') }),
          h('h3', { text: e.title }),
          h('p', { class: 'tl-company', text: e.company }),
          e.note ? h('p', { class: 'tl-note', text: e.note }) : null,
          h('ul', { class: 'ticks' }, e.bullets.map(function (b) { return h('li', { text: b }); })),
          h('ul', { class: 'tags' }, (e.tags || []).map(function (t) { return h('li', { text: t }); }))
        )
      ), 1));
    });
  }

  /* ---------- projects + modal ---------- */
  function renderProjects() {
    var grid = $('#projects-grid'); clear(grid);
    D.projects.forEach(function (p, i) {
      var btn = h('button', { type: 'button', class: 'card-btn', 'aria-haspopup': 'dialog' }, 'Read case study ', svgIcon(ICON.arrow));
      btn.addEventListener('click', function () { openModal(p.id, btn); });
      var card = h('article', { class: 'project glass spot', 'data-id': p.id },
        h('div', { class: 'project-top' }, h('p', { class: 'kicker', text: p.kicker }), h('span', { class: 'rel-tag', hidden: true })),
        h('h3', { text: p.title }),
        h('p', { text: p.summary }),
        h('ul', { class: 'tags' }, p.stack.slice(0, 5).map(function (t) { return h('li', { text: t }); })),
        btn
      );
      card.style.order = i;
      grid.appendChild(reveal(card, i % 3));
    });
  }

  var lastOpener = null;
  function openModal(id, opener) {
    var p = byId(D.projects, id); if (!p) return;
    lastOpener = opener || null;
    var card = $('#modal-card'); clear(card);
    var close = h('button', { type: 'button', class: 'modal-close', 'aria-label': 'Close case study' }, '\u00D7');
    close.addEventListener('click', closeModal);
    var body = h('div', { class: 'modal-body' },
      h('p', { class: 'kicker', text: p.kicker }),
      h('h3', { id: 'modal-title', text: p.title }),
      section('Problem', h('p', { text: p.problem })),
      section('What I did', h('ul', { class: 'ticks' }, p.did.map(function (d) { return h('li', { text: d }); }))),
      (p.flow && p.flow.length) ? section('Architecture flow',
        h('ol', { class: 'flow' }, p.flow.map(function (s) { return h('li', { text: s }); })),
        p.flowNote ? h('p', { class: 'muted small', text: p.flowNote }) : null) : null,
      section('Stack', h('ul', { class: 'tags' }, p.stack.map(function (t) { return h('li', { text: t }); }))),
      section('Outcome', h('p', { class: 'outcome', text: p.outcome }))
    );
    card.appendChild(close); card.appendChild(body);
    var dlg = $('#modal');
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    document.documentElement.classList.add('modal-open');
    card.scrollTop = 0; body.scrollTop = 0;
    close.focus();
  }
  function section(title, a, b) { return h('section', { class: 'm-sec' }, h('h4', { text: title }), a, b); }
  function closeModal() {
    var dlg = $('#modal');
    if (typeof dlg.close === 'function') { if (dlg.open) dlg.close(); } else { dlg.removeAttribute('open'); onModalClosed(); }
  }
  function onModalClosed() {
    document.documentElement.classList.remove('modal-open');
    if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
  }
  function initModal() {
    var dlg = $('#modal');
    dlg.addEventListener('close', onModalClosed);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dlg.hasAttribute('open') && typeof dlg.showModal !== 'function') closeModal(); });
  }

  /* ---------- achievements / education / cv ---------- */
  function renderAchievements() {
    var g = $('#ach-grid'); clear(g);
    D.achievements.forEach(function (a, i) {
      g.appendChild(reveal(h('article', { class: 'ach glass spot' },
        h('span', { class: 'ach-icon', 'aria-hidden': 'true', text: a.icon }),
        h('h3', { text: a.title }), h('p', { text: a.text })), i % 4));
    });
  }
  function renderEducation() {
    var l = $('#edu-list'); clear(l);
    D.education.forEach(function (e, i) {
      l.appendChild(reveal(h('article', { class: 'edu glass spot' },
        h('span', { class: 'edu-year', text: e.year }),
        h('div', null, h('h3', { text: e.degree }), h('p', { text: e.school }), e.detail ? h('p', { class: 'muted', text: e.detail }) : null)), i));
    });
  }
  function renderCV() {
    var g = $('#cv-grid'); clear(g);
    D.cv.forEach(function (c, i) {
      var name = c.file.split('/').pop();
      g.appendChild(reveal(h('a', { class: 'cv-card glass spot', href: c.file, download: '', 'data-role': c.role },
        h('span', { class: 'cv-icon' }, svgIcon(ICON.download)),
        h('span', { class: 'cv-text' },
          h('strong', { text: c.label }),
          h('small', { text: name }),
          h('em', { class: 'cv-rec', text: 'Matches your selected role', hidden: true }))), i % 4));
    });
  }

  /* ---------- contact ---------- */
  function renderContact() {
    $('#contact-h').textContent = D.contactHeading;
    $('#contact-text').textContent = D.contactText;
    var a = $('#contact-actions'); clear(a);
    if (D.email) {
      a.appendChild(h('a', { class: 'btn btn-primary', href: 'mailto:' + D.email + '?subject=' + encodeURIComponent('Opportunity for ' + D.nickname) }, svgIcon(ICON.mail), 'Email ' + D.nickname));
      var copy = h('button', { type: 'button', class: 'btn btn-ghost' }, svgIcon(ICON.copy), 'Copy email');
      copy.addEventListener('click', function () { copyText(D.email); });
      a.appendChild(copy);
    }
    if (D.links && D.links.linkedin) a.appendChild(h('a', { class: 'btn btn-ghost', href: D.links.linkedin, target: '_blank', rel: 'noopener noreferrer' }, svgIcon(ICON.link), 'LinkedIn'));
    if (D.links && D.links.github) a.appendChild(h('a', { class: 'btn btn-ghost', href: D.links.github, target: '_blank', rel: 'noopener noreferrer' }, svgIcon(ICON.link), 'GitHub'));
    if (D.phone) a.appendChild(h('a', { class: 'btn btn-ghost', href: 'tel:' + String(D.phone).replace(/[^+\d]/g, '') }, svgIcon(ICON.phone), D.phone));
    $('#contact-meta').textContent = (D.email ? D.email + ' · ' : '') + D.location + (D.availability ? ' · ' + D.availability : '');
  }
  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function copyText(text) {
    function fallback() {
      var ta = h('textarea', { style: 'position:fixed;opacity:0;top:0;left:0', 'aria-hidden': 'true' }); ta.value = text;
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); toast(ok ? 'Email copied to clipboard' : 'Copy failed. Email: ' + text);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast('Email copied to clipboard'); }, fallback);
    else fallback();
  }

  /* ---------- sections order, nav ---------- */
  function arrangeSections() {
    var main = $('#main'), list = $('#nav-list'); clear(list);
    D.sections.forEach(function (s) {
      var el = document.getElementById(s.id); if (!el) return;
      main.appendChild(el);
      el.hidden = s.show === false;
      if (s.show !== false) {
        var a = h('a', { href: '#' + s.id, text: s.nav });
        list.appendChild(h('li', null, a));
      }
    });
  }
  function initNav() {
    var btn = $('#menu-btn'), nav = $('#site-nav');
    function set(open) {
      nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.documentElement.classList.toggle('nav-open', open);
    }
    btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) set(false); });

    var links = $$('#nav-list a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { var on = a.getAttribute('href') === '#' + en.target.id; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      D.sections.forEach(function (s) { var el = document.getElementById(s.id); if (el && s.show !== false) io.observe(el); });
    }
    // scroll progress + header state
    var prog = $('#progress'), header = $('.site-header'), ticking = false;
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
      header.classList.toggle('scrolled', window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }

  /* ---------- reveal on scroll + counters + spotlight ---------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { items.forEach(function (n) { n.classList.add('in'); }); countersStatic(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); if (en.target.classList.contains('stat')) count($('.stat-num', en.target)); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (n) { io.observe(n); });
    $$('.stat-num').forEach(function (n) { n.textContent = '0' + n.getAttribute('data-suffix'); });
  }
  function countersStatic() { $$('.stat-num').forEach(function (n) { n.textContent = n.getAttribute('data-target') + n.getAttribute('data-suffix'); }); }
  function count(el) {
    var target = +el.getAttribute('data-target'), suffix = el.getAttribute('data-suffix'), dur = 1400, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initSpotlight() {
    if (reduceMotion) return;
    document.addEventListener('mousemove', function (e) {
      var t = e.target.closest ? e.target.closest('.spot') : null;
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ---------- background particles (lightweight canvas) ---------- */
  var particleRGB = '45,212,191';
  function readParticleColor() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim();
    if (v) particleRGB = v;
  }
  function initParticles() {
    var cv = $('#bg-canvas'); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), pts = [], raf = null;
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(18, Math.min(60, Math.round(W * H / 28000)));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.5 });
    }
    function draw(move) {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (move) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
        ctx.fillStyle = 'rgba(' + particleRGB + ',0.55)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < 14400) { ctx.strokeStyle = 'rgba(' + particleRGB + ',' + (0.14 * (1 - d / 14400)).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
    }
    function loop() { draw(true); raf = requestAnimationFrame(loop); }
    size(); readParticleColor();
    if (reduceMotion) { draw(false); }
    else {
      loop();
      document.addEventListener('visibilitychange', function () { if (document.hidden) { cancelAnimationFrame(raf); raf = null; } else if (!raf) loop(); });
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduceMotion) draw(false); }, 150); });
  }

  /* ---------- boot ---------- */
  function init() {
    initTheme();
    renderHero();
    renderConnect();
    renderRoles();
    renderSkills();
    renderExperience();
    renderProjects();
    renderAchievements();
    renderEducation();
    renderCV();
    renderContact();
    arrangeSections();
    initModal();
    initNav();
    selectRole(null, false);
    initReveal();
    initSpotlight();
    initParticles();
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 50); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
