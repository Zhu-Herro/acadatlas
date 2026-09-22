/**
 * ─────────────────────────────────────────────────────────────────────────────
 * UNIVERSITY DESTINATIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * Referenced from system frontmatter by `destination` key. This keeps
 * translated place names out of content files and lets the pathway diagram,
 * the /pathways page and the system detail pages share one definition.
 *
 * IMPORTANT (brief, section 9 & 24): this data expresses ROUTE RELATIONSHIPS
 * only. It makes no claim about admissions requirements, quotas or policies.
 */

import type { Locale } from '@/i18n/ui';

export interface PathwayDestination {
  /** Stable key used in frontmatter. */
  id: string;
  name: Record<Locale, string>;
  /** Broad geographic grouping used for the diagram layout. */
  group: Record<Locale, string>;
  /** One-line orientation note — kept general on purpose. */
  note: Record<Locale, string>;
  /** System slugs commonly associated with this destination. */
  systems: string[];
  order: number;
}

export const pathways: PathwayDestination[] = [
  {
    id: 'hong-kong',
    name: { zh: '中国香港', en: 'Hong Kong' },
    group: { zh: '东亚', en: 'East Asia' },
    note: {
      zh: '本地与国际课程体系并存的升学目的地，本地大学主要通过统一招生系统录取本地学生。',
      en: 'A destination where local and international curricula coexist; local universities admit local students mainly through a centralised system.',
    },
    systems: ['dse', 'ib', 'a-level', 'igcse', 'ap'],
    order: 1,
  },
  {
    id: 'mainland-china',
    name: { zh: '中国内地', en: 'Mainland China' },
    group: { zh: '东亚', en: 'East Asia' },
    note: {
      zh: '高考体系与各类国际课程并存。持有国际课程成绩的学生通常走独立申请或合作办学路径。',
      en: 'The national gaokao system operates alongside international curricula; students holding international qualifications usually apply through separate routes or joint programmes.',
    },
    systems: ['dse', 'ib', 'a-level', 'ap'],
    order: 2,
  },
  {
    id: 'united-kingdom',
    name: { zh: '英国', en: 'United Kingdom' },
    group: { zh: '欧洲', en: 'Europe' },
    note: {
      zh: '以 A-Level 为传统主要路径，同时接受 IB、DSE 等体系的申请，本科申请通过统一平台提交。',
      en: 'Traditionally centred on A-Level, while also accepting IB, DSE and other qualifications; undergraduate applications are submitted through a centralised platform.',
    },
    systems: ['a-level', 'ib', 'dse', 'igcse'],
    order: 3,
  },
  {
    id: 'united-states',
    name: { zh: '美国', en: 'United States' },
    group: { zh: '北美', en: 'North America' },
    note: {
      zh: '综合评估型录取，重视高中课程难度与标准化考试，AP 与 IB 常见于申请背景中。',
      en: 'Holistic admissions that weigh high-school course rigour alongside standardised testing; AP and IB are common in applicant profiles.',
    },
    systems: ['ap', 'ib', 'a-level', 'dse'],
    order: 4,
  },
  {
    id: 'canada',
    name: { zh: '加拿大', en: 'Canada' },
    group: { zh: '北美', en: 'North America' },
    note: {
      zh: '多数大学以高中成绩为主要依据，对不同国际课程体系均设有对应录取要求。',
      en: 'Most universities base admission primarily on high-school results, with published requirements for each international curriculum.',
    },
    systems: ['ap', 'ib', 'a-level', 'dse', 'igcse'],
    order: 5,
  },
  {
    id: 'australia',
    name: { zh: '澳大利亚', en: 'Australia' },
    group: { zh: '大洋洲', en: 'Oceania' },
    note: {
      zh: '对多种国际课程设有换算标准，常见通过官方换算排名进行录取评估。',
      en: 'Operates published conversion scales for several international qualifications, often used to rank applicants.',
    },
    systems: ['a-level', 'ib', 'dse', 'igcse'],
    order: 6,
  },
  {
    id: 'singapore',
    name: { zh: '新加坡', en: 'Singapore' },
    group: { zh: '东南亚', en: 'Southeast Asia' },
    note: {
      zh: '本地与国际课程并行，大学录取竞争激烈，通常对国际资格有明确的分档要求。',
      en: 'Local and international curricula run in parallel; university admission is competitive and typically publishes explicit band requirements for international qualifications.',
    },
    systems: ['a-level', 'ib', 'dse', 'ap'],
    order: 7,
  },
];

export const pathwaysById = new Map(pathways.map((pathway) => [pathway.id, pathway]));

export function getPathway(id: string): PathwayDestination | undefined {
  return pathwaysById.get(id);
}

/** Anchor used to deep-link a system page to a destination on /pathways. */
export function pathwayAnchor(id: string): string {
  return `/pathways#${id}`;
}
