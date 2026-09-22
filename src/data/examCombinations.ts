/**
 * ─────────────────────────────────────────────────────────────────────────────
 * "WHICH EXAMS DO I ACTUALLY HAVE TO SIT?"
 * ─────────────────────────────────────────────────────────────────────────────
 * The question every student and parent starts with, and the one the previous
 * information architecture could not answer: exams were split across curriculum
 * pages (DSE, A-Level, IGCSE, IB, AP) and an "exams" page (SAT, ACT, IELTS,
 * TOEFL), so nobody could see the whole set.
 *
 * Each row is a curriculum system and answers two things:
 *
 *   internal — the assessment the system itself requires. Cannot be avoided.
 *   external — additional instruments that sit OUTSIDE every curriculum and are
 *              added because of a destination, a programme or a language
 *              requirement. These are conditional by definition.
 *
 * Editorial discipline: this table describes STRUCTURE, not admission policy.
 * It never claims that a specific institution requires a specific test. Where a
 * requirement genuinely depends on the institution, the row says so and points
 * at the authoritative source instead of guessing.
 */

import type { RawSource } from '@/lib/sources';
import type { LocalizedText } from './scales';

/** Why an external instrument might be added. */
export type ExternalReason = 'admission' | 'language' | 'credit';

export interface ConditionalExam {
  /** Exam slug — resolves to `/exams/<slug>` for the detail page. */
  slug: string;
  reason: ExternalReason;
  note: LocalizedText;
}

export interface ExamCombination {
  /** Curriculum system slug. */
  system: string;
  /** How the system's own assessment is named on a certificate. */
  internal: LocalizedText;
  /** What the internal assessment produces. */
  outcome: LocalizedText;
  /** Instruments commonly added on top, and why. */
  external: ConditionalExam[];
  sources: RawSource[];
  academicYear: string;
  verifiedAt: string;
}

