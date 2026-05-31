// ── LEAFLET MAP + INTERACTION ENGINE ────────────────────────────────────────

(function () {
  'use strict';

  // ── State & Elements
  let activeFilter = 'all';
  let currentCard = null;
  let showingFront = true;
  let markers = [];

  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const countEl = document.getElementById('coffee-count');

  // Drawer Elements
  const drawer = document.getElementById('sidebar-drawer');
  const drawerTrigger = document.getElementById('drawer-trigger');
  const drawerClose = document.getElementById('drawer-close');
  const drawerSearch = document.getElementById('drawer-search');
  const drawerList = document.getElementById('drawer-list');
  const disclaimerTrigger = document.getElementById('disclaimer-trigger');

  // Mobile Menu Elements
  const menuToggle = document.getElementById('menu-toggle');
  const headerRight = document.getElementById('header-right');

  // ── Coffee Farm Geographical Coordinates Lookup
  const COFFEE_COORDS = {
    1: [-8.90, 33.45],       // Tanzania: Mbili Twiga
    2: [2.15, -75.90],       // Colombia: El Carmen
    3: [21.50, -104.90],     // Mexico: Terruño Nayarita
    4: [9.65, -83.97],       // Costa Rica: Coope Dota (Tarrazu)
    5: [12.87, 74.84],       // India: Monsoon Malabar (Malabar Coast)
    6: [5.88, 38.98],        // Ethiopia: Bookkisa (Guji Zone)
    7: [1.15, 34.45],        // Uganda: Clarke Farm Washed (Mount Elgon)
    8: [-5.96, -78.85],      // Peru: Elver Coronel (Cajamarca)
    9: [14.46, -90.44],      // Guatemala: Nueva Era (Fraijanes)
    10: [-8.95, 33.20],      // Tanzania: Korongo (Mbeya Region)
    11: [-2.22, 29.14],      // Rwanda: Nyamsheke Hell's (Nyamasheke)
    12: [6.75, 38.45],       // Ethiopia: Kebena (Sidama Zone)
    13: [-0.50, 37.30],      // Kenya: Sasini (Kirinyaga)
    14: [10.10, -84.38],     // Costa Rica: Hermosa Honey (West Valley)
    15: [14.53, -90.93],     // Guatemala: Acatenango (Acatenango Valley)
    16: [-9.93, -76.24],     // Peru: Churupampa (Huánuco)
    17: [6.16, 38.20],       // Ethiopia: Simama (Yirgacheffe)
    18: [4.69, 96.85],       // Indonesia: Permata Gayo (Aceh, Sumatra)
    19: [12.92, -85.92],     // Nicaragua: Matagalpa
    20: [1.15, 34.45],       // Uganda: Clarke Farm Natural (Mount Elgon - EXACT MATCH)
    21: [4.87, -74.56],      // Colombia: Viani (Cundinamarca)
    22: [-21.65, -46.40],    // Brazil: Sertãozinho Lot 548 (Minas Gerais)
    23: [-1.35, 34.37],      // Tanzania: Tarime Natural (Tarime District)
    24: [-21.65, -46.40],    // Brazil: Sertãozinho Lot 574 (Minas Gerais - EXACT MATCH)
    25: [-21.80, -45.90],    // Brazil: Fazenda Campestre (Sul de Minas)
    26: [-0.42, 36.95],      // Kenya: Asali AB (Nyeri)
    27: [4.50, -75.70],      // Colombia: Racafé Crecer (Various regions)
    28: [2.28, 98.88],       // Indonesia: Wahana Estate (Lintong, Sumatra)
    29: [51.71195, -1.97025], // Blend: Espresso Blend (Rave HQ UK)
    30: [51.71195, -1.97025], // Blend: Mocha Java Blend (Rave HQ - EXACT MATCH)
    31: [51.71195, -1.97025], // Blend: The Italian Job (Rave HQ - EXACT MATCH)
    32: [-2.48, 29.47]       // Rwanda: Gito (Nyamagabe)
  };

  // ── Continent Viewport Coordinates for Mobile Fly-To Transitions
  const CONTINENT_VIEWS = {
    "Africa": { center: [2.0, 30.0], zoom: 3.5 },
    "Americas": { center: [4.0, -72.0], zoom: 3.2 },
    "Asia": { center: [10.0, 95.0], zoom: 3.5 },
    "Blend": { center: [51.71195, -1.97025], zoom: 4.5 },
    "all": { center: [15.0, -10.0], zoom: 2.2 }
  };

  // ── Initialize Leaflet Map
  // Center world view [15, -10] at zoom level 2.5
  const map = L.map('map', {
    zoomControl: false,
    minZoom: 2,
    maxZoom: 7,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0
  }).setView([15, -10], 2.5);

  // CartoDB Dark Matter tile layer to match Rave dark aesthetic
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // ── Group coffees by filter
  function getFilteredCoffees() {
    if (activeFilter === 'all') return COFFEES;
    return COFFEES.filter(c => c.region === activeFilter);
  }

  // ── Cluster coffees by exact geocoordinates to support multiple coffees at the same spot
  function clusterByCoordinates(coffees) {
    const clusters = {};
    coffees.forEach(c => {
      const coords = COFFEE_COORDS[c.id] || COFFEE_COORDS[29];
      const key = `${coords[0].toFixed(5)},${coords[1].toFixed(5)}`;
      if (!clusters[key]) {
        clusters[key] = { coords, coffees: [] };
      }
      clusters[key].coffees.push(c);
    });
    return Object.values(clusters);
  }

  // ── Render pins
  function renderPins() {
    // Clear old markers from leaflet map
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const coffees = getFilteredCoffees();
    countEl.textContent = coffees.length + ' coffee' + (coffees.length !== 1 ? 's' : '');

    const clusters = clusterByCoordinates(coffees);
    clusters.forEach(cluster => {
      const { coords, coffees: cs } = cluster;
      const isMulti = cs.length > 1;

      // Custom HTML pin icon utilizing CSS pulsing effects
      const icon = L.divIcon({
        className: 'custom-pin-icon',
        html: `
          <div class="pin-ring${isMulti ? ' multi' : ''}"></div>
          <div class="pin-dot${isMulti ? ' multi' : ''}">
            ${isMulti ? `<span class="pin-number">${cs.length}</span>` : ''}
          </div>
        `,
        iconSize: isMulti ? [22, 22] : [16, 16],
        iconAnchor: isMulti ? [11, 11] : [8, 8]
      });

      const marker = L.marker(coords, { icon: icon }).addTo(map);
      marker.coffeeIds = cs.map(c => c.id);
      
      marker.on('click', () => {
        if (cs.length === 1) {
          openCard(cs[0]);
        } else {
          openList(cs);
        }
      });

      markers.push(marker);
    });

    updateActivePinHighlight();
  }

  // ── Open single card modal
  function openCard(coffee, fromList = null) {
    document.getElementById('modal-close').style.display = '';
    currentCard = coffee;

    // Generate dynamic SVG coffee bean pips
    const pips = Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < coffee.roast;
      const strokeColor = isFilled ? coffee.cardColor : 'rgba(0,0,0,0.4)';
      const outerFill = isFilled ? 'rgba(0,0,0,0.5)' : 'none';
      const outerStroke = isFilled ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.4)';
      return `
        <svg class="bean-pip-svg" viewBox="0 0 24 24" width="16" height="16" style="transform: rotate(-30deg); display: inline-block; vertical-align: middle; flex-shrink: 0;">
          <path d="M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 Z" fill="${outerFill}" stroke="${outerStroke}" stroke-width="2" />
          <path d="M12,2 C9.5,7 9.5,17 12,22" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;
    }).join('');

    const flavours = coffee.flavours.map(f => `<div>${f}</div>`).join('');

    // Detailed SVG icons replacing text emojis
    const rows = [
      { 
        label: 'Grown', 
        val: coffee.grown || '—',
        icon: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M12 20V4" /><path d="M12 9c3-1.5 5.5.5 6.5 2.5-1.5 3-4 3.5-6.5 1.5Z" fill="currentColor" fill-opacity="0.15" /><path d="M12 14c-3-1.5-5.5.5-6.5 2.5 1.5 3 4 3.5 6.5 1.5Z" fill="currentColor" fill-opacity="0.15" /></svg>`
      },
      { 
        label: 'Altitude', 
        val: coffee.altitude || '—',
        icon: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M3 20h18L13 5z" /><path d="M13 20h8l-5-7z" /></svg>`
      },
      { 
        label: 'Varietal', 
        val: coffee.varietal || '—',
        icon: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><path d="M6 1v3M10 1v3M14 1v3" /></svg>`
      },
      { 
        label: 'Process', 
        val: coffee.process || '—',
        icon: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" /></svg>`
      },
      { 
        label: 'Producers', 
        val: coffee.producers || '—',
        icon: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>`
      }
    ];
    const tableRows = rows.map(r => `
      <div class="back-row">
        <div class="back-row-label">${r.icon}${r.label}</div>
        <div class="back-row-val">${r.val}</div>
      </div>
    `).join('');

    const backButtonHTML = fromList ? `
      <button class="back-to-list-btn" id="back-to-list-btn" style="margin-top: 16px;">
        ← Back to List
      </button>
    ` : '';

    modalContent.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div class="rave-card">
          <div class="card-header" style="background: ${coffee.cardColor}; padding: 24px 24px 20px; position: relative;">
            <div style="position:absolute;top:14px;right:20px;text-align:right;">
              <div style="font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:1px;color:rgba(0,0,0,0.35);">Nº</div>
              <div style="font-family:var(--font-display);font-weight:900;font-size:62px;line-height:1;color:rgba(0,0,0,0.22);">${coffee.num}</div>
            </div>
            <div class="card-name-block" style="padding-right: 80px; margin-bottom: 20px;">
              <div class="card-country" style="color: var(--rave-black); font-size: ${coffee.country === 'Blend' ? '28px' : '38px'}; line-height: 1.1;">${coffee.country === 'Blend' ? 'Rave Coffee Blend' : coffee.country}</div>
              ${coffee.country === 'Blend' ? `<div style="font-family:var(--font-mono); font-size:9.5px; font-weight:700; text-transform:uppercase; color:rgba(0,0,0,0.45); margin-top: 4px; margin-bottom: 2px; letter-spacing: 0.5px; line-height: 1.2;">Phoenix Way, Cirencester, GL7 1QG</div>` : ''}
              <div class="card-coffee-name" style="color: rgba(0,0,0,0.7);">${coffee.name}</div>
            </div>
            <div class="card-cols">
              <div>
                <div class="card-label">Roasted:</div>
                <div class="card-roast-text" style="color: rgba(0,0,0,0.75);">${coffee.roastLabel}</div>
                <div class="bean-pips">${pips}</div>
              </div>
              <div>
                <div class="card-label">Tastes like:</div>
                <div class="tastes-list" style="color: rgba(0,0,0,0.8);">${flavours}</div>
              </div>
            </div>
          </div>
          <div class="card-body" style="padding: 20px 24px; background: var(--rave-navy);">
            <div style="margin-bottom: 20px;">
              ${tableRows}
            </div>
            <div class="roastery-notes-section" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
              <div class="roastery-title">Roastery Notes:</div>
              <div class="roastery-text">${coffee.roasteryNotes}</div>
            </div>
          </div>
        </div>
        ${backButtonHTML}
      </div>
    `;

    if (fromList) {
      document.getElementById('back-to-list-btn').addEventListener('click', () => {
        openList(fromList);
      });
    }

    overlay.classList.add('open');
    updateActivePinHighlight();
  }

  // ── Open list modal (multiple coffees at same location)
  function openList(coffees) {
    document.getElementById('modal-close').style.display = '';
    const items = coffees.map(c => `
      <div class="pin-list-item" data-id="${c.id}">
        ${c.country === 'Blend' ? 'Rave Coffee Blend (UK)' : c.country} — ${c.name}
        <span>N°${c.num} · ${c.roastLabel} · ${c.flavours.join(', ')}</span>
      </div>
    `).join('');
    
    // Custom label for title depending on if it is a blend or farm
    const displayTitle = coffees[0].country === 'Blend' 
      ? 'Rave Coffee Blend (UK)' 
      : `${coffees[0].country} (${coffees[0].producers})`;

    modalContent.innerHTML = `
      <div class="pin-list">
        <div class="pin-list-title">${displayTitle} — ${coffees.length} coffees</div>
        ${items}
      </div>
    `;
    modalContent.querySelectorAll('.pin-list-item').forEach(el => {
      el.addEventListener('click', () => {
        const coffee = COFFEES.find(c => c.id === parseInt(el.dataset.id));
        if (coffee) openCard(coffee, coffees);
      });
    });
    overlay.classList.add('open');
  }

  // ── Close modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') {
      closeModal(); 
      closeDrawer();
      closeMobileMenu();
    } 
  });
  function closeModal() {
    overlay.classList.remove('open');
    currentCard = null;
    updateActivePinHighlight();
    document.getElementById('modal-close').style.display = '';
  }

  // ── Update active marker dynamic styling and accelerated pulses
  function updateActivePinHighlight() {
    markers.forEach(marker => {
      const el = marker.getElement();
      if (!el) return;

      const pinRing = el.querySelector('.pin-ring');
      const pinDot = el.querySelector('.pin-dot');

      const isActive = currentCard && marker.coffeeIds && marker.coffeeIds.includes(currentCard.id);

      if (isActive) {
        el.classList.add('active-pin');
        const color = currentCard.cardColor || 'var(--rave-yellow)';
        
        if (pinDot) {
          pinDot.style.backgroundColor = color;
          pinDot.style.boxShadow = `0 0 14px ${color}`;
        }
        
        if (pinRing) {
          pinRing.style.borderColor = color;
          pinRing.style.animation = 'activePinPulse 1.2s infinite cubic-bezier(0.25, 0, 0, 1)';
        }
      } else {
        el.classList.remove('active-pin');
        
        if (pinDot) {
          pinDot.style.backgroundColor = '';
          pinDot.style.boxShadow = '';
        }
        
        if (pinRing) {
          pinRing.style.borderColor = '';
          pinRing.style.animation = '';
        }
      }
    });
  }

  // ── Open Info / Disclaimer modal
  function openDisclaimer() {
    currentCard = null; // Clear active card state so no pins are highlighted
    updateActivePinHighlight();
    document.getElementById('modal-close').style.display = '';

    modalContent.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center;">
        <div class="rave-card">
          <div class="card-header" style="background: var(--rave-yellow); padding: 24px; position: relative;">
            <div class="card-name-block" style="margin-bottom: 0;">
              <div class="card-country" style="color: var(--rave-black); font-size: 26px; line-height: 1.2;">Project Info</div>
              <div style="font-family:var(--font-mono); font-size:9.5px; font-weight:700; text-transform:uppercase; color:rgba(0,0,0,0.45); margin-top: 4px; letter-spacing: 0.5px;">Rave Coffee Subscription Journey</div>
            </div>
          </div>
          <div class="card-body" style="padding: 24px; background: var(--rave-navy); color: rgba(255,255,255,0.9); font-size: 13px; line-height: 1.6;">
            <p style="margin-bottom: 14px;">This is a personal, fan-made interactive mapping dashboard tracking the delicious coffees I have received so far with my <strong>Rave Coffee Subscription</strong>!</p>
            
            <div class="roastery-notes-section" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; margin-bottom: 14px;">
              <div class="roastery-title" style="color: var(--rave-yellow); font-size: 11px; margin-bottom: 6px;">AI EXPERIMENT & STORY:</div>
              <div class="roastery-text" style="font-size: 12px; opacity: 0.85;">
                This project is a fun, personal experiment to try out advanced agentic AI coding capabilities (using <strong>Google Antigravity</strong>, <strong>Gemini Flash</strong>, and <strong>Claude</strong>).
              </div>
            </div>

            <div class="roastery-notes-section" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
              <div class="roastery-title" style="color: var(--rave-yellow); font-size: 11px; margin-bottom: 6px;">DATA ACCURACY:</div>
              <div class="roastery-text" style="font-size: 12px; opacity: 0.85;">
                Some coffee descriptions, coordinates, or tasting notes may not be completely accurate, as some card texts were generated or completed by Gemini. To see official and correct specifications, please check the <a href="https://ravecoffee.co.uk/" target="_blank" style="color: var(--rave-yellow); text-decoration: underline; font-weight: 700;">official Rave Coffee online shop</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add('open');
  }

  // ── Zoom Controls
  document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
  document.getElementById('zoom-reset').addEventListener('click', () => {
    map.setView([15, -10], 2.5);
  });

  // ── Filters
  document.getElementById('filter-row').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderPins();
    if (drawer.classList.contains('open')) {
      renderDrawerList();
    }
    closeMobileMenu();

    // Auto-fly to continent viewport on mobile!
    if (window.innerWidth < 768) {
      const view = CONTINENT_VIEWS[activeFilter];
      if (view) {
        map.flyTo(view.center, view.zoom, { duration: 1.2 });
      }
    }
  });

  // ── Sidebar Drawer Logic
  function openDrawer() {
    closeMobileMenu();
    drawer.classList.add('open');
    document.body.classList.add('drawer-open');
    renderDrawerList();
    setTimeout(() => drawerSearch.focus(), 100);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
  }

  function renderDrawerList() {
    let coffees = getFilteredCoffees();
    const query = drawerSearch.value.trim().toLowerCase();

    if (query) {
      coffees = coffees.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query) ||
        c.grown.toLowerCase().includes(query) ||
        c.flavours.some(f => f.toLowerCase().includes(query)) ||
        c.roastLabel.toLowerCase().includes(query)
      );
    }

    const items = coffees.map(c => `
      <div class="drawer-item" data-id="${c.id}">
        <div class="drawer-item-top">
          <span class="drawer-item-num">N°${c.num}</span>
          <span class="drawer-item-country">${c.country === 'Blend' ? 'Rave Coffee Blend (UK)' : c.country}</span>
        </div>
        <div class="drawer-item-name">${c.name}</div>
        <div class="drawer-item-meta">
          <span style="color: var(--rave-yellow); font-weight: 700; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">${c.roastLabel}</span>
          <span style="opacity: 0.85; font-size: 10px;">${c.flavours.slice(0, 2).join(', ')}</span>
        </div>
      </div>
    `).join('');

    drawerList.innerHTML = items || `
      <div style="text-align:center; padding: 40px 20px; font-family: var(--font-mono); font-size: 11px; opacity: 0.5; color: rgba(255,255,255,0.4);">
        No coffees found matching "${query}"
      </div>
    `;

    drawerList.querySelectorAll('.drawer-item').forEach(el => {
      el.addEventListener('click', () => {
        const coffee = COFFEES.find(c => c.id === parseInt(el.dataset.id));
        if (coffee) {
          const coords = COFFEE_COORDS[coffee.id] || COFFEE_COORDS[29];
          map.flyTo(coords, 5.5, { duration: 1.2 });
          
          // Open tasting card modal during flight for a highly dynamic interaction
          setTimeout(() => {
            openCard(coffee);
          }, 350);
        }
      });
    });
  }

  // Mobile Menu Logic
  function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    headerRight.classList.toggle('open');
  }

  function closeMobileMenu() {
    if (menuToggle && headerRight) {
      menuToggle.classList.remove('active');
      headerRight.classList.remove('open');
    }
  }

  // Bind Drawer & Mobile Menu Event Listeners
  drawerTrigger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerSearch.addEventListener('input', renderDrawerList);
  menuToggle.addEventListener('click', toggleMobileMenu);
  if (disclaimerTrigger) {
    disclaimerTrigger.addEventListener('click', openDisclaimer);
  }
  
  map.on('click', () => {
    closeDrawer();
    closeMobileMenu();
    closeModal();
  });

  // ── Init
  renderPins();

})();
