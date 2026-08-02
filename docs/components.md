# 组件说明

组件位于 `src/components/`，按 `site`、`ui`、`content` 三层组织。组件只负责展示，不查询 Content Collections，也不依赖具体页面。

## Site components

### `SiteMark.astro`

GeoGenesis 的几何站点标记。它没有 Props，颜色继承父元素，可同时用于浅色与深色背景。

### `SiteHeader.astro`

全站页头，负责桌面导航、移动导航、当前栏目状态和明暗主题切换。

- `overlay?: boolean`：让页头覆盖在首页等深色 Hero 上。
- 导航数据来自 `src/data/site.ts`，不要在组件内重复维护。
- 主题选择保存到 `localStorage`。

### `SiteFooter.astro`

全站页脚，组合站点标记、公共导航、组织说明与版权信息。它没有 Props，导航和版权数据来自 `src/data/site.ts`。

### `ScrollToTop.astro`

全站右下角的返回顶部按钮。滚动距离超过视口高度的约一半后显示，点击后平滑返回页面顶部；减少动态效果偏好开启时改为立即返回。组件由 `BaseLayout` 统一挂载，不需要页面单独引用。

## UI components

### `ActionLink.astro`

统一按钮链接和文字链接。

- `href: string`：目标地址。
- `variant?: 'light' | 'dark' | 'text'`：视觉样式，默认 `dark`。
- `className?: string`：附加页面样式类。
- `icon` 命名插槽：可选的箭头或图标。

### `MetaRow.astro`

统一展示内容的发布日期与阅读时间。

- `primary: string`：左侧日期文字。
- `secondary: string`：右侧阅读时间。
- `primaryDatetime?: Date`：存在时将日期渲染为语义化 `<time>`。
- `className?: string`：附加样式类。

### `PageIntro.astro`

集合页顶部的栏目名称、主标题、导语和中性站点标识。通常由 `CollectionLayout` 调用，不在页面中重复组合。

- `eyebrow: string`：栏目名称。
- `title: string`：页面主标题。
- `description: string`：页面导语。
- `marker: string`：右上角不参与正文语义的英文栏目标识。

### `SectionHeading.astro`

内容区的轻量标题行，可在右侧展示说明或链接。

- `label: string`：左侧标题。
- `note?: string`：右侧说明。
- `noteHref?: string`：存在时将说明渲染为链接。
- `className?: string`：附加样式类。

## Content components

### `FeaturedContentCard.astro`

文档、动态与访谈集合页共用的精选内容卡片。组件统一双栏布局、日期与阅读时间、标题、简介和 Hover 状态，不绑定内容类型或具体视觉图案。

- `href: string`：内容详情页地址。
- `title: string`：内容标题。
- `summary?: string`：可选简介；访谈等不需要简介的内容可以省略。
- `publishedAt: Date`：发布日期。
- `readTime: string`：阅读时间。
- `visual` 命名插槽：左侧的 `DocumentArt`、`InterviewArt` 或 `NewsArt`。
- `footer` 命名插槽：可选的类型专属补充信息，例如访谈嘉宾与所属机构。

### `ContentListCard.astro`

文档、动态与访谈目录共用的横向内容卡片。组件统一视觉图、元信息、标题和简介的结构，并在窄屏下自动切换为纵向排列。访谈目录将访谈篇章标题作为标题、“受访者姓名＋所属机构”作为简介，保持组件本身与内容类型解耦。

- `href: string`：内容详情页地址。
- `title: string`：内容标题。
- `summary?: string`：可选简介。
- `publishedAt: Date`：发布日期。
- `readTime: string`：阅读时间。
- `visual` 命名插槽：内容类型对应的抽象视觉组件。

### `NewsArt.astro`

动态列表和文章头部使用的圆形玻璃面、涟漪纹理与倾斜星环视觉，左上角固定显示 `GEO / NEWS`。

- `tone?: 'light' | 'mid' | 'dark'`：视觉明度，默认 `mid`。
- `large?: boolean`：文章头图尺寸。

### `InterviewArt.astro`

访谈列表和文章头部使用的三角形玻璃面与斜向细线纹理视觉，左上角固定显示 `GEO / INTERVIEWS`。

- `tone?: 'light' | 'mid' | 'dark'`：视觉明度，默认 `mid`。
- `large?: boolean`：大幅展示尺寸。

### `DocumentArt.astro`

文档目录和阅读页使用的方形玻璃面与细密网格纹理视觉，左上角固定显示 `GEO / DOCUMENTS`。

- `tone?: 'light' | 'mid' | 'dark'`：视觉明度，默认 `mid`。
- `large?: boolean`：精选区或文章头图尺寸。

## 组件约定

- Props 使用 `interface Props` 定义。
- 通用组件不绑定具体路由、作者或正文。
- 集合页优先组合 `FeaturedContentCard`、`ContentListCard` 与对应的视觉组件；类型独有信息通过命名插槽传入。
- 内容数据中的视觉变体只使用 `light`、`mid`、`dark`，具体颜色由全局样式控制。
- 重复出现的展示结构优先抽成组件，不在页面中复制。
