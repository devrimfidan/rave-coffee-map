(function () {
  'use strict';

  // ── Dashboard State
  let activeFilter = 'all';
  let searchQuery = '';
  let activeView = 'grid';
  let sortColumn = 'num';
  let sortAscending = true;

  // DOM Elements
  const gridContainer = document.getElementById('grid-view-container');
  const tableViewContainer = document.getElementById('table-view-container');
  const tableBody = document.getElementById('table-body');
  const searchInput = document.getElementById('search-input');
  const filterRow = document.getElementById('filter-row');
  const viewSwitchRow = document.getElementById('view-switch-row');
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const disclaimerTrigger = document.getElementById('disclaimer-trigger');

  // ── Filter and Sort dataset
  function getFilteredAndSortedCoffees() {
    // 1. Filter
    let list = COFFEES;
    if (activeFilter !== 'all') {
      list = list.filter(c => c.region === activeFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query) ||
        (c.grown && c.grown.toLowerCase().includes(query)) ||
        (c.producers && c.producers.toLowerCase().includes(query)) ||
        (c.varietal && c.varietal.toLowerCase().includes(query)) ||
        c.flavours.some(f => f.toLowerCase().includes(query)) ||
        c.roastLabel.toLowerCase().includes(query)
      );
    }

    // 2. Sort
    list.sort((a, b) => {
      let valA, valB;
      if (sortColumn === 'num') {
        valA = a.num;
        valB = b.num;
      } else if (sortColumn === 'country') {
        valA = a.country === 'Blend' ? 'Rave Coffee Blend' : a.country;
        valB = b.country === 'Blend' ? 'Rave Coffee Blend' : b.country;
      } else if (sortColumn === 'name') {
        valA = a.name;
        valB = b.name;
      } else if (sortColumn === 'roast') {
        valA = a.roast;
        valB = b.roast;
      }

      if (typeof valA === 'string') {
        return sortAscending 
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortAscending ? valA - valB : valB - valA;
      }
    });

    return list;
  }

  // ── Main Render Router
  function render() {
    const list = getFilteredAndSortedCoffees();

    if (activeView === 'grid') {
      tableViewContainer.style.display = 'none';
      gridContainer.style.display = 'grid';
      renderGridView(list);
    } else {
      gridContainer.style.display = 'none';
      tableViewContainer.style.display = 'block';
      renderTableView(list);
    }
  }

  // ── Render Card Grid View
  function renderGridView(coffees) {
    if (coffees.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-family: var(--font-mono); font-size: 13px; opacity: 0.5; color: rgba(255,255,255,0.4);">
          No coffees found matching search criteria.
        </div>
      `;
      return;
    }

    const cards = coffees.map(c => {
      // dynamic roast bean SVG pips
      const roastPips = Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < c.roast;
        const outerFill = isFilled ? 'rgba(0,0,0,0.4)' : 'none';
        const strokeColor = isFilled ? c.cardColor : 'rgba(255,255,255,0.15)';
        return `
          <svg class="bean-pip-svg" viewBox="0 0 24 24" width="15" height="15" style="transform: rotate(-30deg); display: inline-block;">
            <path d="M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 Z" fill="${outerFill}" stroke="rgba(255,255,255,0.35)" stroke-width="2" />
            <path d="M12,2 C9.5,7 9.5,17 12,22" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" />
          </svg>
        `;
      }).join('');

      const flavorCapsules = c.flavours.map(f => `
        <span class="mini-taste-capsule">${f}</span>
      `).join('');

      return `
        <div class="mini-card" data-id="${c.id}">
          <div class="mini-header" style="background: ${c.cardColor};">
            <div class="mini-num-label">N°${c.num}</div>
            <div class="mini-country">${c.country === 'Blend' ? 'Rave Coffee Blend' : c.country}</div>
            <div class="mini-name">${c.name}</div>
          </div>
          <div class="mini-body">
            <div class="mini-taste-list">
              ${flavorCapsules}
            </div>
            <div class="mini-footer">
              <span class="mini-roast" style="display:flex; align-items:center; gap:4px;">
                Roast: ${roastPips}
              </span>
              <span style="font-size:8.5px; opacity:0.8; text-transform:uppercase;">N° ${c.num}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    gridContainer.innerHTML = cards;

    gridContainer.querySelectorAll('.mini-card').forEach(el => {
      el.addEventListener('click', () => {
        const coffee = COFFEES.find(c => c.id === parseInt(el.dataset.id));
        if (coffee) openCard(coffee);
      });
    });
  }

  // ── Render Interactive Table View
  function renderTableView(coffees) {
    // Update header arrows
    document.querySelectorAll('th[data-sort]').forEach(th => {
      const col = th.dataset.sort;
      const arrow = th.querySelector('.sort-arrow');
      if (col === sortColumn) {
        th.classList.add('sort-active');
        arrow.textContent = sortAscending ? '▲' : '▼';
      } else {
        th.classList.remove('sort-active');
        arrow.textContent = '';
      }
    });

    if (coffees.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 60px 20px; font-family: var(--font-mono); font-size: 13px; opacity: 0.5; color: rgba(255,255,255,0.4);">
            No coffees found matching search criteria.
          </td>
        </tr>
      `;
      return;
    }

    const rows = coffees.map(c => {
      // dynamic mini roast bean SVGs
      const roastPips = Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < c.roast;
        const outerFill = isFilled ? 'rgba(255,255,255,0.15)' : 'none';
        const strokeColor = isFilled ? 'var(--rave-yellow)' : 'rgba(255,255,255,0.1)';
        return `
          <svg viewBox="0 0 24 24" width="14" height="14" style="transform: rotate(-30deg); display: inline-block; vertical-align:middle; margin-right:2px;">
            <path d="M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 Z" fill="${outerFill}" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
            <path d="M12,2 C9.5,7 9.5,17 12,22" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" />
          </svg>
        `;
      }).join('');

      return `
        <tr data-id="${c.id}" style="cursor: pointer;">
          <td class="td-num">N°${c.num}</td>
          <td class="td-origin">${c.country === 'Blend' ? 'Rave Coffee Blend' : c.country}</td>
          <td class="td-name">${c.name}</td>
          <td class="td-roast">
            <span style="display:block; font-size:9.5px; opacity:0.65; margin-bottom:2px;">${c.roastLabel}</span>
            ${roastPips}
          </td>
          <td style="opacity: 0.85;">${c.flavours.join(', ')}</td>
          <td style="text-align: center;">
            <button class="view-details-btn">View Card</button>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.innerHTML = rows;

    tableBody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', (e) => {
        const coffee = COFFEES.find(c => c.id === parseInt(row.dataset.id));
        if (coffee) openCard(coffee);
      });
    });
  }

  // ── Open tasting card modal (Identical to map.js)
  function openCard(coffee) {
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
      </div>
    `;

    overlay.classList.add('open');
  }

  // ── Open Info / Disclaimer modal (Identical to map.js)
  function openDisclaimer() {
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

  function closeModal() {
    overlay.classList.remove('open');
  }

  // ── Bind Event Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    render();
  });

  filterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });

  viewSwitchRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.switch-btn');
    if (!btn) return;
    document.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeView = btn.dataset.view;
    render();
  });

  // Table Sort Binding
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortColumn === col) {
        sortAscending = !sortAscending;
      } else {
        sortColumn = col;
        sortAscending = true;
      }
      render();
    });
  });

  // Modal controls
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  disclaimerTrigger.addEventListener('click', openDisclaimer);

  // ── Init Render
  render();

})();
