# 布局说明

布局位于 `src/layouts/`，负责完整页面骨架。页面负责查询数据并选择布局，布局本身不调用 Content Collections。

## `BaseLayout.astro`

所有页面的根布局，统一提供 HTML 文档结构、中文语言设置、SEO、主题初始化、全局样式、页头和页脚。

- `title?: string`：页面标题，自动与站点名称组合。
- `description?: string`：SEO 描述，默认使用站点描述。
- `overlayHeader?: boolean`：让页头覆盖在深色 Hero 上。
- `hideFooter?: boolean`：隐藏页脚。
- 默认插槽：页面主体。

首页等需要完全定制内容结构的页面直接使用它。

## `CollectionLayout.astro`

文档、访谈、动态和关于页面共用的集合页布局。它在 `BaseLayout` 中组合统一的 `PageIntro` 与页面内容。

- `title: string`、`description: string`：SEO 信息。
- `eyebrow: string`：栏目名称。
- `heading: string`：页面主标题。
- `intro: string`：页面导语。
- `marker: string`：页面介绍区右上角的英文栏目标识。
- 默认插槽：集合页内容。

## `EditorialArticleLayout.astro`

单篇访谈和单篇动态共用的长文章布局。通过 `variant` 调整两类内容的头部、视觉区、侧栏和正文宽度。

- `title: string`、`description: string`：文章标题和摘要。
- `backHref: string`、`backLabel: string`：返回目录链接。
- `variant: 'interview' | 'news'`：文章类型。
- `eyebrow?: string`：未提供 `meta` 插槽时的备用信息。
- `meta` 插槽：日期和阅读时间。
- `visual` 插槽：`NewsArt`、`InterviewArt` 或真实图片。
- `aside` 插槽：受访者简介或精简文章信息。
- 默认插槽：Markdown 正文。

## `DocumentReaderLayout.astro`

文档系列的阅读布局，统一处理返回栏、系列导航、阅读进度、文章信息、正文、下一章节和页内目录。

- `title: string`、`description?: string`：当前文档信息。
- `publishedAt: Date`、`readTime: string`：公开元信息。
- `seriesTitle: string`：系列名称。
- `currentIndex: number`：当前章节位置。
- `navigation`：系列章节导航数组。
- `headings`：Astro 渲染得到的正文标题数组。
- `next?`：下一章节入口。
- `visual` 插槽：可选的系列视觉。
- 默认插槽：Markdown 正文。

## 使用边界

- 首页使用 `BaseLayout`。
- 普通栏目页使用 `CollectionLayout`。
- 访谈和动态正文使用 `EditorialArticleLayout`。
- 系列文档使用 `DocumentReaderLayout`。
- 只有现有布局无法表达新的信息层级时才新增布局；颜色和间距差异应通过样式解决。
