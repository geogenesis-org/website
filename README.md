# GeoGenesis Website

GeoGenesis 组织官方网站，基于 [Astro](https://astro.build) 构建。

站点包含文档、动态、活动、关于四个内容板块，采用 Lithosphere 设计系统（地学刊物风格），支持深色 / 浅色主题切换。

## 前置条件

- Node.js `>= 22.15.0`
- npm

## 本地开发

```bash
cd website
npm install
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321)。

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建静态站点到 `./dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run check` | 运行 Astro 类型与内容检查 |
| `npm run build:vercel` | 使用 Vercel adapter 构建 |
| `npm run build:cloudflare` | 使用 Cloudflare adapter 构建 |
| `npm run preview:cloudflare` | Cloudflare 本地预览 |
| `npm run deploy:cloudflare` | 构建并部署到 Cloudflare |

## 技术栈

- Astro 6
- React 19（交互 islands：主题切换、首页 Hero、文档 TOC 等）
- Tailwind CSS 4
- Framer Motion
- Astro Content Collections
- @twodft/astro-icon（Iconify 图标）

## 项目结构

```text
website/
├── public/                 # 静态资源
├── src/
│   ├── components/         # Astro 组件 + React islands
│   ├── content/            # Markdown 内容（docs / news / events / pages）
│   ├── content.config.ts   # Content Collections  schema
│   ├── data/site.ts        # 导航、Footer、首页文案等配置
│   ├── layouts/            # 页面布局（Site / Doc / Entry / Collection）
│   ├── lib/                # 内容查询、文档路由、格式化工具
│   ├── pages/              # 路由
│   └── styles/global.css   # Lithosphere 设计系统
├── astro.config.mjs
└── package.json
```

## 内容约定

- **文档**：`src/content/docs/{doc-slug}/` 下多页 Markdown，路由为 `/docs/{slug}/` 与 `/docs/{slug}/{page}/`
- **动态 / 活动**：单篇 Markdown，列表 + 详情页
- **关于**：`src/content/pages/about.md` 单页
- **站点配置**：导航、Footer 社媒链接等集中在 `src/data/site.ts`

## 模板来源

UI 工程结构参考 [AEON / SPACE](https://github.com/lauroguedes/aeon-space-agency)（MIT License），已适配为 GeoGenesis 品牌与地学科普内容。

## License

MIT — 详见 [LICENSE](./LICENSE)。
