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
- 窄屏导航使用全屏抽屉；打开时锁定页面滚动并通过 `inert` 隔离背景内容，点击链接、遮罩或按下 Escape 均会关闭。
- 菜单按钮同步维护 `aria-expanded`，抽屉开关不依赖前端框架。

### `SiteFooter.astro`

全站页脚，组合组织标识、Slogan、板块导航、纯图标形式的 GitHub、微信公众号、小红书、哔哩哔哩和知乎链接，以及版权声明和备案信息。它没有 Props，所有内容均来自 `src/data/site.ts` 的 `siteNav` 与 `footerConfig`；更换媒体地址或备案号时不需要修改组件。标准品牌 SVG 下载自 Simple Icons，并保存在 `public/icons/social/`。

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

### `ArticleBackLink.astro`

文档、访谈和动态阅读页共用的返回按钮。默认优先使用浏览器历史返回；当集合页记录了返回状态时，则恢复原栏目 URL、页内分页和滚动位置。

- `href: string`：没有可恢复状态时的栏目入口。
- `label: string`：无障碍名称与悬停提示。
- `returnStateKey?: string`：对应栏目返回状态的 `sessionStorage` 键；统一使用 `collectionReturnStateKey()` 生成。
- 仅拦截无修饰键的主按钮点击，不影响新标签页等浏览器原生操作。

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

### `ArrowRight.astro`

`ActionLink` 图标插槽共用的右箭头，避免在页面中内联重复 SVG。

- `wide?: boolean`：使用宽幅（32×24）版本，用于关于页 CTA；默认标准（24×24）版本。
- 使用时添加 `slot="icon"` 传入 `ActionLink`。

## Content components

### `CollectionIndex.astro`

文档、访谈、动态三个集合索引页共用的页面骨架。它组合 `CollectionLayout`、`FeaturedContentCarousel`、`SectionHeading`、`PaginatedContentList` 与 `CollectionReturnState`，三个索引页只负责查询和规范化数据后传入。

- `section: 'docs' | 'interviews' | 'news'`：栏目标识，用于读取文案配置、轮播配置和分页数据分片。
- `featured: ContentListItem[]`：精选内容。
- `listing: ContentListItem[]`：完整列表数据。
- 各栏目文案（标题、导语、标识、列表标题等）集中维护在 `src/data/sections.ts` 的 `collectionSections`，轮播自动翻页配置仍在 `src/data/site.ts` 的 `featuredCarouselConfig`。

### `CollectionReturnState.astro`

三个集合页共用的阅读返回状态控制器，由 `CollectionIndex` 自动挂载，不应在具体页面中重复实现。

- `section: 'docs' | 'interviews' | 'news'`：用于生成栏目路径与隔离的状态键。
- 进入同栏目详情页前记录当前 URL、滚动位置和分页页码。
- 阅读页通过 `ArticleBackLink` 发起恢复；返回集合页后先恢复分页，再恢复滚动位置，并清除一次性状态。
- 状态解析包含容错，异常或跨站 URL 不会覆盖正常链接行为。

### `ContentVisual.astro`

按 `ContentListItem` 的 `visual` 字段选择并渲染对应的视觉组件（`DocumentArt`、`InterviewArt` 或 `NewsArt`），让 `FeaturedContentCarousel` 与 `PaginatedContentList` 不必各自维护类型映射。

- `visual: 'documents' | 'interviews' | 'news'`：视觉类型。
- `tone?: 'light' | 'mid' | 'dark'`：视觉明度，默认 `mid`。
- `large?: boolean`：大幅展示尺寸。

### `FeaturedContentCarousel.astro`

文档、动态与访谈集合页共用的精选滚动展板。它接收所有 `featured: true` 的内容，以 `FeaturedContentCard` 为单张展板，提供循环前后翻页、动态圆点索引和可选的自动翻页；仅有一篇精选时自动隐藏全部控制项。

- `items: ContentListItem[]`：已经规范化和排序的精选内容，可以包含多篇。
- `autoplay?: boolean`：是否自动翻页，默认关闭。
- `interval?: number`：自动翻页间隔，单位为毫秒；为保证阅读时间，组件最低采用 3000 毫秒。
- `label?: string`：轮播区域的无障碍名称。
- 自动翻页由 `src/data/site.ts` 的 `featuredCarouselConfig` 分栏目配置，不在界面中展示额外的播放控制；鼠标悬停、键盘焦点进入或页面进入后台时会暂时停止计时。
- 首尾使用无障碍隐藏的克隆展板衔接，点击同一方向的翻页按钮时始终保持一致的运动方向。
- 触屏设备支持横向滑动翻页；窄屏控制按钮固定在卡片内部并跟随明暗主题。
- 系统开启“减少动态效果”时不启用自动翻页，并将滑动过渡降至最低。

### `FeaturedContentCard.astro`

文档、动态与访谈集合页共用的单张精选内容卡片，也是 `FeaturedContentCarousel` 的基础展板。组件统一双栏布局、日期与阅读时间、标题、简介和 Hover 状态，不绑定内容类型或具体视觉图案。

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

### `PaginatedContentList.astro`

文档、访谈与动态目录共用的页内分页列表。Astro 在首屏静态渲染前六项，其余页面由构建期生成的静态 JSON 分片提供；用户通过动态小点索引和前后箭头切换固定大小的目录页，列表内容会被替换而不是持续追加。栏目 URL 始终保持不变，也不引入前端框架运行时。

- `items: ContentListItem[]`：已经规范化和排序的列表数据。
- `section: 'docs' | 'interviews' | 'news'`：用于定位对应的静态数据分片。
- `className?: string`：附加到实际列表容器的样式类。
- 分页大小统一由 `src/utils/contentListing.ts` 的 `LIST_PAGE_SIZE` 控制。
- 总页数超过九页时，索引只保留首尾页和当前页附近的分页点，其余范围使用省略标识隐藏。
- 当前页同步到 `data-current-page`；切换完成后触发 `content-page-change`，供返回状态控制器恢复分页和滚动位置。

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
- 集合页优先组合 `FeaturedContentCarousel`、`ContentListCard` 与对应的视觉组件；类型独有信息通过命名插槽传入。
- 内容数据中的视觉变体只使用 `light`、`mid`、`dark`，具体颜色由全局样式控制。
- 重复出现的展示结构优先抽成组件，不在页面中复制。
