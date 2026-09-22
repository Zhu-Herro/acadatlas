/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ADMISSION REQUIREMENTS  (录取要求数据底座)
 * ─────────────────────────────────────────────────────────────────────────────
 * The foundation the project brief (sections 9 & 24) demands: a place where
 * "what score gets in" can be published ONLY with a verifiable source, an
 * applicable academic year, and a status the reader can trust.
 *
 * Two statuses, enforced at build time by `src/lib/integrity.ts`:
 *
 *   verified — the value was read from an official primary source and the
 *              source is attached. A build FAILS if this is claimed without one.
 *   pending  — we know the number exists and exactly where it lives, but it has
 *              not been retrieved yet. Shown as 待核验 / Pending — never as a
 *              number. This is the honest alternative to guessing.
 *
 * Adding a row is a content task, not a code task: append an object, run
 * `npm run build`, and the guard will refuse to publish an unsourced claim.
 */

import type { RawSource } from '@/lib/sources';
import type { LocalizedText } from './scales';

export type RequirementStatus = 'verified' | 'pending';

export type RequirementRoute = 'mainland' | 'jupas' | 'uk' | 'us' | 'other';

export interface RequirementEntry {
  id: string;
  /** Content-collection slug this applies to, or `any`. */
  system: string;
  route: RequirementRoute;
  /** Who sets the requirement: a government body, an admission system, or one institution. */
  scope: LocalizedText;
  institution: LocalizedText;
  programme: LocalizedText;
  requirement: LocalizedText;
  note?: LocalizedText;
  academicYear: string;
  status: RequirementStatus;
  /** Mandatory when status is `verified`. */
  source: RawSource;
  verifiedAt?: string;
}

/**
 * The batch retrieved and verified on 2026-09-21 / 2026-09-22 from:
 *   教育部《2026年内地高校招收香港中学文凭考试学生办法》
 *   广东省教育考试院《联招〔2026〕20号》
 *   上海财经大学 2026 年香港中学文凭考试学生招生简章
 */
