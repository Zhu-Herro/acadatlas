# EDUNOVA

一个面向学生、家长与教育从业者的**国际教育信息与决策平台**。

内容驱动架构 · Editorial 设计语言 · 双语 · 可静态部署 · 可平滑扩展。

> `EDUNOVA` 是当前品牌名。所有品牌字符串集中在一个文件里（`src/site.config.ts`），改一处即可全站替换。

---

## 1. 技术栈

| 层 | 选择 | 原因 |
| --- | --- | --- |
| 框架 | **Astro 5**（`output: 'static'`） | 内容型站点、SEO、首屏性能最优；岛屿式交互 |
| 语言 | **TypeScript**（`strict`） | 内容 schema 与视图模型全程类型约束 |
| 样式 | **Tailwind CSS v4**（CSS-first `@theme`） | 设计 token 单点定义，构建期裁剪 |
| 内容 | **Astro Content Layer**（Markdown + Zod schema） | 内容与表现彻底分离，可迁移 CMS/数据库 |
| 搜索 | 构建期静态索引 + 客户端检索 | 零运行时依赖，可平滑替换 Algolia/Pagefind |
| 部署 | **GitHub + Netlify** | 静态产物，配置见 `netlify.toml` |

未使用任何 UI 组件库、无前端框架运行时。除字体外无第三方运行时请求。

---

## 2. 目录结构

```
EducationWeb/
├── astro.config.mjs          # site / i18n 路由 / sitemap / Tailwind 插件
├── netlify.toml              # 构建命令、发布目录、缓存与安全响应头
├── tsconfig.json             # strict + @/* 路径别名
├── public/
│   ├── favicon.svg           # 原创 SVG 标识
│   ├── og-default.svg        # 社交分享图（1200×630）
│   └── robots.txt
└── src/
    ├── site.config.ts        # ★ 品牌名 / tagline / 描述 / 联系方式 / 官方机构登记表
    ├── content.config.ts     # ★ 内容集合 schema（systems / exams / guides）
    ├── content/              # ★ 全部内容（Markdown，按语言分目录）
    │   ├── systems/{zh,en}/     dse · ib · ap · a-level · igcse
    │   ├── exams/{zh,en}/       sat · act · ielts · toefl
    │   └── guides/{zh,en}/      7 篇长文
    ├── data/                 # 展示与领域数据（含多语言文案）
    │   ├── navigation.ts       导航模型（header / drawer / footer / 静态页）
    │   ├── dimensions.ts       9 个比较维度定义
    │   ├── pathways.ts         升学目的地登记表
    │   └── educationChain.ts   教育链条 6 个环节
    ├── i18n/
    │   ├── ui.ts             # ★ UI 字典（zh 为键集合的唯一来源，en 必须完整镜像）
    │   └── utils.ts          # 路由本地化、翻译器、日期格式化
    ├── lib/
    │   ├── content.ts        # 集合查询：locale/slug 解析、回退、关联解析
    │   ├── profile.ts        # ★ 系统 / 考试 → 统一 ProfileView 视图模型
    │   ├── seo.ts            # metadata + JSON-LD 构建器
    │   └── sources.ts        # 来源解析（登记表键 ↔ 显式 label/href）
    ├── layouts/BaseLayout.astro
    ├── components/           # 21 个组件（见第 4 节）
    ├── views/                # 12 个页面级视图（自带布局与 SEO）
    ├── scripts/motion.ts     # 滚动动画系统（无依赖）
    ├── styles/global.css     # ★ 设计系统（token / 基座 / 动效 / reduced-motion）
    └── pages/                # 路由壳体（极薄，仅绑定 locale）
        ├── index.astro  systems/  exams/  pathways.astro
        ├── guides/  resources.astro  about.astro  contact.astro
        ├── compare.astro  404.astro  search.json.ts
        └── en/           # 英文镜像（12 个文件）
```

★ = 日常维护时最常修改的文件。

