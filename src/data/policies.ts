/**
 * ─────────────────────────────────────────────────────────────────────────────
 * OFFICIAL EXAMINATION POLICY FACTS
 * ─────────────────────────────────────────────────────────────────────────────
 * The operating rules of each qualification: who sets it, who examines it, when
 * you register, when you sit it, when results are released, and how the
 * assessment is composed.
 *
 * Editorial rule: every fact here must be attributable to the awarding body or
 * the relevant government authority, and must carry the academic year it
 * applies to. Registration windows and timetables shift every year — the
 * sources list is the reader's route to the authoritative version.
 *
 * Verified in this file today: HKDSE registration/assessment structure, and the
 * mainland China admission scheme timetable (Ministry of Education, 2026).
 * Entries that only state stable structural facts cite the awarding body.
 */

import type { RawSource } from '@/lib/sources';
import type { LocalizedText } from './scales';

export interface PolicyFact {
  label: LocalizedText;
  value: LocalizedText;
}

export interface PolicyEntry {
  slug: string;
  heading: LocalizedText;
  intro: LocalizedText;
  facts: PolicyFact[];
  /** Caveats the reader must know before acting on any of it. */
  caveats: LocalizedText[];
  sources: RawSource[];
  verifiedAt: string;
  academicYear: string;
}

