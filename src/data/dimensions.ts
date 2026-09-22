/**
 * ─────────────────────────────────────────────────────────────────────────────
 * COMPARISON DIMENSIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * The nine canonical dimensions defined in the project brief (section 12).
 * `key` maps 1:1 onto the `comparison` object of every system entry, so adding
 * a dimension means adding a schema field plus one line here — nothing else.
 */

import type { UIKey } from '@/i18n/ui';

export const comparisonKeys = [
  'academicStructure',
  'assessment',
  'subjectChoice',
  'learningStyle',
  'examStyle',
  'universityPathways',
  'geographicReach',
  'flexibility',
  'studentProfile',
] as const;

export type ComparisonKey = (typeof comparisonKeys)[number];

export interface ComparisonDimension {
  key: ComparisonKey;
  labelKey: UIKey;
  /** Short explanation surfaced when the row is expanded. */
  noteKey: UIKey;
}

export const comparisonDimensions: ComparisonDimension[] = [
  {
    key: 'academicStructure',
    labelKey: 'dimension.academicStructure',
    noteKey: 'dimension.academicStructure',
  },
  { key: 'assessment', labelKey: 'dimension.assessment', noteKey: 'dimension.assessment' },
  {
    key: 'subjectChoice',
    labelKey: 'dimension.subjectChoice',
    noteKey: 'dimension.subjectChoice',
  },
  {
    key: 'learningStyle',
    labelKey: 'dimension.learningStyle',
    noteKey: 'dimension.learningStyle',
  },
  { key: 'examStyle', labelKey: 'dimension.examStyle', noteKey: 'dimension.examStyle' },
  {
    key: 'universityPathways',
    labelKey: 'dimension.universityPathways',
    noteKey: 'dimension.universityPathways',
  },
  {
    key: 'geographicReach',
    labelKey: 'dimension.geographicReach',
    noteKey: 'dimension.geographicReach',
  },
  { key: 'flexibility', labelKey: 'dimension.flexibility', noteKey: 'dimension.flexibility' },
  {
    key: 'studentProfile',
    labelKey: 'dimension.studentProfile',
    noteKey: 'dimension.studentProfile',
  },
];

/** Maximum number of systems comparable at once (brief, section 12). */
export const MAX_COMPARE = 4;
export const MIN_COMPARE = 2;
