/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ROUTE REGISTRY & SECTION MODEL
 * ─────────────────────────────────────────────────────────────────────────────
 * One place that defines:
 *
 *   1. every canonical path in the platform, and
 *   2. the five top-level SECTIONS the site is organised into, with their
 *      child modules.
 *
 * Why this exists: the first version of the site had a flat navigation where
 * "pathways", "mainland" and "requirements" sat beside "systems" as peers, even
 * though all three are children of one idea — 升学 / admissions. Editing links
 * across a dozen components to fix that is a symptom; the cause is that the
 * hierarchy lived in people's heads instead of in the code.
 *
 * Import `routes` for links and `sections` for navigation. Never hard-code a
 * path in a component again.
 *
 * URLs are locale-agnostic: `localizePath(routes.admissions, locale)` adds the
 * `/en` prefix where needed.
 */

import type { UIKey } from '@/i18n/ui';

/* ── 1. Canonical paths ─────────────────────────────────────────────────── */

export const routes = {
  home: '/',

  /* 01 — Education systems */
  systems: '/systems',
  system: (slug: string) => `/systems/${slug}`,
  compare: '/compare',

  /* 02 — Examinations & preparation */
  exams: '/exams',
  exam: (slug: string) => `/exams/${slug}`,
  /** 02.4 — the preparation sub-tree. Everything else in section 02 lives on
   *  the hub page as anchored sub-sections, so the reader sees the whole
   *  "what do I have to sit" picture in one scroll. */
  prep: '/exams/prep',
  prepArticle: (slug: string) => `/exams/prep/${slug}`,

  /* 03 — Admissions (one section, four modules) */
  admissions: '/admissions',
  pathways: '/admissions/pathways',
  mainland: '/admissions/mainland',
  overseas: '/admissions/overseas',
  requirements: '/admissions/requirements',

  /* 04 — Guides */
  guides: '/guides',
  guide: (slug: string) => `/guides/${slug}`,

  /* 05 — Resources */
  resources: '/resources',

  /* Secondary */
  about: '/about',
  contact: '/contact',
} as const;

/* ── 2. Section model ──────────────────────────────────────────────────── */

export interface SectionChild {
  key: UIKey;
  href: string;
  /** Short explanation shown on section hub pages. */
  noteKey?: UIKey;
  /** Marks a module that is planned but not yet built. */
  planned?: boolean;
}

export interface Section {
  id: string;
  /** Display order, e.g. `03`. */
  number: string;
  key: UIKey;
  href: string;
  children: SectionChild[];
}

/**
 * The information architecture of the platform, in reading order:
 *
 *   01 what the systems are  →  02 how they are examined  →
 *   03 where they lead  →  04 long-form reading  →  05 sources & material
 *
 * Every child path is a real route today unless flagged `planned`.
 */
export const sections: Section[] = [
  {
    id: 'systems',
    number: '01',
    key: 'nav.systems',
    href: routes.systems,
    children: [
      { key: 'nav.systems', href: routes.systems, noteKey: 'sectionNote.systemsOverview' },
      { key: 'nav.compare', href: routes.compare, noteKey: 'sectionNote.compare' },
    ],
  },
  {
    id: 'exams',
    number: '02',
    key: 'nav.exams',
    href: routes.exams,
    children: [
      {
        key: 'nav.exams',
        href: routes.exams,
        noteKey: 'sectionNote.examsOverview',
      },
      {
        key: 'nav.prep',
        href: routes.prep,
        noteKey: 'sectionNote.prep',
      },
    ],
  },
  {
    id: 'admissions',
    number: '03',
    key: 'nav.admissions',
    href: routes.admissions,
    children: [
      { key: 'nav.pathways', href: routes.pathways, noteKey: 'sectionNote.pathways' },
      { key: 'nav.china', href: routes.mainland, noteKey: 'sectionNote.mainland' },
      { key: 'nav.overseas', href: routes.overseas, noteKey: 'sectionNote.overseas' },
      { key: 'nav.requirements', href: routes.requirements, noteKey: 'sectionNote.requirements' },
    ],
  },
  {
    id: 'guides',
    number: '04',
    key: 'nav.guides',
    href: routes.guides,
    children: [{ key: 'nav.guides', href: routes.guides, noteKey: 'sectionNote.guides' }],
  },
  {
    id: 'resources',
    number: '05',
    key: 'nav.resources',
    href: routes.resources,
    children: [{ key: 'nav.resources', href: routes.resources, noteKey: 'sectionNote.resources' }],
  },
];

/** Header navigation: every top-level section, in order. */
export const primaryNav = sections.map((section) => ({
  key: section.key,
  href: section.href,
}));

/** Reachable from the footer and the mobile drawer only. */
export const secondaryNav: { key: UIKey; href: string }[] = [
  { key: 'nav.about', href: routes.about },
  { key: 'nav.contact', href: routes.contact },
];

/**
 * Finds the section a path belongs to — used by SectionNav and by the header to
 * mark the active top-level item. Matching is longest-prefix so that
 * `/admissions/mainland` resolves to the `admissions` section rather than to a
 * hypothetical `/admissions` prefix collision.
 */
export function findSection(pathname: string): Section | undefined {
  const matches = sections.filter(
    (section) => pathname === section.href || pathname.startsWith(`${section.href}/`),
  );

  // `/admissions/*` must win over nothing else, but `/` matches everything.
  return matches.sort((a, b) => b.href.length - a.href.length)[0];
}

/** Children of the section a path belongs to, excluding the section root. */
export function sectionChildren(pathname: string): SectionChild[] {
  return findSection(pathname)?.children ?? [];
}
