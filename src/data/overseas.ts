/**
 * ─────────────────────────────────────────────────────────────────────────────
 * OVERSEAS ADMISSION MODELS
 * ─────────────────────────────────────────────────────────────────────────────
 * The counterpart to `chinaRoutes.ts`: the mainland side of the admissions
 * section is about official LEVEL standards, the overseas side is about
 * SELECTION MODELS.
 *
 * This file deliberately contains no cut-off scores. What it explains is the
 * mechanism — whether a destination allocates places through a centralised
 * platform in choice order, reviews applicants holistically, or ranks them on a
 * published conversion scale. That distinction is what actually determines how
 * a family should plan, and unlike scores it does not expire.
 *
 * Scores, once verified institution by institution, belong in
 * `src/data/requirements.ts`.
 */

import type { RawSource } from '@/lib/sources';
import type { LocalizedText } from './scales';

export interface OverseasDestination {
  id: string;
  name: LocalizedText;
  /** Broad geographic grouping, used for layout grouping. */
  group: LocalizedText;
  /** How places are actually allocated. */
  selectionModel: LocalizedText;
  /** What the process weights most heavily. */
  focus: LocalizedText;
  /** The shape of the calendar an applicant has to plan around. */
  timing: LocalizedText;
  /** Education systems most commonly used to apply. */
  systems: string[];
  sources: RawSource[];
  academicYear: string;
  verifiedAt: string;
}

