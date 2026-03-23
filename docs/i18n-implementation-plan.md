# Minted Directory Astro 国际化实施方案（最新版）

## 1. 项目结构分析

### 当前项目结构

```
├── src/
│   ├── components/
│   │   ├── app/
│   │   │   ├── Logo.astro          # Logo 组件
│   │   │   ├── Navbar.astro        # 导航栏组件
│   │   │   └── ...
│   │   ├── directory/
│   │   │   ├── cards/
│   │   │   │   └── index.astro     # 目录卡片组件
│   │   │   └── ...
│   │   └── ui/
│   │       └── LanguageSelector.astro  # 语言选择器组件
│   ├── config/
│   │   ├── i18n.ts                # 国际化配置文件（通用翻译 fallback）
│   │   ├── settings.toml          # 默认配置文件（英文）
│   │   ├── settings-zh.toml       # 中文配置文件
│   │   └── themes/                # 主题配置
│   │       ├── brookmint.toml
│   │       └── ...
│   ├── data/
│   │   ├── directory/     # 目录数据（英语）
│   │   ├── directory-zh/  # 目录数据（中文）
│   │   ├── blog/          # 博客数据
│   │   └── pages/         # 页面数据
│   ├── layouts/
│   │   └── BaseLayout.astro  # 基础布局
│   ├── lib/
│   │   ├── getListings.ts   # 获取目录内容
│   │   └── getRootPages.ts  # 生成静态路径
│   ├── pages/
│   │   └── [...slug].astro  # 动态路由
│   ├── styles/
│   ├── types/
│   ├── util/
│   │   ├── i18n.ts            # 国际化工具
│   │   ├── themeConfig.ts     # 主题配置加载
│   │   └── localizedThemeConfig.ts  # 本地化主题配置
│   └── content.config.ts  # 内容配置
├── docs/
│   └── i18n-implementation-plan.md  # 国际化实施方案
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## 2. 国际化架构

### 2.1 核心设计思想

采用**双层配置架构**：

1. **TOML 配置文件**（主要配置来源）
   - `settings.toml` - 英文配置
   - `settings-zh.toml` - 中文配置
   - 包含所有主要配置项（导航、按钮、SEO 等）

2. **i18n.ts 文件**（通用翻译 fallback）
   - 仅包含通用翻译（导航、标签、Footer、常用语）
   - 作为 fallback 使用，当 TOML 配置缺失时提供默认翻译

### 2.2 配置文件设计

```
src/config/
├── i18n.ts            # 通用翻译 fallback（navigation, tags, footer, common）
├── settings.toml      # 英文主要配置（header, directoryData, general 等）
├── settings-zh.toml   # 中文主要配置
└── themes/
    ├── brookmint.toml     # 主题配置
    └── ...
```

### 2.3 内容管理方案

1. **使用 md 文件**：为每种语言创建对应的 md 文件，包含相同的 ID 但不同的内容
2. **统一的文件命名**：保持不同语言版本的文件名称一致，便于管理
3. **相同的 frontmatter 结构**：确保所有语言版本的 frontmatter 字段一致
4. **语言特定配置**：为每种语言创建对应的配置文件，管理语言特定的配置

## 3. 技术实现方案

### 3.1 依赖添加

本方案采用手动实现的方式，不需要额外安装国际化依赖。移除了 `astro-i18n` 包的使用，避免了配置冲突和构建错误。

### 3.2 国际化配置文件（通用翻译 fallback）

**`src/config/i18n.ts`**

```typescript
// 国际化配置文件
export interface Translation {
  [key: string]: string;
}

export interface I18nConfig {
  [lang: string]: {
    navigation: {
      [key: string]: string;
    };
    tags: {
      [key: string]: string;
    };
    footer: {
      [key: string]: string;
    };
    common: {
      [key: string]: string;
    };
  };
}

