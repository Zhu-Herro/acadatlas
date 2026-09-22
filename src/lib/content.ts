/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT COLLECTION HELPERS
 * ─────────────────────────────────────────────────────────────────────────────
 * Entry ids are locale-scoped (`zh/dse`, `en/dse`). These helpers turn ids into
 * { locale, slug } pairs and provide locale-aware lookups, so no page ever has
 * to know how the content tree is laid out on disk.
 */

import type { CollectionEntry } from 'astro:content';
import { defaultLocale, isLocale, localizePath, type Locale } from '@/i18n/utils';

export type CollectionName = 'systems' | 'exams' | 'guides';
export type Entry<C extends CollectionName> = CollectionEntry<C>;

/** Anything with a content-collection id. */
export interface Identified {
  id: string;
}

export interface EntryIdParts {
  locale: Locale;
  slug: string;
}

/**
 * `zh/dse` → { locale: 'zh', slug: 'dse' }
 * `en/guides/dse-vs-ib` → { locale: 'en', slug: 'guides/dse-vs-ib' }
 * `dse` (no locale folder) → { locale: defaultLocale, slug: 'dse' }
 */
export function parseEntryId(id: string): EntryIdParts {
  const parts = id.split('/').filter(Boolean);
  const [first, ...rest] = parts;

  if (rest.length > 0 && isLocale(first)) {
    return { locale: first, slug: rest.join('/') };
  }

  return { locale: defaultLocale, slug: parts.join('/') };
}

export function entryLocale(entry: Identified): Locale {
  return parseEntryId(entry.id).locale;
}

export function entrySlug(entry: Identified): string {
  return parseEntryId(entry.id).slug;
}

/** Keep only the entries belonging to one locale. */
export function inLocale<T extends Identified>(entries: T[], locale: Locale): T[] {
  return entries.filter((entry) => entryLocale(entry) === locale);
}

/** Unique slugs across all locales — the canonical list of "what exists". */
export function collectSlugs(entries: Identified[]): string[] {
  return [...new Set(entries.map(entrySlug))];
}

export function findEntry<T extends Identified>(
  entries: T[],
  slug: string,
  locale: Locale,
): T | undefined {
  return entries.find((entry) => entrySlug(entry) === slug && entryLocale(entry) === locale);
}

/** Sort by the optional `order` frontmatter field, then by slug. */
export function sortEntries<T extends Identified & { data: { order?: number } }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || entrySlug(a).localeCompare(entrySlug(b)),
  );
}

export interface EntryLink {
  slug: string;
  name: string;
  href: string;
}

/**
 * Builds a resolver that turns a slug into a localised link, used by
 * "related content", the compare tool and the pathway diagram.
 *
 * Returns `null` for unknown slugs instead of throwing, so a typo in
 * frontmatter degrades to a missing link rather than a broken build.
 */
export function createLinker<T extends Identified & { data: { title: string } }>(
  entries: T[],
  basePath: string,
) {
  return (slug: string, locale: Locale): EntryLink | null => {
    const entry = findEntry(entries, slug, locale) ?? findEntry(entries, slug, defaultLocale);
    if (!entry) return null;

    return {
      slug,
      name: entry.data.title,
      href: localizePath(`${basePath}/${slug}`, locale),
    };
  };
}

/** Resolution order for a requested slug: locale → default locale. */
export function resolveWithFallback<T extends Identified>(
  entries: T[],
  slug: string,
  locale: Locale,
): { entry: T; isFallback: boolean } | null {
  const exact = findEntry(entries, slug, locale);
  if (exact) return { entry: exact, isFallback: false };

  const fallback = findEntry(entries, slug, defaultLocale);
  if (fallback) return { entry: fallback, isFallback: true };

  return null;
}
