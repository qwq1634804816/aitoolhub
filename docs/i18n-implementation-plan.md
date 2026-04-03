# Minted Directory Astro 国际化实施方案（修订版）

## 1. 目标与现状

当前项目已经具备基础的双语能力，实际支持的是 `en` 和 `zh` 两种语言。项目内的国际化不是通过 `astro-i18n` 统一接管，而是由本项目自己的配置、路由和工具函数共同完成。

这份文档原版本存在两个明显问题：

1. 文本编码损坏，内容出现大量乱码，无法作为实施依据。
2. 文档描述的实现细节和当前代码不完全一致，尤其是配置 fallback、语言扩展方式、内容集合命名等部分。

本修订版的目标是把“当前已实现的国际化机制”讲清楚，并明确当前方案的边界，避免后续开发继续按错误假设扩展。

## 2. 当前项目中的国际化结构

### 2.1 语言范围

当前项目只支持两种语言：

- 英文：`en`
- 中文：`zh`

语言识别和切换逻辑都围绕这两种语言实现，暂不支持任意多语言自动扩展。

### 2.2 配置与内容分层

项目里的国际化主要分成三层：

1. 站点主配置
2. 主题配置
3. 通用翻译文案

对应到代码文件如下：

- `src/config/settings.toml`：英文主配置
- `src/config/settings-zh.toml`：中文主配置
- `src/config/themes/*.toml`：主题配置
- `src/config/i18n.ts`：通用翻译文案

### 2.3 实际加载链路

当前配置加载逻辑由下面几个文件共同完成：

- `src/util/themeConfig.ts`
- `src/util/localizedThemeConfig.ts`
- `src/util/i18n.ts`

其中：

- `themeConfig.ts` 负责加载 `settings.toml` 和 `settings-zh.toml`，并与主题配置做合并。
- `localizedThemeConfig.ts` 只做语言对应配置的深拷贝，不再做文档原版本里那种复杂的二次 fallback 合并。
- `i18n.ts` 负责 URL 语言识别、语言切换、通用翻译、导航和 footer 文案本地化。

## 3. 与当前代码一致的实现说明

### 3.1 站点配置：`settings.toml` 与 `settings-zh.toml`

这两个文件是当前站点主要的语言配置来源。它们由 `themeConfig.ts` 读取，并通过 `themeSettingsSchema` 做校验。

当前配置中真正被使用的关键字段包括：

- `general`
- `header`
- `directoryData`
- `footer`
- `theme`

中文配置不是简单复制英文配置，而是单独维护一份语言版本。这样做的好处是：

- 适合目录类项目中大量文案差异化的场景
- 便于在中文版本中单独调整 SEO、导航、按钮、标签说明

需要注意的是，当前 schema 是强约束的。也就是说，`settings.toml` 和 `settings-zh.toml` 的结构必须满足 `src/validation/settings.ts` 中定义的字段要求。

### 3.2 主题配置：`src/config/themes/*.toml`

主题配置并不是语言配置，它们更像是视觉和布局层的默认值来源。

当前主题文件会为以下部分提供默认值或基础结构：

- `listings`
- `directoryUI`
- `ui`
- `layout`

主题配置和站点配置会在 `themeConfig.ts` 中合并，最终输出可直接供组件使用的配置对象。

### 3.3 通用翻译：`src/config/i18n.ts`

`i18n.ts` 只负责少量通用字符串，主要用于：

- 导航文案
- 标签文案
- footer 文案
- 常用按钮与状态文案

它并不负责站点主配置的 fallback，也不负责主题配置补全。文档原版本中把 `i18n.ts` 说成“settings fallback”的设计，这一点与当前实现不符。

当前 `useTranslations(lang)` 的行为也需要明确：

- 只在 `i18nConfig[lang]` 内查找
- 找不到就返回 key 本身
- 没有自动回退到英文

这意味着如果新增某个翻译键，必须同时更新对应语言的 `i18n.ts` 内容，否则页面会直接显示 key。

### 3.4 路由与内容集合

当前项目的国际化路由和内容集合是硬编码的双语结构，不是通用多语言框架。

#### 内容集合

`src/content.config.ts` 里现在有这些集合：

- `directory`
- `directoryZh`
- `pages`
- `blog`

其中：

- 英文目录内容来自 `src/data/directory`
- 中文目录内容来自 `src/data/directory-zh`
- 中文首页使用 `src/data/pages/index-zh.mdx`

#### 路由生成

`src/lib/getRootPages.ts` 当前是显式生成英文和中文路径：

- 英文内容默认挂在根路径下
- 中文内容挂在 `/zh` 前缀下
- 标签页也分别生成：
  - `/tags/:slug`
  - `/zh/tags/:slug`

这说明当前语言扩展不是“复制一个 TOML 文件就能自动生效”，而是还要同步改路由生成逻辑和内容集合定义。

### 3.5 语言切换与 URL 处理

