/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROFILE VIEW MODEL
 * ─────────────────────────────────────────────────────────────────────────────
 * System pages (09 sections) and exam pages (08 sections) share ONE template.
 * This module is the single place that knows how each content type maps onto
 * that template, so the `.astro` files stay purely presentational.
 *
 * Adding a new content type (e.g. "pathway guides") means writing one more
 * builder here — the template does not change.
 */

import type { CollectionEntry } from 'astro:content';
import { localizePath, type Locale } from '@/i18n/utils';
import { getPathway, pathwayAnchor } from '@/data/pathways';
import { comparisonKeys, type ComparisonKey } from '@/data/dimensions';
import { getGradeScale } from '@/data/scales';
import { getPolicy } from '@/data/policies';
import { createLinker, entrySlug, type EntryLink } from './content';
import { resolveSource, resolveSources, type ResolvedSource } from './sources';
import type { Translator } from '@/i18n/utils';

/** ── Presentational blocks ─────────────────────────────────────────────── */
export type ProfileBlock =
  | { type: 'prose'; items: string[] }
  | { type: 'pairs'; items: { label: string; value: string }[] }
  | { type: 'groups'; items: { group: string; items: string[] }[] }
  | { type: 'points'; items: string[] }
  | { type: 'links'; items: EntryLink[] }
  | { type: 'destinations'; items: { id: string; name: string; note?: string; href: string }[] }
  | { type: 'compare'; items: { slug: string; name: string; href: string }[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'sources'; items: ResolvedSource[] }
  /** Reporting scale with its own provenance trail (see src/data/scales.ts). */
  | {
      type: 'scale';
      range: string;
      intro: string;
      rows: { grade: string; meaning: string }[];
      notes: string[];
      evidence: { label: string; href: string }[];
      meta: string;
    };

export interface ProfileSection {
  /** Anchor id, e.g. `overview`. */
  id: string;
  /** `01`, `02`, … */
  number: string;
  /** `OVERVIEW` */
  label: string;
  /** `What is DSE?` */
  question: string;
  blocks: ProfileBlock[];
}

export interface ProfileView {
  kind: 'system' | 'exam';
  slug: string;
  locale: Locale;
  title: string;
  shortName: string;
  fullName: string;
  region: string;
  type: string;
  /** Optional grouping label, e.g. "课程体系" for systems. */
  groupLabel?: string;
  lede: string;
  summary: string;
  updatedAt: Date;
  academicYear: string;
  tags: string[];
  sources: ResolvedSource[];
  faq: { q: string; a: string }[];
  sections: ProfileSection[];
  /** Pre-filled deep link into the comparison tool. */
  compareHref?: string;
  /** Other systems that can be compared against this one. */
  compareTargets: { slug: string; name: string; href: string }[];
}

/** Zero-padded section number. */
function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * Sections 10 and 11, shared by system AND exam profiles.
 *
 * The facts come from `src/data/policies.ts` and `src/data/scales.ts` rather
 * than from per-entry frontmatter, because they are reference data about the
 * qualification itself: they change rarely, they are identical for every
 * language version, and they must carry one verifiable source per claim.
 *
 * Returns an empty array when there is nothing verified to show — the template
 * never renders an empty section, and the integrity guard prevents an
 * unsourced one from being written in the first place.
 */
function buildReferenceSections(options: {
  slug: string;
  locale: Locale;
  name: string;
  t: Translator;
  sectionCount: number;
}): ProfileSection[] {
  const { slug, locale, name, t, sectionCount } = options;
  const sections: ProfileSection[] = [];

  const policy = getPolicy(slug);
  if (policy) {
    sections.push({
      id: 'policy',
      number: sectionNumber(sectionCount + sections.length),
      label: t('section.policy.label'),
      question: t('section.policy.question', { name }),
      blocks: [
        { type: 'prose', items: [policy.intro[locale]] },
        {
          type: 'pairs',
          items: policy.facts.map((fact) => ({
            label: fact.label[locale],
            value: fact.value[locale],
          })),
        },
        { type: 'points', items: policy.caveats.map((caveat) => caveat[locale]) },
        {
          type: 'links',
          items: [
            {
              slug: 'requirements',
              name: t('requirements.title'),
              href: localizePath('/requirements', locale),
            },
            { slug: 'china', name: t('china.title'), href: localizePath('/china', locale) },
          ],
        },
      ],
    });
  }

  const scale = getGradeScale(slug);
  if (scale) {
    sections.push({
      id: 'scale',
      number: sectionNumber(sectionCount + sections.length),
      label: t('section.scale.label'),
      question: t('section.scale.question', { name }),
      blocks: [
        {
          type: 'scale',
          range: scale.range,
          intro: scale.intro[locale],
          rows: scale.rows.map((row) => ({ grade: row.grade, meaning: row.meaning[locale] })),
          notes: (scale.notes ?? []).map((note) => note[locale]),
          evidence: scale.sources
            .map((source) => resolveSource(source))
            .filter((source): source is ResolvedSource => source !== null)
            .map((source) => ({ label: source.label, href: source.href })),
          meta: `${scale.academicYear} · ${t('requirements.verifiedOn', { date: scale.verifiedAt })}`,
        },
      ],
    });
  }

  return sections;
}

export interface ProfileContext {
  locale: Locale;
  t: Translator;
  /** All system entries (every locale) — needed to resolve related links. */
  systemEntries: CollectionEntry<'systems'>[];
  /** Slugs of the current entry's siblings, for the compare module. */
  siblingSlugs: string[];
}

/* ── systems ────────────────────────────────────────────────────────────── */

export function buildSystemProfile(
  entry: CollectionEntry<'systems'>,
  context: ProfileContext,
): ProfileView {
  const { locale, t, systemEntries, siblingSlugs } = context;
  const data = entry.data;
  const slug = entrySlug(entry);
  const linkSystem = createLinker(systemEntries, '/systems');
  const name = data.shortName || data.title;

  const destinations = data.pathways
    .map((reference) => {
      const destination = getPathway(reference.destination);
      if (!destination) {
        console.warn(
          `[profile] Unknown pathway destination "${reference.destination}" in ${entry.id}`,
        );
        return null;
      }
      return {
        id: destination.id,
        name: destination.name[locale],
        note: reference.note,
        // Deep link into the /pathways page, anchored on this destination.
        href: localizePath(pathwayAnchor(destination.id), locale),
      };
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);

  const compareTargets = siblingSlugs
    .filter((other) => other !== slug)
    .slice(0, 3)
    .map((other) => linkSystem(other, locale))
    .filter((value): value is EntryLink => value !== null)
    .map((link) => ({ slug: link.slug, name: link.name, href: link.href }));

  const relatedLinks = data.related
    .map((other) => linkSystem(other, locale))
    .filter((value): value is EntryLink => value !== null);

  const sections: ProfileSection[] = [
    {
      id: 'overview',
      number: sectionNumber(0),
      label: t('section.overview.label'),
      question: t('section.overview.question', { name }),
      blocks: [{ type: 'prose', items: data.overview }],
    },
    {
      id: 'structure',
      number: sectionNumber(1),
      label: t('section.structure.label'),
      question: t('section.structure.question', { name }),
      blocks: [{ type: 'pairs', items: data.structure }],
    },
    {
      id: 'subjects',
      number: sectionNumber(2),
      label: t('section.subjects.label'),
      question: t('section.subjects.question'),
      blocks: [{ type: 'groups', items: data.subjects }],
    },
    {
      id: 'assessment',
      number: sectionNumber(3),
      label: t('section.assessment.label'),
      question: t('section.assessment.question'),
      blocks: [{ type: 'points', items: data.assessment }],
    },
    {
      id: 'pathways',
      number: sectionNumber(4),
      label: t('section.pathways.label'),
      question: t('section.pathways.question'),
      blocks: [{ type: 'destinations', items: destinations }],
    },
    {
      id: 'suitability',
      number: sectionNumber(5),
      label: t('section.suitability.label'),
      question: t('section.suitability.question'),
      blocks: [{ type: 'points', items: data.suitability }],
    },
    {
      id: 'compare',
      number: sectionNumber(6),
      label: t('section.compare.label'),
      question: t('section.compare.question', { name }),
      blocks: [{ type: 'compare', items: compareTargets }],
    },
  ];

  if (data.faq.length > 0) {
    sections.push({
      id: 'faq',
      number: sectionNumber(7),
      label: t('section.faq.label'),
      question: t('section.faq.question', { name }),
      blocks: [{ type: 'faq', items: data.faq }],
    });
  }

  const sources = resolveSources(data.sources);

  // 10 / official policy · 11 / reporting scale — reference data, sourced.
  sections.push(
    ...buildReferenceSections({ slug, locale, name, t, sectionCount: sections.length }),
  );

  sections.push({
    id: 'sources',
    number: sectionNumber(sections.length),
    label: t('section.sources.label'),
    question: t('section.sources.question'),
    blocks: [{ type: 'sources', items: sources }],
  });

  // Related systems become an extra block on the last content section.
  if (relatedLinks.length > 0) {
    sections.push({
      id: 'related',
      number: sectionNumber(sections.length),
      label: t('common.related'),
      question: t('pathways.connectedSystems'),
      blocks: [{ type: 'links', items: relatedLinks }],
    });
  }

  return {
    kind: 'system',
    slug,
    locale,
    title: data.title,
    shortName: data.shortName,
    fullName: data.fullName,
    region: data.region,
    type: data.type,
    groupLabel: t('systems.group.curriculum'),
    lede: data.lede,
    summary: data.summary,
    updatedAt: data.updatedAt,
    academicYear: data.academicYear,
    tags: data.tags,
    sources,
    faq: data.faq,
    sections,
    compareHref: `${localizePath('/compare', locale)}?systems=${[slug, ...compareTargets.slice(0, 1).map((target) => target.slug)].join(',')}`,
    compareTargets,
  };
}

/* ── exams ──────────────────────────────────────────────────────────────── */

export function buildExamProfile(
  entry: CollectionEntry<'exams'>,
  context: ProfileContext,
): ProfileView {
  const { locale, t, systemEntries } = context;
  const data = entry.data;
  const slug = entrySlug(entry);
  const linkSystem = createLinker(systemEntries, '/systems');
  const name = data.shortName || data.title;

  const relatedLinks = data.related
    .map((other) => linkSystem(other, locale))
    .filter((value): value is EntryLink => value !== null);

  const sections: ProfileSection[] = [
    {
      id: 'overview',
      number: sectionNumber(0),
      label: t('section.overview.label'),
      question: t('section.overview.question', { name }),
      blocks: [{ type: 'prose', items: data.overview }],
    },
    {
      id: 'structure',
      number: sectionNumber(1),
      label: t('section.structure.label'),
      question: t('section.structure.question', { name }),
      blocks: [{ type: 'pairs', items: data.structure }],
    },
    {
      id: 'content',
      number: sectionNumber(2),
      label: t('section.content.label'),
      question: t('section.content.question', { name }),
      blocks: [{ type: 'groups', items: data.content }],
    },
    {
      id: 'scoring',
      number: sectionNumber(3),
      label: t('section.scoring.label'),
      question: t('section.scoring.question', { name }),
      blocks: [{ type: 'points', items: data.scoring }],
    },
    {
      id: 'recognition',
      number: sectionNumber(4),
      label: t('section.recognition.label'),
      question: t('section.recognition.question', { name }),
      blocks: [{ type: 'points', items: data.recognisedBy }],
    },
    {
      id: 'suitability',
      number: sectionNumber(5),
      label: t('section.suitability.label'),
      question: t('section.suitability.question'),
      blocks: [{ type: 'points', items: data.suitability }],
    },
  ];

  if (data.faq.length > 0) {
    sections.push({
      id: 'faq',
      number: sectionNumber(6),
      label: t('section.faq.label'),
      question: t('section.faq.question', { name }),
      blocks: [{ type: 'faq', items: data.faq }],
    });
  }

  const sources = resolveSources(data.sources);

  // 08 / official policy · 09 / reporting scale — reference data, sourced.
  sections.push(
    ...buildReferenceSections({ slug, locale, name, t, sectionCount: sections.length }),
  );

  sections.push({
    id: 'sources',
    number: sectionNumber(sections.length),
    label: t('section.sources.label'),
    question: t('section.sources.question'),
    blocks: [{ type: 'sources', items: sources }],
  });

  if (relatedLinks.length > 0) {
    sections.push({
      id: 'related',
      number: sectionNumber(sections.length),
      label: t('common.related'),
      question: t('pathways.connectedSystems'),
      blocks: [{ type: 'links', items: relatedLinks }],
    });
  }

  return {
    kind: 'exam',
    slug,
    locale,
    title: data.title,
    shortName: data.shortName,
    fullName: data.fullName,
    region: data.region,
    type: data.type,
    groupLabel: data.family === 'language' ? t('exams.familyLanguage') : t('exams.familyStandardised'),
    lede: data.lede,
    summary: data.summary,
    updatedAt: data.updatedAt,
    academicYear: data.academicYear,
    tags: data.tags,
    sources,
    faq: data.faq,
    sections,
    compareTargets: [],
  };
}

/** Comparison payload for the /compare tool. */
export interface ComparisonRecord {
  slug: string;
  name: string;
  shortName: string;
  fullName: string;
  href: string;
  values: Record<ComparisonKey, string>;
}

export function toComparisonRecord(
  entry: CollectionEntry<'systems'>,
  locale: Locale,
): ComparisonRecord {
  const slug = entrySlug(entry);
  const values = {} as Record<ComparisonKey, string>;
  for (const key of comparisonKeys) values[key] = entry.data.comparison[key];

  return {
    slug,
    name: entry.data.title,
    shortName: entry.data.shortName,
    fullName: entry.data.fullName,
    href: localizePath(`/systems/${slug}`, locale),
    values,
  };
}
