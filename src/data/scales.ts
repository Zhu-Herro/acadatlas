/**
 * ─────────────────────────────────────────────────────────────────────────────
 * GRADE & SCORE SCALES
 * ─────────────────────────────────────────────────────────────────────────────
 * How every system and examination reports results. These are STRUCTURAL facts
 * about a qualification — they change rarely, and each entry carries its
 * official source plus the academic year it applies to.
 *
 * Editorial rule (project brief, sections 9 & 24): nothing time-sensitive is
 * published without a source. Where an official grade boundary or descriptor is
 * quoted, it is quoted from the awarding body, not paraphrased from memory.
 *
 * What this file deliberately does NOT contain: institution-specific cut-off
 * scores. Those live in `src/data/requirements.ts`, where each entry must carry
 * a source and is marked verified or pending.
 */

import type { Locale } from '@/i18n/ui';
import type { RawSource } from '@/lib/sources';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface ScaleRow {
  /** The grade as it appears on a certificate, e.g. `5**`, `A*`, `Band 7.0`. */
  grade: string;
  meaning: LocalizedText;
}

export interface GradeScale {
  /** Content-collection slug this scale belongs to. */
  slug: string;
  name: LocalizedText;
  /** Human-readable reported range, e.g. `1 – 5**`. */
  range: string;
  kind: 'level' | 'grade' | 'numeric' | 'band';
  intro: LocalizedText;
  rows: ScaleRow[];
  /** Official thresholds or conventions worth stating explicitly. */
  notes?: LocalizedText[];
  sources: RawSource[];
  /** When the scale itself was last checked against the awarding body. */
  verifiedAt: string;
  academicYear: string;
}

