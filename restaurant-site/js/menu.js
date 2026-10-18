/* Renders the tabbed menu from MENU (menu-data.js) */
(function () {
  const tabsEl = document.getElementById('tabs');
  const listEl = document.getElementById('menu-list');
  const headEl = document.getElementById('menu-head');
  const search = document.getElementById('search');
  const vegOnly = document.getElementById('veg-only');
  let current = (location.hash || '#starters').slice(1);
  if (!MENU.some(c => c.id === current)) current = MENU[0].id;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function renderTabs() {
    tabsEl.innerHTML = MENU.map(c =>
      `<button class="tab${c.id === current ? ' active' : ''}" role="tab" aria-selected="${c.id === current}" data-id="${c.id}">${esc(c.name)}</button>`).join('');
  }

  function itemHTML(it, i, price) {
    return `<article class="item" style="animation-delay:${Math.min(i, 12) * 45}ms">
      <h3>${esc(it.n)}${it.v ? '<span class="veg" title="Vegetarian">V</span>' : ''}${it.price ? `<span style="margin-left:auto;color:var(--terracotta)">${esc(it.price)}</span>` : ''}</h3>
      ${it.d ? `<p>${esc(it.d)}</p>` : ''}</article>`;
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const veg = vegOnly.checked;
    const searching = q.length > 0;

    if (searching) {
      // search across the whole menu
      const hits = [];
      MENU.forEach(c => c.items.forEach(it => {
        if (veg && !it.v) return;
        if ((it.n + ' ' + (it.d || '')).toLowerCase().includes(q)) hits.push({ it, cat: c.name });
      }));
      headEl.innerHTML = `<h2>Search results</h2><p>${hits.length} item${hits.length === 1 ? '' : 's'} found for “${esc(search.value)}”</p>`;
      listEl.className = 'menu-list';
      listEl.innerHTML = hits.length
        ? hits.map((h, i) => itemHTML({ ...h.it, d: `${h.cat}${h.it.d ? ' · ' + h.it.d : ''}` }, i)).join('')
        : '<p class="empty">Nothing matched. Try another word, such as “cheese” or “pasta”.</p>';
      return;
    }

    const cat = MENU.find(c => c.id === current);
    const items = cat.items.filter(it => !veg || it.v);
    headEl.innerHTML = `<p class="eyebrow">${esc(cat.sub)}</p><h2>${esc(cat.name)}</h2><p>${esc(cat.desc)}</p>`;
    listEl.className = 'menu-list' + (cat.simple ? ' simple-list' : '');
    listEl.innerHTML = items.length ? items.map(itemHTML).join('') : '<p class="empty">No vegetarian items in this section.</p>';
  }

  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    current = b.dataset.id; search.value = '';
    history.replaceState(null, '', '#' + current);
    renderTabs(); render();
    b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  });
  search.addEventListener('input', render);
  vegOnly.addEventListener('change', render);

  renderTabs(); render();
  const active = tabsEl.querySelector('.active');
  if (active) setTimeout(() => active.scrollIntoView({ inline: 'center', block: 'nearest' }), 50);
})();
