// ── MAP + INTERACTION ENGINE ──────────────────────────────────────────────

(function () {
  'use strict';

  // ── State
  let scale = 1, tx = 0, ty = 0;
  let isDragging = false, startX = 0, startY = 0, startTx = 0, startTy = 0;
  let activeFilter = 'all';
  let currentCard = null;
  let showingFront = true;

  const svg = document.getElementById('map-svg');
  const pinsGroup = document.getElementById('pins');
  const countriesGroup = document.getElementById('countries');
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const countEl = document.getElementById('coffee-count');

  // ── Simplified world map paths (Natural Earth projection, 1000x500 viewport)
  // Key land masses as simplified SVG paths
  const LAND_PATHS = [
    // North America
    { id: 'north-america', d: 'M 125,90 L 155,75 L 195,70 L 220,80 L 245,85 L 260,100 L 265,120 L 255,140 L 240,155 L 220,170 L 200,180 L 180,190 L 165,210 L 155,230 L 150,250 L 155,265 L 165,270 L 160,280 L 150,275 L 135,260 L 120,240 L 110,220 L 105,200 L 100,175 L 105,150 L 115,130 L 120,110 Z' },
    // Greenland
    { id: 'greenland', d: 'M 310,35 L 340,25 L 370,28 L 385,45 L 375,65 L 355,75 L 330,70 L 315,55 Z' },
    // South America
    { id: 'south-america', d: 'M 230,255 L 250,248 L 270,252 L 290,260 L 305,280 L 310,305 L 305,330 L 295,355 L 285,375 L 270,390 L 255,400 L 245,395 L 235,375 L 230,350 L 225,320 L 220,295 L 222,275 Z' },
    // Europe
    { id: 'europe', d: 'M 450,80 L 475,72 L 500,70 L 515,78 L 520,92 L 510,105 L 495,112 L 480,118 L 468,128 L 458,122 L 448,110 L 445,95 Z' },
    // Scandinavia
    { id: 'scandinavia', d: 'M 475,52 L 490,45 L 502,50 L 508,65 L 498,78 L 483,80 L 472,72 Z' },
    // UK & Ireland
    { id: 'uk', d: 'M 448,78 L 458,72 L 466,78 L 462,90 L 452,92 L 445,85 Z' },
    // Africa
    { id: 'africa', d: 'M 475,140 L 500,132 L 530,130 L 555,135 L 575,145 L 588,165 L 592,190 L 590,220 L 582,250 L 570,278 L 555,300 L 540,315 L 525,320 L 510,315 L 498,300 L 490,275 L 482,248 L 476,220 L 472,195 L 470,168 Z' },
    // Madagascar
    { id: 'madagascar', d: 'M 570,275 L 578,265 L 583,280 L 580,295 L 572,300 L 568,288 Z' },
    // Russia / North Asia
    { id: 'russia', d: 'M 510,52 L 560,42 L 620,38 L 680,42 L 730,48 L 770,58 L 790,72 L 785,90 L 760,100 L 720,105 L 670,108 L 620,108 L 575,105 L 540,98 L 518,88 L 510,72 Z' },
    // Middle East
    { id: 'middle-east', d: 'M 555,130 L 580,122 L 608,125 L 625,138 L 630,155 L 618,165 L 600,168 L 580,162 L 562,150 Z' },
    // South Asia
    { id: 'south-asia', d: 'M 628,140 L 665,132 L 700,138 L 718,152 L 715,172 L 700,185 L 680,192 L 658,188 L 640,175 L 630,158 Z' },
    // Southeast Asia
    { id: 'se-asia', d: 'M 710,160 L 740,152 L 760,158 L 768,172 L 762,185 L 748,190 L 730,185 L 715,175 Z' },
    // Indonesia / Sumatra
    { id: 'indonesia', d: 'M 730,270 L 758,265 L 782,268 L 792,278 L 788,288 L 768,292 L 745,288 L 732,280 Z' },
    // Java
    { id: 'java', d: 'M 748,295 L 775,292 L 790,298 L 786,306 L 765,308 L 748,304 Z' },
    // East Asia
    { id: 'east-asia', d: 'M 735,100 L 778,95 L 810,100 L 825,118 L 818,138 L 798,148 L 770,148 L 748,140 L 735,125 Z' },
    // Japan
    { id: 'japan', d: 'M 812,105 L 824,98 L 832,108 L 828,122 L 818,125 L 810,115 Z' },
    // Australia
    { id: 'australia', d: 'M 762,330 L 800,322 L 835,325 L 858,340 L 862,360 L 850,378 L 828,385 L 800,382 L 775,372 L 758,355 L 752,338 Z' },
    // New Zealand
    { id: 'new-zealand', d: 'M 880,372 L 888,362 L 895,372 L 890,385 L 882,388 Z' },
    // Central America
    { id: 'central-america', d: 'M 175,235 L 195,228 L 215,232 L 228,245 L 222,255 L 205,258 L 188,252 L 178,242 Z' },
    // Caribbean
    { id: 'caribbean', d: 'M 222,215 L 250,208 L 255,218 L 240,224 L 222,222 Z' },
    // Central Asia
    { id: 'central-asia', d: 'M 600,108 L 650,102 L 680,108 L 688,128 L 668,138 L 635,138 L 608,128 L 598,118 Z' },
    // Arabia
    { id: 'arabia', d: 'M 570,160 L 600,155 L 620,162 L 628,178 L 620,192 L 600,198 L 578,192 L 565,178 Z' },
    // Horn of Africa / Somalia
    { id: 'horn-africa', d: 'M 575,215 L 598,205 L 612,215 L 610,232 L 595,240 L 578,235 Z' },
    // West Africa
    { id: 'west-africa', d: 'M 440,165 L 475,158 L 490,168 L 488,185 L 470,192 L 448,188 L 435,178 Z' },
  ];

  // ── Build the land paths
  LAND_PATHS.forEach(({ id, d }) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('id', id);
    countriesGroup.appendChild(path);
  });

  // ── Group coffees by location (cluster nearby pins)
  function getFilteredCoffees() {
    if (activeFilter === 'all') return COFFEES;
    return COFFEES.filter(c => c.region === activeFilter);
  }

  // ── Cluster coffees by country for map grouping
  function clusterByCountry(coffees) {
    const clusters = {};
    coffees.forEach(c => {
      const key = c.country + '_' + Math.round(c.coords.x / 15) + '_' + Math.round(c.coords.y / 15);
      if (!clusters[key]) clusters[key] = { coffees: [], coords: c.coords };
      clusters[key].coffees.push(c);
    });
    return Object.values(clusters);
  }

  // ── Render pins
  function renderPins() {
    pinsGroup.innerHTML = '';
    const coffees = getFilteredCoffees();
    countEl.textContent = coffees.length + ' coffee' + (coffees.length !== 1 ? 's' : '');

    const clusters = clusterByCountry(coffees);
    clusters.forEach(cluster => {
      const { coffees: cs, coords } = cluster;
      const isMulti = cs.length > 1;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'pin-group');
      g.setAttribute('transform', `translate(${coords.x}, ${coords.y})`);

      // Pulse ring
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('r', isMulti ? 10 : 8);
      ring.setAttribute('class', 'pin-ring');
      g.appendChild(ring);

      // Main dot
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', isMulti ? 7 : 5);
      dot.setAttribute('class', 'pin-dot' + (isMulti ? ' multi' : ''));
      g.appendChild(dot);

      if (isMulti) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('class', 'pin-number');
        text.setAttribute('y', '0');
        text.textContent = cs.length;
        g.appendChild(text);
      }

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (cs.length === 1) {
          openCard(cs[0]);
        } else {
          openList(cs);
        }
      });

      pinsGroup.appendChild(g);
    });
  }

  // ── Card HTML builder
  function buildCardFront(coffee) {
    const pips = Array.from({ length: 5 }, (_, i) =>
      `<div class="bean-pip${i < coffee.roast ? ' filled' : ''}"></div>`
    ).join('');

    const flavours = coffee.flavours.map(f => `<div>${f}</div>`).join('');
    const [country, ...nameParts] = [coffee.country, coffee.name];

    return `
      <div class="card-front" style="background: ${coffee.cardColor};">
        <div style="position:absolute;top:12px;right:16px;text-align:right;">
          <div style="font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:1px;color:rgba(0,0,0,0.4);">Nº</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:52px;line-height:1;color:rgba(0,0,0,0.2);">${coffee.num}</div>
        </div>
        <div class="card-name-block">
          <div class="card-country">${coffee.country}</div>
          <div class="card-coffee-name">${coffee.name}</div>
        </div>
        <div class="card-cols">
          <div>
            <div class="card-label">Roasted:</div>
            <div class="card-roast-text">${coffee.roastLabel}</div>
            <div class="bean-pips">${pips}</div>
          </div>
          <div>
            <div class="card-label">Tastes like:</div>
            <div class="tastes-list">${flavours}</div>
          </div>
        </div>
        <div class="brew-grid">
          <div class="brew-item">
            <div class="brew-box checked"></div>
            Whole Bean
          </div>
          <div class="brew-item">
            <div class="brew-box"></div>
            Filter | Aeropress
          </div>
          <div class="brew-item">
            <div class="brew-box"></div>
            Espresso
          </div>
          <div class="brew-item">
            <div class="brew-box"></div>
            Cafetière
          </div>
        </div>
      </div>
      <div class="card-rave-footer">
        <div class="card-rave-logo">RAVE<span class="reg">®</span></div>
        <div class="card-website">ravecoffee.co.uk</div>
      </div>
    `;
  }

  function buildCardBack(coffee) {
    const rows = [
      { label: 'Grown', icon: '🌱', val: coffee.grown || '—' },
      { label: 'Altitude', icon: '⛰', val: coffee.altitude || '—' },
      { label: 'Varietal', icon: '☕', val: coffee.varietal || '—' },
      { label: 'Process', icon: '💧', val: coffee.process || '—' },
      { label: 'Producers', icon: '👤', val: coffee.producers || '—' },
    ];
    const tableRows = rows.map(r => `
      <div class="back-row">
        <div class="back-row-label"><span class="back-icon">${r.icon}</span>${r.label}</div>
        <div class="back-row-val">${r.val}</div>
      </div>
    `).join('');

    return `
      <div class="card-back">
        <div class="card-back-table" style="background:${coffee.cardColor};">
          ${tableRows}
        </div>
        <div class="roastery-notes">
          <div class="roastery-title">Roastery Notes:</div>
          <div class="roastery-text">${coffee.roasteryNotes}</div>
        </div>
      </div>
    `;
  }

  // ── Open single card modal
  function openCard(coffee) {
    currentCard = coffee;
    showingFront = true;
    renderModal();
    overlay.classList.add('open');
  }

  function renderModal() {
    const frontHTML = buildCardFront(currentCard);
    const backHTML = buildCardBack(currentCard);
    modalContent.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
        <div class="rave-card" id="card-display">
          ${showingFront ? frontHTML : backHTML}
        </div>
        <button class="flip-btn" id="flip-btn">
          ${showingFront ? '↩ See back — Grown, Process, Notes' : '↩ See front — Roast & Flavours'}
        </button>
      </div>
    `;
    document.getElementById('flip-btn').addEventListener('click', () => {
      showingFront = !showingFront;
      renderModal();
    });
  }

  // ── Open list modal (multiple coffees at same location)
  function openList(coffees) {
    const items = coffees.map(c => `
      <div class="pin-list-item" data-id="${c.id}">
        ${c.country} — ${c.name}
        <span>N°${c.num} · ${c.roastLabel} · ${c.flavours.join(', ')}</span>
      </div>
    `).join('');
    modalContent.innerHTML = `
      <div class="pin-list">
        <div class="pin-list-title">${coffees[0].country} — ${coffees.length} coffees</div>
        ${items}
      </div>
    `;
    modalContent.querySelectorAll('.pin-list-item').forEach(el => {
      el.addEventListener('click', () => {
        const coffee = COFFEES.find(c => c.id === parseInt(el.dataset.id));
        if (coffee) openCard(coffee);
      });
    });
    overlay.classList.add('open');
  }

  // ── Close modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  function closeModal() {
    overlay.classList.remove('open');
    currentCard = null;
  }

  // ── Pan + Zoom
  function applyTransform() {
    const g1 = document.getElementById('countries');
    const g2 = document.getElementById('pins');
    const t = `translate(${tx}px, ${ty}px) scale(${scale})`;
    g1.style.transform = t;
    g2.style.transform = t;
    g1.style.transformOrigin = '0 0';
    g2.style.transformOrigin = '0 0';
  }

  svg.addEventListener('mousedown', (e) => {
    if (e.target.closest('.pin-group')) return;
    isDragging = true;
    startX = e.clientX; startY = e.clientY;
    startTx = tx; startTy = ty;
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    tx = startTx + (e.clientX - startX);
    ty = startTy + (e.clientY - startY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    const newScale = Math.max(0.6, Math.min(6, scale * delta));
    tx = mx - (mx - tx) * (newScale / scale);
    ty = my - (my - ty) * (newScale / scale);
    scale = newScale;
    applyTransform();
  }, { passive: false });

  // touch
  let lastDist = null;
  svg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      startTx = tx; startTy = ty;
    }
  }, { passive: true });
  svg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDragging) {
      tx = startTx + (e.touches[0].clientX - startX);
      ty = startTy + (e.touches[0].clientY - startY);
      applyTransform();
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastDist) {
        const delta = dist / lastDist;
        scale = Math.max(0.6, Math.min(6, scale * delta));
        applyTransform();
      }
      lastDist = dist;
    }
  }, { passive: true });
  svg.addEventListener('touchend', () => { isDragging = false; lastDist = null; });

  // zoom buttons
  document.getElementById('zoom-in').addEventListener('click', () => {
    scale = Math.min(6, scale * 1.3);
    applyTransform();
  });
  document.getElementById('zoom-out').addEventListener('click', () => {
    scale = Math.max(0.6, scale * 0.77);
    applyTransform();
  });
  document.getElementById('zoom-reset').addEventListener('click', () => {
    scale = 1; tx = 0; ty = 0;
    applyTransform();
  });

  // ── Filters
  document.getElementById('filter-row').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderPins();
  });

  // ── Init
  renderPins();
  applyTransform();

})();