export const policyEntries: PolicyEntry[] = [
  {
    slug: 'dse',
    heading: { zh: '文凭试的官方报考与评核安排', en: 'Official registration and assessment arrangements' },
    intro: {
      zh: '文凭试的课程架构由香港教育局制定，考试由香港考试及评核局（HKEAA）举办。报名、考试与放榜的时间表每年由 HKEAA 公布，并会逐年调整。',
      en: 'The curriculum framework is set by the Hong Kong Education Bureau and the examinations are administered by the Hong Kong Examinations and Assessment Authority (HKEAA). Registration, examination and results-release timetables are published by HKEAA each year and do change year to year.',
    },
    facts: [
      {
        label: { zh: '课程管理机构', en: 'Curriculum authority' },
        value: { zh: '香港教育局（EDB）', en: 'Hong Kong Education Bureau (EDB)' },
      },
      {
        label: { zh: '考试主办机构', en: 'Examining authority' },
        value: { zh: '香港考试及评核局（HKEAA）', en: 'Hong Kong Examinations and Assessment Authority (HKEAA)' },
      },
      {
        label: { zh: '科目分类', en: 'Subject categories' },
        value: {
          zh: '甲类：高中科目 · 乙类：应用学习科目 · 丙类：其他语言科目',
          en: 'Category A: senior secondary subjects · Category B: Applied Learning · Category C: other languages',
        },
      },
      {
        label: { zh: '评核方式', en: 'Assessment model' },
        value: {
          zh: '以公开考试为主，部分科目设有校本评核（SBA）。成绩采用标准参照汇报，不以考生相对排名评级。',
          en: 'Predominantly public examination, with School-based Assessment in some subjects. Reporting is standards-referenced rather than rank-based.',
        },
      },
      {
        label: { zh: '自修生特殊报考申请', en: 'Private candidate special entry application' },
        value: {
          zh: '以 2027 年文凭试为例，申请期为 2026 年 8 月 17 日至 10 月 7 日，通过 HKDSE Examination Online Services 提交。',
          en: 'For the 2027 DSE, the application window ran from 17 August to 7 October 2026, submitted through the HKDSE Examination Online Services.',
        },
      },
      {
        label: { zh: '甲、乙、丙类报名截止（2027 年文凭试）', en: 'Category A/B/C registration deadline (2027 DSE)' },
        value: {
          zh: '2026 年 10 月 7 日。学校考生由学校统一办理，自修生须自行报考。',
          en: '7 October 2026. School candidates are entered by their school; private candidates apply individually.',
        },
      },
      {
        label: { zh: '考试费公布', en: 'Examination fee announcement' },
        value: {
          zh: '2027 年文凭试考试费已于 7 月 31 日公布，HKEAA 同时提供网上费用计算器。',
          en: 'Fees for the 2027 DSE were published on 31 July, with an online fee calculator provided by HKEAA.',
        },
      },
      {
        label: { zh: '成绩放榜与改选安排', en: 'Results release' },
        value: {
          zh: '放榜日期与成绩复核安排同样每年由 HKEAA 公布，考生应按官方时间表规划 JUPAS 改选等后续动作。',
          en: 'The results date and rechecking arrangements are also announced annually by HKEAA; candidates should plan JUPAS choice adjustments around the official timetable.',
        },
      },
    ],
    caveats: [
      {
        zh: '报考科目数量、校本评核比重与考试科目列表会按年调整，本页不固化任何一年的细节。',
        en: 'Subject entry rules, SBA weighting and the subject list are adjusted over time; this page deliberately does not freeze any single year\u2019s details.',
      },
      {
        zh: '考试费、报名日期与考试时间表请以 HKEAA 当年公告为准。',
        en: 'Fees, registration dates and the examination timetable must be confirmed against the current year\u2019s HKEAA announcement.',
      },
    ],
    sources: [
      { body: 'hkeaa', note: '科目分类、报名安排、考试费与评核制度的官方来源。' },
      { body: 'edb', note: '高中课程架构的官方来源。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'ib',
    heading: { zh: 'IB 文凭项目的官方规则', en: 'Official rules of the IB Diploma Programme' },
    intro: {
      zh: 'IB 的课程、评核与文凭授予条件全部由国际文凭组织（IBO）统一制定，因此不同国家的 IB 学校采用同一套标准。',
      en: 'The curriculum, assessment and diploma award conditions are all defined centrally by the International Baccalaureate Organization (IBO), so IB schools worldwide operate to the same standards.',
    },
    facts: [
      {
        label: { zh: '课程与评核机构', en: 'Curriculum & assessment authority' },
        value: { zh: '国际文凭组织（IBO）', en: 'International Baccalaureate Organization (IBO)' },
      },
      {
        label: { zh: '考试期', en: 'Examination sessions' },
        value: { zh: '每年两个考试期：五月与十一月。', en: 'Two sessions per year: May and November.' },
      },
      {
        label: { zh: '评核构成', en: 'Assessment composition' },
        value: {
          zh: '外部考试与校内评核相结合。除学科分数外，核心要素另有独立的完成要求。',
          en: 'External examinations combined with internal assessment. Beyond subject grades, the core elements carry separate completion requirements.',
        },
      },
      {
        label: { zh: '学科与难度分层', en: 'Subjects and levels' },
        value: {
          zh: '六个学科组各选一门，学科可修读高级课程（HL）或标准课程（SL），通常至少三门为 HL。',
          en: 'One subject from each of six groups; each subject is taken at Higher or Standard Level, normally with at least three at HL.',
        },
      },
      {
        label: { zh: '核心要素', en: 'Core elements' },
        value: {
          zh: '专题论文（EE）· 知识论（TOK）· 创意、行动与服务（CAS），三者均为授予文凭的必要部分。',
          en: 'Extended Essay (EE) · Theory of Knowledge (TOK) · Creativity, Activity, Service (CAS) — all required for the diploma.',
        },
      },
      {
        label: { zh: '文凭总分上限', en: 'Maximum diploma points' },
        value: { zh: '45 分（六科各最高 7 分，核心最多 3 分）。', en: '45 points (six subjects at up to 7, plus up to 3 from the core).' },
      },
    ],
    caveats: [
      {
        zh: 'IB 同时提供小学项目、中学项目与职业相关项目，本页只覆盖与大学申请最直接相关的文凭项目。',
        en: 'The IB also offers the PYP, MYP and Career-related Programme; this page covers only the Diploma Programme, which is the one tied to university entry.',
      },
      {
        zh: '各校实际开设的科目与难度层级取决于学校资源，科目列表并非全校可供。',
        en: 'Which subjects and levels are available depends on the individual school, not on the framework alone.',
      },
    ],
    sources: [{ body: 'ibo', note: '项目结构、学科组、核心要素与评分框架的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'ap',
    heading: { zh: 'AP 的官方规则与定位', en: 'Official rules and status of AP' },
    intro: {
      zh: 'AP 由美国大学理事会（College Board）提供。它是一组大学水平课程与单科考试，本身不构成完整的高中学历。',
      en: 'AP is offered by the College Board as a set of university-level courses and single-subject examinations. It does not itself constitute a complete secondary qualification.',
    },
    facts: [
      {
        label: { zh: '课程与考试机构', en: 'Provider' },
        value: { zh: '美国大学理事会（College Board）', en: 'College Board' },
      },
      {
        label: { zh: '资格性质', en: 'Qualification status' },
        value: {
          zh: '不构成文凭。AP 通常叠加在学生所在学校的高中课程之上，学生仍需完成本校毕业要求。',
          en: 'Not a diploma. AP normally sits on top of the student\u2019s own school programme, and graduation requirements still apply.',
        },
      },
      {
        label: { zh: '课程范围', en: 'Subject range' },
        value: {
          zh: '覆盖艺术、英语、历史与社会科学、数学与计算机科学、科学、世界语言与文化，以及顶点课程与职业起步课程等。',
          en: 'Covering Arts, English, History and Social Sciences, Math and Computer Science, Sciences, World Languages and Cultures, plus AP Capstone and AP Career Kickstart.',
        },
      },
      {
        label: { zh: '考试时间', en: 'Exam session' },
        value: { zh: '每年五月集中举行，另设延迟考试场次。', en: 'Concentrated in May each year, with a separate late-testing window.' },
      },
      {
        label: { zh: '成绩公布', en: 'Score release' },
        value: { zh: '通常在考试后约两个月，即七月起分批发布。', en: 'Usually around two months after the exams, released in batches from July.' },
      },
      {
        label: { zh: '学分与免修', en: 'Credit and exemption' },
        value: {
          zh: '是否接受 AP 成绩换取学分或免修课程，由各院校自行规定，标准不一。',
          en: 'Whether AP results earn credit or exempt courses is decided by each institution, with differing standards.',
        },
      },
    ],
    caveats: [
      {
        zh: '「考得越多越好」不是官方口径。院校通常更关注与申请方向相关的科目表现。',
        en: '"More subjects is better" is not an official position. Institutions generally weight subjects relevant to the intended field.',
      },
      {
        zh: 'AP 国际文凭与 AP 顶点课程文凭是独立凭据，均不等同于高中文凭。',
        en: 'The AP International Diploma and the AP Capstone Diploma are separate credentials, neither of which is a high-school diploma.',
      },
    ],
    sources: [{ body: 'collegeBoard', note: '课程目录、考试时间、分数量表与成绩政策的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'a-level',
    heading: { zh: 'A-Level 的官方规则与考试局制度', en: 'Official rules and the awarding-body system' },
    intro: {
      zh: '英国有多家考试局可以颁发 A-Level 资格，学校可自主选择考试局，因此同一国家内不同学校的学生可能参加不同考试局的考试。',
      en: 'Several awarding bodies in the UK issue A-Level qualifications, and schools choose which to use. Students at different schools in the same country may therefore sit examinations set by different boards.',
    },
    facts: [
      {
        label: { zh: '资格层级', en: 'Qualification level' },
        value: { zh: '英国资历框架第三级（Level 3）。', en: 'Level 3 in the UK qualifications framework.' },
      },
      {
        label: { zh: '主要考试局', en: 'Main awarding bodies' },
        value: {
          zh: '剑桥国际考评部（CAIE）· 培生爱德思（Pearson Edexcel）· AQA · OCR · WJEC',
          en: 'Cambridge Assessment International Education · Pearson Edexcel · AQA · OCR · WJEC',
        },
      },
      {
        label: { zh: '阶段结构', en: 'Staged structure' },
        value: {
          zh: '部分科目可从 Cambridge International AS Level 起步，再延伸为完整的 A Level。',
          en: 'Some subjects can be started as a Cambridge International AS Level and extended to a full A Level.',
        },
      },
      {
        label: { zh: '科目选择', en: 'Subject choice' },
        value: {
          zh: '剑桥国际提供数十门科目，学校可自由组合，学生可专精或广泛涉猎。',
          en: 'Cambridge International offers dozens of subjects, freely combined, allowing either specialisation or breadth.',
        },
      },
      {
        label: { zh: '评核方式', en: 'Assessment' },
        value: {
          zh: '以课程结束时的终结性考试为主，部分科目包含课程作业或实践评核。',
          en: 'Mainly end-of-course summative examination, with coursework or practical assessment in some subjects.',
        },
      },
      {
        label: { zh: '英国本科申请系统', en: 'UK undergraduate applications' },
        value: { zh: '通过 UCAS 统一提交。', en: 'Submitted through UCAS.' },
      },
    ],
    caveats: [
      {
        zh: '同一科目在不同考试局的试卷结构、评核比例与内容侧重可能不同，学校选择的考试局会影响具体安排。',
        en: 'For the same subject, paper structure, weighting and emphasis can differ between boards, so the school\u2019s choice affects the detail of assessment.',
      },
      {
        zh: '等级门槛（grade threshold）由考试局按每次考试单独公布，会随试卷难度调整。',
        en: 'Grade thresholds are published by each board for each examination series and move with paper difficulty.',
      },
    ],
    sources: [
      { body: 'cambridge', note: '科目范围、AS 延伸至 A Level 的结构说明与成绩统计入口。' },
      { body: 'edexcel', note: '爱德思 A-Level 资格规范与评核说明。' },
      { body: 'ucas', note: '英国本科申请流程与成绩要求的官方说明。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'igcse',
    heading: { zh: 'IGCSE 的官方规则与衔接定位', en: 'Official rules and articulation role' },
    intro: {
      zh: 'IGCSE 与英国 GCSE 在学术层级上大致对应，但专为国际学校环境设计。它本身不是大学申请资格，主要承担 14 至 16 岁阶段的衔接功能。',
      en: 'IGCSE sits at roughly the same academic level as UK GCSE but is designed for international schools. It is not itself a university entrance qualification; its function is articulation at the 14–16 stage.',
    },
    facts: [
      {
        label: { zh: '适用年龄', en: 'Age range' },
        value: { zh: '通常 14 至 16 岁，修读约两年。', en: 'Typically ages 14 to 16, over about two years.' },
      },
      {
        label: { zh: '主要考试机构', en: 'Main awarding bodies' },
        value: {
          zh: '剑桥国际考评部（CAIE）· 培生爱德思（Pearson Edexcel）',
          en: 'Cambridge Assessment International Education · Pearson Edexcel',
        },
      },
      {
        label: { zh: '成绩呈现', en: 'Reporting scale' },
        value: {
          zh: 'A* 至 G（传统）或 9 至 1（新制），采用哪一套由考试机构与地区决定。',
          en: 'A* to G (traditional) or 9 to 1 (newer), depending on the awarding body and region.',
        },
      },
      {
        label: { zh: '考试期', en: 'Examination sessions' },
        value: { zh: '一般设 5–6 月与 10–11 月两个考期。', en: 'Generally two sessions: May–June and October–November.' },
      },
      {
        label: { zh: '试卷层次', en: 'Paper tiers' },
        value: {
          zh: '部分科目区分为核心（Core）与延伸（Extended）试卷，可选范围取决于学校安排。',
          en: 'Some subjects offer Core and Extended papers; availability depends on the school.',
        },
      },
      {
        label: { zh: '升学用途', en: 'Admissions use' },
        value: {
          zh: '一般不单独用于大学申请，学生通常在完成 IGCSE 后进入 A-Level、IB 或其他 16 岁后课程。',
          en: 'Not normally used alone for university entry; students typically progress into A-Level, the IB or another post-16 course.',
        },
      },
    ],
    caveats: [
      {
        zh: '科目数量与核心科目要求取决于学校课程设计，不存在统一的「必修科目清单」。',
        en: 'Subject numbers and core requirements depend on each school\u2019s curriculum design; there is no single compulsory subject list.',
      },
    ],
    sources: [
      { body: 'cambridge', note: '剑桥 IGCSE 的科目、成绩体系与考试安排。' },
      { body: 'edexcel', note: '培生国际 GCSE 的资格规范与成绩等级说明。' },
    ],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },

  /* ── Admissions tests ───────────────────────────────────────────────── */
  {
    slug: 'sat',
    heading: { zh: 'SAT 的官方考试安排', en: 'Official SAT arrangements' },
    intro: {
      zh: 'SAT 由美国大学理事会举办，采用机考与分阶段自适应设计，用于为不同背景的申请者提供统一参照。',
      en: 'The SAT is administered by the College Board using a digital, multistage adaptive design, providing a common reference across applicants from different backgrounds.',
    },
    facts: [
      { label: { zh: '举办机构', en: 'Administrator' }, value: { zh: '美国大学理事会（College Board）', en: 'College Board' } },
      {
        label: { zh: '考试部分', en: 'Sections' },
        value: { zh: '阅读与写作、数学两部分，全程可使用计算器。', en: 'Reading and Writing, plus Math; a calculator is permitted throughout.' },
      },
      {
        label: { zh: '考试形式', en: 'Format' },
        value: { zh: '数字化机考，分阶段自适应。', en: 'Digital, multistage adaptive.' },
      },
      {
        label: { zh: '考试时长', en: 'Duration' },
        value: { zh: '约两小时余。', en: 'Just over two hours.' },
      },
      {
        label: { zh: '提交政策', en: 'Submission policy' },
        value: {
          zh: '相当数量的院校采用考试可选（test-optional）政策，是否提交由申请人决定，政策逐年调整。',
          en: 'A substantial number of institutions operate test-optional policies; the submission decision rests with the applicant and policies change year to year.',
        },
      },
    ],
    caveats: [
      {
        zh: 'SAT 是评估工具，不提供课程、不授予学历，也不替代学校毕业要求。',
        en: 'The SAT is an assessment instrument: it provides no coursework, awards no qualification and does not replace graduation requirements.',
      },
    ],
    sources: [{ body: 'collegeBoard', note: '考试结构、机考形式与成绩发送机制的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'act',
    heading: { zh: 'ACT 的官方考试安排', en: 'Official ACT arrangements' },
    intro: {
      zh: 'ACT 是与 SAT 并列的美国大学入学标准化考试，特点是科目覆盖面较广并给出单一综合分数。',
      en: 'The ACT is the other main US admissions test, distinguished by broader subject coverage and a single Composite Score.',
    },
    facts: [
      { label: { zh: '举办机构', en: 'Administrator' }, value: { zh: 'ACT', en: 'ACT' } },
      {
        label: { zh: '科目组成', en: 'Sections' },
        value: {
          zh: '传统上包含英语、数学、阅读与科学推理；写作部分为选考。',
          en: 'Traditionally English, Mathematics, Reading and Science; Writing is optional.',
        },
      },
      {
        label: { zh: '成绩结构', en: 'Reporting' },
        value: { zh: '各科分数汇总为一个综合分数（1–36）。', en: 'Section scores combine into a Composite Score from 1 to 36.' },
      },
      {
        label: { zh: '形式调整', en: 'Format changes' },
        value: {
          zh: '考试形式与科目安排近年持续调整，应以官方最新说明为准。',
          en: 'Format and subject arrangements have been changing; current official information is authoritative.',
        },
      },
    ],
    caveats: [
      {
        zh: 'ACT 与 SAT 之间没有官方换算关系。',
        en: 'There is no official conversion between ACT and SAT.',
      },
    ],
    sources: [{ body: 'commonApp', note: '标准化成绩在美国本科申请中的使用方式。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'ielts',
    heading: { zh: '雅思的官方考试安排', en: 'Official IELTS arrangements' },
    intro: {
      zh: '雅思由英国文化协会、IDP 教育与剑桥大学英语考评部共同管理，分学术类与培训类，纸笔与机考形式均提供。',
      en: 'IELTS is managed jointly by the British Council, IDP Education and Cambridge University Press & Assessment, offered in Academic and General Training versions on paper and computer.',
    },
    facts: [
      {
        label: { zh: '管理机构', en: 'Managing bodies' },
        value: {
          zh: '英国文化协会 · IDP 教育 · 剑桥大学英语考评部',
          en: 'British Council · IDP Education · Cambridge University Press & Assessment',
        },
      },
      {
        label: { zh: '类别选择', en: 'Versions' },
        value: {
          zh: '高等教育申请通常要求学术类（Academic）；移民与职业用途可能要求培训类（General Training）。',
          en: 'Higher education generally requires Academic; migration and professional purposes may require General Training.',
        },
      },
      {
        label: { zh: '四项技能', en: 'Four skills' },
        value: { zh: '听力、阅读、写作、口语，各项独立报告。', en: 'Listening, reading, writing and speaking, each reported separately.' },
      },
      {
        label: { zh: '口语形式', en: 'Speaking format' },
        value: { zh: '与考官一对一进行，全程录音。', en: 'Conducted one-to-one with an examiner and recorded.' },
      },
      {
        label: { zh: '成绩有效期', en: 'Validity' },
        value: { zh: '报告通常视为两年内有效，以接收机构要求为准。', en: 'Reports are commonly treated as valid for two years; the receiving institution decides.' },
      },
    ],
    caveats: [
      {
        zh: '是否提供单项重考、以及接受哪些成绩组合，由管理机构与院校分别规定。',
        en: 'Whether a one-skill retake is available, and which score combinations are accepted, are governed separately by the managing bodies and by institutions.',
      },
    ],
    sources: [{ body: 'ielts', note: '考试类别、题型、评分与有效期的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
  {
    slug: 'toefl',
    heading: { zh: '托福的官方考试安排', en: 'Official TOEFL arrangements' },
    intro: {
      zh: '托福由美国教育考试服务中心（ETS）举办，最常见的网络考试形式（TOEFL iBT）通过互联网作答，口语以录音方式完成。',
      en: 'TOEFL is administered by Educational Testing Service (ETS). The most common format, TOEFL iBT, is taken online with speaking recorded via microphone.',
    },
    facts: [
      { label: { zh: '举办机构', en: 'Administrator' }, value: { zh: '美国教育考试服务中心（ETS）', en: 'Educational Testing Service (ETS)' } },
      {
        label: { zh: '常见形式', en: 'Common format' },
        value: { zh: '网络考试（Internet-based Test）。', en: 'Internet-based Test.' },
      },
      {
        label: { zh: '作答方式', en: 'Response mode' },
        value: { zh: '口语通过麦克风录音作答；写作通过键盘输入完成。', en: 'Speaking is recorded via microphone; writing is typed.' },
      },
      {
        label: { zh: '成绩有效期', en: 'Validity' },
        value: { zh: '通常视为两年内有效，以接收机构要求为准。', en: 'Commonly treated as valid for two years; the receiving institution decides.' },
      },
    ],
    caveats: [
      {
        zh: '总分达标但单项不足时，仍可能不满足院校的语言条件，须以院校公布的单项要求为准。',
        en: 'A sufficient total with a weak section may still fail an institution\u2019s language condition; check the published per-section requirement.',
      },
    ],
    sources: [{ body: 'ets', note: '考试结构、四项技能评分与成绩有效期的官方来源。' }],
    verifiedAt: '2026-09',
    academicYear: '2026/27',
  },
];

export const policyEntriesBySlug = new Map(policyEntries.map((entry) => [entry.slug, entry]));

export function getPolicy(slug: string): PolicyEntry | undefined {
  return policyEntriesBySlug.get(slug);
}
