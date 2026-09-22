/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE EDUCATION CHAIN
 * ─────────────────────────────────────────────────────────────────────────────
 * The six links every education pathway passes through (brief, section 9).
 * Systems differ in how they answer each link — but the chain itself is
 * universal, which is what makes comparison possible.
 */

import type { Locale } from '@/i18n/ui';

export interface ChainStep {
  id: string;
  label: Record<Locale, string>;
  note: Record<Locale, string>;
}

export const educationChain: ChainStep[] = [
  {
    id: 'student',
    label: { zh: '学生', en: 'Student' },
    note: {
      zh: '起点：学习背景、语言能力与目标方向。',
      en: 'The starting point: academic background, language and goals.',
    },
  },
  {
    id: 'system',
    label: { zh: '教育体系', en: 'Education system' },
    note: {
      zh: '选择一套课程体系，它决定了后续的所有环节。',
      en: 'Choosing a curriculum framework, which shapes everything downstream.',
    },
  },
  {
    id: 'subjects',
    label: { zh: '学科', en: 'Subjects' },
    note: {
      zh: '可选的科目范围，以及选择与组合的自由度。',
      en: 'What can be studied, and how freely subjects can be combined.',
    },
  },
  {
    id: 'assessment',
    label: { zh: '评估', en: 'Assessment' },
    note: {
      zh: '成绩如何产生：终结性考试、校本评核，或两者并行。',
      en: 'How results are produced: final exams, internal assessment, or both.',
    },
  },
  {
    id: 'university',
    label: { zh: '大学', en: 'University' },
    note: {
      zh: '成绩被哪些国家、地区与院校接受。',
      en: 'Which countries, regions and institutions accept the qualification.',
    },
  },
  {
    id: 'career',
    label: { zh: '职业方向', en: 'Career' },
    note: {
      zh: '学科与升学选择最终指向的专业与职业路径。',
      en: 'The professions and fields those choices eventually lead towards.',
    },
  },
];
