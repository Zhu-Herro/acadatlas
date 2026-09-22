/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MAINLAND CHINA ADMISSION ROUTES  (中国内地升学)
 * ─────────────────────────────────────────────────────────────────────────────
 * The most-asked question from Chinese-speaking families is not "how does the
 * DSE work" but "what score gets my child into which mainland university".
 *
 * This file answers it the only defensible way: by publishing the OFFICIAL
 * framework and the official minimum standards, with the government document
 * that establishes each one. Retrieved and verified on 2026-09-21 from:
 *
 *   • 教育部《2026年内地高校招收香港中学文凭考试学生办法》  (2025-11-03)
 *   • 广东省教育考试院《关于公布2026年普通高等学校联合招收华侨港澳台学生
 *     录取最低分数线的通知》 联招〔2026〕20号  (2026-06-18)
 *
 * It deliberately does NOT publish institution-by-institution cut-offs that it
 * cannot attribute. Institution-level data lives in `requirements.ts`, where
 * every row carries a source and a verified / pending flag.
 */

import type { RawSource } from '@/lib/sources';
import type { LocalizedText } from './scales';

export interface ChinaRouteFact {
  label: LocalizedText;
  value: LocalizedText;
  /** Flag facts that define a hard legal minimum rather than a guideline. */
  emphasis?: boolean;
}

export interface ChinaRoute {
  id: string;
  name: LocalizedText;
  /** Who this route is for. */
  audience: LocalizedText;
  summary: LocalizedText;
  facts: ChinaRouteFact[];
  /** Step-by-step process, in official order. */
  steps?: { step: string; detail: LocalizedText }[];
  caveats: LocalizedText[];
  sources: RawSource[];
  academicYear: string;
  verifiedAt: string;
}

