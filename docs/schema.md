# 内容 schema 与配置 schema（客户端契约）

本文件是博客与配套客户端的**耦合契约**：客户端只读写这里定义的字段与目录，博客只消费它们。任何变更必须同步两侧与本文档。

## 目录约定

```
<内容库根>/
  site.config.json          站点与主题配置
  src/content/posts/*.md    文章（文件名即默认 slug）
  src/assets/*              图片素材（客户端自动压缩 / 规范命名后写入）
  src/theme/ src/styles/ src/layouts/ src/components/ src/pages/
                            主题代码（客户端不修改，仅预览 / 构建时消费）
  .github/workflows/deploy.yml
                            构建 + 定时重建工作流（向导写入）
```

## 文章 frontmatter

| 字段 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| title | string | 是 | — | 标题（海报主标题） |
| summary | string | 否 | `''` | 摘要（SEO / 列表描述） |
| tags | string[] | 否 | `[]` | 标签；首标签显示为海报 chip |
| cover | image 路径 | 否 | — | 相对 md 文件的素材路径，如 `../../assets/x.jpg`；构建期自动优化 |
| publishAt | ISO 8601 日期时间 | 是 | — | 发布时间；**带时区偏移**（如 `+08:00`）；未来时间 = 定时发布 |
| draft | boolean | 否 | `false` | 草稿不上线、不进归档 |
| slug | string | 否 | 文件名 | URL 别名（`/posts/<slug>/`） |

定时发布语义：云端构建过滤 `draft === false && publishAt <= 构建时刻`；Actions 每 30 分钟重建兜底；客户端在线时到点主动推送触发提前重建（分钟级准点）。

## site.config.json

| 键 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| siteName | string | `lane` | 站名；霓虹招牌渲染为其小写形式 |
| tagline | string | `''` | 巷口一句话简介 |
| author | string | `''` | 作者（页脚） |
| siteUrl | string | — | 站点绝对 URL（SEO / og） |
| basePath | string | `/lane` | Pages 项目页路径；自定义域名改 `/` |
| locale | string | `zh-CN` | html lang |
| nav | {label,href}[] | 首页/归档/关于 | 巷口模板字导航 |
| social | {label,href}[] | `[]` | 关于页链接 |
| about | string | `''` | 关于页正文（空行分段） |
| theme.wall | `midnight`\|`brick`\|`concrete` | `midnight` | 墙面预设（B 冻结默认） |
| theme.radius | number 6–14 | 10 | 海报圆角 px |
| theme.tilt | number 0–3 | 1.5 | 倾斜幅度 deg |
| theme.density | `loose`\|`mid`\|`dense` | `mid` | 桌面拼贴列数 3/4/5 |
| theme.stickers | boolean | true | 星爆贴纸开关 |
| theme.entranceAnimation | boolean | true | 霓虹动画开关 |
| theme.fontPair | `default` | `default` | 字体搭配预设 |

## 客户端行为约定

- 客户端是上述文件的**唯一零代码操作面**；所有写入经 Git 提交，历史即备份。
- 预览 = 在内容库内启动 `astro dev`（内置 Node 运行时），渲染与线上完全一致的主题。
- 发布 = commit + push；状态追踪读取 GitHub Actions runs（已提交 → 构建中 → 已上线 / 失败）。
- 客户端不修改主题代码；换装只写 `site.config.json`。