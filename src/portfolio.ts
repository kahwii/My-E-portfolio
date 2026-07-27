import './style.css';
import { getActivitiesByPeriod, searchActivities, type Activity } from './data';
import { cardHtml, emptyHtml } from './card';

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  if (!sidebar) return;

  const open = () => sidebar.classList.add('open');
  const close = () => sidebar.classList.remove('open');

  menuToggle?.addEventListener('click', open);
  sidebarClose?.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (
      sidebar.classList.contains('open') &&
      !sidebar.contains(target) &&
      !menuToggle?.contains(target)
    ) {
      close();
    }
  });
}

function initGrid() {
  const grid = document.getElementById('activitiesGrid');
  if (!grid) return;
  const period = (grid.getAttribute('data-period') || 'prelim') as Activity['period'];
  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

  let activeFilter = 'all';

  const render = () => {
    const query = searchInput?.value.trim() || '';
    let list = query ? searchActivities(query, period) : getActivitiesByPeriod(period);
    if (activeFilter !== 'all') {
      list = list.filter((a) => a.type === activeFilter);
    }
    grid.innerHTML = list.length ? list.map(cardHtml).join('') : emptyHtml();
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      render();
    });
  });

  searchInput?.addEventListener('input', render);

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initGrid();
});
