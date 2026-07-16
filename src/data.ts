export interface Activity {
  id: number;
  title: string;
  type: 'activity' | 'assignment' | 'quiz' | 'project' | 'comfile' | 'notes';
  description: string;
  date: string;
  status: 'submitted' | 'pending' | 'draft';
  files?: string[];
  notes?: string;
  period: 'prelim' | 'midterm' | 'finals';
}

export const activities: Activity[] = [
];

export function getActivitiesByPeriod(period: Activity['period']): Activity[] {
  return activities.filter(a => a.period === period);
}

export function searchActivities(query: string, period?: Activity['period']): Activity[] {
  const lower = query.toLowerCase();
  let filtered = activities;
  if (period) {
    filtered = filtered.filter(a => a.period === period);
  }
  return filtered.filter(a =>
    a.title.toLowerCase().includes(lower) ||
    a.description.toLowerCase().includes(lower) ||
    a.type.toLowerCase().includes(lower) ||
    (a.notes && a.notes.toLowerCase().includes(lower))
  );
}

export function getRecentActivities(count: number = 3): Activity[] {
  return [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getActivityTypeLabel(type: Activity['type']): string {
  const labels: Record<Activity['type'], string> = {
    activity: 'Activity',
    assignment: 'Assignment',
    quiz: 'Quiz',
    project: 'Project',
    comfile: 'COMFILE',
    notes: 'Notes'
  };
  return labels[type];
}

export function getActivityTypeIcon(type: Activity['type']): string {
  const icons: Record<Activity['type'], string> = {
    activity: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    assignment: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    quiz: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    project: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    comfile: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    notes: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };
  return icons[type];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
