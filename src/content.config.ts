/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT COLLECTIONS (Astro Content Layer)
 * ─────────────────────────────────────────────────────────────────────────────
 * Content is stored as Markdown and is completely separated from presentation.
 * One file per entry per language:
 *
 *   src/content/systems/zh/dse.md      → id: "zh/dse"
 *   src/content/systems/en/dse.md      → id: "en/dse"
 *
 * The entry `slug` and `locale` are derived from the id, so a translation can
 * never drift out of sync with its original filename.
 *
 * Schema design note: every time-sensitive field required for trust
 * (`sources`, `updatedAt`, `region`, `academicYear`) is mandatory or
 * explicitly modelled — see the project brief, section 24.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** ── Shared sub-schemas ────────────────────────────────────────────────── */

/**
 * A citation. Either reference a key in `officialBodies` (site.config.ts) or
 * provide an explicit label + href. Resolved by `src/lib/sources.ts`.
 */
const sourceSchema = z
  .object({
    /** Key into `officialBodies` — preferred, keeps URLs in one place. */
    body: z.string().optional(),
    /** Explicit publisher name (used when there is no shared registry entry). */
    label: z.string().optional(),
    /** Explicit URL. */
    href: z.string().optional(),
    /** What this source supports. */
    note: z.string().optional(),
    /** Month the source was consulted, e.g. "2026-09". */
    accessed: z.string().optional(),
  })
  .refine((value) => Boolean(value.body || (value.label && value.href)), {
    message: 'A source needs either "body" (registry key) or both "label" and "href".',
  });

/** label / value pair rendered as a definition row. */
const pairSchema = z.object({ label: z.string(), value: z.string() });

/** Grouped list, e.g. a subject category with its constituent subjects. */
const groupSchema = z.object({ group: z.string(), items: z.array(z.string()) });

const faqSchema = z.object({ q: z.string(), a: z.string() });

/**
 * A university destination. `destination` is a key into `src/data/pathways.ts`,
 * which keeps the display name and locale strings in one place so content
 * files never hard-code a translated country name.
 */
const pathwayRefSchema = z.object({
  destination: z.string(),
  /** Optional system-specific remark about that destination. */
  note: z.string().optional(),
});

/** The nine canonical comparison dimensions (brief, section 12). */
const comparisonSchema = z.object({
  academicStructure: z.string(),
  assessment: z.string(),
  subjectChoice: z.string(),
  learningStyle: z.string(),
  examStyle: z.string(),
  universityPathways: z.string(),
  geographicReach: z.string(),
  flexibility: z.string(),
  studentProfile: z.string(),
});

/**
 * ── systems ───────────────────────────────────────────────────────────────
 * Complete curriculum / qualification systems: DSE, IB, AP, A-Level, IGCSE.
 */
const systems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/systems' }),
  schema: z.object({
    /** Localised display name, e.g. "香港中学文凭 (DSE)". */
    title: z.string(),
    /** Abbreviation used in diagrams and chips. */
    shortName: z.string(),
    /** Full official English name. */
    fullName: z.string(),

    region: z.string(),
    /** Human-readable type label, e.g. "课程体系 / 资格". */
    type: z.string(),
    /** Machine-readable classification used for grouping. */
    typeKey: z.enum(['curriculum', 'exam', 'language', 'admission']),

    /** One-line description for cards and search results. */
    summary: z.string(),
    /** Opening paragraph on the detail page. */
    lede: z.string(),

    /** 01 / OVERVIEW */
    overview: z.array(z.string()).min(1),
    /** 02 / STRUCTURE — key facts table */
    structure: z.array(pairSchema).min(1),
    /** 03 / SUBJECTS */
    subjects: z.array(groupSchema).min(1),
    /** 04 / ASSESSMENT */
    assessment: z.array(z.string()).min(1),
    /** 05 / UNIVERSITY PATHWAYS — destination references */
    pathways: z.array(pathwayRefSchema).min(1),
    /** 06 / WHO IS IT FOR? */
    suitability: z.array(z.string()).min(1),
    /** 07 / COMPARE — link to the compare tool for these pairings */
    comparison: comparisonSchema,
    /** 08 / FAQ */
    faq: z.array(faqSchema).default([]),
    /** 09 / SOURCES */
    sources: z.array(sourceSchema).min(1),

    /** Trust metadata (brief, section 24). */
    updatedAt: z.coerce.date(),
    academicYear: z.string(),

    tags: z.array(z.string()).default([]),
    /** Slugs of related systems, used by "related content". */
    related: z.array(z.string()).default([]),
    /** Manual ordering in listings. */
    order: z.number().default(99),
    /** Highlighted on the home page. */
    featured: z.boolean().default(false),
  }),
});

/**
 * ── exams ─────────────────────────────────────────────────────────────────
 * Assessment instruments: SAT, ACT, IELTS, TOEFL. Deliberately modelled
 * separately from `systems` so the two can never be conflated.
 */
const exams = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exams' }),
  schema: z.object({
    title: z.string(),
    shortName: z.string(),
    fullName: z.string(),

    region: z.string(),
    type: z.string(),
    /** Standardised admissions test vs language proficiency test. */
    family: z.enum(['standardised', 'language']),

    summary: z.string(),
    lede: z.string(),

    overview: z.array(z.string()).min(1),
    /** Test structure / sections. */
    structure: z.array(pairSchema).min(1),
    /** Content coverage grouped by area. */
    content: z.array(groupSchema).min(1),
    /** How it is marked, scored and reported. */
    scoring: z.array(z.string()).min(1),
    /** Who accepts / uses the result. */
    recognisedBy: z.array(z.string()).min(1),
    /** Who should consider taking it. */
    suitability: z.array(z.string()).min(1),
    faq: z.array(faqSchema).default([]),
    sources: z.array(sourceSchema).min(1),

    updatedAt: z.coerce.date(),
    academicYear: z.string(),

    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    order: z.number().default(99),
    featured: z.boolean().default(false),
  }),
});

/**
 * ── guides ────────────────────────────────────────────────────────────────
 * Long-form editorial articles. Body content is Markdown, rendered by
 * `editorial-prose` (see global.css).
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** Sub-heading shown under the title. */
    lede: z.string(),
    /** Card / search-result description. */
    summary: z.string(),
    category: z.enum([
      'guides',
      'comparison',
      'admissions',
      'curriculum',
      'strategy',
      'universities',
    ]),
    /** Optional label above the title, e.g. "SYSTEMS × COMPARISON". */
    kicker: z.string().optional(),
    /** Cross-referenced system slugs, rendered as "DSE × IB". */
    systems: z.array(z.string()).default([]),

    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    /** Pre-computed so listings never need to parse the body. */
    readingMinutes: z.number().min(1),

    /** Which generated visual the article hero should use. */
    heroVariant: z.enum(['network', 'chain', 'grid', 'orbit']).default('network'),
    /** Optional real image; the design system does not require one. */
    coverImage: z.string().optional(),

    tags: z.array(z.string()).default([]),
    /** Slugs of related guides. */
    related: z.array(z.string()).default([]),
    sources: z.array(sourceSchema).default([]),
    region: z.string().optional(),
    academicYear: z.string().optional(),

    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { systems, exams, guides };
