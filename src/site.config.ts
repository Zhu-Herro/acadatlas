/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL BRAND CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * `EDUNOVA` is the brand. Every brand string lives here and is never
 * hard-coded inside components or pages, so rebranding the platform is a
 * single-file change.
 *
 * Usage:
 *   import { site } from '@/site.config';
 *   site.name            // "EDUNOVA"
 *   site.tagline.en      // "Understand education. Make better choices."
 *   site.description.zh  // meta description (Chinese)
 */

import type { Locale } from '@/i18n/ui';

/** A string that exists in every supported locale. */
export type Localized = Record<Locale, string>;

export interface SourceLink {
  /** Human-readable label of the publishing body. */
  label: string;
  /** Canonical URL of the official document / organisation. */
  href: string;
  /** Optional short note about what the source supports. */
  note?: string;
}

export const site = {
  /** Short brand mark used in the header and footer. */
  name: 'EDUNOVA',

  /** Longer legal / descriptive name used in structured data and the footer. */
  legalName: {
    zh: 'EDUNOVA 国际教育信息平台',
    en: 'EDUNOVA International Education Information Platform',
  } satisfies Localized,

  /**
   * Production origin. MUST stay identical to `SITE` in astro.config.mjs —
   * it is used for canonical URLs, Open Graph and the sitemap.
   */
  url: 'https://acadatlas.netlify.app',

  /** Brand line. */
  tagline: {
    zh: '理解教育，做出更好的选择。',
    en: 'Understand education. Make better choices.',
  } satisfies Localized,

  /** Sub-headline used in the hero and as the default meta description. */
  description: {
    zh: '一个帮助你理解国际教育体系、课程结构、评估方式与升学路径的现代信息平台。',
    en: 'A modern information platform for navigating international education systems, pathways and opportunities.',
  } satisfies Localized,

  /**
   * Default social sharing image (1200×630 PNG).
   * Source of truth is `public/og-default.svg`; the PNG is exported from it
   * because Twitter/X and Facebook do not render SVG share images.
   */
  ogImage: '/og-default.png',

  /** Contact details — placeholders until real inboxes exist. */
  contact: {
    email: 'hello@edunova.example',
    wechat: 'EDUNOVA',
  },

  /** Launch year, used for the footer copyright line. */
  since: 2026,

  /**
   * Editorial trust statement — surfaced on every content page so readers know
   * the platform is an information layer, not an admissions authority.
   */
  editorialNote: {
    zh: '本站为信息整理与比较平台，内容基于官方机构公开资料整理，不替代任何官方招生文件。具体招生政策、分数要求与课程安排可能逐年调整，请以官方最新公告为准。',
    en: 'This is an information and comparison platform. Content is compiled from official public documentation and does not replace any official admissions document. Policies, score requirements and curricula change year by year — always confirm against the latest official announcement.',
  } satisfies Localized,
} as const;

/**
 * Official bodies referenced across the platform. Centralised so that a single
 * edit updates every citation and the structured-data graph.
 */
export const officialBodies: Record<string, SourceLink> = {
  hkeaa: {
    label: 'Hong Kong Examinations and Assessment Authority (HKEAA)',
    href: 'https://www.hkeaa.edu.hk/en/hkdse/',
  },
  edb: {
    label: 'Hong Kong Education Bureau (EDB)',
    href: 'https://www.edb.gov.hk/en/',
  },
  jupas: {
    label: 'Joint University Programmes Admissions System (JUPAS)',
    href: 'https://www.jupas.edu.hk/en/',
  },
  collegeBoard: {
    label: 'College Board — AP Central',
    href: 'https://apcentral.collegeboard.org/',
  },
  ibo: {
    label: 'International Baccalaureate Organization (IBO)',
    href: 'https://www.ibo.org/',
  },
  cambridge: {
    label: 'Cambridge Assessment International Education',
    href: 'https://www.cambridgeinternational.org/',
  },
  edexcel: {
    label: 'Pearson Edexcel',
    href: 'https://qualifications.pearson.com/',
  },
  ucas: {
    label: 'UCAS (UK universities admissions service)',
    href: 'https://www.ucas.com/',
  },
  ets: {
    label: 'ETS (TOEFL, SAT subject history)',
    href: 'https://www.ets.org/',
  },
  ielts: {
    label: 'IELTS (British Council / IDP / Cambridge)',
    href: 'https://ielts.org/',
  },
  commonApp: {
    label: 'Common App',
    href: 'https://www.commonapp.org/',
  },
  moe: {
    label: '中华人民共和国教育部 (Ministry of Education, PRC)',
    href: 'https://www.moe.gov.cn/',
  },
  cscse: {
    label: '中国留学服务中心 (CSCSE)',
    href: 'https://www.cscse.edu.cn/',
  },
};

export type Site = typeof site;