**分层原则**：`pages`（路由）→ `views`（页面组装）→ `components`（表现）→ `lib`（逻辑）→ `content`/`data`（数据）。
页面文件只有 4–10 行，不存在 HTML 复制。

---

## 3. 已完成页面

默认语言（中文，无前缀）与英文（`/en/` 前缀）**双份**，共 **52 个静态页面**。

| 路由 | 说明 |
| --- | --- |
| `/` · `/en/` | 首页：Hero → 引言 → 01 教育体系 → 教育地图 → 02 探索体系 → 03 升学路径 → 04 指南 → 05 探索（搜索）→ 结语 |
| `/systems` · `/en/systems` | 体系总览 + 四类信息架构说明 |
| `/systems/dse` `/ib` `/ap` `/a-level` `/igcse` | 体系详情（统一 01–09 模板 + 关联体系） |
| `/exams` · `/en/exams` | 考试体系（按「入学标准化考试 / 语言测试」分组） |
| `/exams/sat` `/act` `/ielts` `/toefl` | 考试详情（复用同一模板，01–08） |
| `/pathways` · `/en/pathways` | 升学路径：路径关系图 + 7 个目的地 |
| `/guides` · `/en/guides` | 教育指南（分类区块 + 精选） |
| `/guides/{7 篇}` | 文章页：分类 → 超大标题 → 元信息 → 生成式视觉 → 目录 → 正文 → 来源 → 相关 |
| `/compare` · `/en/compare` | 比较工具（2–4 体系，9 维度，可展开，URL 可分享） |
| `/resources` · `/en/resources` | 资源中心：官方机构索引 + 站内内容索引 |
| `/about` · `/en/about` | 关于：使命 / 原则 / 路线图 / 技术说明 |
| `/contact` · `/en/contact` | 联系：直连邮箱 + 表单骨架（未接后端，已注明） |
| `/404` · `/en/404` | 404：真实导航出口 + 搜索入口 |
| `/search.json` | 客户端搜索索引（构建期生成，含全部语言） |
| `/sitemap-index.xml` | 自动生成的 sitemap（含 hreflang） |

---

## 4. 设计系统

全部定义在 `src/styles/global.css` 的 `@theme` 中，组件只消费 token（`bg-paper`、`text-h2`、`font-display`…），不出现魔法值。

### 颜色

| Token | 值 | 用途 |
| --- | --- | --- |
| `paper` | `#f4f3ef` | 页面底色（warm off-white） |
| `paper-raised` | `#faf9f6` | 面板 / 卡片底 |
| `sand` | `#e9e6dd` | 悬停底色 |
| `ink` | `#0e100e` | 主文字 |
| `charcoal` | `#343834` | 正文次级 |
| `graphite` | `#6c716c` | 元信息 |
| `mist` | `#9aa09a` | 弱化文本 |
| `rule` | `#dcdad3` | 1px 分隔线 |
| `accent` | `#1b4a37` | **唯一强调色**（深绿）：链接、hover、active、编号、小型图形 |

刻意规避：亮蓝、渐变紫、卡通黄、大面积绿色。Accent 仅在小面积出现，整页始终为中性色。

### 字体

| 角色 | 字体 | 说明 |
| --- | --- | --- |
| 显示 / 标题 | **Instrument Serif** → Noto Sans SC | 编辑设计感；中文回退到无衬线，避免过度使用衬线 |
| 正文 / UI | **Inter** → Noto Sans SC | 中英文均可读，Windows / macOS 一致 |
| 元信息 / 数字 | **IBM Plex Mono** | 编号、日期、标签，`tabular-nums` 防止跳动 |

字体通过 `media="print"` + 解析后切回 `all` 的方式异步加载，不阻塞首屏渲染；`display=swap` 保证文字即刻可读。

### 字阶（流式，无断点跳变）

`micro · meta · caption · body · body-lg · lead · h4 · h3 · h2 · h1 · display`

### 版式基元

