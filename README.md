# GeoGenesis Website

GeoGenesis 中文地球科学知识网站，基于 [Astro](https://astro.build) 构建。

站点采用克制的黑白编辑视觉，包含主页、文档、文档阅读器、访谈、动态和关于页面，并支持明暗主题切换。

## 开始使用

需要 Node.js `>= 22.15.0` 与 npm。

```bash
npm install
npm run dev
```

开发服务器默认位于 `http://localhost:4321`。

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动 Astro 开发服务器 |
| `npm run check` | 检查 Astro、TypeScript 与内容集合 |
| `npm run build` | 构建静态站点到 `dist/` |
| `npm run build:github-pages` | 按独立配置构建 GitHub Pages 版本 |
| `npm run preview` | 本地预览生产构建 |

## 技术结构

- Astro 7
- Astro Content Collections
- Markdown 内容
- 原生 CSS
- 原生 JavaScript 主题切换、移动导航、轮播分页和阅读位置恢复

页面层不依赖 React、用户系统或客户端状态框架。

```text
src/
├── components/            # 站点、通用界面和内容交互组件
├── content/
│   ├── docs/              # 系列文档与章节
│   ├── interviews/        # 访谈正文与元数据
│   └── news/              # 项目动态与编辑手记
├── data/site.ts           # 站点导航与公共文案
├── layouts/BaseLayout.astro
├── pages/
│   ├── docs/              # 文档目录与动态阅读路由
│   ├── interviews/        # 访谈目录与动态详情路由
│   ├── news/              # 动态目录与文章详情路由
│   ├── about.astro
│   └── index.astro
└── styles/                # 模块化视觉系统与集中响应式规则
```

## 内容约定

- 文档位于 `src/content/docs/{series}/`，其中 `index.md` 是系列入口。
- 访谈位于 `src/content/interviews/`，单篇 Markdown 对应一个详情页。
- 三类内容统一公开日期和阅读时间，并通过 `tone: light | mid | dark` 配置单篇视觉色调；文档、访谈和动态均可将任意多篇内容设置为 `featured: true`，集合页会将它们组成精选展板，未指定时自动突出一篇内容。
- 精选展板是否自动翻页及翻页间隔统一在 `src/data/site.ts` 的 `featuredCarouselConfig` 中按栏目配置。
- 三个集合页共享阅读返回状态：从列表进入详情后，返回按钮会恢复原分页和滚动位置。
- 访谈使用 `affiliation` 记录系所；设置 `anonymous: true` 时隐藏姓名，未提供系所则显示“系所信息保密”。
- 内容字段由 `src/content.config.ts` 校验。
- 默认语言为简体中文；当前不配置多语言路由。

组件分层、布局接口和新增页面流程见 [`docs/`](./docs/README.md)。

## GitHub Pages

`.github/workflows/deploy-pages.yml` 会在 `main` 分支收到推送后构建并部署站点。仓库首次启用时，需要在 **Settings → Pages → Build and deployment** 中将 Source 设置为 **GitHub Actions**。

GitHub Pages 的 `site` 和 `base` 集中写在 `astro.config.mjs` 顶部。其他用户复用项目时，只需修改这两项。

当前 GitHub Pages 地址为 `https://geogenesis-org.github.io/website/`。普通本地构建仍使用根路径，不受 Pages 子路径配置影响。

## License

MIT — 详见 [LICENSE](./LICENSE)。
