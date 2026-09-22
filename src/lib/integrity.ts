/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EDITORIAL INTEGRITY GUARD
 * ─────────────────────────────────────────────────────────────────────────────
 * The platform publishes education information that families may act on. The
 * brief's rule (section 24) is absolute: no time-sensitive claim without a
 * source. This module turns that rule into a BUILD-TIME constraint rather than
 * a good intention.
 *
 * Hard failures (the build stops):
 *   • a requirement marked `verified` whose source cannot be resolved
 *   • any requirement missing an academic year or a source
 *   • a grade scale / policy / route entry with no source, no verification date
 *   • a source whose href is not an absolute URL
 *
 * Soft findings (reported, build continues):
 *   • rows still marked `pending`, so the gap is always visible in the report
 *
 * Run automatically at build time by `src/pages/integrity.json.ts`.
 */

import { getCollection } from 'astro:content';
import { chinaRoutes } from '@/data/chinaRoutes';
import { examCombinations } from '@/data/examCombinations';
import { policyEntries } from '@/data/policies';
import { requirements } from '@/data/requirements';
import { gradeScales } from '@/data/scales';
import { routes } from '@/data/routes';
import { resolveSource, type RawSource } from '@/lib/sources';

export interface IntegrityIssue {
  level: 'error' | 'warning';
  where: string;
  message: string;
}

function checkSource(where: string, source: RawSource | undefined, issues: IntegrityIssue[]): void {
  if (!source) {
    issues.push({ level: 'error', where, message: 'Missing source.' });
    return;
  }

  const resolved = resolveSource(source);

  if (!resolved) {
    issues.push({ level: 'error', where, message: 'Source could not be resolved.' });
    return;
  }

  if (!/^https?:\/\//.test(resolved.href)) {
    issues.push({
      level: 'error',
      where,
      message: `Source href is not an absolute URL: "${resolved.href}".`,
    });
  }
}

/** Route segments under `/exams/` that are reserved by the section layout. */
const RESERVED_EXAM_SEGMENTS = ['prep'];

