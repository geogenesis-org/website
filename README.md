# GeoGenesis Website

GeoGenesis 中文地球科学知识网站，基于 [Astro](https://astro.build) 构建。

站点以学术期刊与野外记录为视觉线索，包含主页、文档馆、文档阅读器、访谈、动态和关于页面，并支持明暗主题切换。

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
| `npm run preview` | 本地预览生产构建 |
| `npm run build:cloudflare` | 使用 Cloudflare adapter 构建 |

## 技术结构

- Astro 7
- Astro Content Collections
- Markdown 内容
- 原生 CSS
- 原生 JavaScript 主题切换与移动导航

页面层不依赖 React、用户系统或客户端状态框架。

```text
src/
├── components/            # 页头、页脚、页面导语和视觉组件
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
└── styles/global.css      # 完整视觉系统和响应式规则
```

## 内容约定

- 文档位于 `src/content/docs/{series}/`，其中 `index.md` 是系列入口。
- 访谈位于 `src/content/interviews/`，单篇 Markdown 对应一个详情页。
- 动态位于 `src/content/news/`，通过分类、日期和精选状态组织。
- 内容字段由 `src/content.config.ts` 校验。
- 默认语言为简体中文；当前不配置多语言路由。

## License

MIT — 详见 [LICENSE](./LICENSE)。
