/**
 * ─────────────────────────────────────────────────────────────────────────────
 * UI DICTIONARIES
 * ─────────────────────────────────────────────────────────────────────────────
 * Interface chrome (navigation, buttons, labels) lives here.
 * Domain content (systems, exams, guides) lives in `src/content/**` and
 * `src/data/**` — never in this file.
 *
 * Adding a third language = add an entry to `languages` + a dictionary below.
 * TypeScript will then enforce that every key is translated.
 */

export const languages = {
  zh: '中文',
  en: 'EN',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'zh';

export const locales = Object.keys(languages) as Locale[];

/** BCP-47 tags used for <html lang>, hreflang and Open Graph. */
export const htmlLang: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

/** ── Chinese dictionary (source of truth for the key set) ──────────────── */
const zh = {
  // Navigation -------------------------------------------------------------
  'nav.explore': '探索',
  'nav.systems': '教育体系',
  'nav.exams': '考试体系',
  'nav.pathways': '升学路径',
  'nav.guides': '教育指南',
  'nav.resources': '资源中心',
  'nav.about': '关于平台',
  'nav.contact': '联系我们',
  'nav.compare': '体系比较',
  'nav.search': '搜索',
  'nav.menu': '菜单',
  'nav.openMenu': '打开导航菜单',
  'nav.closeMenu': '关闭导航菜单',
  'nav.home': '首页',
  'nav.primary': '主导航',
  'nav.breadcrumb': '面包屑导航',
  'nav.languageSwitcher': '切换语言',
  'nav.skipToContent': '跳到主要内容',
  'nav.currentLanguage': '当前语言',

  // Common -----------------------------------------------------------------
  'common.readMore': '阅读全文',
  'common.explore': '深入了解',
  'common.open': '打开',
  'common.viewAll': '查看全部',
  'common.back': '返回',
  'common.home': '首页',
  'common.updated': '最后更新',
  'common.published': '发布',
  'common.readingTime': '阅读时间',
  'common.minute': '分钟',
  'common.sources': '信息来源',
  'common.sourcesIntro':
    '本页信息基于以下官方机构与公开文件整理。具有时效性的内容请以官方最新公告为准。',
  'common.region': '地区',
  'common.academicYear': '适用学年',
  'common.category': '分类',
  'common.tags': '标签',
  'common.related': '相关内容',
  'common.relatedArticles': '相关文章',
  'common.faq': '常见问题',
  'common.onThisPage': '本页目录',
  'common.futureModule': '规划中的模块',
  'common.comingSoon': '即将上线',
  'common.notAvailable': '暂无内容',
  'common.results': '条结果',
  'common.noResults': '没有找到匹配内容',
  'common.clear': '清除',
  'common.close': '关闭',
  'common.reset': '重置',
  'common.copy': '复制',
  'common.copied': '已复制',
  'common.contents': '目录',
  'common.next': '下一节',
  'common.previous': '上一节',
  'common.sectionOf': '第 {current} / {total} 节',
  'common.updatedOn': '更新于 {date}',
  'common.readingMinutes': '约 {minutes} 分钟',
  'common.editorialNoteTitle': '关于信息可信度',
  'common.conceptDisclaimer': '概念示意，非招生政策依据',
  'common.selectAll': '全选',
  'common.deselect': '取消选择',
  'common.expand': '展开',
  'common.collapse': '收起',
  'common.optional': '选填',
  'common.required': '必填',
  'common.yes': '是',
  'common.no': '否',

  // Home -------------------------------------------------------------------
  'home.hero.eyebrow': '国际教育信息平台',
  'home.hero.line1': '教育',
  'home.hero.line2': '从来不是',
  'home.hero.line3': '一条路径。',
  'home.hero.lede':
    '一个帮助你理解国际教育体系、课程结构、评估方式与升学机会的现代信息平台。',
  'home.hero.cta': '探索教育体系',
  'home.hero.scroll': '向下滚动',
  'home.hero.figureCaption': '图 01 — 国际教育体系关系网络 · 概念示意',
  'home.intro.label': '一个相互关联的信息体系',
  'home.intro.title1': '教育不是一个答案，',
  'home.intro.title2': '而是一张地图。',
  'home.intro.body':
    '世界上并存着多种教育体系。它们拥有不同的课程结构、评估方式与升学方向。理解差异，是做出教育选择的第一步。我们不提供结论，我们整理事实。',
  'home.intro.point1': '课程结构',
  'home.intro.point2': '评估方式',
  'home.intro.point3': '升学路径',
  'home.s1.label': '教育体系',
  'home.s1.title1': '同一个世界。',
  'home.s1.title2': '不同的路径。',
  'home.s1.body':
    '不同的体系拥有不同的结构、评估方式与升学方向。我们用统一的框架整理它们，让差异可以被并排比较，而不是被印象决定。',
  'home.s2.label': '教育地图',
  'home.s2.title': '从学生，到未来。',
  'home.s2.body':
    '任何一条教育路径都沿着同一条链条展开：从课程与学科，到评估与考试，再到大学与职业方向。不同体系在每一条链路上给出不同的答案。',
  'home.s3.label': '升学路径',
  'home.s3.title1': '从学校，',
  'home.s3.title2': '走向大学。',
  'home.s3.body':
    '不同体系通向不同的目的地。这里呈现的是路径关系与方向，而不是具体录取要求。',
  'home.s4.label': '教育指南',
  'home.s4.title1': '从问题出发，',
  'home.s4.title2': '而不是从结论出发。',
  'home.s4.lede': '围绕体系选择、课程结构与升学规划整理的长期参考内容。',
  'home.s5.label': '探索',
  'home.s5.title1': '搜索你的',
  'home.s5.title2': '教育问题。',
  'home.s5.body': '按教育体系、考试、升学路径或主题检索站内全部内容。',
  'home.s5.cta': '打开搜索',
  'home.close.tagline': '理解教育。做出更好的选择。',
  'home.close.cta': '开始探索',

  // Section template (system & exam detail pages) ---------------------------
  'section.overview.label': '概览',
  'section.overview.question': '什么是{name}？',
  'section.structure.label': '结构',
  'section.structure.question': '{name}是如何运作的？',
  'section.subjects.label': '科目',
  'section.subjects.question': '学生可以学习哪些内容？',
  'section.assessment.label': '评估',
  'section.assessment.question': '学生如何被评估？',
  'section.pathways.label': '升学路径',
  'section.pathways.question': '它可以通向哪里？',
  'section.suitability.label': '适合人群',
  'section.suitability.question': '哪些学生可能会考虑这条路径？',
  'section.compare.label': '比较',
  'section.compare.question': '{name}与其他体系有何不同？',
  'section.content.label': '考试内容',
  'section.content.question': '{name}考什么？',
  'section.scoring.label': '评分与成绩',
  'section.scoring.question': '{name}如何评分？',
  'section.recognition.label': '认可情况',
  'section.recognition.question': '哪些机构使用{name}的成绩？',
  'section.faq.label': '常见问题',
  'section.faq.question': '关于{name}的常见问题',
  'section.sources.label': '信息来源',
  'section.sources.question': '本页信息的依据',
  'section.toc': '本页结构',

  // Systems ----------------------------------------------------------------
  'systems.title': '教育体系',
  'systems.lede':
    '世界上并存着多种课程体系。它们在结构、评估方式与升学方向上各不相同。理解这些差异，是做出判断的前提。',
  'systems.grouping': '信息分类',
  'systems.group.curriculum': '课程体系',
  'systems.group.curriculum.note': '完整的课程与资格体系，通常跨越 2–4 年。',
  'systems.group.exam': '资格考试',
  'systems.group.exam.note': '标准化考试，用于大学录取评估，本身不是课程体系。',
  'systems.group.language': '语言测试',
  'systems.group.language.note': '证明语言能力的测试，与学术课程分开评估。',
  'systems.group.admission': '大学招生',
  'systems.group.admission.note': '招生流程与平台，不是课程或考试。',
  'systems.note':
    '课程体系、资格考试、语言测试与大学招生是四类不同的信息。我们分开呈现，避免把它们混为一谈。',
  'systems.quickFacts': '快速事实',
  'systems.region': '主要地区',
  'systems.type': '类型',
  'systems.exploreSystem': '查看该体系',
  'systems.notFound': '未找到该教育体系',

  // Exams ------------------------------------------------------------------
  'exams.title': '考试与评估',
  'exams.lede':
    '考试不是课程体系。它是评估工具——用于衡量学生已经掌握的内容，或用于大学录取判断。',
  'exams.note':
    'SAT / ACT 属于大学入学标准化考试；IELTS / TOEFL 属于语言能力测试。二者都不构成完整的课程路径，也不产生学位或毕业资格。',
  'exams.familyStandardised': '大学入学标准化考试',
  'exams.familyLanguage': '语言能力测试',

  // Pathways ---------------------------------------------------------------
  'pathways.title': '升学路径',
  'pathways.lede':
    '不同教育体系通向不同国家与地区的大学。这里呈现的是路径关系与方向，而不是录取标准。',
  'pathways.note':
    '录取标准每年调整，且因学校、专业与学生背景而异。请始终以各大学与招生机构官方公告为准。',
  'pathways.destinations': '目的地',
  'pathways.connectedSystems': '相关教育体系',
  'pathways.flowLabel': '教育路径链条',
  'pathways.flowNote': '概念示意 / 不代表具体录取要求',

  // Guides -----------------------------------------------------------------
  'guides.title': '教育指南',
  'guides.lede': '从基础概念到体系比较，围绕真实的决策问题整理的长期参考内容。',
  'guides.all': '全部指南',
  'guides.categories': '分类',
  'guides.category.guides': '基础指南',
  'guides.category.comparison': '体系比较',
  'guides.category.admissions': '升学与招生',
  'guides.category.curriculum': '课程结构',
  'guides.category.strategy': '学习策略',
  'guides.category.universities': '大学',
  'guides.featured': '精选内容',
  'guides.inCategory': '该分类下的内容',

  // Resources --------------------------------------------------------------
  'resources.title': '资源中心',
  'resources.lede': '官方机构、公开文件与可信来源的集中索引。所有引用均可追溯。',
  'resources.officialBodies': '官方机构',
  'resources.internal': '站内内容',
  'resources.note':
    '本页只收录官方或公开发布的来源。第三方解读类内容不会被列为主要依据。',

  // About ------------------------------------------------------------------
  'about.title': '关于平台',
  'about.lede': '一个面向学生、家长与教育从业者的国际教育信息与决策平台。',
  'about.missionTitle': '我们在做什么',
  'about.missionBody':
    '国际教育领域的信息分散在数以百计的官方文件、机构网站与二手解读之中。我们把这些信息整理成统一、可比较、可追溯的结构化内容，让「选哪条路」这个问题变得更容易回答。',
  'about.principlesTitle': '我们坚持的原则',
  'about.principle1.title': '不编造',
  'about.principle1.body':
    '不为了显得专业而生成看起来合理但无法追溯的教育信息。没有可靠来源的内容不写。',
  'about.principle2.title': '可追溯',
  'about.principle2.body':
    '所有具有时效性的信息都标明来源、适用学年、地区与更新日期。',
  'about.principle3.title': '不混淆',
  'about.principle3.body':
    '课程体系、资格考试、语言测试与大学招生是四件事。我们严格区分，不把它们堆在一起。',
  'about.principle4.title': '可比较',
  'about.principle4.body':
    '用统一的维度整理不同体系，让差异可以被并排阅读，而不是被印象决定。',
  'about.roadmapTitle': '平台规划',
  'about.roadmapBody': '第一阶段以内容、结构与可信度为核心。以下能力在架构中已预留接口。',
  'about.stackTitle': '技术说明',
  'about.stackBody':
    '平台采用内容驱动架构：内容与界面分离，可静态部署，也可在未来平滑迁移至数据库或 CMS。',
  'about.contactTitle': '保持联系',
  'about.contactBody': '有内容纠错、合作意向或使用反馈，欢迎直接联系我们。',

  // Roadmap ----------------------------------------------------------------
  'roadmap.compare': '体系比较工具',
  'roadmap.compare.note': '按统一维度并排比较 2–4 个教育体系。',
  'roadmap.selector': '课程与路径选择工具',
  'roadmap.selector.note': '根据学生背景与目标推荐可考虑的体系。',
  'roadmap.regions': '国家 / 地区信息',
  'roadmap.regions.note': '按目的地整理的升学环境与要求概览。',
  'roadmap.universities': '大学与专业资料',
  'roadmap.universities.note': '大学录取资料与专业方向的整理。',
  'roadmap.schools': '学校信息',
  'roadmap.schools.note': '开设国际课程的学校信息与对比。',
  'roadmap.planner': '升学路径规划',
  'roadmap.planner.note': '按时间轴规划考试与申请节点。',
  'roadmap.assessment': '个性化测评',
  'roadmap.assessment.note': '结构化测评，帮助定位适合的路径。',
  'roadmap.aiAssistant': 'AI 教育助手',
  'roadmap.aiAssistant.note': '基于站内可信内容回答教育问题。',
  'roadmap.aiMaterials': 'AI 个性化学习资料',
  'roadmap.aiMaterials.note': '按目标体系与学科生成学习材料。',
  'roadmap.consulting': '教育咨询服务',
  'roadmap.consulting.note': '一对一的信息解读与决策支持。',
  'roadmap.membership': '会员与付费内容',
  'roadmap.membership.note': '深度报告与工具的使用权限。',
  'roadmap.products': '学习资料产品',
  'roadmap.products.note': '结构化学习与备考资料。',

  // Compare ----------------------------------------------------------------
  'compare.title': '比较教育体系',
  'compare.lede':
    '选择 2 至 4 个教育体系，按统一维度并排比较它们在结构、评估与升学方向上的差异。',
  'compare.selector': '选择要比较的体系',
  'compare.selected': '已选择 {count} / 4',
  'compare.empty': '请至少选择 2 个教育体系开始比较。',
  'compare.emptyHint': '上方的体系标签可以直接点击选择。',
  'compare.maxReached': '最多可同时比较 4 个体系。请先取消一个。',
  'compare.minHint': '再选择 1 个体系即可开始比较。',
  'compare.clear': '清除全部',
  'compare.dimension': '比较维度',
  'compare.dimensionsCount': '{count} 个维度',
  'compare.viewSystem': '查看该体系',
  'compare.note': '比较结果为结构性描述，不代表录取要求或教学质量评价。',
  'compare.referenceOnly': '仅作结构比较',
  'compare.legend': '图例',
  'compare.difference': '差异',
  'compare.similarity': '共性',

  // Compare dimensions -----------------------------------------------------
  'dimension.academicStructure': '学术结构',
  'dimension.assessment': '评估方式',
  'dimension.subjectChoice': '科目选择',
  'dimension.learningStyle': '学习方式',
  'dimension.examStyle': '考试风格',
  'dimension.universityPathways': '升学方向',
  'dimension.geographicReach': '地理覆盖',
  'dimension.flexibility': '灵活度',
  'dimension.studentProfile': '典型学生画像',

  // Search -----------------------------------------------------------------
  'search.title': '搜索',
  'search.placeholder': '搜索教育体系、考试、升学路径…',
  'search.open': '打开搜索',
  'search.hint': '按 ↑ ↓ 选择 · Enter 打开 · Esc 关闭',
  'search.empty': '没有找到匹配内容。试试「DSE」「IB」「升学路径」等关键词。',
  'search.suggestions': '可以试试',
  'search.kind.system': '教育体系',
  'search.kind.exam': '考试',
  'search.kind.guide': '指南',
  'search.kind.page': '页面',
  'search.indexing': '正在建立索引…',
  'search.resultCount': '找到 {count} 条结果',

  // Contact ----------------------------------------------------------------
  'contact.title': '联系我们',
  'contact.lede': '内容纠错、合作意向、使用反馈，都可以直接联系我们。',
  'contact.form.title': '发送消息',
  'contact.form.name': '称呼',
  'contact.form.email': '邮箱',
  'contact.form.topic': '主题',
  'contact.form.topic.content': '内容纠错',
  'contact.form.topic.partnership': '合作',
  'contact.form.topic.feedback': '产品反馈',
  'contact.form.topic.other': '其他',
  'contact.form.message': '内容',
  'contact.form.submit': '提交',
  'contact.form.note':
    '第一阶段为静态网站，表单接口尚未接入。请通过下方邮箱直接联系我们。',
  'contact.form.placeholder.name': '你的称呼',
  'contact.form.placeholder.email': 'you@example.com',
  'contact.form.placeholder.message': '请简单描述你的问题或建议…',
  'contact.direct': '直接联系',
  'contact.responseTime': '我们通常在 2–3 个工作日内回复。',

  // Footer -----------------------------------------------------------------
  'footer.explore': '浏览',
  'footer.about': '关于',
  'footer.legal': '说明',
  'footer.rights': '保留所有权利。',
  'footer.note': '本站为信息整理平台，不替代官方招生文件。',
  'footer.builtWith': '内容驱动架构 · Astro + TypeScript + Tailwind',
  'footer.backToTop': '回到顶部',

  // 404 --------------------------------------------------------------------
  '404.label': '错误 404',
  '404.title': '这个页面不存在。',
  '404.lede': '你访问的页面可能已被移动或移除。可以从下面的入口继续浏览。',
  '404.suggestions': '你可能想找',

  // Accessibility ----------------------------------------------------------
  'a11y.skip': '跳到主要内容',
  'a11y.decorative': '装饰性图形',
  'a11y.externalLink': '在新窗口打开外部链接',
  'a11y.carousel': '内容列表',
} as const;

export type UIKey = keyof typeof zh;

/** ── English dictionary (must mirror every key of `zh`) ─────────────────── */
const en: Record<UIKey, string> = {
  // Navigation -------------------------------------------------------------
  'nav.explore': 'Explore',
  'nav.systems': 'Systems',
  'nav.exams': 'Exams',
  'nav.pathways': 'Pathways',
  'nav.guides': 'Guides',
  'nav.resources': 'Resources',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.compare': 'Compare',
  'nav.search': 'Search',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open navigation menu',
  'nav.closeMenu': 'Close navigation menu',
  'nav.home': 'Home',
  'nav.primary': 'Primary',
  'nav.breadcrumb': 'Breadcrumb',
  'nav.languageSwitcher': 'Change language',
  'nav.skipToContent': 'Skip to main content',
  'nav.currentLanguage': 'Current language',

  // Common -----------------------------------------------------------------
  'common.readMore': 'Read',
  'common.explore': 'Explore',
  'common.open': 'Open',
  'common.viewAll': 'View all',
  'common.back': 'Back',
  'common.home': 'Home',
  'common.updated': 'Last updated',
  'common.published': 'Published',
  'common.readingTime': 'Reading time',
  'common.minute': 'min',
  'common.sources': 'Sources',
  'common.sourcesIntro':
    'This page is compiled from the official organisations and public documents listed below. Time-sensitive details should always be confirmed against the latest official announcement.',
  'common.region': 'Region',
  'common.academicYear': 'Applicable year',
  'common.category': 'Category',
  'common.tags': 'Tags',
  'common.related': 'Related',
  'common.relatedArticles': 'Related articles',
  'common.faq': 'FAQ',
  'common.onThisPage': 'On this page',
  'common.futureModule': 'Planned module',
  'common.comingSoon': 'Coming soon',
  'common.notAvailable': 'Not available yet',
  'common.results': 'results',
  'common.noResults': 'No matching content',
  'common.clear': 'Clear',
  'common.close': 'Close',
  'common.reset': 'Reset',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.contents': 'Contents',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.sectionOf': 'Section {current} of {total}',
  'common.updatedOn': 'Updated {date}',
  'common.readingMinutes': '{minutes} min read',
  'common.editorialNoteTitle': 'About our sources',
  'common.conceptDisclaimer': 'Concept illustration, not an admissions statement',
  'common.selectAll': 'Select all',
  'common.deselect': 'Deselect',
  'common.expand': 'Expand',
  'common.collapse': 'Collapse',
  'common.optional': 'optional',
  'common.required': 'required',
  'common.yes': 'Yes',
  'common.no': 'No',

  // Home -------------------------------------------------------------------
  'home.hero.eyebrow': 'International education information',
  'home.hero.line1': 'Education',
  'home.hero.line2': 'was never',
  'home.hero.line3': 'one path.',
  'home.hero.lede':
    'A modern information platform for navigating international education systems, pathways and opportunities.',
  'home.hero.cta': 'Explore systems',
  'home.hero.scroll': 'Scroll',
  'home.hero.figureCaption': 'Fig. 01 — Global education systems network · concept',
  'home.intro.label': 'One connected information system',
  'home.intro.title1': 'Education is not an answer.',
  'home.intro.title2': 'It is a map.',
  'home.intro.body':
    'Several distinct education systems coexist worldwide. Each has its own curriculum structure, assessment model and progression routes. Understanding the differences is the first step in making an education decision. We do not sell conclusions — we organise facts.',
  'home.intro.point1': 'Curriculum structure',
  'home.intro.point2': 'Assessment',
  'home.intro.point3': 'Progression routes',
  'home.s1.label': 'Education systems',
  'home.s1.title1': 'One world.',
  'home.s1.title2': 'Many pathways.',
  'home.s1.body':
    'Different systems, different structures, different destinations. We organise them inside one framework so the differences can be read side by side instead of guessed at.',
  'home.s2.label': 'Education map',
  'home.s2.title': 'From student to future.',
  'home.s2.body':
    'Every education path follows the same chain: from curriculum and subjects, through assessment and examinations, to universities and careers. Each system answers every link differently.',
  'home.s3.label': 'Pathways',
  'home.s3.title1': 'From school',
  'home.s3.title2': 'to university.',
  'home.s3.body':
    'Different systems lead to different destinations. What follows shows route relationships and directions — not specific admissions requirements.',
  'home.s4.label': 'Guides',
  'home.s4.title1': 'Start from the question,',
  'home.s4.title2': 'not the conclusion.',
  'home.s4.lede':
    'Long-form reference material on choosing systems, understanding curricula and planning admissions.',
  'home.s5.label': 'Explore',
  'home.s5.title1': 'Search the world',
  'home.s5.title2': 'of education.',
  'home.s5.body': 'Look up any system, examination, pathway or topic across the platform.',
  'home.s5.cta': 'Open search',
  'home.close.tagline': 'Understand education. Make better choices.',
  'home.close.cta': 'Start exploring',

  // Section template -------------------------------------------------------
  'section.overview.label': 'Overview',
  'section.overview.question': 'What is {name}?',
  'section.structure.label': 'Structure',
  'section.structure.question': 'How does {name} work?',
  'section.subjects.label': 'Subjects',
  'section.subjects.question': 'What can students study?',
  'section.assessment.label': 'Assessment',
  'section.assessment.question': 'How are students assessed?',
  'section.pathways.label': 'University pathways',
  'section.pathways.question': 'Where can it lead?',
  'section.suitability.label': 'Who is it for?',
  'section.suitability.question': 'Who may consider this pathway?',
  'section.compare.label': 'Compare',
  'section.compare.question': 'How does {name} differ from other systems?',
  'section.content.label': 'Content',
  'section.content.question': 'What does {name} assess?',
  'section.scoring.label': 'Scoring',
  'section.scoring.question': 'How is {name} scored?',
  'section.recognition.label': 'Recognition',
  'section.recognition.question': 'Who uses a {name} result?',
  'section.faq.label': 'FAQ',
  'section.faq.question': 'Common questions about {name}',
  'section.sources.label': 'Sources',
  'section.sources.question': 'What this page is based on',
  'section.toc': 'Page structure',

  // Systems ----------------------------------------------------------------
  'systems.title': 'Education systems',
  'systems.lede':
    'Several distinct curriculum systems coexist worldwide, each with its own structure, assessment model and progression routes. Understanding those differences is the precondition for any judgement.',
  'systems.grouping': 'How we classify information',
  'systems.group.curriculum': 'Curriculum systems',
  'systems.group.curriculum.note':
    'Complete curriculum and qualification frameworks, usually spanning 2–4 years.',
  'systems.group.exam': 'Qualification & examination',
  'systems.group.exam.note':
    'Standardised examinations used in university admissions. Not curriculum systems in themselves.',
  'systems.group.language': 'Language tests',
  'systems.group.language.note':
    'Tests that evidence language proficiency, assessed separately from academic study.',
  'systems.group.admission': 'University admission',
  'systems.group.admission.note': 'Admissions processes and platforms — not curricula or exams.',
  'systems.note':
    'Curriculum systems, qualification examinations, language tests and university admissions are four different categories. We present them separately so they are never conflated.',
  'systems.quickFacts': 'Quick facts',
  'systems.region': 'Primary region',
  'systems.type': 'Type',
  'systems.exploreSystem': 'Explore this system',
  'systems.notFound': 'This education system could not be found',

  // Exams ------------------------------------------------------------------
  'exams.title': 'Examinations & assessment',
  'exams.lede':
    'An examination is not a curriculum. It is an assessment instrument — used to measure what a student has learned, or to inform university admission.',
  'exams.note':
    'SAT and ACT are university admissions tests; IELTS and TOEFL are language proficiency tests. Neither is a curriculum path, and neither produces a diploma or leaving qualification.',
  'exams.familyStandardised': 'University admissions tests',
  'exams.familyLanguage': 'Language proficiency tests',

  // Pathways ---------------------------------------------------------------
  'pathways.title': 'Pathways',
  'pathways.lede':
    'Different education systems lead to universities in different countries and regions. What follows shows route relationships and directions — not admissions standards.',
  'pathways.note':
    'Admissions standards change every year and vary by institution, programme and applicant profile. Always confirm against the official announcements of the university and admissions body.',
  'pathways.destinations': 'Destinations',
  'pathways.connectedSystems': 'Connected systems',
  'pathways.flowLabel': 'The education chain',
  'pathways.flowNote': 'Concept illustration / not an admissions statement',

  // Guides -----------------------------------------------------------------
  'guides.title': 'Guides',
  'guides.lede':
    'From first principles to system comparison — long-form reference material built around real decision problems.',
  'guides.all': 'All guides',
  'guides.categories': 'Categories',
  'guides.category.guides': 'Foundations',
  'guides.category.comparison': 'Comparison',
  'guides.category.admissions': 'Admissions',
  'guides.category.curriculum': 'Curriculum',
  'guides.category.strategy': 'Study strategy',
  'guides.category.universities': 'Universities',
  'guides.featured': 'Featured',
  'guides.inCategory': 'In this category',

  // Resources --------------------------------------------------------------
  'resources.title': 'Resources',
  'resources.lede':
    'A consolidated index of official organisations, public documents and verifiable sources. Every citation is traceable.',
  'resources.officialBodies': 'Official organisations',
  'resources.internal': 'On this platform',
  'resources.note':
    'Only official or publicly published sources are indexed here. Third-party interpretation is not treated as primary evidence.',

  // About ------------------------------------------------------------------
  'about.title': 'About',
  'about.lede':
    'An information and decision platform for international education, built for students, parents and educators.',
  'about.missionTitle': 'What we are building',
  'about.missionBody':
    'Information about international education is scattered across hundreds of official documents, institutional websites and second-hand interpretations. We turn it into one structured, comparable, traceable body of reference material — so that "which path should I take?" becomes a question that can actually be answered.',
  'about.principlesTitle': 'Principles we hold to',
  'about.principle1.title': 'Never invent',
  'about.principle1.body':
    'We do not generate plausible-sounding education information that cannot be traced. If there is no reliable source, we do not write it.',
  'about.principle2.title': 'Always traceable',
  'about.principle2.body':
    'Every time-sensitive claim carries a source, an applicable academic year, a region and an update date.',
  'about.principle3.title': 'Never conflate',
  'about.principle3.body':
    'Curriculum systems, qualification examinations, language tests and university admissions are four different things. We keep them rigorously separate.',
  'about.principle4.title': 'Built to compare',
  'about.principle4.body':
    'Every system is described through the same dimensions, so differences can be read side by side rather than guessed at.',
  'about.roadmapTitle': 'Platform roadmap',
  'about.roadmapBody':
    'Phase one is content, structure and trust. The capabilities below already have a place in the architecture.',
  'about.stackTitle': 'Technical note',
  'about.stackBody':
    'The platform uses a content-driven architecture: content is separated from presentation, deploys statically, and can migrate to a database or CMS without a rewrite.',
  'about.contactTitle': 'Get in touch',
  'about.contactBody':
    'Corrections, partnerships or product feedback — reach us directly.',

  // Roadmap ----------------------------------------------------------------
  'roadmap.compare': 'System comparison tool',
  'roadmap.compare.note': 'Compare 2–4 education systems across unified dimensions.',
  'roadmap.selector': 'Curriculum & pathway selector',
  'roadmap.selector.note': 'Surface plausible systems for a given student profile and goal.',
  'roadmap.regions': 'Country / region information',
  'roadmap.regions.note': 'Study environments and requirements organised by destination.',
  'roadmap.universities': 'University & programme data',
  'roadmap.universities.note': 'Admissions profiles and subject-level information.',
  'roadmap.schools': 'School information',
  'roadmap.schools.note': 'Schools offering international curricula, and how they compare.',
  'roadmap.planner': 'Pathway planning',
  'roadmap.planner.note': 'Plan examinations and applications along a timeline.',
  'roadmap.assessment': 'Personalised assessment',
  'roadmap.assessment.note': 'Structured assessment to help locate a suitable route.',
  'roadmap.aiAssistant': 'AI education assistant',
  'roadmap.aiAssistant.note': 'Answers grounded in the platform\u2019s verified content.',
  'roadmap.aiMaterials': 'AI personalised learning material',
  'roadmap.aiMaterials.note': 'Study material generated for a target system and subject.',
  'roadmap.consulting': 'Education consulting',
  'roadmap.consulting.note': 'One-to-one interpretation and decision support.',
  'roadmap.membership': 'Membership & premium content',
  'roadmap.membership.note': 'Access to in-depth reports and tools.',
  'roadmap.products': 'Learning products',
  'roadmap.products.note': 'Structured study and revision material.',

  // Compare ----------------------------------------------------------------
  'compare.title': 'Compare systems',
  'compare.lede':
    'Select 2 to 4 education systems and compare them side by side across the same set of dimensions.',
  'compare.selector': 'Select systems to compare',
  'compare.selected': '{count} of 4 selected',
  'compare.empty': 'Select at least 2 education systems to start comparing.',
  'compare.emptyHint': 'The system chips above can be selected directly.',
  'compare.maxReached': 'Up to 4 systems can be compared at once. Deselect one first.',
  'compare.minHint': 'Select 1 more system to begin.',
  'compare.clear': 'Clear all',
  'compare.dimension': 'Dimension',
  'compare.dimensionsCount': '{count} dimensions',
  'compare.viewSystem': 'View system',
  'compare.note':
    'Comparison output describes structure only. It is not an admissions requirement and not a quality judgement.',
  'compare.referenceOnly': 'Structural comparison only',
  'compare.legend': 'Legend',
  'compare.difference': 'Difference',
  'compare.similarity': 'Common ground',

  // Compare dimensions -----------------------------------------------------
  'dimension.academicStructure': 'Academic structure',
  'dimension.assessment': 'Assessment',
  'dimension.subjectChoice': 'Subject choice',
  'dimension.learningStyle': 'Learning style',
  'dimension.examStyle': 'Exam style',
  'dimension.universityPathways': 'University pathways',
  'dimension.geographicReach': 'Geographic reach',
  'dimension.flexibility': 'Flexibility',
  'dimension.studentProfile': 'Typical student profile',

  // Search -----------------------------------------------------------------
  'search.title': 'Search',
  'search.placeholder': 'Search systems, exams, pathways…',
  'search.open': 'Open search',
  'search.hint': '↑ ↓ to navigate · Enter to open · Esc to close',
  'search.empty': 'No matching content. Try "DSE", "IB" or "pathways".',
  'search.suggestions': 'Try',
  'search.kind.system': 'System',
  'search.kind.exam': 'Exam',
  'search.kind.guide': 'Guide',
  'search.kind.page': 'Page',
  'search.indexing': 'Building index…',
  'search.resultCount': '{count} results',

  // Contact ----------------------------------------------------------------
  'contact.title': 'Contact',
  'contact.lede': 'Corrections, partnerships and feedback — reach us directly.',
  'contact.form.title': 'Send a message',
  'contact.form.name': 'Name',
  'contact.form.email': 'Email',
  'contact.form.topic': 'Topic',
  'contact.form.topic.content': 'Content correction',
  'contact.form.topic.partnership': 'Partnership',
  'contact.form.topic.feedback': 'Product feedback',
  'contact.form.topic.other': 'Other',
  'contact.form.message': 'Message',
  'contact.form.submit': 'Send',
  'contact.form.note':
    'Phase one is a static site, so the form is not yet wired to a backend. Please email us directly below.',
  'contact.form.placeholder.name': 'Your name',
  'contact.form.placeholder.email': 'you@example.com',
  'contact.form.placeholder.message': 'Briefly describe your question or suggestion…',
  'contact.direct': 'Direct contact',
  'contact.responseTime': 'We usually reply within 2–3 working days.',

  // Footer -----------------------------------------------------------------
  'footer.explore': 'Browse',
  'footer.about': 'About',
  'footer.legal': 'Notice',
  'footer.rights': 'All rights reserved.',
  'footer.note':
    'This is an information platform and does not replace official admissions documents.',
  'footer.builtWith': 'Content-driven architecture · Astro + TypeScript + Tailwind',

  // 404 --------------------------------------------------------------------
  '404.label': 'Error 404',
  '404.title': 'This page does not exist.',
  '404.lede':
    'The page you requested may have been moved or removed. Continue from one of the entry points below.',
  '404.suggestions': 'You may be looking for',

  // Accessibility ----------------------------------------------------------
  'a11y.skip': 'Skip to main content',
  'a11y.decorative': 'Decorative graphic',
  'a11y.externalLink': 'Opens an external link in a new tab',
  'a11y.carousel': 'Content list',
} as Record<UIKey, string>;

export const ui: Record<Locale, Record<UIKey, string>> = { zh, en };
