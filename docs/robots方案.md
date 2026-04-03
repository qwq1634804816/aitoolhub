# robots.txt 生成方案

## 目标
- 为当前项目补充 `robots.txt`，提升搜索引擎抓取的可控性与 SEO 完整性。
- 方案仅输出在 `public/` 目录下的静态文件，不改动现有页面逻辑。

## 依据
- `src/config/settings.toml` 与 `src/config/settings-zh.toml` 都指向同一生产站点域名 `https://aitool.alisencent.com`，其中中文站点位于 `/zh` 路径下。
- 项目是 Astro 静态站点，并已配置 `@astrojs/sitemap`，适合在 `robots.txt` 中显式声明 sitemap。
- 当前 `public/` 目录下没有 `robots.txt`，因此需要补齐基础 SEO 文件。

## 推荐方案
- 在 `public/robots.txt` 中允许所有正常抓取：
  - `User-agent: *`
  - `Allow: /`
- 显式声明站点地图：
  - `Sitemap: https://aitool.alisencent.com/sitemap-index.xml`
- 由于当前目录站点没有明确的后台、登录页或敏感路径，不建议先加入过度限制的 `Disallow` 规则，避免误伤正常内容页和多语言页面。

## 建议文件内容
```txt
User-agent: *
Allow: /

Sitemap: https://aitool.alisencent.com/sitemap-index.xml
```

## 实现位置
- 文件路径：`public/robots.txt`

## 注意事项
- 如果后续增加预发布环境、后台管理页或需要屏蔽的搜索结果页，可以再补充 `Disallow` 规则。
- 如果后续 `@astrojs/sitemap` 的输出文件名发生变化，需要同步更新 `Sitemap` 地址。
- 若你希望对英文站和中文站做更细粒度控制，也可以在后续升级为按环境生成的动态 `robots.txt` 路由。

## 待确认
- 是否按以上最简方案直接生成 `public/robots.txt`。
- 是否需要额外屏蔽某些路径，例如测试页、草稿页或内部搜索页。