export const requirements: RequirementEntry[] = [
  /* ── Mainland China · national minimum standards (VERIFIED) ─────────── */
  {
    id: 'moe-minimum-general',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '全国统一最低标准', en: 'National minimum standard' },
    institution: { zh: '教育部（适用于内地各招生高校）', en: 'Ministry of Education (applies to all participating institutions)' },
    programme: { zh: '普通类专业', en: 'General programmes' },
    requirement: {
      zh: '核心科目等级组合「3、3、2、A」——中国语文 ≥ 第 3 级、英国语文 ≥ 第 3 级、数学 ≥ 第 2 级、公民科达标。',
      en: 'Core-subject level combination "3, 3, 2, A" — Chinese Language at Level 3+, English Language at Level 3+, Mathematics at Level 2+, Citizenship attained.',
    },
    note: {
      zh: '这是「具备投档资格」的底线，不是录取线。高校可另行指定一至两门选修科目并明确所需等级。',
      en: 'This is the eligibility threshold for dispatch, not the admission threshold. Institutions may additionally nominate one or two electives with a required level.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'moeDseScheme', note: '《2026年内地高校招收香港中学文凭考试学生办法》原文。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'moe-principal-nomination',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '全国统一最低标准', en: 'National minimum standard' },
    institution: { zh: '教育部（校长推荐计划）', en: 'Ministry of Education (Principal\u2019s Nomination Scheme)' },
    programme: { zh: '普通类专业', en: 'General programmes' },
    requirement: {
      zh: '公民科达标，其余三门核心科目分数之和 ≥ 8 分，且任何一门科目不得低于 2 分。名额每校 8 名。',
      en: 'Citizenship attained; the other three core subjects totalling 8 points or more; no single subject below 2. Each school has 8 places.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'moeDseScheme', note: '校长推荐计划条款与名额规定。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'moe-arts-sport',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '全国统一最低标准', en: 'National minimum standard' },
    institution: { zh: '教育部', en: 'Ministry of Education' },
    programme: { zh: '艺术类、体育类专业', en: 'Arts and physical education programmes' },
    requirement: { zh: '核心科目等级组合「2、2、1、A」。', en: 'Core-subject level combination "2, 2, 1, A".' },
    note: {
      zh: '另需留意高校安排的面试或专业考试时间与地点。',
      en: 'Institutions may also require an interview or practical test; check its timing and venue.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'moeDseScheme', note: '艺术体育类专业的最低录取标准条款。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'moe-disability-sensory',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '全国统一最低标准', en: 'National minimum standard' },
    institution: { zh: '教育部', en: 'Ministry of Education' },
    programme: { zh: '视障、听障及轻度孤独症类残障考生', en: 'Applicants with visual, hearing or mild autism-related disabilities' },
    requirement: {
      zh: '公民科达标，且中国语文、英国语文、数学三门核心科目总分 ≥ 4 分。',
      en: 'Citizenship attained, with the three core subjects (Chinese, English, Mathematics) totalling 4 points or more.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'moeDseScheme', note: '残障考生最低录取标准的专门条款。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'moe-disability-limb',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '全国统一最低标准', en: 'National minimum standard' },
    institution: { zh: '教育部', en: 'Ministry of Education' },
    programme: { zh: '残肢类残障考生', en: 'Applicants with limb-related disabilities' },
    requirement: {
      zh: '公民科达标，且三门核心科目总分 ≥ 7 分。',
      en: 'Citizenship attained, with the three core subjects totalling 7 points or more.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'moeDseScheme', note: '残障考生最低录取标准的专门条款。' },
    verifiedAt: '2026-09-22',
  },

  /* ── Mainland China · joint enrolment examination (VERIFIED) ────────── */
  {
    id: 'joint-enrolment-2026-undergraduate',
    system: 'any',
    route: 'mainland',
    scope: { zh: '全国联招 · 本科批次', en: 'Joint enrolment · undergraduate' },
    institution: { zh: '联招办（经广东省教育考试院公告）', en: 'Joint Admissions Office (published via Guangdong EEA)' },
    programme: { zh: '普通类院校（专业）', en: 'General institutions and programmes' },
    requirement: { zh: '文史类 430 分 · 理工类 445 分。', en: 'Humanities 430 · Sciences 445.' },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'gdEea', note: '联招〔2026〕20 号《关于公布2026年普通高等学校联合招收华侨港澳台学生录取最低分数线的通知》。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'joint-enrolment-2026-highline',
    system: 'any',
    route: 'mainland',
    scope: { zh: '全国联招 · 本科批次高分线', en: 'Joint enrolment · undergraduate high-score line' },
    institution: { zh: '部分院校（名单见全国联招管理系统）', en: 'Selected institutions (list in the joint enrolment system)' },
    programme: { zh: '普通类院校（专业）', en: 'General institutions and programmes' },
    requirement: { zh: '文史类 515 分 · 理工类 535 分。', en: 'Humanities 515 · Sciences 535.' },
    note: {
      zh: '执行高分线的院校名单由官方系统公布，本页不列出名单以避免过期。',
      en: 'The list of institutions applying this line is published in the official system; we do not reproduce it here to avoid stale information.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'gdEea', note: '联招〔2026〕20 号公告中关于高分线及适用范围的说明。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'joint-enrolment-2026-arts-sport',
    system: 'any',
    route: 'mainland',
    scope: { zh: '全国联招 · 本科批次', en: 'Joint enrolment · undergraduate' },
    institution: { zh: '联招办', en: 'Joint Admissions Office' },
    programme: { zh: '艺术类、体育类院校（专业）', en: 'Arts and sport institutions and programmes' },
    requirement: { zh: '文史类 330 分 · 理工类 345 分。', en: 'Humanities 330 · Sciences 345.' },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'gdEea', note: '联招〔2026〕20 号公告。' },
    verifiedAt: '2026-09-22',
  },
  {
    id: 'joint-enrolment-2026-preparatory',
    system: 'any',
    route: 'mainland',
    scope: { zh: '全国联招 · 预科批次', en: 'Joint enrolment · preparatory year' },
    institution: { zh: '预科院校；暨南大学单独划线', en: 'Preparatory institutions; Jinan University sets its own line' },
    programme: { zh: '预科', en: 'Preparatory year' },
    requirement: {
      zh: '文史类 410 分 · 理工类 425 分。暨南大学：文史类 495 分 · 理工类 515 分。',
      en: 'Humanities 410 · Sciences 425. Jinan University: Humanities 495 · Sciences 515.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: { body: 'gdEea', note: '联招〔2026〕20 号公告中的预科批次与暨南大学单独划线。' },
    verifiedAt: '2026-09-22',
  },

  /* ── Institution-level example (VERIFIED) ──────────────────────────── */
  {
    id: 'sufe-2026-dse',
    system: 'dse',
    route: 'mainland',
    scope: { zh: '单所院校要求', en: 'Single-institution requirement' },
    institution: { zh: '上海财经大学', en: 'Shanghai University of Finance and Economics' },
    programme: { zh: '2026 年文凭试学生招生（全部专业）', en: '2026 DSE admissions (all programmes)' },
    requirement: {
      zh: '符合「3、3、2、A」最低标准，且总分不低于 11 分；校长推荐计划考生在满足总分与公民科达标要求下，每科不低于 2 分。',
      en: 'Meets the "3, 3, 2, A" minimum standard with a total of at least 11 points; under the Principal\u2019s Nomination Scheme, each subject must reach at least 2.',
    },
    note: {
      zh: '这是「院校附加要求高于全国最低标准」的实例，说明资格线不等于录取线。以该校当年发布的招生简章为准。',
      en: 'An example of an institution setting a requirement above the national minimum — the eligibility line is not the admission line. The institution\u2019s current-year charter is authoritative.',
    },
    academicYear: '2026/27',
    status: 'verified',
    source: {
      label: '上海财经大学本科招生网 — 2026年香港中学文凭考试学生招生简章',
      href: 'https://zs.sufe.edu.cn/fc/33/c3336a261171/page.htm',
      note: '院校官网发布的招生简章。',
    },
    verifiedAt: '2026-09-22',
  },

  /* ── Pending: known to exist, not yet retrieved ─────────────────────── */
  {
    id: 'pending-jupas-cutoffs',
    system: 'dse',
    route: 'jupas',
    scope: { zh: '待核验 · 本地院校收生分数', en: 'Pending · local institutional admission scores' },
    institution: { zh: '香港各大学（经 JUPAS 公布）', en: 'Hong Kong universities (published through JUPAS)' },
    programme: { zh: '按课程逐一公布', en: 'Published programme by programme' },
    requirement: {
      zh: '待核验。本地院校的收生分数以课程为单位公布，包含计分方式、科目加权与往年收生区间，需按院校与课程逐条核对后录入。',
      en: 'Pending. Local admission scores are published per programme and include the scoring formula, subject weightings and historical ranges. Each must be checked and entered individually.',
    },
    academicYear: '2026/27',
    status: 'pending',
    source: { body: 'jupas', note: 'JUPAS 官方收生数据与各院校公布的课程收生资料。' },
  },
  {
    id: 'pending-ucas-tariff',
    system: 'any',
    route: 'uk',
    scope: { zh: '待核验 · 英国资历换算', en: 'Pending · UK qualification tariff' },
    institution: { zh: 'UCAS 及各英国院校', en: 'UCAS and individual UK institutions' },
    programme: { zh: '按课程公布入学要求', en: 'Entry requirements published per programme' },
    requirement: {
      zh: '待核验。英国院校对 DSE、IB、A-Level 的换算与科目要求按课程公布，需逐校核对后录入。',
      en: 'Pending. UK institutions publish conversion and subject requirements per programme for DSE, IB and A-Level; each needs individual verification.',
    },
    academicYear: '2026/27',
    status: 'pending',
    source: { body: 'ucas', note: 'UCAS 与院校官网的入学要求页面。' },
  },
  {
    id: 'pending-language-requirements',
    system: 'any',
    route: 'other',
    scope: { zh: '待核验 · 语言成绩门槛', en: 'Pending · language score thresholds' },
    institution: { zh: '各院校（英联邦与美国方向）', en: 'Institutions in Commonwealth and US systems' },
    programme: { zh: '按课程公布总分与单项要求', en: 'Published per programme, overall and per section' },
    requirement: {
      zh: '待核验。雅思与托福的总分／单项门槛按院校与课程分别公布，且逐年调整，需逐条核对后录入。',
      en: 'Pending. IELTS and TOEFL thresholds, both overall and per section, are published per institution and programme and change annually; each needs individual verification.',
    },
    academicYear: '2026/27',
    status: 'pending',
    source: { body: 'ielts', note: '院校官网公布的语言要求；雅思官方题库与评分说明为背景资料。' },
  },
];

export const verifiedRequirements = requirements.filter((entry) => entry.status === 'verified');
export const pendingRequirements = requirements.filter((entry) => entry.status === 'pending');

export function requirementsForSystem(slug: string): RequirementEntry[] {
  return requirements.filter((entry) => entry.system === slug || entry.system === 'any');
}

/** Route labels used by the /requirements hub filters. */
export const requirementRoutes: { id: RequirementRoute; label: LocalizedText }[] = [
  { id: 'mainland', label: { zh: '中国内地', en: 'Mainland China' } },
  { id: 'jupas', label: { zh: '香港（JUPAS）', en: 'Hong Kong (JUPAS)' } },
  { id: 'uk', label: { zh: '英国', en: 'United Kingdom' } },
  { id: 'us', label: { zh: '美国', en: 'United States' } },
  { id: 'other', label: { zh: '其他 / 通用', en: 'Other / general' } },
];

export function routeLabel(route: RequirementRoute): LocalizedText {
  return requirementRoutes.find((item) => item.id === route)?.label ?? { zh: route, en: route };
}
