/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STATIC SEARCH INDEX  →  /search.json
 * ─────────────────────────────────────────────────────────────────────────────
 * Built at build time from the content collections and the static page list.
 * The record shape is deliberately the one a hosted engine would consume
 * (title / description / url / kind / lang / keywords), so Phase 2 can swap
 * the client for Pagefind, Algolia or Meilisearch without touching content.
 *
 * `href` values are ABSOLUTE paths including the locale prefix, so the client
 * never has to know the routing rules.
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { entrySlug } from '@/lib/content';
import { localizePath, locales, useTranslations, type Locale } from '@/i18n/utils';
import { primaryNav, secondaryNav, staticPages } from '@/data/navigation';

interface SearchRecord {
  title: string;
  description: string;
  href: string;
  kind: 'system' | 'exam' | 'guide' | 'page';
  lang: Locale;
  keywords: string[];
}

export const GET: APIRoute = async () => {
  const [systems, exams, guides, prep] = await Promise.all([
    getCollection('systems'),
    getCollection('exams'),
    getCollection('guides'),
    getCollection('prep'),
  ]);

  const records: SearchRecord[] = [];

  for (const locale of locales) {
    const t = useTranslations(locale);
    const isLocaleEntry = (id: string) => id.startsWith(`${locale}/`);

    for (const entry of systems.filter((item) => isLocaleEntry(item.id))) {
      records.push({
        title: entry.data.title,
        description: entry.data.summary,
        href: localizePath(`/systems/${entrySlug(entry)}`, locale),
        kind: 'system',
        lang: locale,
        keywords: [
          entry.data.shortName,
          entry.data.fullName,
          entry.data.region,
          entry.data.type,
          ...entry.data.tags,
        ],
      });
    }

    for (const entry of exams.filter((item) => isLocaleEntry(item.id))) {
      records.push({
        title: entry.data.title,
        description: entry.data.summary,
        href: localizePath(`/exams/${entrySlug(entry)}`, locale),
        kind: 'exam',
        lang: locale,
        keywords: [entry.data.shortName, entry.data.fullName, entry.data.type, ...entry.data.tags],
      });
    }

    for (const entry of guides.filter((item) => isLocaleEntry(item.id))) {
      records.push({
        title: entry.data.title,
        description: entry.data.summary,
        href: localizePath(`/guides/${entrySlug(entry)}`, locale),
        kind: 'guide',
        lang: locale,
        keywords: [
          t(`guides.category.${entry.data.category}` as never),
          ...entry.data.tags,
          ...entry.data.systems,
        ],
      });
    }

    // Exam preparation (section 02.4). Indexed with its evidence type in the
    // keyword set so "编辑观点" / "editorial" searches surface the right pieces.
    for (const entry of prep.filter((item) => isLocaleEntry(item.id))) {
      records.push({
        title: entry.data.title,
        description: entry.data.summary,
        href: localizePath(`/exams/prep/${entrySlug(entry)}`, locale),
        kind: 'guide',
        lang: locale,
        keywords: [
          t('prep.title'),
          entry.data.system,
          entry.data.subject ?? '',
          t(`evidence.${entry.data.evidenceType}` as never),
          ...entry.data.tags,
        ].filter(Boolean),
      });
    }

    // Navigation destinations, so a query like "compare" resolves to the tool.
    for (const item of [...staticPages, ...primaryNav, ...secondaryNav]) {
      const label = t(item.key);
      records.push({
        title: label,
        description: t('footer.builtWith'),
        href: localizePath(item.href, locale),
        kind: 'page',
        lang: locale,
        keywords: [item.href, label],
      });
    }
  }

  // De-duplicate on href + lang (navigation lists overlap with staticPages).
  const seen = new Set<string>();
  const unique = records.filter((record) => {
    const key = `${record.lang}:${record.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return new Response(JSON.stringify(unique), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