`u-container`（1440px 上限 + 流体边距）· `u-section`（流式纵向留白）· `u-measure` · `u-rule`（可自绘的 1px 线）· `eyebrow`（全大写微标签）· `meta-mono` · `link-underline` · `bg-coordinate`（坐标网格）· `editorial-prose`（长文排版，手写而非插件）

### 组件（21 个）

`Logo` `Header` `Footer` `LanguageSwitcher` `SearchDialog` `Hero` `HeroNetwork` `GeneratedVisual` `ImageReveal` `ScrollReveal` `SectionHeader` `SectionNumber` `PageHeader` `Breadcrumb` `Metric` `Timeline` `EditorialList` `SystemCard` `ArticleCard` `ArticleHero` `ProfileSection` `SystemCompare` `CompareTool` `FAQ` `SourceList` `RelatedContent` `EducationChain` `PathwayDiagram`

---

## 5. 动画系统

集中在一个模块 `src/scripts/motion.ts` + `global.css` 的声明式属性，**无动画库**。

| 属性 | 效果 |
| --- | --- |
| `data-reveal="up"` | 淡入 + 上浮（1.75rem） |
| `data-reveal="fade"` | 纯淡入 |
| `data-reveal="mask"` | clip-path 擦除（用于视觉图） |
| `data-reveal="rule"` | 横线自绘 |
| `data-stagger` | 子元素依次入场（nth-child 阶梯延迟，最多 9 级） |
| `data-count-to` | 数字从 0 缓动到目标值 |
| `.draw-line` | SVG 路径描边动画（Hero 网络图、路径图） |

原则：**Minimal · Slow · Elegant · Purposeful**。只播放一次、`rootMargin: 0 0 -10%` 让动画"属于滚动"而非"响应滚动"、`ease-out` 曲线无回弹。

严格规避：bounce、elastic、flash、旋转 Logo、夸张粒子。

**可访问性**：`prefers-reduced-motion: reduce` 下全部动画关闭、内容直接可见；打印样式同样强制显示全部内容。

---

## 6. 内容系统

内容**不写在页面里**，全部位于 `src/content/**`，由 `src/content.config.ts` 的 Zod schema 校验，构建期失败即报错。

### 目录约定

```
src/content/systems/zh/dse.md   →  id: "zh/dse"  →  slug: dse, locale: zh
src/content/systems/en/dse.md   →  id: "en/dse"  →  slug: dse, locale: en
```

`slug` 与 `locale` 从 id 推导，**翻译文件不可能与原文文件名脱节**。

### System schema（对应需求第 25 节）

```
title · shortName · fullName · region · type · typeKey
summary · lede
overview[] · structure[] · subjects[] · assessment[] · pathways[] · suitability[]
comparison{ 9 个维度 }
faq[] · sources[]
updatedAt · academicYear
tags[] · related[] · order · featured
```

### Guide schema

```
title · lede · summary · category · kicker · systems[]
publishedAt · updatedAt · readingMinutes
heroVariant · coverImage?
tags[] · related[] · sources[] · region? · academicYear?
featured · order
```

### 可信度设计（需求第 24 节）

- `sources`、`updatedAt`、`academicYear` 为**必填或显式建模**字段，任何时效性页面都必须携带。
- 来源支持两种写法：引用登记表键 `body: hkeaa`，或显式 `label` + `href`，由 `src/lib/sources.ts` 统一解析。
- 未知的登记表键会在构建日志中告警，而不是静默丢弃引用。
- 需求第 9 节明确要求的边界已落实：路径图与升学说明均标注「概念示意，非招生政策依据」，本站不发布具体录取分数。

---

## 7. SEO

由 `src/lib/seo.ts` 一处生成，`BaseLayout` 一处渲染。

- 每页：`title`、`description`、`canonical`、`robots`
- Open Graph：`og:type/site_name/title/description/url/image/image:width/height/locale`
- Twitter/X：`summary_large_image`
- `hreflang` 交替链接（zh-CN / en / x-default），与语言切换器**同源推导**，不会漂移
- JSON-LD `@graph`：`Organization` + `WebSite`（含 `SearchAction`）+ 每页附加节点
  - 体系 / 考试页：`Article` + `BreadcrumbList` + `FAQPage`
  - 指南页：`Article` + `BreadcrumbList`
  - 关于页：`Organization` + `BreadcrumbList`