`src/util/i18n.ts` 里最核心的三个函数是：

- `getLangFromUrl(url)`
- `switchLang(url, lang)`
- `useTranslations(lang)`

当前实现的特点：

- `getLangFromUrl` 只识别 `en` 和 `zh` 前缀
- 默认没有语言前缀时，视为英文
- `switchLang` 主要用于内部页面切换
- 外部链接不会被加语言前缀

这里有一个当前方案的限制点：

- `switchLang` 主要处理路径切换，没有显式保留查询参数和 hash

如果后续页面依赖 query string 或锚点切换，这一点需要补强。

## 4. 当前已经接入国际化的组件

从代码看，国际化已经实际接入到这些位置：

- `src/components/app/Navbar.astro`
- `src/components/app/Footer.astro`
- `src/components/app/SidebarNavbar.astro`
- `src/components/app/SidebarTags.astro`
- `src/components/ui/LanguageSelector.astro`
- `src/pages/[...slug].astro`
- `src/components/directory/Search.astro`
- `src/components/ui/tags/Grid.vue`
- `src/components/ui/tags/Select.vue`

这说明国际化不是单点改动，而是已经渗透到导航、页脚、侧边栏、目录页和标签页。

## 5. 文档原版本的主要缺陷

### 5.1 编码问题

文档原文件存在明显乱码，属于不可直接执行的状态。这个问题本身就会导致协作成本升高，因为：

- 无法准确判断字段名
- 无法确认路径是否真实存在
- 无法区分“设计中”与“已实现”

### 5.2 过度设计

原文把国际化写成了一个比当前项目更复杂的系统，尤其是：

- 假设 `i18n.ts` 还承担 settings fallback
- 假设 `localizedThemeConfig.ts` 需要做复杂深度合并
- 假设新增语言只要复制一份配置文件即可

这些都不是当前实现。

### 5.3 忽略当前硬编码边界

当前实现的语言体系是明确的双语结构，但原文没有强调这些限制：

- `directory` 与 `directoryZh` 是固定的两个集合
- `getRootPages()` 是固定生成英文和中文路径
- `LanguageSelector.astro` 也是固定两种语言

如果不说明这一点，后续很容易误以为这是一个可直接扩展到任意语言的通用方案。

### 5.4 没有把 schema 和真实字段写清楚

当前项目的配置不是“随便写 TOML 就行”，而是受 `src/validation/settings.ts` 约束。文档原版本没有说明：

- 哪些字段是必需的
- 哪些字段只是主题默认值
- 哪些字段只在中文配置里需要单独覆盖

这会直接影响配置落地。

## 6. 建议补充的实施说明

### 6.1 新增文案时的原则

如果只是新增页面文案或导航文案，优先更新：

- `src/config/i18n.ts`

如果是新增站点结构相关配置，优先更新：

- `src/config/settings.toml`
- `src/config/settings-zh.toml`

如果是视觉/布局默认值，更新：

- `src/config/themes/*.toml`

### 6.2 新增标签时要同步做的事

新增一个目录标签时，至少要同步处理：

- `src/config/settings.toml`
- `src/config/settings-zh.toml`
- `src/data/directory/*`
- `src/data/directory-zh/*`
- `src/config/i18n.ts` 里的 `tags`

如果标签页标题或描述要在两种语言里保持一致，还要确认：

- `src/pages/[...slug].astro`
- `src/components/app/SidebarTags.astro`

### 6.3 如果要新增第三种语言

当前方案不支持“只复制一个配置文件就完事”。如果要新增 `ja`、`ko` 之类的新语言，需要同步修改：

- `src/util/i18n.ts`
- `src/components/ui/LanguageSelector.astro`
- `src/content.config.ts`
- `src/lib/getRootPages.ts`
- `src/lib/getListings.ts`
- `src/config/i18n.ts`
- 对应的 `settings-<lang>.toml`

同时还要确认页面、目录内容和标签内容是否都存在对应语言版本。

## 7. 推荐的文档结构

如果把这份文档作为长期维护说明，建议保留下面这几个部分：

- 当前支持的语言范围
- 配置文件职责划分
- 路由和内容集合规则
- 当前已接入的组件
- 已知限制
- 新增语言或文案的操作步骤

这样后续新增业务时，文档就不会只描述“理想状态”，而是能直接指导真实改动。

## 8. 总结

结论很明确：原文档存在明显缺陷，主要是编码乱码、与当前代码不一致、对多语言扩展边界描述不足。

我已经把它修订为和当前项目实现一致的版本，并补充了以下关键点：

- 当前只支持 `en` / `zh`
- `settings.toml` / `settings-zh.toml` 是主配置，不是简单 fallback
- `i18n.ts` 只负责通用翻译，不负责 settings 合并
- `directory` / `directoryZh`、`/tags` / `/zh/tags` 是当前硬编码的双语结构
- 新增第三语言需要改路由、集合、切换器和内容文件，不是只加一个配置文件

