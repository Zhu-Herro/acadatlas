/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NAVIGATION MODEL
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised so the header, the mobile drawer, the footer and the 404 page
 * can never drift apart. Paths are locale-agnostic — `localizePath()` adds the
 * `/en` prefix at render time.
 */

import type { UIKey } from '@/i18n/ui';

export interface NavItem {
  key: UIKey;
  /** Locale-agnostic href. */
  href: string;
  /** Rendered smaller / secondary in the footer. */
  secondary?: boolean;
}

/**
 * Main header navigation. Kept at six items so it stays legible.
 *
 * Ordering reflects what a reader actually needs, in sequence:
 * what the systems are → how they are examined → where they lead →
 * the mainland-specific route → the numbers → the long-form reading.
 */
export const primaryNav: NavItem[] = [
  { key: 'nav.systems', href: '/systems' },
  { key: 'nav.exams', href: '/exams' },
  { key: 'nav.pathways', href: '/pathways' },
  { key: 'nav.china', href: '/china' },
  { key: 'nav.requirements', href: '/requirements' },
  { key: 'nav.guides', href: '/guides' },
];

/** Reachable from the footer and the mobile drawer only. */
export const secondaryNav: NavItem[] = [
  { key: 'nav.resources', href: '/resources' },
  { key: 'nav.compare', href: '/compare' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];

/** Footer column: browse. */
export const footerBrowse: NavItem[] = [
  { key: 'nav.systems', href: '/systems' },
  { key: 'nav.exams', href: '/exams' },
  { key: 'nav.pathways', href: '/pathways' },
  { key: 'nav.guides', href: '/guides' },
  { key: 'nav.resources', href: '/resources' },
];

/** Footer column: about. */
export const footerAbout: NavItem[] = [
  { key: 'nav.compare', href: '/compare' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];

/**
 * Static pages that should appear in search and in the sitemap even though they
 * are not content-collection entries.
 */
export const staticPages: NavItem[] = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.systems', href: '/systems' },
  { key: 'nav.exams', href: '/exams' },
  { key: 'nav.pathways', href: '/pathways' },
  { key: 'nav.china', href: '/china' },
  { key: 'nav.requirements', href: '/requirements' },
  { key: 'nav.guides', href: '/guides' },
  { key: 'nav.resources', href: '/resources' },
  { key: 'nav.compare', href: '/compare' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];