export async function runIntegrityCheck(): Promise<IntegrityIssue[]> {
  const issues: IntegrityIssue[] = [];

  /* ── Reserved route collisions ─────────────────────────────────────── */
  // `/exams/prep` is a real page. An exam whose slug is `prep` would silently
  // shadow it, so the build refuses rather than shipping an ambiguous URL.
  const examEntries = await getCollection('exams');
  for (const entry of examEntries) {
    const slug = entry.id.split('/').slice(1).join('/');
    if (RESERVED_EXAM_SEGMENTS.includes(slug)) {
      issues.push({
        level: 'error',
        where: `exams/${entry.id}`,
        message: `Slug "${slug}" collides with the reserved route ${routes.prep}.`,
      });
    }
  }

  /* ── Requirements: the highest-stakes data on the platform ─────────── */
  const seenIds = new Set<string>();

  for (const entry of requirements) {
    const where = `requirements/${entry.id}`;

    if (seenIds.has(entry.id)) {
      issues.push({ level: 'error', where, message: 'Duplicate requirement id.' });
    }
    seenIds.add(entry.id);

    if (!entry.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }

    checkSource(where, entry.source, issues);

    if (entry.status === 'verified' && !entry.verifiedAt) {
      issues.push({
        level: 'error',
        where,
        message: 'A verified requirement must record when it was verified.',
      });
    }

    if (entry.status === 'pending') {
      issues.push({
        level: 'warning',
        where,
        message: 'Pending: known to exist, not yet retrieved. Must not be displayed as a number.',
      });
    }
  }

  /* ── Grade scales ──────────────────────────────────────────────────── */
  for (const scale of gradeScales) {
    const where = `scales/${scale.slug}`;

    if (scale.sources.length === 0) {
      issues.push({ level: 'error', where, message: 'A grade scale must cite at least one source.' });
    }

    for (const [index, source] of scale.sources.entries()) {
      checkSource(`${where}#source${index + 1}`, source, issues);
    }

    if (!scale.verifiedAt) {
      issues.push({ level: 'error', where, message: 'Missing verifiedAt.' });
    }

    if (!scale.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }
  }

  /* ── Policy facts ──────────────────────────────────────────────────── */
  for (const entry of policyEntries) {
    const where = `policies/${entry.slug}`;

    if (entry.sources.length === 0) {
      issues.push({ level: 'error', where, message: 'Policy facts must cite at least one source.' });
    }

    for (const [index, source] of entry.sources.entries()) {
      checkSource(`${where}#source${index + 1}`, source, issues);
    }

    if (!entry.verifiedAt) {
      issues.push({ level: 'error', where, message: 'Missing verifiedAt.' });
    }

    if (!entry.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }
  }

  /* ── Mainland China routes ─────────────────────────────────────────── */
  for (const route of chinaRoutes) {
    const where = `chinaRoutes/${route.id}`;

    if (route.sources.length === 0) {
      issues.push({ level: 'error', where, message: 'An admission route must cite its sources.' });
    }

    for (const [index, source] of route.sources.entries()) {
      checkSource(`${where}#source${index + 1}`, source, issues);
    }

    if (!route.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }
  }

  /* ── Exam combinations ─────────────────────────────────────────────── */
  for (const combination of examCombinations) {
    const where = `examCombinations/${combination.system}`;

    if (combination.sources.length === 0) {
      issues.push({
        level: 'error',
        where,
        message: 'A combination row must cite the sources behind its structural claims.',
      });
    }

    for (const [index, source] of combination.sources.entries()) {
      checkSource(`${where}#source${index + 1}`, source, issues);
    }

    if (!combination.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }
  }

  /* ── Prep content: the editorial guardrail ─────────────────────────── */
  const prepEntries = await getCollection('prep');

  for (const entry of prepEntries) {
    const where = `prep/${entry.id}`;
    const data = entry.data;

    // 1. Practical advice must declare what it is based on.
    if (!data.evidenceType) {
      issues.push({
        level: 'error',
        where,
        message: 'Preparation content must declare an evidenceType.',
      });
    }

    // 2. Official and structural claims must be traceable.
    if (data.evidenceType !== 'editorial' && data.sources.length === 0) {
      issues.push({
        level: 'error',
        where,
        message: `evidenceType "${data.evidenceType}" requires at least one source. Use evidenceType "editorial" instead if the content is editorial judgement.`,
      });
    }

    // 3. Paid content may never masquerade as official.
    if (data.sponsored && data.evidenceType === 'official') {
      issues.push({
        level: 'error',
        where,
        message:
          'Sponsored preparation content cannot claim evidenceType "official" — a paid piece must not read as an official position.',
      });
    }

    // 4. A partnership must be named, otherwise the disclosure means nothing.
    if (data.sponsored && !data.sponsorName) {
      issues.push({
        level: 'error',
        where,
        message: 'Sponsored content must name the partner (sponsorName).',
      });
    }

    // 5. Time-sensitive practice advice needs a year stamp.
    if (!data.academicYear) {
      issues.push({ level: 'error', where, message: 'Missing academicYear.' });
    }

    for (const [index, source] of data.sources.entries()) {
      checkSource(`${where}#source${index + 1}`, source, issues);
    }
  }

  return issues;
}

export interface IntegrityReport {
  ok: boolean;
  generatedAt: string;
  counts: {
    requirements: number;
    verified: number;
    pending: number;
    gradeScales: number;
    policyEntries: number;
    chinaRoutes: number;
    prepEntries: number;
  };
  issues: IntegrityIssue[];
}

export async function buildIntegrityReport(): Promise<IntegrityReport> {
  const issues = await runIntegrityCheck();
  const errors = issues.filter((issue) => issue.level === 'error');

  return {
    ok: errors.length === 0,
    generatedAt: new Date().toISOString(),
    counts: {
      requirements: requirements.length,
      verified: requirements.filter((entry) => entry.status === 'verified').length,
      pending: requirements.filter((entry) => entry.status === 'pending').length,
      gradeScales: gradeScales.length,
      policyEntries: policyEntries.length,
      chinaRoutes: chinaRoutes.length,
      prepEntries: (await getCollection('prep')).length,
    },
    issues,
  };
}

/**
 * Throws if any hard integrity rule is violated. Called by the build-time
 * report endpoint so a fabricated or unsourced claim can never ship.
 */
export async function assertIntegrity(): Promise<IntegrityReport> {
  const report = await buildIntegrityReport();

  if (!report.ok) {
    const details = report.issues
      .filter((issue) => issue.level === 'error')
      .map((issue) => `  • [${issue.where}] ${issue.message}`)
      .join('\n');

    throw new Error(
      `Content integrity check failed — ${report.issues.filter((i) => i.level === 'error').length} error(s):\n${details}`,
    );
  }

  return report;
}
