import projectsJson from '@/data/projects.json';
import scenesJson from '@/data/concierge-scenes.json';

export interface Project {
  slug: string;
  name: string;
  domain: string;
  url: string;
  image: string;
  vertical: 'artist' | 'events' | 'hospitality' | 'other';
  tags: string[];
  metric: { value: string; label: string } | null;
  blurb: string;
  quote: string | null;
}

/** Work projects for the homepage showcase + (later) case studies. */
export const PROJECTS: Project[] = projectsJson as Project[];

/** A single metadata line for each project, e.g. "Artist & DJ · Astro · SEO 38 → 92". */
export function projectTagLine(p: Project): string {
  const parts = [...p.tags];
  if (p.metric) parts.push(`SEO ${p.metric.value}`);
  return parts.join(' · ');
}

export interface Scene {
  kicker: string;
  title: string;
  sub: string;
  guest: string;
  reply: string;
  chips: string[];
}
export type ThemeKey = 'day' | 'evening' | 'night';

/** Concierge demo scenes keyed by time of day (data for the client island). */
export const SCENES: Record<ThemeKey, Scene> = {
  day: scenesJson.day as Scene,
  evening: scenesJson.evening as Scene,
  night: scenesJson.night as Scene,
};

export const THEME_LABELS: Record<ThemeKey, string> = {
  day: 'Day',
  evening: 'Evening',
  night: 'Late-night',
};
