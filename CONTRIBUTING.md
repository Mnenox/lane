# 贡献指南（简版）

1. Fork 本模板仓库，从 `main` 切出特性分支。
2. 视觉改动只允许修改 `src/theme/presets.ts` 的预设 / 色板或 `site.config.json` 参数；`global.css` 只读 CSS 变量，不写死色值。
3. 内容 schema 变更必须同步更新 `docs/schema.md`（客户端与博客的耦合契约，两处口径必须同源）。
4. 提交前跑 `npm run build` 确认零错误；海报卡片保持竖版 2:3、无胶带元素。
5. PR 描述写明动机与截图；语义化版本标签由维护者统一打。

Issue 欢迎：bug、可访问性问题、新墙面预设提案（附色值与概念图）。