export const examCombinations: ExamCombination[] = [
  {
    system: 'dse',
    internal: { zh: '香港中学文凭考试（DSE）', en: 'Hong Kong Diploma of Secondary Education (DSE)' },
    outcome: {
      zh: '四门核心科目 + 两至三门选修科目，各科独立评级（第 1 级至第 5** 级），公民与社会发展科以达标／不达标呈现。',
      en: 'Four core subjects plus two or three electives, each graded independently (Level 1 to 5**), with Citizenship and Social Development reported as Attained / Not Attained.',
    },
    external: [
      {
        slug: 'ielts',
        reason: 'language',
        note: {
          zh: '若目标院校以英语授课但未豁免语言证明，通常需要语言成绩。DSE 英国语文科成绩是否足以替代，由院校自行规定。',
          en: 'Needed where an English-medium institution does not waive the requirement. Whether a DSE English Language result substitutes is decided by each institution.',
        },
      },
      {
        slug: 'sat',
        reason: 'admission',
        note: {
          zh: '仅在美国方向出现，且是否要求由各院校政策决定。近年相当数量的院校采用考试可选政策。',
          en: 'Only relevant for US applications, and only where the institution requires it. Many institutions are test-optional.',
        },
      },
    ],
    sources: [
      { body: 'hkeaa', note: '文凭试科目架构、评级方式与成绩汇报制度的官方来源。' },
      { body: 'ielts', note: '语言测试的适用场景与管理机构说明。' },
      { body: 'collegeBoard', note: 'SAT 的定位与提交政策说明。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    system: 'a-level',
    internal: { zh: 'GCE A-Level（普通教育高级程度证书）', en: 'GCE Advanced Level' },
    outcome: {
      zh: '通常三至四门科目，成绩等级由 A* 至 E，部分科目包含课程作业或实践评核。',
      en: 'Typically three or four subjects, graded A* to E, with coursework or practical assessment in some subjects.',
    },
    external: [
      {
        slug: 'ielts',
        reason: 'language',
        note: {
          zh: '英国院校常以英语能力为录取条件之一。若学生以英语授课学校背景申请，部分院校可豁免，须以院校要求为准。',
          en: 'UK institutions commonly attach an English requirement. Some waive it for applicants from English-medium schooling; the institution decides.',
        },
      },
      {
        slug: 'sat',
        reason: 'admission',
        note: {
          zh: '仅在美国方向出现。A-Level 本身足以支撑英国方向申请，SAT 属于额外叠加。',
          en: 'Only relevant for US applications. A-Level alone supports a UK application; the SAT would be an additional layer.',
        },
      },
      {
        slug: 'toefl',
        reason: 'language',
        note: {
          zh: '与雅思作用相同，选择哪一项取决于目标院校接受哪一种。部分院校两者皆接受。',
          en: 'Same role as IELTS; which one to sit depends on what the target institutions accept. Many accept both.',
        },
      },
    ],
    sources: [
      { body: 'cambridge', note: '国际版 A-Level 的资格结构与评核方式。' },
      { body: 'ucas', note: '英国本科申请流程与成绩使用方式。' },
      { body: 'ielts', note: '语言能力证明的适用说明。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    system: 'ib',
    internal: { zh: 'IB 文凭项目评估（外部考试 + 校内评核）', en: 'IB Diploma Programme assessment (external exams + internal assessment)' },
    outcome: {
      zh: '六门学科各 1 至 7 分，加三项核心要素最多 3 分，文凭总分上限 45 分；核心要素另有独立的完成要求。',
      en: 'Six subjects at 1 to 7 each, plus up to 3 points from the three core elements, for a diploma maximum of 45. The core also carries separate completion requirements.',
    },
    external: [
      {
        slug: 'ielts',
        reason: 'language',
        note: {
          zh: 'IB 的英语科目（尤其是英语 A 或英语 B）常被院校用作语言能力证明，是否仍需额外测试由院校规定。',
          en: 'IB English (particularly English A or B) is often accepted as evidence of proficiency; whether an additional test is still needed is set by each institution.',
        },
      },
      {
        slug: 'sat',
        reason: 'admission',
        note: {
          zh: '美国方向可能叠加，取决于院校当年政策。IB 本身的课程难度已是被评估的一部分。',
          en: 'May be added for US applications depending on the year\u2019s institutional policy. IB course rigour is already part of the assessment.',
        },
      },
    ],
    sources: [
      { body: 'ibo', note: '文凭项目评分框架、核心要素与文凭授予条件的官方来源。' },
      { body: 'ielts', note: '语言能力证明的适用说明。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    system: 'ap',
    internal: { zh: 'AP 单科考试', en: 'AP subject examinations' },
    outcome: {
      zh: '每门科目独立评定 1 至 5 分，不产生文凭；学生仍需完成所在学校的高中课程与毕业要求。',
      en: 'Each subject is scored 1 to 5 independently and no diploma is awarded; the student still completes their own school\u2019s programme and graduation requirements.',
    },
    external: [
      {
        slug: 'sat',
        reason: 'admission',
        note: {
          zh: 'AP 叠加在学校高中课程之上，美国方向通常还需要一项统一参照，是否要求由院校政策决定。',
          en: 'AP sits on top of a school programme, so a US application often also wants a common reference point — required or not depending on institutional policy.',
        },
      },
      {
        slug: 'toefl',
        reason: 'language',
        note: {
          zh: '以英语以外语言为主要教学语言的学校背景，通常需要提交语言成绩。',
          en: 'Applicants from schooling where English is not the main medium of instruction generally need a language result.',
        },
      },
      {
        slug: 'ielts',
        reason: 'credit',
        note: {
          zh: '注意区分：语言成绩与 AP 换取学分是两件不同的事，学分政策由院校单独规定。',
          en: 'Worth separating: a language result and AP credit are different matters; credit policy is set by each institution on its own terms.',
        },
      },
    ],
    sources: [
      { body: 'collegeBoard', note: 'AP 的课程与考试定位、分数量表与成绩用途。' },
      { body: 'commonApp', note: '美国本科申请中标准化成绩的使用方式。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
  {
    system: 'igcse',
    internal: { zh: 'IGCSE 各科考试', en: 'IGCSE subject examinations' },
    outcome: {
      zh: '通常五至十门或以上科目，成绩按字母等级（A*–G）或数字等级（9–1）呈现，不设统一总分，也不单独用于大学申请。',
      en: 'Typically five to ten or more subjects, reported on a letter scale (A*–G) or numeric scale (9–1), with no aggregate total and not used alone for university entry.',
    },
    external: [
      {
        slug: 'ielts',
        reason: 'language',
        note: {
          zh: 'IGCSE 阶段通常还不到需要语言成绩的时间点。若目标院校要求，一般在预科阶段准备更合适。',
          en: 'The IGCSE stage is usually too early for a language result. Where institutions require one, preparing during the post-16 stage is more appropriate.',
        },
      },
    ],
    sources: [
      { body: 'cambridge', note: '剑桥 IGCSE 的科目、成绩体系与升学定位。' },
      { body: 'edexcel', note: '培生国际 GCSE 资格规范。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
];

export const examCombinationsBySlug = new Map(
  examCombinations.map((combination) => [combination.system, combination]),
);

/** Reason labels used by the combination table and the prep hub. */
export const externalReasonLabels: Record<ExternalReason, LocalizedText> = {
  admission: { zh: '录取评估参照', en: 'Admissions reference' },
  language: { zh: '语言能力证明', en: 'Language evidence' },
  credit: { zh: '学分 / 免修', en: 'Credit / exemption' },
};