export const chinaRoutes: ChinaRoute[] = [
  {
    id: 'dse-scheme',
    name: {
      zh: '内地高校招收香港中学文凭考试学生计划',
      en: 'Mainland university admission scheme for DSE candidates',
    },
    audience: {
      zh: '持有香港永久性／非永久性居民身份证，及港澳居民来往内地通行证（或港澳居民居住证），并参加当年文凭试的考生。',
      en: 'Candidates holding a Hong Kong permanent or non-permanent identity card plus a Mainland Travel Permit (or Mainland Residence Permit for Hong Kong/Macau residents), who are sitting that year\u2019s DSE.',
    },
    summary: {
      zh: '这是香港学生以文凭试成绩直接申请内地高校的主要官方渠道。它使用「核心科目等级组合」作为最低录取标准，而不是换算成分数——这是与内地高考最大的结构差异。',
      en: 'The main official route for Hong Kong students to apply to mainland universities using DSE results. It expresses the minimum standard as a combination of core-subject LEVELS rather than a converted score — the key structural difference from the gaokao.',
    },
    facts: [
      {
        label: { zh: '最低录取标准（普通类）', en: 'Minimum standard (general)', },
        value: {
          zh: '「3、3、2、A」：中国语文科达第 3 级及以上、英国语文科达第 3 级及以上、数学科达第 2 级及以上、公民科达标。',
          en: '"3, 3, 2, A": Chinese Language at Level 3 or above, English Language at Level 3 or above, Mathematics at Level 2 or above, and Citizenship and Social Development attained.',
        },
        emphasis: true,
      },
      {
        label: { zh: '校长推荐计划', en: 'Principal\u2019s nomination scheme' },
        value: {
          zh: '公民科达标，其余三门核心科目分数之和须为 8 分（含）以上，且任何一门科目不得低于 2 分（含）。名额每校 8 名。',
          en: 'Citizenship attained, the other three core subjects totalling 8 points or above, and no single subject below 2. Each school has 8 places.',
        },
        emphasis: true,
      },
      {
        label: { zh: '艺术体育类专业', en: 'Arts and physical education programmes' },
        value: {
          zh: '最低录取标准为「2、2、1、A」。此类专业另需留意高校的面试或专业考试时间与地点。',
          en: 'Minimum standard is "2, 2, 1, A". These programmes may also require an interview or practical test, with its own timing and venue.',
        },
        emphasis: true,
      },
      {
        label: { zh: '残障考生', en: 'Applicants with disabilities' },
        value: {
          zh: '视障、听障及轻度孤独症类：公民科达标，中、英、数三科核心科目总分不低于 4 分（含）。残肢类：公民科达标，三门核心科目总分不低于 7 分（含）。',
          en: 'Visual, hearing or mild autism-related disabilities: Citizenship attained and the three core subjects totalling 4 points or above. Limb-related disabilities: Citizenship attained and the three core subjects totalling 7 points or above.',
        },
        emphasis: true,
      },
      {
        label: { zh: '院校附加要求', en: 'Institution-level additional requirements' },
        value: {
          zh: '除四门核心科目外，高校可按专业需要指定一至两门选修科目并明确所需等级。因此「达到最低标准」只是资格线，不是录取线。',
          en: 'Beyond the four core subjects, institutions may nominate one or two elective subjects with a required level. Meeting the minimum standard is therefore an eligibility threshold, not an admission threshold.',
        },
      },
      {
        label: { zh: '志愿填报', en: 'Application choices' },
        value: {
          zh: '每位考生可填报 4 所高校，每所高校可填报 4 个专业志愿；5 月 14 日前可修改志愿，逾期不得修改。投档按志愿先后顺序进行（公告未使用「平行志愿」表述）。',
          en: 'Each candidate may apply to 4 institutions, with up to 4 programme choices each. Choices may be amended until 14 May, after which they are locked. Documents are dispatched in the order of the applicant\u2019s choices (the notice does not use the term "parallel志愿").',
        },
      },
      {
        label: { zh: '费用与学籍', en: 'Fees and student status' },
        value: {
          zh: '报名费港币 460 元。学费和杂费收费标准与内地同校同专业学生相同。招生不占国家下达的普通高校招生计划。',
          en: 'Application fee HK$460. Tuition and miscellaneous fees are the same as for mainland students in the same institution and programme. These places do not occupy the institution\u2019s national enrolment quota.',
        },
      },
    ],
    steps: [
      {
        step: '2025-12-01 → 12-31',
        detail: {
          zh: '登录「招收香港中学文凭考试学生网上报名系统」完成网上报名，填报志愿、上传证件与学习证明材料。',
          en: 'Online registration through the dedicated application system: submit choices, upload identity documents and study evidence.',
        },
      },
      {
        step: '2026-01-10 前',
        detail: { zh: '登录报名系统查看报名审核结果。', en: 'Check the registration review result in the system.' },
      },
      {
        step: '2026-01-16 前',
        detail: {
          zh: '审核未通过的考生按系统提示更正信息并再次提交，1 月 23 日前查询复核结果。',
          en: 'Candidates who failed review correct the information and resubmit; re-check the outcome by 23 January.',
        },
      },
      {
        step: '2026-01-31 前',
        detail: {
          zh: '向中国教育交流（港澳）中心缴付报名费港币 460 元，并上传缴费凭证。',
          en: 'Pay the HK$460 fee to the China Education Exchange (Hong Kong & Macau) Centre and upload the receipt.',
        },
      },
      {
        step: '2026-02-14 前',
        detail: { zh: '官方公布缴费及报名确认结果。', en: 'Payment and registration confirmation results are published.' },
      },
      {
        step: '2026-05-14 前',
        detail: { zh: '志愿修改截止，逾期不得修改。', en: 'Final deadline for amending choices.' },
      },
      {
        step: '2026-06-14 前',
        detail: {
          zh: '考生上传「学生学习概览」；校长推荐计划表格及相关文件由中学上传，逾期不予受理。',
          en: 'Upload the student learning profile. The Principal\u2019s Nomination form is uploaded by the school; late submissions are not accepted.',
        },
      },
      {
        step: '2026-07',
        detail: {
          zh: '7 月中旬 HKEAA 将成绩传送至联招办；7 月下旬联招办按志愿顺序投档；7 月底未完成计划的院校通过征集志愿补录，补录成绩不得低于教育部确定的最低录取标准。',
          en: 'In mid-July HKEAA transmits results; in late July the joint admissions office dispatches applications in choice order; at the end of July institutions with unfilled places run a supplementary round, and supplementary admissions may not fall below the MOE minimum standard.',
        },
      },
    ],
    caveats: [
      {
        zh: '上述日期为《2026年办法》规定的时间表，每年会重新发布。请以当年教育部办法与联招办公告为准。',
        en: 'The dates above are from the 2026 scheme and are re-issued each year. Always confirm against the current MOE scheme and the joint admissions office.',
      },
      {
        zh: '达到最低录取标准只代表具备被投档资格。是否录取由高校按已公布的招生章程择优决定，并可能附加选修科目等级要求。',
        en: 'Meeting the minimum standard only establishes eligibility for dispatch. Admission is decided by each institution under its published charter and may include elective subject requirements.',
      },
      {
        zh: '参与院校名单与专业目录每年更新，由香港教育局与联招办公布，本页不固化院校名单。',
        en: 'The participating institution list and programme catalogue are updated annually and published by the Hong Kong Education Bureau and the joint admissions office; this page does not freeze the list.',
      },
    ],
    sources: [
      { body: 'moeDseScheme', note: '最低录取标准、校长推荐计划、艺体类与残障考生标准、时间表与志愿规则的官方出处。' },
      { body: 'edbMainland', note: '参与院校名单与专业目录的香港官方发布渠道。' },
      { body: 'hkmslq', note: '录取结果查询的官方系统。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },

  {
    id: 'joint-enrolment',
    name: { zh: '全国联招（华侨港澳台联考）', en: 'National joint enrolment examination' },
    audience: {
      zh: '华侨、港澳地区及台湾省学生。在港澳台侨身份下，这是一条与文凭试招生计划并列的内地升学渠道，使用独立考试与分数制。',
      en: 'Overseas Chinese, Hong Kong, Macau and Taiwan students. It runs in parallel with the DSE scheme but uses its own examination and a points-based system.',
    },
    summary: {
      zh: '与文凭试招生计划的等级制不同，全国联招采用总分制并按批次划线。2026 年的本科批次普通类分数线为文史类 430 分、理工类 445 分；部分院校执行更高的「高分线」。',
      en: 'Unlike the level-based DSE scheme, the joint enrolment examination uses total scores with published batch lines. For 2026 the undergraduate general line is 430 for the humanities track and 445 for the science track, with some institutions operating a higher "high-score line".',
    },
    facts: [
      {
        label: { zh: '本科批次 · 普通类', en: 'Undergraduate · general' },
        value: { zh: '文史类 430 分 · 理工类 445 分', en: 'Humanities 430 · Sciences 445' },
        emphasis: true,
      },
      {
        label: { zh: '本科批次 · 高分线（部分院校执行）', en: 'Undergraduate · high-score line (selected institutions)' },
        value: {
          zh: '文史类 515 分 · 理工类 535 分。执行高分线的院校名单详见全国联招管理系统。',
          en: 'Humanities 515 · Sciences 535. The list of institutions applying the high-score line is published in the joint enrolment management system.',
        },
        emphasis: true,
      },
      {
        label: { zh: '本科批次 · 艺术类', en: 'Undergraduate · arts' },
        value: { zh: '文史类 330 分 · 理工类 345 分', en: 'Humanities 330 · Sciences 345' },
        emphasis: true,
      },
      {
        label: { zh: '本科批次 · 体育类', en: 'Undergraduate · sport' },
        value: { zh: '文史类 330 分 · 理工类 345 分', en: 'Humanities 330 · Sciences 345' },
        emphasis: true,
      },
      {
        label: { zh: '预科批次', en: 'Preparatory year' },
        value: {
          zh: '文史类 410 分 · 理工类 425 分。其中暨南大学单独划线：文史类 495 分 · 理工类 515 分。',
          en: 'Humanities 410 · Sciences 425. Jinan University sets its own line: Humanities 495 · Sciences 515.',
        },
        emphasis: true,
      },
      {
        label: { zh: '公告文号与依据', en: 'Notice reference' },
        value: {
          zh: '联招〔2026〕20 号，由联招办署名发布，经广东省教育考试院公告渠道公布，文件状态为现行有效。',
          en: 'Reference 联招〔2026〕20号, signed by the joint admissions office and published through the Guangdong Education Examinations Authority, currently in force.',
        },
      },
    ],
    caveats: [
      {
        zh: '分数线每年重新公布，且不同批次的适用范围不同，不可跨年直接套用。',
        en: 'The lines are republished every year and apply only to their own batch; they cannot be carried across years.',
      },
      {
        zh: '本页不提供「多少分能上哪所学校」的对应表。院校实际录取分数通常高于批次线，且逐年波动，须以院校公布与官方系统为准。',
        en: 'This page does not provide a "which score gets into which university" table. Actual institutional cut-offs are usually above the batch line and move year to year; the institution and the official system are authoritative.',
      },
    ],
    sources: [
      { body: 'gdEea', note: '2026 年各批次录取最低分数线的发布渠道。' },
      { body: 'moe', note: '联招工作由教育部委托联招办组织的依据。' },
    ],
    academicYear: '2026/27',
    verifiedAt: '2026-09',
  },
];

/** Where a reader should go to verify an institution-level number themselves. */
export interface VerificationPointer {
  label: LocalizedText;
  description: LocalizedText;
  href: string;
}

export const verificationPointers: VerificationPointer[] = [
  {
    label: { zh: '内地 · 文凭试招生计划', en: 'Mainland · DSE admission scheme' },
    description: {
      zh: '院校名单、专业目录与计划指南由香港教育局与联招办公布，是核对「某校某专业要求什么等级」的第一入口。',
      en: 'Institution lists, programme catalogues and the scheme guide are published by the Hong Kong Education Bureau and the joint admissions office — the first place to check what level a given programme requires.',
    },
    href: 'https://www.edb.gov.hk/tc/edu-system/postsecondary/policy-doc/pilot-scheme.html',
  },
  {
    label: { zh: '内地 · 全国联招管理系统', en: 'Mainland · joint enrolment system' },
    description: {
      zh: '查询执行「高分线」的院校名单，以及本人录取结果。',
      en: 'Check which institutions apply the high-score line, and look up an individual admission result.',
    },
    href: 'https://www.eeagd.edu.cn/hkmslq/ks/',
  },
  {
    label: { zh: '香港 · 大学联合招生办法（JUPAS）', en: 'Hong Kong · JUPAS' },
    description: {
      zh: '本地院校的收生分数、计分方式与课程收生数据由 JUPAS 与各院校公布，是核对本地升学要求的权威入口。',
      en: 'Local admission scores, scoring methods and programme admission data are published by JUPAS and individual institutions — the authoritative route for local requirements.',
    },
    href: 'https://www.jupas.edu.hk/en/',
  },
  {
    label: { zh: '英国 · UCAS', en: 'United Kingdom · UCAS' },
    description: {
      zh: '英国本科的入学要求、资历换算（tariff）与申请节点以 UCAS 及各院校官网为准。',
      en: 'UK undergraduate entry requirements, qualification tariffs and application deadlines are governed by UCAS and each institution.',
    },
    href: 'https://www.ucas.com/',
  },
];