const i18nConfig: I18nConfig = {
  en: {
    navigation: {
      Blog: "Blog",
      Analytics: "Analytics",
      "Submit an app": "Submit an app",
      Home: "Home"
    },
    tags: {
      breathing: "Breathing",
      sleep: "Sleep",
      meditation: "Meditation",
      yoga: "Yoga",
      timer: "Timer"
    },
    footer: {
      Directory: "Directory",
      Categories: "Categories",
      Legal: "Legal",
      Submit: "Submit",
      Advertise: "Advertise",
      Articles: "Articles",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service"
    },
    common: {
      search: "Search",
      featured: "Featured",
      categories: "Categories",
      all: "All",
      back: "Back",
      submit: "Submit",
      loading: "Loading...",
      error: "Error",
      notFound: "Not Found"
    }
  },
  zh: {
    navigation: {
      Blog: "博客",
      Analytics: "分析",
      "Submit an app": "提交应用",
      Home: "首页"
    },
    tags: {
      breathing: "呼吸",
      sleep: "睡眠",
      meditation: "冥想",
      yoga: "瑜伽",
      timer: "计时器"
    },
    footer: {
      Directory: "目录",
      Categories: "分类",
      Legal: "法律",
      Submit: "提交",
      Advertise: "广告",
      Articles: "文章",
      "Privacy Policy": "隐私政策",
      "Terms of Service": "服务条款"
    },
    common: {
      search: "搜索",
      featured: "精选",
      categories: "分类",
      all: "全部",
      back: "返回",
      submit: "提交",
      loading: "加载中...",
      error: "错误",
      notFound: "未找到"
    }
  }
};

export default i18nConfig;
```

**注意**：
- ✅ 仅包含通用翻译（navigation, tags, footer, common）
- ❌ 移除了 `settings` 配置，主要配置已移至 TOML 文件
- 🔧 作为 fallback 使用，当 TOML 配置缺失时提供翻译

### 3.3 主题配置加载

**`src/util/themeConfig.ts`**

```typescript
import { settingsSchema, themeSchema, themeSettingsSchema, type SettingsSchema } from "@validation/settings";
import defaultConfigData from "../config/settings.toml";
import peppermint from "../config/themes/peppermint.toml";
import spearmint from "../config/themes/spearmint.toml";
import brookmint from "../config/themes/brookmint.toml";
import hemingway from "../config/themes/hemingway.toml";

// Import language-specific config files
import zhConfigData from "../config/settings-zh.toml";

function getConfig(data: unknown) {
  try {
    return themeSettingsSchema.parse(data);
  } catch (error) {
    return null;
  }
}

const themes = {
  peppermint: themeSchema.parse(peppermint),
  spearmint: themeSchema.parse(spearmint),
  brookmint: themeSchema.parse(brookmint),
  hemingway: themeSchema.parse(hemingway),
};

// Load default config
const defaultData = getConfig(defaultConfigData);
let defaultSettings: SettingsSchema;

if (defaultData) {
  const selectedTheme = defaultConfigData.theme || "peppermint";
  const themeConfig = themes[selectedTheme as keyof typeof themes];
  
  defaultSettings = {
    ...themeConfig,
    ...defaultData,
  };
} else {
  // Fallback: merge theme config with defaultConfigData directly
  const selectedTheme = defaultConfigData.theme || "peppermint";
  const themeConfig = themes[selectedTheme as keyof typeof themes];
  
  defaultSettings = {
    ...themeConfig,
    ...defaultConfigData,
  } as SettingsSchema;
}

// Load Chinese config
let zhSettings: SettingsSchema;
const zhData = getConfig(zhConfigData);
if (zhData) {
  const selectedTheme = zhConfigData.theme || defaultConfigData.theme || "peppermint";
  const themeConfig = themes[selectedTheme as keyof typeof themes];
  
  zhSettings = {
    ...themeConfig,
    ...zhData,
  };
} else {
  // Fallback: merge theme config with zhConfigData directly
  const selectedTheme = zhConfigData.theme || defaultConfigData.theme || "peppermint";
  const themeConfig = themes[selectedTheme as keyof typeof themes];
  
  zhSettings = {
    ...themeConfig,
    ...zhConfigData,
  } as SettingsSchema;
}

// Export default settings
export default defaultSettings;

// Export function to get settings by language
export function getSettingsByLang(lang: string): SettingsSchema {
  if (lang === "zh") {
    return zhSettings;
  }
  
  return defaultSettings;
}
```

**关键点**：
- ✅ 支持 TOML 配置解析失败时的 fallback 逻辑
- ✅ 自动合并主题配置和语言特定配置
- ✅ 提供 `getSettingsByLang()` 函数获取对应语言配置

### 3.4 本地化主题配置

**`src/util/localizedThemeConfig.ts`**

```typescript
import settings, { getSettingsByLang } from "./themeConfig";
import i18nConfig from "@config/i18n";

