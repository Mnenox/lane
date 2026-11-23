# lane-theme

**lane** 的公开 Astro 博客模板：一面秘密的涂鸦墙。默认主题为「午夜霓虹巷」（规格书 v0.10 冻结的 B 组设计），另归档「砖红喷漆墙」「混凝土模板画廊」两套备选墙面预设。

穿过小巷，撞见一面秘密的涂鸦墙——浏览时热闹，阅读时安静。

## 快速开始

```bash
git clone <你的仓库地址> lane
cd lane
npm install
npm run dev      # 本地开发 http://localhost:4321
npm run build    # 静态产物 dist/
npm run preview  # 预览构建产物
```

部署到 GitHub Pages：仓库 Settings → Pages → Source 选 **GitHub Actions**；推送 `main` 即自动构建上线。`.github/workflows/deploy.yml` 另含每 30 分钟一次的定时重建（定时发布的云端兜底）。

> 项目页路径：`site.config.json` 的 `basePath` 默认为 `/lane`（对应 `username.github.io/lane`）。若使用自定义域名或用户主页仓库，改为 `/`。

## 目录结构（主题 / 内容 / 配置三分离）

```
site.config.json        站点与主题参数（零代码设置面板的同源 schema）
src/theme/              主题基准：墙面预设、受控色板、CSS 变量注入
src/styles/global.css   全部视觉样式（只读 CSS 变量，不写死色值）
src/layouts/            Base 布局
src/components/         巷口 / 墙面 / 海报卡片 / 灯箱
src/pages/              首页 / 文章 / 归档 / 关于
src/content/posts/      文章（Markdown + frontmatter）
src/assets/             图片素材（构建期自动优化：压缩 / WebP / 响应式）
docs/schema.md          内容 schema 与配置 schema 文档（客户端契约）
```

## 写一篇文章

在 `src/content/posts/` 新建 `xxx.md`：

```markdown
---
title: 雨天的便利店
summary: 雨夜的城市里，便利店是唯一亮着的客厅。
tags: [随笔, 城市]
cover: ../../assets/rainy-convenience-store.jpg
publishAt: 2025-05-27T18:00:00+08:00
draft: false
---

正文……
```

`publishAt` 为未来时间即定时发布：云端构建自动过滤未到期文章，配合定时重建到点上线。字段全表见 [docs/schema.md](docs/schema.md)。

## 主题参数（site.config.json → theme）

| 键 | 取值 | 默认 | 说明 |
| --- | --- | --- | --- |
| wall | midnight / brick / concrete | midnight | 墙面预设（B 冻结 / A 备选 / C 备选） |
| radius | 6–14 | 10 | 海报圆角 px |
| tilt | 0–3 | 1.5 | 海报倾斜幅度 deg |
| density | loose / mid / dense | mid | 拼贴密度（桌面列数 3/4/5） |
| stickers | true / false | true | 星爆贴纸开关 |
| entranceAnimation | true / false | true | 巷口霓虹动画开关（尊重 prefers-reduced-motion） |
| fontPair | default | default | 字体搭配预设 |

全部参数经 CSS 变量注入，改配置即换装，无需碰样式代码。配套零代码桌面客户端见 `lane-client`（Electron）。

## 设计基准（冻结）

- 海报卡片竖版 2:3（真实 one-sheet 海报比例），不使用横版 / 方形；无胶带元素，wheatpaste 撕边为唯一"贴上墙"线索。
- 导航以喷漆模板字绘于巷口墙面，不做独立色带；霓虹招牌为小写 `lane`。
- 文章页纸白画布 `#FAF6EF`、墨色 `#2B2620`、720px 阅读宽、行高 1.8。
- 受控高饱和色板：`#FF3B2F / #FFD400 / #00C48C / #2F6BFF / #FF2E9A / #F7F1E5 / #2B2620`。

## 许可证

MIT © 2026 lane contributors。示例照片来自 Unsplash（Unsplash License）。