export const overseasDestinations: OverseasDestination[] = [
  {
    id: 'hong-kong',
    name: { zh: '中国香港', en: 'Hong Kong' },
    group: { zh: '东亚', en: 'East Asia' },
    selectionModel: {
      zh: '本地学生主要通过大学联合招生办法（JUPAS）统一申请，按志愿顺序与成绩进行分配；各院校与课程另行公布计分方式与科目要求。',
      en: 'Local students apply mainly through the centralised JUPAS platform, with allocation driven by choice order and results; institutions and programmes publish their own scoring methods and subject requirements.',
    },
    focus: {
      zh: '文凭试成绩为核心，部分课程对指定选修科目有明确等级要求，并可能设面试或额外评核。',
      en: 'DSE results are central; some programmes set explicit level requirements for nominated electives and may include interviews or additional assessment.',
    },
    timing: {
      zh: '申请在文凭试放榜前提交，放榜后设有改选窗口，录取结果在放榜后分阶段公布。',
      en: 'Applications are submitted before results are released, with a choice-adjustment window afterwards and offers released in stages.',
    },
    systems: ['dse', 'ib', 'a-level', 'igcse'],
    sources: [
      { body: 'jupas', note: '本地统一招生办法与申请流程的官方来源。' },
      { body: 'edb', note: '香港教育体系的官方说明。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    id: 'united-kingdom',
    name: { zh: '英国', en: 'United Kingdom' },
    group: { zh: '欧洲', en: 'Europe' },
    selectionModel: {
      zh: '本科通过 UCAS 统一平台申请，有固定的志愿数量上限；院校通常先发出条件式录取（conditional offer），最终以成绩是否达标决定。',
      en: 'Undergraduate applications go through the centralised UCAS platform with a fixed number of choices; institutions typically issue conditional offers that are confirmed against final results.',
    },
    focus: {
      zh: '学术成绩与科目匹配度是核心，个人陈述用于说明学术兴趣；部分专业另设入学考试、作品集或面试。',
      en: 'Academic results and subject fit dominate, with the personal statement evidencing academic interest; some programmes add admissions tests, portfolios or interviews.',
    },
    timing: {
      zh: '申请早于成绩公布，因此预估成绩与选科组合的重要性高于其他目的地。',
      en: 'Applications close before results are released, which makes predicted grades and subject combination more consequential than in most destinations.',
    },
    systems: ['a-level', 'ib', 'dse', 'igcse'],
    sources: [
      { body: 'ucas', note: '本科申请流程、志愿规则与时间节点的官方来源。' },
      { body: 'cambridge', note: '国际版 A-Level 资格结构的官方说明。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    id: 'united-states',
    name: { zh: '美国', en: 'United States' },
    group: { zh: '北美', en: 'North America' },
    selectionModel: {
      zh: '以整体评估（holistic review）为主，多数院校使用通用申请平台，也有院校使用自有系统；标准化考试是否提交由各校政策决定。',
      en: 'Predominantly holistic review. Many institutions use a common application platform while others run their own, and whether standardised tests are submitted depends on each institution\u2019s policy.',
    },
    focus: {
      zh: '高中课程难度、成绩趋势、文书、推荐信与课外投入共同构成评估，单一考试分数不足以决定结果。',
      en: 'Course rigour, grade trajectory, essays, recommendations and sustained activities together form the assessment; a single test score does not determine the outcome.',
    },
    timing: {
      zh: '设提前批次与常规批次，标化考试通常需在高年级上学期前完成。',
      en: 'Early and regular rounds exist, and standardised testing generally needs to be completed by the autumn of the final year.',
    },
    systems: ['ap', 'ib', 'a-level', 'dse'],
    sources: [
      { body: 'commonApp', note: '美国本科通用申请平台的官方来源。' },
      { body: 'collegeBoard', note: '标准化考试与 AP 体系的官方来源。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    id: 'canada',
    name: { zh: '加拿大', en: 'Canada' },
    group: { zh: '北美', en: 'North America' },
    selectionModel: {
      zh: '以院校自有申请系统为主，部分省份设有省际平台；录取决定通常以学术成绩为主要依据。',
      en: 'Mostly institution-specific application systems, with provincial platforms in some provinces; admission decisions usually rest primarily on academic results.',
    },
    focus: {
      zh: '高中与预科阶段成绩、科目是否满足专业先修要求；部分专业另需补充申请材料。',
      en: 'Senior-secondary and pre-university results plus whether subjects satisfy programme prerequisites; some programmes require supplementary material.',
    },
    timing: {
      zh: '申请分轮次开放，录取常采用滚动方式，较早提交通常更有利。',
      en: 'Applications open in rounds and admission is often rolling, so earlier submission generally helps.',
    },
    systems: ['ap', 'ib', 'a-level', 'dse', 'igcse'],
    sources: [
      { body: 'educanada', note: '加拿大政府官方留学门户，用于核对院校与申请路径。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    id: 'australia',
    name: { zh: '澳大利亚', en: 'Australia' },
    group: { zh: '大洋洲', en: 'Oceania' },
    selectionModel: {
      zh: '以院校自有系统申请；多数院校针对国际资历公布公开换算表，将不同体系成绩换算为可比排名后录取。',
      en: 'Applications go directly to institutions. Most publish public conversion scales that translate international qualifications into a comparable rank used for selection.',
    },
    focus: {
      zh: '换算后的排名与专业先修科目，部分专业设额外要求（如作品集、健康类专业的额外面试）。',
      en: 'The converted rank plus programme prerequisites; some programmes add requirements such as portfolios or interviews for health-related fields.',
    },
    timing: {
      zh: '一般设有多个入学批次，申请周期相对宽松，可与文凭试或预科时间表并行规划。',
      en: 'Multiple intakes exist and the application cycle is comparatively relaxed, allowing planning alongside DSE or pre-university timetables.',
    },
    systems: ['a-level', 'ib', 'dse', 'igcse'],
    sources: [
      { body: 'studyAustralia', note: '澳大利亚政府官方留学门户，用于核对院校与入学要求。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    id: 'singapore',
    name: { zh: '新加坡', en: 'Singapore' },
    group: { zh: '东南亚', en: 'Southeast Asia' },
    selectionModel: {
      zh: '通过院校自有系统申请，院校通常公布明确的分档要求（按资历与等级区间设定门槛），竞争强度较高。',
      en: 'Applications go directly to institutions, which typically publish explicit band requirements by qualification and grade range. Competition is intense.',
    },
    focus: {
      zh: '成绩与科目要求的达标程度，部分专业设面试、入学考试或作品集。',
      en: 'Whether published grade and subject requirements are met, with interviews, admissions tests or portfolios for some programmes.',
    },
    timing: {
      zh: '申请窗口相对集中在每年固定时段，需与本国或国际考试时间表对齐。',
      en: 'Application windows are concentrated in fixed annual periods and must be aligned with national or international examination timetables.',
    },
    systems: ['a-level', 'ib', 'dse', 'ap'],
    sources: [
      { body: 'moeSingapore', note: '新加坡教育体系的官方来源。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
];

export const overseasById = new Map(overseasDestinations.map((item) => [item.id, item]));
