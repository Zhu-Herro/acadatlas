/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NAVIGATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Derived from the section model in `src/data/routes.ts` — this file only adds
 * the footer grouping and the static-page list used by the search index.
 *
 * Nothing here hard-codes a path: every href comes from `routes`.
 */

import type { UIKey } from '@/i18n/ui';
import { primaryNav, routes, secondaryNav, sections } from './routes';

export interface NavItem {
  key: UIKey;
  href: string;
  /** Rendered smaller / secondary in the footer. */
  secondary?: boolean;
}

export { primaryNav, secondaryNav, sections };

/** Footer column: the five sections, in reading order. */
export const footerBrowse: NavItem[] = sections.map((section) => ({
  key: section.key,
  href: section.href,
}));

/** Footer column: the admission modules, surfaced one level deeper so the
 *  hierarchy is visible from any page without opening the section hub. */
export const footerAdmissions: NavItem[] = (
  sections.find((section) => section.id === 'admissions')?.children ?? []
).map((child) => ({ key: child.key, href: child.href }));

/** Footer column: about. */
export const footerAbout: NavItem[] = [
  { key: 'nav.compare', href: routes.compare },
  { key: 'nav.about', href: routes.about },
  { key: 'nav.contact', href: routes.contact },
];

/**
 * Every static page, across all sections plus the admission sub-modules.
 * Consumed by the search index so a query like "录取要求" resolves.
 */
export const staticPages: NavItem[] = [
  { key: 'nav.home', href: routes.home },
  { key: 'nav.systems', href: routes.systems },
  { key: 'nav.exams', href: routes.exams },
  { key: 'nav.admissions', href: routes.admissions },
  { key: 'nav.pathways', href: routes.pathways },
  { key: 'nav.china', href: routes.mainland },
  { key: 'nav.overseas', href: routes.overseas },
  { key: 'nav.requirements', href: routes.requirements },
  { key: 'nav.guides', href: routes.guides },
  { key: 'nav.resources', href: routes.resources },
  { key: 'nav.compare', href: routes.compare },
  { key: 'nav.about', href: routes.about },
  { key: 'nav.contact', href: routes.contact },
];