/**
 * Get localized theme configuration based on the current language
 * @param lang The current language code
 * @returns The localized theme configuration
 */
export function getLocalizedThemeConfig(lang: string) {
  // Try to load language-specific config file first
  let baseSettings = getSettingsByLang(lang);
  
  // Get the localized settings from i18n config (only use as fallback)
  const localizedSettings = i18nConfig[lang]?.settings;
  
  // Create a deep copy of the base settings
  const localizedConfig = JSON.parse(JSON.stringify(baseSettings));
  
  // Only apply i18n settings if they don't already exist in the language-specific config
  if (localizedSettings) {
    // Localize general settings (only if not already set in language-specific config)
    if (localizedSettings.general) {
      if (!localizedConfig.general.title && localizedSettings.general.title) {
        localizedConfig.general.title = localizedSettings.general.title;
      }
      if (localizedSettings.general.seo) {
        if (!localizedConfig.general.seo.name && localizedSettings.general.seo.name) {
          localizedConfig.general.seo.name = localizedSettings.general.seo.name;
        }
        if (!localizedConfig.general.seo.description && localizedSettings.general.seo.description) {
          localizedConfig.general.seo.description = localizedSettings.general.seo.description;
        }
      }
    }
    
    // Localize directory data settings (only if not already set in language-specific config)
    if (localizedSettings.directoryData) {
      if (localizedSettings.directoryData.tagPages) {
        if (!localizedConfig.directoryData.tagPages.title && localizedSettings.directoryData.tagPages.title) {
          localizedConfig.directoryData.tagPages.title = localizedSettings.directoryData.tagPages.title;
        }
      }
      if (localizedSettings.directoryData.search) {
        if (!localizedConfig.directoryData.search.placeholder && localizedSettings.directoryData.search.placeholder) {
          localizedConfig.directoryData.search.placeholder = localizedSettings.directoryData.search.placeholder;
        }
      }
      if (localizedSettings.directoryData.tags) {
        Object.keys(localizedSettings.directoryData.tags).forEach(tagKey => {
          const tag = localizedConfig.directoryData.tags.find((t: any) => t.key === tagKey);
          if (tag && !tag.description && localizedSettings.directoryData.tags[tagKey].description) {
            tag.description = localizedSettings.directoryData.tags[tagKey].description;
          }
        });
      }
    }
    
    // Localize header settings (only if not already set in language-specific config)
    if (localizedSettings.header) {
      if (localizedSettings.header.banner) {
        if (!localizedConfig.header.banner.text && localizedSettings.header.banner.text) {
          localizedConfig.header.banner.text = localizedSettings.header.banner.text;
        }
        if (!localizedConfig.header.banner.brandText && localizedSettings.header.banner.brandText) {
          localizedConfig.header.banner.brandText = localizedSettings.header.banner.brandText;
        }
      }
      if (localizedSettings.header.actionButton) {
        if (!localizedConfig.header.actionButton.text && localizedSettings.header.actionButton.text) {
          localizedConfig.header.actionButton.text = localizedSettings.header.actionButton.text;
        }
      }
    }
    
    // Localize footer settings (only if not already set in language-specific config)
    if (localizedSettings.footer) {
      if (!localizedConfig.footer.description && localizedSettings.footer.description) {
        localizedConfig.footer.description = localizedSettings.footer.description;
      }
    }
  }
  
  return localizedConfig;
}
```

**注意**：
- ⚠️ `i18nConfig.settings` 现已移除，此函数保留作为未来扩展
- ✅ 主要从 TOML 文件加载配置
- 🔧 fallback 逻辑保留但不再使用

### 3.5 国际化工具文件

**`src/util/i18n.ts`**

```typescript
// 语言检测和切换工具
import i18nConfig from "@config/i18n";

export function getLangFromUrl(url: URL): string {
  const pathname = url.pathname;
  const langMatch = pathname.match(/^\/(zh|en)\b/);
  return langMatch ? langMatch[1] : 'en';
}

