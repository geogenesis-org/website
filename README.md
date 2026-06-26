# GeoGenesis Website

GeoGenesis 组织官方网站，基于 [Astro](https://astro.build) 构建。

当前处于首期工程搭建阶段：已接入参考主题模板（AEON / SPACE）作为 UI 与内容架构基础，后续将逐步替换为 GeoGenesis 品牌与地球科学科普内容。

## 前置条件

- Node.js `>= 22.12.0`
- npm

## 本地开发

```bash
git clone git@github.com:geogenesis-hub/website.git
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

## 技术栈

- Astro 6
- React 19（交互 islands）
- Tailwind CSS 4
- Framer Motion
- Astro Content Collections

## 项目结构

```text
website/
├── public/              # 静态资源（品牌、图片）
├── src/
│   ├── components/      # React 组件与页面区块
│   ├── content/         # Markdown 内容集合
│   ├── data/            # 站点导航与文案配置
│   ├── layouts/         # 页面布局
│   ├── lib/             # 工具函数
│   ├── pages/           # 路由
│   └── styles/          # 全局样式与设计 token
├── astro.config.mjs
└── package.json
```

## 模板来源

UI 与工程结构参考 [AEON / SPACE](https://github.com/lauroguedes/aeon-space-agency)（MIT License）。当前页面内容仍为模板占位，品牌定制与内容改写将在后续完成。

## License

MIT — 详见 [LICENSE](./LICENSE)。