- `@astrojs/sitemap` 生成 `sitemap-index.xml`（含 i18n hreflang）；`robots.txt` 指向 sitemap
- 描述文案为人写，**不做 keyword stuffing**

---

## 8. 国际化

- Astro 内置 i18n 路由：`defaultLocale: 'zh'`，`prefixDefaultLocale: false` → 中文无前缀，英文 `/en/`
- `src/i18n/ui.ts`：`zh` 字典是键集合的唯一来源，`en` 声明为 `Record<UIKey, string>` → **漏译会编译报错**
- 翻译器支持 `{placeholder}` 插值，缺失键自动回退默认语言
- 语言切换器指向**当前页面的等价路径**（`switchLocalePath`），不会退回首页
- 内容缺失时按「当前语言 → 默认语言」回退，并在页面上明确提示正在显示默认语言内容
- 新增第三种语言 = `locales` 加一项 + 补一份字典 + 加一个 `pages/<locale>/` 目录

---

## 9. 搜索

- `src/pages/search.json.ts` 在构建期汇总 systems / exams / guides / 静态页（含全部语言）
- 记录结构：`{ title, description, href, kind, lang, keywords }` —— 与 Pagefind / Algolia / Meilisearch 所需字段一致，替换后端只改一个文件
- `SearchDialog`：⌘K / Ctrl-K 唤起、全屏遮罩、↑↓ 选择、Enter 打开、Esc 关闭、焦点陷阱与焦点归还、`role="dialog"` + `aria-modal` + `role="status"` 播报
- 评分：精确匹配 > 前缀 > 词首 > 子串；当前语言结果加权优先

---

## 10. 本地运行

前置：Node.js ≥ 20.3（开发使用 24.x 验证通过）。

```bash
npm install     # 安装依赖
npm run dev     # 开发服务器 → http://localhost:4321
npm run build   # 静态构建 → dist/
npm run preview # 预览构建产物
npm run check   # Astro + TypeScript 诊断（当前 0 error / 0 warning / 0 hint）
```

---

## 11. 推送到 GitHub

```bash
git init
git add .
git commit -m "feat: EDUVERSE initial release"
git branch -M main
git remote add origin https://github.com/<你的账号>/<仓库名>.git
git push -u origin main
```

`.gitignore` 已排除 `dist/`、`.astro/`、`node_modules/`、`.netlify/`、`.env*`。

---

## 12. 部署到 Netlify

`netlify.toml` 已就绪，无需在 UI 中额外配置：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

同时预置了 `/_astro/*` 的不可变缓存头，以及 `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`。

**正式域名已配置为 `https://acadatlas.netlify.app`**（Netlify 站点名 `acadatlas`），写在 3 个位置（必须保持一致）：

1. `astro.config.mjs` → `const SITE`
2. `src/site.config.ts` → `url`
3. `public/robots.txt` → `Sitemap:` 行

> 若在 Netlify 里改了站点名（或换成自有域名），把这 3 处一起改掉再重新部署即可。
> `edunova.netlify.app` 与 `edunova-edu.netlify.app` 已分别被他人占用/弃用，当前使用 `acadatlas`。

连接 GitHub 仓库后 Netlify 会自动构建；或使用 CLI：

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

---

## 13. 如何新增内容

### 新增一个教育体系（例如 IB Career-related Programme）

1. 建 `src/content/systems/zh/<slug>.md` 与 `en/<slug>.md`，填写 frontmatter。
2. 完成即生效——`/systems`、首页、搜索索引、比较工具、sitemap 会自动纳入，同时生成 `/systems/<slug>`。

无需改动任何页面或组件。

### 新增一篇指南