export function switchLang(url: URL, lang: string): string {
  const pathname = url.pathname;
  const currentLang = getLangFromUrl(url);
  
  if (currentLang === lang) {
    return url.href;
  }
  
  let newPathname;
  if (lang === 'en') {
    // 切换到英文时，移除语言前缀
    if (currentLang === 'en') {
      newPathname = pathname;
    } else {
      newPathname = pathname.replace(new RegExp(`^\/${currentLang}`), '');
      // 确保路径以 / 开头
      if (!newPathname.startsWith('/')) {
        newPathname = `/${newPathname}`;
      }
      // 如果路径是空的，设置为 /
      if (newPathname === '') {
        newPathname = '/';
      }
    }
  } else {
    // 切换到其他语言时，添加语言前缀
    if (currentLang === 'en') {
      if (pathname === '/') {
        newPathname = `/${lang}`;
      } else {
        newPathname = `/${lang}${pathname}`;
      }
    } else {
      if (pathname === `/${currentLang}/`) {
        newPathname = `/${lang}`;
      } else {
        newPathname = pathname.replace(new RegExp(`^\/${currentLang}`), `/${lang}`);
      }
    }
  }
  
  return new URL(newPathname, url.origin).href;
}

export function useTranslations(lang: string) {
  return function t(key: string): string {
    // Split key into parts (e.g., "settings.directoryData.tags.breathing.description" -> ["settings", "directoryData", "tags", "breathing", "description"])
    const keys = key.split(".");
    if (keys.length === 0) return key;
    
    // Traverse the i18nConfig object to find the translation
    let value: any = i18nConfig[lang];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    // Return the value if it's a string, otherwise return the key
    return typeof value === 'string' ? value : key;
  };
}