export const gradeScales: GradeScale[] = [
  /* ── Curriculum systems ─────────────────────────────────────────────── */
  {
    slug: 'dse',
    name: { zh: '香港中学文凭成绩等级', en: 'HKDSE reporting levels' },
    range: '第 1 级 – 第 5** 级',
    kind: 'level',
    intro: {
      zh: '文凭试采用「标准参照」汇报：成绩不以考生之间的相对排名决定，而是按考生实际达到的水平对应既定等级。各科目独立评级，成绩单呈现为一组并列等级，而非总分。',
      en: 'The DSE uses standards-referenced reporting: levels are awarded against defined standards rather than by ranking candidates against each other. Each subject is graded independently, so a result is a set of parallel levels rather than an aggregate score.',
    },
    rows: [
      {
        grade: '5**',
        meaning: {
          zh: '第 5 级之上的最高等级，代表该科目表现突出。',
          en: 'The highest level above Level 5, representing outstanding performance in that subject.',
        },
      },
      {
        grade: '5*',
        meaning: {
          zh: '第 5 级之上的次高等级。',
          en: 'The second tier above Level 5.',
        },
      },
      { grade: '5', meaning: { zh: '第 5 级。', en: 'Level 5.' } },
      { grade: '4', meaning: { zh: '第 4 级。', en: 'Level 4.' } },
      { grade: '3', meaning: { zh: '第 3 级。', en: 'Level 3.' } },
      { grade: '2', meaning: { zh: '第 2 级。', en: 'Level 2.' } },
      { grade: '1', meaning: { zh: '第 1 级。', en: 'Level 1.' } },
      {
        grade: '达标 / 不达标',
        meaning: {
          zh: '公民与社会发展科不评级，只以「达标」或「不达标」呈现。',
          en: 'Citizenship and Social Development is not graded; it is reported as Attained or Not Attained.',
        },
      },
    ],
    notes: [
      {
        zh: '各科目独立评级，因此不存在「文凭试总分」这一官方概念。大学与招生计划通常自行定义计分方式。',
        en: 'Subjects are graded independently, so there is no official "total DSE score". Universities and admission schemes each define their own scoring method.',
      },
      {
        zh: '内地高校招收文凭试学生计划使用「3、3、2、A」这类核心科目等级组合作为最低标准，而不是换算成分数。详见「中国内地升学」页。',
        en: 'The mainland China admission scheme for DSE candidates expresses its minimum standard as a core-subject level combination ("3, 3, 2, A") rather than converting levels into points. See the mainland routes page.',
      },
    ],
    sources: [
      { body: 'hkeaa', note: '成绩汇报制度与等级设定的官方来源。' },
      { body: 'moe', note: '内地高校以核心科目等级组合设定最低录取标准的官方依据。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'ib',
    name: { zh: 'IB 文凭项目评分', en: 'IB Diploma Programme scoring' },
    range: '单科 1 – 7 分 · 文凭总分最高 45 分',
    kind: 'numeric',
    intro: {
      zh: '文凭项目为每门学科评定 1 至 7 分，六门学科合计最高 42 分；三项核心要素（专题论文、知识论、创意行动与服务）合计最多 3 分，因此文凭总分上限为 45 分。',
      en: 'Each Diploma Programme subject is graded from 1 to 7, giving a maximum of 42 points across six subjects. The three core elements (Extended Essay, Theory of Knowledge, Creativity-Activity-Service) contribute up to 3 further points, for a diploma maximum of 45.',
    },
    rows: [
      { grade: '7', meaning: { zh: '单科最高等级。', en: 'Highest grade for a subject.' } },
      { grade: '6', meaning: { zh: '优等等级。', en: 'Very good.' } },
      { grade: '5', meaning: { zh: '良好等级。', en: 'Good.' } },
      { grade: '4', meaning: { zh: '合格等级。', en: 'Satisfactory.' } },
      { grade: '3', meaning: { zh: '接近合格。', en: 'Marginal.' } },
      { grade: '2', meaning: { zh: '未达合格水平。', en: 'Poor.' } },
      { grade: '1', meaning: { zh: '最低等级。', en: 'Very poor.' } },
      {
        grade: '核心加分 0 – 3',
        meaning: {
          zh: '专题论文与知识论合并最多 2 分，创意、行动与服务不单独计分但为授予文凭的必要条件。',
          en: 'The Extended Essay and Theory of Knowledge together contribute up to 2 points; Creativity, Activity, Service carries no points but is a requirement for the diploma to be awarded.',
        },
      },
    ],
    notes: [
      {
        zh: '除分数外，文凭还设有一套授予条件（例如核心要素完成情况、最低分数总量等）。未满足条件时可能只获课程证书而非完整文凭。',
        en: 'Beyond points, the diploma has award conditions (completion of core elements, minimum point totals and others). Failing them can lead to course certificates rather than the full diploma.',
      },
      {
        zh: '同一门学科分高级课程（HL）与标准课程（SL），部分院校与专业会对特定科目的 HL 单独提出要求。',
        en: 'Subjects are taken at Higher Level or Standard Level; some institutions and programmes set requirements for specific HL subjects.',
      },
    ],
    sources: [{ body: 'ibo', note: '文凭项目评分框架与文凭授予条件的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'ap',
    name: { zh: 'AP 考试分数', en: 'AP exam scores' },
    range: '1 – 5 分（单科独立评分）',
    kind: 'numeric',
    intro: {
      zh: '每门 AP 考试独立评定 1 至 5 分。大学理事会为每个分数段给出了官方含义，其中 3 分对应「合格」（Qualified）；但可用于换取学分或免修的分数门槛由各院校自行规定。',
      en: 'Each AP exam is scored independently from 1 to 5. The College Board publishes a definition for each score, with 3 defined as "Qualified"; however, the score required for credit or exemption is set by each institution.',
    },
    rows: [
      { grade: '5', meaning: { zh: '极其合格（Extremely well qualified）。', en: 'Extremely well qualified.' } },
      { grade: '4', meaning: { zh: '很合格（Well qualified）。', en: 'Well qualified.' } },
      { grade: '3', meaning: { zh: '合格（Qualified）。', en: 'Qualified.' } },
      { grade: '2', meaning: { zh: '可能合格（Possibly qualified）。', en: 'Possibly qualified.' } },
      { grade: '1', meaning: { zh: '不予推荐（No recommendation）。', en: 'No recommendation.' } },
    ],
    notes: [
      {
        zh: '大学理事会常用「3 分或以上」作为学分／免修的参考口径，但实际政策由各院校自定，同一院校不同科目也可能不同。',
        en: 'The College Board commonly uses "3 or higher" as a reference for credit or advanced placement, but the actual policy is set by each institution and can differ by subject within the same institution.',
      },
      {
        zh: 'AP 不以总分形式汇报，成绩单是一组并列的单科分数。',
        en: 'AP is not reported as an aggregate; a record is a set of parallel single-subject scores.',
      },
    ],
    sources: [
      { body: 'collegeBoard', note: '分数量表与各分数官方定义的来源（Qualifying Score 说明）。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'a-level',
    name: { zh: 'A-Level 成绩等级', en: 'A-Level grades' },
    range: 'A* – E（未达等级者不评等级）',
    kind: 'grade',
    intro: {
      zh: 'A-Level 以字母等级呈现成绩，最高为 A*，向下至 E；未达到最低等级标准者不获等级。部分科目可先取得 AS Level 成绩，再延伸为完整的 A Level。',
      en: 'A-Level results are reported as letter grades, from A* at the top down to E; work below the lowest threshold is ungraded. Some subjects can be started at AS Level and extended to the full A Level.',
    },
    rows: [
      { grade: 'A*', meaning: { zh: '最高等级，通常在 A 的基础上另有更高的整体表现要求。', en: 'Highest grade, normally requiring performance beyond the A threshold.' } },
      { grade: 'A', meaning: { zh: '优秀。', en: 'Excellent.' } },
      { grade: 'B', meaning: { zh: '良好。', en: 'Good.' } },
      { grade: 'C', meaning: { zh: '合格偏上。', en: 'Satisfactory.' } },
      { grade: 'D', meaning: { zh: '基础合格。', en: 'Basic.' } },
      { grade: 'E', meaning: { zh: '最低合格等级。', en: 'Lowest passing grade.' } },
      { grade: 'U', meaning: { zh: '未达等级标准（Ungraded）。', en: 'Ungraded — below the lowest threshold.' } },
    ],
    notes: [
      {
        zh: '英国多所考试局均可颁发 A-Level 资格。同一科目在不同考试局下的试卷结构与评核比例可能不同，成绩等级的定义由各考试局按其规范设定。',
        en: 'Several UK awarding bodies issue A-Level qualifications. Paper structure and assessment weighting can differ between boards for the same subject, and grade definitions are set by each board in its specification.',
      },
      {
        zh: 'A* 的授予规则因考试局与科目而异，通常与整体成绩及特定单元表现相关，具体以该考试局的规范为准。',
        en: 'The rule for awarding A* varies by board and subject, usually combining overall performance with specific unit results. The board\u2019s specification is the authoritative source.',
      },
    ],
    sources: [
      { body: 'cambridge', note: '国际版 A-Level 的资格结构（含 AS 延伸至 A Level）官方说明。' },
      { body: 'edexcel', note: '另一主要考试局的 A-Level 资格规范与等级设定。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'igcse',
    name: { zh: 'IGCSE 成绩等级', en: 'IGCSE grades' },
    range: 'A* – G（传统）或 9 – 1（新制）',
    kind: 'grade',
    intro: {
      zh: 'IGCSE 存在两套并行的成绩呈现体系：传统的 A* 至 G 字母等级，以及较新的 9 至 1 数字等级（9 为最高）。采用哪一套由考试机构与地区决定。',
      en: 'Two reporting scales coexist for IGCSE: the traditional A* to G letter grades, and the newer 9 to 1 numeric scale where 9 is the highest. Which applies depends on the awarding body and region.',
    },
    rows: [
      { grade: 'A* / 9', meaning: { zh: '最高等级。', en: 'Highest grade.' } },
      { grade: 'A / 8–7', meaning: { zh: '优秀。', en: 'Excellent.' } },
      { grade: 'B / 6–5', meaning: { zh: '良好。', en: 'Good.' } },
      { grade: 'C / 4', meaning: { zh: '常被视为「合格线」参考等级。', en: 'Commonly treated as the standard pass reference grade.' } },
      { grade: 'D–G / 3–1', meaning: { zh: '依次向下至最低等级。', en: 'Descending to the lowest grade.' } },
      { grade: 'U', meaning: { zh: '未达等级标准。', en: 'Ungraded.' } },
    ],
    notes: [
      {
        zh: '同一学生在多个科目上分别取得成绩，成绩单是一组并列的科目等级，不设统一总分。',
        en: 'Each subject is graded separately, so a result is a set of parallel subject grades with no aggregate total.',
      },
      {
        zh: '数字制与字母制之间不存在官方的逐级一一对应表；院校通常自行公布各自的换算口径。',
        en: 'There is no official one-to-one conversion table between the numeric and letter scales; institutions publish their own equivalence rules.',
      },
    ],
    sources: [
      { body: 'cambridge', note: '剑桥 IGCSE 的成绩体系与考试安排的官方来源。' },
      { body: 'edexcel', note: '培生国际 GCSE 的资格规范与成绩等级说明。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },

  /* ── Admissions tests ───────────────────────────────────────────────── */
  {
    slug: 'sat',
    name: { zh: 'SAT 分数量表', en: 'SAT score scale' },
    range: '总分 400 – 1600',
    kind: 'numeric',
    intro: {
      zh: 'SAT 分为「阅读与写作」与「数学」两部分，各自报告 200 至 800 分，合计形成 400 至 1600 分的总分。',
      en: 'The SAT reports two sections — Reading and Writing, and Math — each on a 200 to 800 scale, combining into a total of 400 to 1600.',
    },
    rows: [
      { grade: '1600', meaning: { zh: '两部分均达满分的理论最高总分。', en: 'Theoretical maximum when both sections are perfect.' } },
      { grade: '800', meaning: { zh: '单一部分的满分。', en: 'Maximum for one section.' } },
      { grade: '200', meaning: { zh: '单一部分的最低报告分。', en: 'Minimum reported section score.' } },
    ],
    notes: [
      {
        zh: '成绩报告同时提供各能力维度的细项分数，供院校参考。',
        en: 'Score reports also include subscores by skill area for institutional reference.',
      },
      {
        zh: '是否要求提交、是否接受跨考次拼分，由各院校自行规定，且逐年可能调整。',
        en: 'Whether a result is required, and whether superscoring is accepted, is decided by each institution and can change year to year.',
      },
    ],
    sources: [{ body: 'collegeBoard', note: '分数量表、机考结构与成绩发送机制的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'act',
    name: { zh: 'ACT 分数量表', en: 'ACT score scale' },
    range: '综合分 1 – 36',
    kind: 'numeric',
    intro: {
      zh: 'ACT 各科目分别报告 1 至 36 分，并汇总为一个综合分数（Composite）。写作部分为选考，单独评分且不计入综合分。',
      en: 'ACT sections are each reported from 1 to 36 and combined into a Composite Score. Writing is optional, scored separately and excluded from the Composite.',
    },
    rows: [
      { grade: '36', meaning: { zh: '综合分最高值。', en: 'Highest possible Composite Score.' } },
      { grade: '1', meaning: { zh: '综合分最低值。', en: 'Lowest possible Composite Score.' } },
      { grade: '写作（选考）', meaning: { zh: '独立评分，不并入综合分，但随成绩报告一并发送。', en: 'Scored independently, not part of the Composite, but sent with the score report.' } },
    ],
    notes: [
      {
        zh: '考试形式与部分科目安排在近年持续调整，具体题型、时长与选考科目应以官方最新说明为准。',
        en: 'Format and some subject arrangements have been changing in recent years; question types, timing and optional components should be confirmed against current official information.',
      },
      {
        zh: 'ACT 与 SAT 之间不存在官方换算关系；院校如需对照，通常自行公布换算表。',
        en: 'There is no official conversion between ACT and SAT; institutions publish their own concordance if they need one.',
      },
    ],
    sources: [{ body: 'commonApp', note: '了解标准化成绩在申请中的使用方式的官方平台。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },

  /* ── Language tests ─────────────────────────────────────────────────── */
  {
    slug: 'ielts',
    name: { zh: '雅思分数量表', en: 'IELTS band scale' },
    range: '各项 1 – 9 分，总分取四项平均',
    kind: 'band',
    intro: {
      zh: '雅思的听、说、读、写四项各报告 1 至 9 分（band），总分为四项平均分并四舍五入至最接近的 0.5 分。各项同时单独报告。',
      en: 'IELTS reports listening, reading, writing and speaking on a 1 to 9 band; the overall band is the mean of the four, rounded to the nearest half band. Each skill is also reported separately.',
    },
    rows: [
      { grade: '9', meaning: { zh: '最高分数带。', en: 'Highest band.' } },
      { grade: '7.0 – 8.5', meaning: { zh: '常见于高要求课程的语言门槛区间。', en: 'A range commonly seen as the language threshold for demanding programmes.' } },
      { grade: '6.0 – 6.5', meaning: { zh: '常见于多数本科与研究生课程的门槛区间。', en: 'A range commonly used as the threshold for many undergraduate and postgraduate programmes.' } },
      { grade: '5.5 及以下', meaning: { zh: '通常需配合预科或语言课程安排。', en: 'Usually paired with a foundation or pre-sessional language arrangement.' } },
    ],
    notes: [
      {
        zh: '多数院校对总分与单项分数分别设定最低要求，总分达标但单项不足仍可能不满足语言条件。',
        en: 'Most institutions set separate minimums for the overall band and for individual skills; a sufficient overall band with one weak skill may still fail the condition.',
      },
      {
        zh: '成绩报告通常被视为两年内有效，具体以接收机构要求为准。',
        en: 'Reports are commonly treated as valid for two years; the receiving institution\u2019s requirement is what counts.',
      },
    ],
    sources: [{ body: 'ielts', note: '分数带设定、四项技能评分与成绩有效期的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'toefl',
    name: { zh: '托福分数量表', en: 'TOEFL score scale' },
    range: '总分 0 – 120',
    kind: 'numeric',
    intro: {
      zh: '网络考试（TOEFL iBT）的阅读、听力、口语、写作四项各报告 0 至 30 分，合计形成 0 至 120 分的总分。',
      en: 'The internet-based test (TOEFL iBT) reports reading, listening, speaking and writing each from 0 to 30, combining into a total of 0 to 120.',
    },
    rows: [
      { grade: '120', meaning: { zh: '四项均为满分的理论最高总分。', en: 'Theoretical maximum when all four sections are perfect.' } },
      { grade: '30', meaning: { zh: '单一技能的满分。', en: 'Maximum for one skill.' } },
      { grade: '0', meaning: { zh: '单一技能的最低报告分。', en: 'Minimum reported score for one skill.' } },
    ],
    notes: [
      {
        zh: '多数院校同时对总分与单项设定最低要求。',
        en: 'Most institutions set minimums for both the total and individual sections.',
      },
      {
        zh: '托福与雅思之间没有官方换算关系；院校通常自行公布可接受的分数区间。',
        en: 'There is no official TOEFL-to-IELTS conversion; institutions publish acceptable ranges themselves.',
      },
    ],
    sources: [{ body: 'ets', note: '考试结构、四项技能评分与成绩有效期的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
];

export const gradeScalesBySlug = new Map(gradeScales.map((scale) => [scale.slug, scale]));

export function getGradeScale(slug: string): GradeScale | undefined {
  return gradeScalesBySlug.get(slug);
}

/** Convenience for components that need a localised string. */
export function pick(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