1. 建 `src/content/guides/zh/<slug>.md` 与 `en/<slug>.md`。
2. `category` 决定它出现在 `/guides` 的哪个分类区块；`featured: true` 会出现在首页与精选区。
3. 正文用 Markdown 写：`##` / `###` 会自动生成右侧目录；`**加粗**`、列表、引用、代码、表格均已按品牌排版。

### 新增一个升学目的地

在 `src/data/pathways.ts` 增加一项（含 zh/en 文案），然后在各体系的 frontmatter 里用 `destination: '<id>'` 引用。路径图、`/pathways`、体系详情页第 05 节会同步更新。

### 增加一个比较维度

1. `src/content.config.ts` 的 `comparisonSchema` 加字段
2. `src/data/dimensions.ts` 的 `comparisonKeys` + `comparisonDimensions` 加一项
3. `src/i18n/ui.ts` 加 `dimension.<key>` 文案（zh 与 en）
4. 各体系 frontmatter 的 `comparison` 块补齐

其余（比较工具 UI、URL 同步、展开折叠）无需改动。

### 内容迁移到 CMS / 数据库

`lib/content.ts` 是集合访问的**唯一入口**。把其中的集合查询换成 API / SDK 调用（返回相同形状的 `{ id, data }`），页面与组件无需修改。schema 已在 `content.config.ts` 中集中定义，可直接作为数据库列定义或 CMS 字段配置使用。

---

## 14. 未来如何接入数据库

架构已预留：`views` 不直接触碰数据源，全部经由 `lib/content.ts` 与 `lib/profile.ts`。

建议路径：

1. **只读内容** → 接入 CMS（Sanity / Contentful / Strapi），替换 `lib/content.ts` 的加载函数。
2. **需要写入**（账号、收藏、咨询记录）→ 在 `src/pages/api/` 下增加服务端端点，`astro.config.mjs` 切换到 `output: 'server'` 或混合渲染（`prerender: false` 仅对需要动态的路由），其余页面保持静态。
3. **数据库** → 内容 schema 与 `content.config.ts` 一一对应，可直接映射为表结构（`systems` / `exams` / `guides` / `sources`）。
4. **电商 / 会员** → 新增 `/membership`、`/tools` 等路由与视图；导航与搜索索引会自动收录（`data/navigation.ts` 加一项即可）。

## 15. 未来如何接入 AI

需求第 34 节明确：第一阶段不做 AI Chatbot，但结构上预留。当前已具备三个有利条件：

1. **可信内容基底**：结构化的 systems / exams / guides + 必填 `sources` —— 可直接作为 RAG 的检索源，回答可回链到出处。
2. **比较数据已成结构化对象**：`ComparisonRecord`（9 维度 × N 体系）可直接作为推荐/测评工具的输入。
3. **预留路由**：`/tools`、`/learning`、`/membership`、`/consulting` 已在 `about` 页的路线图中登记。

推荐实现顺序：

1. `src/pages/api/assistant.ts` 增加服务端端点（需切换到 server 输出）。
2. 以 `search.json` 的记录为检索单元做向量化（内容更新时重新生成）。
3. 提示词中强制要求：仅依据检索内容作答、必须附来源链接、无来源则拒答。
4. 前端以岛屿（React/Svelte/Vue 任一，Astro 原生支持）挂载对话 UI，不影响静态页面性能。
5. 测评工具（Age / Current system / Country / Target country / Interests / Budget / Goals → 输出体系比较）可直接复用 `/compare` 的维度数据与 `CompareTool` 的表现层。

---

## 附：本项目的内容边界（重要）

平台可能被用于教育决策，因此严格遵守：

- **不编造**：不生成看起来合理但无法追溯的教育信息；无可靠来源则不写。
- **可追溯**：所有时效性内容标注来源、适用学年、地区与更新日期。
- **不混淆**：课程体系 / 资格考试 / 语言测试 / 大学招生严格分开呈现。
- **不承诺**：不发布具体录取分数线或「保录」类表述；录取要求以院校与官方机构最新公告为准。

`src/site.config.ts` 中的 `editorialNote` 会在页脚与内容页展示这一声明。