export function getDirectoryCollection(lang: string) {
  return lang === 'en' ? 'directory' : `directory${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
}

// Get localized navigation links
export function getLocalizedNavigation(lang: string, links: Array<{ name: string; href: string; target?: string }>) {
  // Return links as-is, the name is already localized from the config file
  return links.map(link => {
    // Add language prefix to internal links
    let localizedHref = link.href;
    if (!localizedHref.startsWith("http")) {
      localizedHref = lang === "en" ? localizedHref : `/${lang}${localizedHref}`;
    }
    return {
      ...link,
      href: localizedHref
    };
  });
}

// Get localized tags
export function getLocalizedTags(lang: string, tags: Array<{ key: string; name: string; color: string; emoji: string; description: string }>) {
  return tags.map(tag => {
    // Priority: use the name from the config file directly
    // Only use i18nConfig as fallback if the name is not provided
    const localizedName = tag.name || i18nConfig[lang]?.tags?.[tag.key];
    return {
      ...tag,
      name: localizedName
    };
  });
}

// Get localized footer navigation
export function getLocalizedFooterNavigation(lang: string, navigation: Array<{ title: string; links: Array<{ title: string; link: string }> }>) {
  return navigation.map(nav => {
    const localizedTitle = i18nConfig[lang]?.footer?.[nav.title] || nav.title;
    const localizedLinks = nav.links.map(link => {
      const localizedLinkTitle = i18nConfig[lang]?.footer?.[link.title] || link.title;
      // Add language prefix to internal links
      let localizedLink = link.link;
      if (!localizedLink.startsWith("http")) {
        localizedLink = lang === "en" ? localizedLink : `/${lang}${localizedLink}`;
      }
      return {
        ...link,
        title: localizedLinkTitle,
        link: localizedLink
      };
    });
    return {
      ...nav,
      title: localizedTitle,
      links: localizedLinks
    };
  });
}
```

**功能说明**：
- ✅ `getLangFromUrl()` - 从 URL 提取语言代码
- ✅ `switchLang()` - 切换语言并返回新 URL
- ✅ `useTranslations()` - 获取翻译函数（用于通用翻译）
- ✅ `getLocalizedNavigation()` - 本地化导航链接（URL 处理）
- ✅ `getLocalizedTags()` - 本地化标签（优先使用 TOML 配置）
- ✅ `getLocalizedFooterNavigation()` - 本地化 Footer 导航

## 4. 配置管理最佳实践

### 4.1 TOML 配置文件结构

**`settings.toml`（英文）**
```toml
theme = 'brookmint'

[general]
title = "🚀 AI TOOL HUB"
logo = ""
iconLogo = ""

[general.seo]
name = "AI TOOL HUB"
description = "Discover the best AI tools..."

[header.navbar]
colorModeSelector = true

[[header.navbar.links]]
name = "Follow us"
href = "https://tally.so"
target = "_blank"

[header.actionButton]
text = "Submit AI Tool"
href = "https://tally.so"

[footer]
description = "Discover and explore the best AI tools..."
```

**`settings-zh.toml`（中文）**
```toml
theme = 'brookmint'

[general]
title = "🚀 AI 工具导航"
logo = ""
iconLogo = ""

[general.seo]
name = "AI 工具导航"
description = "收录最全 AI 工具..."

[header.navbar]
colorModeSelector = true

[[header.navbar.links]]
name = "关注我们"
href = "https://tally.so"
target = "_blank"

[header.actionButton]
text = "提交 AI 工具"
href = "https://tally.so"

[footer]
description = "一站式发现全球优质 AI 工具..."
```

### 4.2 添加新语言的步骤

1. **创建语言配置文件**
   ```bash
   cp src/config/settings.toml src/config/settings-{lang}.toml
   ```

2. **翻译配置项**
   - 修改 `settings-{lang}.toml` 中的所有文本
   - 保持结构不变，只翻译值

3. **更新 i18n.ts**
   - 添加新语言的通用翻译
   ```typescript
   const i18nConfig: I18nConfig = {
     en: { ... },
     zh: { ... },
     ja: {  // 新语言
       navigation: { ... },
       tags: { ... },
       footer: { ... },
       common: { ... }
     }
   };
   ```

4. **更新语言选择器**
   - 在 `LanguageSelector.astro` 中添加新语言选项

### 4.3 维护建议

- ✅ **主要配置**：始终在 TOML 文件中管理
- ✅ **通用翻译**：在 `i18n.ts` 中作为 fallback
- ✅ **命名一致性**：保持不同语言版本的 key 一致
- ✅ **测试**：每次添加新语言后测试所有页面

## 5. 组件使用示例

### 5.1 在组件中使用本地化配置

```astro
---
// Navbar.astro
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl } from "@util/i18n";

const lang = getLangFromUrl(Astro.request.url);
const localizedConfig = getLocalizedThemeConfig(lang);
---

<nav>
  {localizedConfig.header.navbar.links.map((link) => (
    <a href={link.href}>{link.name}</a>
  ))}
  
  <a href={localizedConfig.header.actionButton.href}>
    {localizedConfig.header.actionButton.text}
  </a>
</nav>
```

### 5.2 使用通用翻译 fallback

```astro
---
// Footer.astro
import { useTranslations } from "@util/i18n";

const lang = 'zh';
const t = useTranslations(lang);
---

<footer>
  <p>{t('footer.Directory')}</p>
  <p>{t('common.loading')}</p>
</footer>
```

## 6. 总结

### 架构优势

1. **灵活性**：TOML 配置文件易于编辑，支持热重载
2. **可维护性**：配置与代码分离，便于多语言协作
3. **扩展性**：支持添加更多语言，只需添加对应配置文件
4. **Fallback 机制**：i18n.ts 提供通用翻译 fallback，确保不会缺少翻译

### 配置分工

| 配置类型 | 文件位置 | 用途 |
|---------|---------|------|
| 主要配置 | `settings.toml` / `settings-zh.toml` | 导航、按钮、SEO、目录数据等 |
| 通用翻译 | `i18n.ts` | 导航、标签、Footer、常用语（fallback） |
| 主题配置 | `themes/*.toml` | 主题特定配置（布局、UI 等） |

### 关键函数

| 函数 | 文件 | 用途 |
|-----|------|------|
| `getLocalizedThemeConfig(lang)` | `localizedThemeConfig.ts` | 获取本地化主题配置 |
| `getSettingsByLang(lang)` | `themeConfig.ts` | 获取语言特定配置 |
| `useTranslations(lang)` | `i18n.ts` | 获取通用翻译 |
| `getLangFromUrl(url)` | `i18n.ts` | 从 URL 提取语言 |
| `switchLang(url, lang)` | `i18n.ts` | 切换语言 URL |

---

**文档版本**: v2.0  
**最后更新**: 2026-03-24  
**维护者**: Minted Directory Astro Team
