import {
  getActivityTypeLabel,
  getActivityTypeIcon,
  formatDate,
  type Activity,
} from './data';

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return path.startsWith('/') ? base.replace(/\/$/, '') + path : path;
}

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function fileMeta(path: string): { name: string; ext: string; label: string } {
  const name = path.split('/').pop() || path;
  const ext = (name.split('.').pop() || '').toLowerCase();
  const label =
    ext === 'pdf'
      ? 'PDF'
      : ext === 'docx' || ext === 'doc'
      ? 'Word'
      : ext === 'xlsx' || ext === 'xls'
      ? 'Excel'
      : ext === 'ipynb'
      ? 'Notebook'
      : ext === 'pptx' || ext === 'ppt'
      ? 'PowerPoint'
      : ext.toUpperCase();
  return { name, ext, label };
}

function fileIcon(ext: string): string {
  if (ext === 'pdf') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
  }
  if (ext === 'xlsx' || ext === 'xls') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h8M10 13v4"/></svg>`;
  }
  if (ext === 'ipynb') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 9 19"/><line x1="13" y1="19" x2="16" y2="19"/></svg>`;
  }
  if (ext === 'pptx' || ext === 'ppt') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="6" height="4" rx="1"/></svg>`;
  }
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
}

export function cardHtml(a: Activity): string {
  const files = (a.files || [])
    .map((f) => {
      const { name, ext, label } = fileMeta(f);
      return `<a class="file-chip" href="${withBase(f)}" target="_blank" rel="noopener" download title="${escapeHtml(
        name,
      )}">${fileIcon(ext)}<span>${label}</span></a>`;
    })
    .join('');

  const reflection = a.reflection
    ? `<details class="reflection">
        <summary>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
          <span>Reflection</span>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="reflection-body">${a.reflection
          .split('\n')
          .filter((p) => p.trim())
          .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
          .join('')}</div>
      </details>`
    : '';

  return `<article class="activity-card reveal" data-type="${a.type}">
    <div class="activity-card-top">
      <span class="type-badge type-${a.type}">${getActivityTypeIcon(a.type)}${getActivityTypeLabel(
    a.type,
  )}</span>
      <span class="status-badge status-${a.status}">${a.status}</span>
    </div>
    <h3 class="activity-title">${escapeHtml(a.title)}</h3>
    <div class="activity-date">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      ${formatDate(a.date)}
    </div>
    <p class="activity-desc">${escapeHtml(a.description)}</p>
    ${files ? `<div class="activity-files">${files}</div>` : ''}
    ${reflection}
  </article>`;
}

export function emptyHtml(): string {
  return `<div class="empty-state">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <p>No activities found.</p>
  </div>`;
}
