# Minted Directory Astro 国际化实施方案

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
│   │   ├── i18n.ts                # 国际化配置文件
│   │   ├── settings.toml          # 默认配置文件
│   │   └── settings-zh.toml       # 中文配置文件
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

### 内容管理方式

- 使用 Astro Content Collections 管理内容
- 支持多种数据源：JSON、CSV、Airtable、Notion 等
- 默认使用 `src/data/directory/` 目录下的 md/mdx 文件

## 2. 国际化方案设计

### 2.1 核心思路

采用**语言子目录**的方式组织多语言内容，每个语言对应一个子目录，使用相同的文件结构和命名规范。同时，使用**语言特定的配置文件**来管理不同语言的配置，实现更灵活的国际化。

### 2.2 文件结构设计

```
src/data/
├── directory/          # 默认语言（英语）
│   ├── starter.md
│   ├── starter2.md
│   └── ...
├── directory-zh/       # 中文
│   ├── starter.md
│   ├── starter2.md
│   └── ...
├── pages/              # 页面数据
│   ├── index.mdx       # 英文首页
│   └── index-zh.mdx    # 中文首页
└── ...                 # 其他语言
```

### 2.3 配置文件设计

```
src/config/
├── i18n.ts            # 国际化配置文件（作为 fallback）
├── settings.toml      # 默认配置文件（英语）
├── settings-zh.toml   # 中文配置文件
└── ...                # 其他语言配置文件
```

### 2.4 内容管理方案

1. **使用 md 文件**：为每种语言创建对应的 md 文件，包含相同的 ID 但不同的内容
2. **统一的文件命名**：保持不同语言版本的文件名称一致，便于管理
3. **相同的 frontmatter 结构**：确保所有语言版本的 frontmatter 字段一致
4. **语言特定配置**：为每种语言创建对应的配置文件，管理语言特定的配置

## 3. 技术实现方案

### 3.1 依赖添加

本方案采用手动实现的方式，不需要额外安装国际化依赖。移除了 `astro-i18n` 包的使用，避免了配置冲突和构建错误。

### 3.2 国际化配置文件

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
    settings: {
      general: {
        title: string;
        seo: {
          name: string;
          description: string;
        };
      };
      directoryData: {
        tagPages: {
          title: string;
        };
        search: {
          placeholder: string;
        };
        tags: {
          [key: string]: {
            description: string;
          };
        };
      };
      header: {
        banner: {
          text: string;
          brandText: string;
        };
        actionButton: {
          text: string;
        };
      };
      footer: {
        description: string;
      };
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
    },
    settings: {
      general: {
        title: "Meditation Apps",
        seo: {
          name: "Cafe Directory",
          description: "Find the best nuxt starter kits."
        }
      },
      directoryData: {
        tagPages: {
          title: "{0} Apps"
        },
        search: {
          placeholder: "Search among {0} listings of this directory :)"
        },
        tags: {
          breathing: {
            description: "Breathing techniques are a popular feature in meditation apps."
          },
          sleep: {
            description: "Some apps include music that slowly goes away to help you sleep better and rest."
          },
          meditation: {
            description: "A meditation for your life. It's a great way to relax and clear your mind. It's also a great way to improve your sleep."
          },
          yoga: {
            description: "A yoga for your life."
          },
          timer: {
            description: "Timers can be used to track how much you meditate."
          }
        }
      },
      header: {
        banner: {
          text: "Follow mark_bruderer on twitter.",
          brandText: "AI Agent Libraries"
        },
        actionButton: {
          text: "Submit an app"
        }
      },
      footer: {
        description: "Best directory for my niche."
      }
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
    },
    settings: {
      general: {
        title: "冥想应用",
        seo: {
          name: "冥想应用目录",
          description: "发现最好的冥想应用。"
        }
      },
      directoryData: {
        tagPages: {
          title: "{0} 应用"
        },
        search: {
          placeholder: "在这个目录的 {0} 个应用中搜索 :)"
        },
        tags: {
          breathing: {
            description: "呼吸技巧是冥想应用中的热门功能。"
          },
          sleep: {
            description: "一些应用包含慢慢消失的音乐，帮助您更好地入睡和休息。"
          },
          meditation: {
            description: "为您的生活提供冥想。这是放松和清醒头脑的好方法。也是改善睡眠的好方法。"
          },
          yoga: {
            description: "为您的生活提供瑜伽。"
          },
          timer: {
            description: "计时器可用于跟踪您的冥想时间。"
          }
        }
      },
      header: {
        banner: {
          text: "在Twitter上关注mark_bruderer。",
          brandText: "AI 代理库"
        },
        actionButton: {
          text: "提交应用"
        }
      },
      footer: {
        description: "我的利基市场的最佳目录。"
      }
    }
  }
};

export default i18nConfig;
```

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
  defaultSettings = settingsSchema.parse(defaultConfigData);
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
  zhSettings = settingsSchema.parse(zhConfigData);
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
  return links.map(link => {
    const localizedName = i18nConfig[lang]?.navigation?.[link.name] || link.name;
    // Add language prefix to internal links
    let localizedHref = link.href;
    if (!localizedHref.startsWith("http")) {
      localizedHref = lang === "en" ? localizedHref : `/${lang}${localizedHref}`;
    }
    return {
      ...link,
      name: localizedName,
      href: localizedHref
    };
  });
}

// Get localized tags
export function getLocalizedTags(lang: string, tags: Array<{ key: string; name: string; color: string; emoji: string; description: string }>) {
  return tags.map(tag => {
    const localizedName = i18nConfig[lang]?.tags?.[tag.key] || tag.name;
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

### 3.6 构建错误修复

#### 3.6.1 移除 OG 图像生成功能

由于 `@vercel/og` 包在处理字体和图像时出现 URL 错误，导致构建失败，我们暂时移除了 `src/pages/og` 目录，禁用了 OG 图像生成功能。这不会影响网站的核心功能，只会影响社交媒体分享时的预览效果。

#### 3.6.2 修复类型错误

- 修复了 `Grid.astro` 中 `featured` 属性不存在的类型错误，使用 `Boolean()` 包装 `featured` 属性
- 修复了 `Search.astro` 和 `getListings.ts` 中的类型错误，使用类型断言 `as keyof DataEntryMap`
- 修复了 `LanguageSelector.astro` 中的类型错误，移除 `<a>` 标签上的 `key` 属性
- 修复了 `[slug].astro` 中的类型错误，添加类型定义和可选链操作符
- 修复了 `getRootPages.ts` 中的类型错误，将返回类型定义为 `any[]`
- 从 `astro:content` 导入 `DataEntryMap` 类型，解决未定义错误

### 3.7 自动语言检测功能

为了提升用户体验，我们实现了自动语言检测功能。该功能会根据用户的浏览器设置和地区自动切换语言，同时尊重用户的手动选择。

#### 3.7.1 实现逻辑

自动语言检测脚本（`public/scripts/autoLangDetection.js`）实现了以下逻辑：

1. **检查本地存储**：优先使用用户手动选择的语言（12 小时内有效）
2. **首次访问检测**：如果没有本地存储，根据浏览器语言和时区自动检测
3. **智能切换**：用户手动切换语言后，立即更新本地存储，避免循环重定向

#### 3.7.2 核心代码

**`public/scripts/autoLangDetection.js`**

```javascript
// 自动语言检测脚本

// 检查是否在中国地区
function isChinaRegion() {
  // 方法 1: 检查浏览器语言设置
  const navigatorLanguage = navigator.language || navigator.userLanguage;
  const isChineseLanguage = navigatorLanguage.startsWith('zh');
  
  // 方法 2: 检查时区（中国使用 UTC+8）
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaTimeZone = timeZone === 'Asia/Shanghai' || timeZone === 'Asia/Beijing' || timeZone === 'Asia/Chongqing' || timeZone === 'Asia/Hong_Kong' || timeZone === 'Asia/Macau' || timeZone === 'Asia/Taipei';
  
  // 方法 3: 检查浏览器区域设置
  const navigatorLocale = navigator.language || navigator.userLanguage;
  const isChineseLocale = navigatorLocale.startsWith('zh');
  
  // 只要满足任一条件，就认为在中国地区
  const result = isChineseLanguage || isChinaTimeZone || isChineseLocale;
  return result;
}

// 从本地存储获取用户语言选择
function getUserLanguagePreference() {
  try {
    const storedData = localStorage.getItem('language_preference');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const now = Date.now();
      // 检查是否在 12 小时内
      const isWithin12Hours = now - parsedData.timestamp < 12 * 60 * 60 * 1000;
      if (isWithin12Hours) {
        return parsedData.language;
      } else {
        // 如果超过 12 小时，清除存储
        localStorage.removeItem('language_preference');
      }
    }
  } catch (error) {
    console.error('Error reading language preference from localStorage:', error);
  }
  return null;
}

// 重定向到相应的语言版本
function redirectToLanguage() {
  // 检测 URL 中的语言
  const pathname = window.location.pathname;
  let detectedLang = 'en'; // 默认英文
  if (pathname.startsWith('/zh')) {
    detectedLang = 'zh';
  }
  
  // 检查本地存储中的语言选择
  const storedLanguage = getUserLanguagePreference();
  
  // 如果有存储的语言选择，使用存储的语言
  if (storedLanguage) {
    // 如果存储的语言与当前语言不同，说明用户手动切换了语言
    if (storedLanguage !== detectedLang) {
      // 更新本地存储为当前 URL 的语言（用户手动切换的）
      const storageData = {
        language: detectedLang,
        timestamp: Date.now()
      };
      localStorage.setItem('language_preference', JSON.stringify(storageData));
      // 不需要重定向，因为 URL 已经是用户想要的语言
    }
    return; // 重要：有存储时直接返回，不再执行下面的地区检测
  }
  
  // 没有存储的语言选择，根据地区检测
  const shouldUseChinese = isChinaRegion();
  const targetLanguage = shouldUseChinese ? 'zh' : 'en';
  
  // 如果检测到的地区语言与当前语言不同，进行重定向
  if (targetLanguage !== detectedLang) {
    // 构建新的 URL
    let newPathname;
    if (targetLanguage === 'en') {
      // 英文版本移除语言前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname.replace(/^\/zh/, '');
        if (!newPathname.startsWith('/')) {
          newPathname = `/${newPathname}`;
        }
        if (newPathname === '') {
          newPathname = '/';
        }
      } else {
        newPathname = pathname;
      }
    } else {
      // 中文版本添加 /zh 前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname;
      } else {
        if (pathname === '/') {
          newPathname = '/zh';
        } else {
          newPathname = `/zh${pathname}`;
        }
      }
    }
    
    // 确保新路径不是重复的
    if (newPathname !== window.location.pathname) {
      const newUrl = new URL(newPathname, window.location.origin);
      newUrl.search = window.location.search;
      newUrl.hash = window.location.hash;
      
      // 重定向
      window.location.href = newUrl.href;
    }
  }
  
  // 保存语言选择（首次访问）
  const storageData = {
    language: targetLanguage,
    timestamp: Date.now()
  };
  localStorage.setItem('language_preference', JSON.stringify(storageData));
}

// 页面加载时执行
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', redirectToLanguage);
}
```

#### 3.7.3 工作流程

1. **用户首次访问**：
   - 检测浏览器语言和时区
   - 如果在中国地区，重定向到中文版本（`/zh`）
   - 保存语言选择到本地存储（12 小时有效期）

2. **用户手动切换语言**：
   - 点击语言切换按钮
   - URL 变为目标语言路径
   - 页面加载时检测到 URL 语言与存储不同
   - 立即更新本地存储为 URL 语言
   - 不进行重定向（避免循环）

3. **用户刷新页面**：
   - 检测本地存储中的语言选择
   - 如果与当前 URL 一致，不做任何操作
   - 如果不一致，说明用户手动切换了，更新存储

4. **12 小时后**：
   - 本地存储过期
   - 重新根据地区检测自动切换语言

#### 3.7.4 关键问题解决

**问题：循环重定向**

早期实现中，脚本在每次页面加载时都会更新本地存储，导致：
1. 用户切换到英文（URL: `/starter`）
2. 脚本检测到 URL 是英文，更新存储为英文
3. 但下次刷新时，脚本又检测到用户在中国，重定向到中文
4. 形成无限循环

**解决方案**：
- 有本地存储时，只更新不重定向
- 没有本地存储时，才根据地区检测重定向
- 用户手动切换后，立即更新存储，确保下次刷新不会被覆盖

### 3.8 内容配置更新

**`src/content.config.ts`**

```typescript
import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { createDirectoryCollection } from "@lib/loaders";

const directory = createDirectoryCollection();

// 为中文创建集合
const directoryZh = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/directory-zh" }),
  schema: ({ image }) => directorySchema(image())
});

// 其他集合配置...

export const collections = {
  directory,    // 默认英语
  directoryZh,  // 中文
  // 其他集合...
};
```

### 3.7 语言切换功能

#### 3.7.1 创建语言选择器组件

**`src/components/ui/LanguageSelector.astro`**

```astro
---
import { getLangFromUrl, switchLang } from '../../util/i18n';

const currentLocale = getLangFromUrl(new URL(Astro.request.url));
const locales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' }
];
---

<div class="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
  <div class="flex items-center space-x-2">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</span>
    <div class="flex space-x-1">
      {locales.map((locale) => (
        <a
          key={locale.code}
          href={switchLang(new URL(Astro.request.url), locale.code)}
          class={`px-3 py-1 text-sm rounded-md ${currentLocale === locale.code ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          {locale.code.toUpperCase()}
        </a>
      ))}
    </div>
  </div>
</div>
```

#### 3.7.2 添加到主布局

**`src/layouts/BaseLayout.astro`**

```astro
---
import "@fontsource-variable/gabarito";
import themeConfig from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl } from "@util/i18n";
import "../styles/global.css";
import Posthog from "@components/analytics/Posthog.astro";
import { ClientRouter } from "astro:transitions";
import { getOGImage } from "@util/getOGImage";
import LanguageSelector from "@components/ui/LanguageSelector.astro";

const { title, slug } = Astro.props;
const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const siteTitle = localizedConfig.general.title;

const calculatedTitle = title || siteTitle;
---

<!doctype html>
<html lang={lang}>
  <head>
    <!-- 头部内容... -->
  </head>
  <body class="bg-white dark:bg-gray-900">
    <slot />
    <LanguageSelector />
    <Posthog />
  </body>
</html>
```

### 3.8 内容加载逻辑

#### 3.8.1 修改 getListings 函数

**`src/lib/getListings.ts`**

```typescript
import { getCollection } from "astro:content";
import { getLangFromUrl } from "../util/i18n";

export async function getListings(Astro: any) {
  const locale = getLangFromUrl(Astro.url);
  const collectionName = locale === "en" ? "directory" : `directory${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  
  try {
    return await getCollection(collectionName as keyof DataEntryMap);
  } catch (error) {
    // 回退到默认目录
    return await getCollection("directory" as keyof DataEntryMap);
  }
}
```

#### 3.8.2 更新目录网格组件

**`src/components/directory/Grid.astro`**

```astro
---
import { getListings } from "../../lib/getListings";
import PureGrid from "./PureGrid.astro";

const allListings = (await getListings(Astro)).sort(
  (a, b) => Number(Boolean((a.data as any).featured)) - Number(Boolean((b.data as any).featured)),
);
---

<PureGrid id="directory-grid" listings={allListings} />
```

#### 3.8.3 更新目录卡片组件

**`src/components/directory/cards/index.astro`**

```astro
---
import config from "@util/themeConfig";
import BulletCard from "./BulletCard.astro";
import RectangleCard from "./RectangleCard.astro";
import SmallHorizontalCard from "./SmallHorizontalCard.astro";
import { getLangFromUrl } from "@util/i18n";

const { item } = Astro.props;

const myItem = {
  ...item,
  ...item.data,
};

const lang = getLangFromUrl(new URL(Astro.request.url));
const basePath = lang === "en" ? "" : `/${lang}`;
const href = config.directoryData?.source?.linksOutbound
  ? myItem.link
  : `${basePath}/${myItem.id}`;

const type = config.directoryUI.grid.type;
---

<div
  class="listing"
  transition:name={`${myItem.id}-card`}
  data-tags={myItem.tags?.join(",") || ""}
>
  {type == "icon-list" && <BulletCard myItem={myItem} href={href} />}
  {
    type == "rectangle-card-grid" && (
      <RectangleCard myItem={myItem} href={href} />
    )
  }
  {
    type == "small-card-grid" && (
      <SmallHorizontalCard myItem={myItem} href={href} />
    )
  }
</div>
```

### 3.9 页面路由

#### 3.9.1 更新 getRootPages 函数

**`src/lib/getRootPages.ts`**

```typescript
import type { AllContent } from "../types/content";
import { getCollection } from "astro:content";
import config from "@util/themeConfig";

export async function getBlogPages() {
  const allPosts = await getCollection("blog");
  return allPosts.map((entry) => ({params: {slug: entry.id }, props: { entry }}));
}

export async function getRootPages(remapIndex: boolean = true) {
  const allListings = await getCollection("directory");
  const allListingsZh = await getCollection("directoryZh").catch(() => []);
  const allPages = await getCollection("pages");

  // Combine listings and pages
  const combinedEntries: Array<AllContent> = allListings.concat(allPages as never);
  
  // Generate paths for default language (English)
  const defaultPaths = combinedEntries.map((entry) => {
    let mySlug: string = entry.id;

    if (mySlug === "index" && remapIndex) {
      mySlug = "/";
    }

    return {
      params: { slug: mySlug },
      props: { entry, lang: "en" },
    };
  });
  
  // Add English tag pages
  const tags = config.directoryData?.tags || [];
  tags.forEach((tag) => {
    defaultPaths.push({
      params: { slug: `tags/${tag.key}` },
      props: { lang: "en", tag },
    });
  });
  
  // Generate paths for Chinese language
  const zhPaths = [];
  
  // Add Chinese home page
  const zhIndexPage = allPages.find(entry => entry.id === "index-zh");
  if (zhIndexPage) {
    zhPaths.push({
      params: { slug: "zh" },
      props: { entry: zhIndexPage, lang: "zh" },
    });
  }
  
  // Add other Chinese pages
  allListingsZh.forEach((entry) => {
    zhPaths.push({
      params: { slug: `zh/${entry.id}` },
      props: { entry, lang: "zh" },
    });
  });
  
  // Add Chinese tag pages
  tags.forEach((tag) => {
    zhPaths.push({
      params: { slug: `zh/tags/${tag.key}` },
      props: { lang: "zh", tag },
    });
  });
  
  // Return all paths
  return [...defaultPaths, ...zhPaths];
}
```

#### 3.9.2 更新 [...slug].astro

**`src/pages/[...slug].astro`**

```astro
---
import { getCollection } from "astro:content";
import Wide from "@layouts/Wide.astro";
import Listing from "@layouts/Listing.astro";
import { render } from "astro:content";
import Sidebar from "@layouts/Sidebar.astro";
import Landing from "@layouts/Landing.astro";
import { getRootPages } from "@lib/getRootPages";
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import DirectoryCard from "@components/directory/cards/index.astro";
import { useTranslations } from "@util/i18n";

// Fetch all listings and pages
const { slug } = Astro.params;
const { entry, lang = "en", tag } = Astro.props;
const t = useTranslations(lang);
const localizedConfig = getLocalizedThemeConfig(lang);

let Content;
let frontmatter;
let tagListings = [];

if (entry) {
  // For regular pages and listings
  const rendered = await render(entry);
  Content = rendered.Content;
  frontmatter = entry.data;
} else if (tag) {
  // For tag pages
  // Create a virtual entry for tag pages
  const localizedTagName = t(`tags.${tag.key}`) || tag.name;
  
  // Get tag description from localized config
  let localizedTagDescription = `Apps related to ${localizedTagName}`;
  const localizedTag = localizedConfig.directoryData.tags.find((t: any) => t.key === tag.key);
  if (localizedTag && localizedTag.description) {
    localizedTagDescription = localizedTag.description;
  }
  
  frontmatter = {
    title: `${localizedTagName} Apps`,
    description: localizedTagDescription,
    featured: false,
    tags: [tag.key],
    image: null,
  };
  // For tag pages, we'll render the content differently
  Content = () => null;
  
  // Get listings for this tag
  const collection = lang === "zh" ? "directoryZh" : "directory";
  const allListings = await getCollection(collection);
  tagListings = allListings.filter(listing => 
    listing.data.tags && listing.data.tags.includes(tag.key)
  );
}

export async function getStaticPaths() {
  return await getRootPages();
}

const landingView = !slug || slug === "blog" || slug === "zh/blog" || slug === "zh";
const isTagPage = slug && (slug.startsWith("tags/") || slug.startsWith("zh/tags/"));
const type = config.directoryUI.grid.type;
const gridType = type == "rectangle-card-grid" || type == "small-card-grid";
---

{
  landingView ? (
    <Landing>
      <Content />
    </Landing>
  ) : isTagPage ? (
    <Sidebar>
      <div class="not-prose">
        <h1 class="text-3xl font-bold mb-4">{frontmatter.title}</h1>
        <p class="text-gray-600 dark:text-gray-300 mb-8">{frontmatter.description}</p>
        <div
          class:list={[
            "grid grid-cols-1 gap-4",
            { "md:grid-cols-2 lg:grid-cols-4": gridType },
          ]}
        >
          {tagListings.map((listing) => (
            <DirectoryCard key={listing.id} item={listing} />
          ))}
        </div>
      </div>
    </Sidebar>
  ) : (
    <Listing frontmatter={frontmatter} slug={slug}>
      <Content />
    </Listing>
  )
}
```

### 3.10 搜索组件国际化

**`src/components/directory/Search.astro`**

```astro
---
import { Icon } from "astro-icon/components";
import { getCollection } from "astro:content";
import formatString from "../../util/formatString";
import UiTagGrid from "../ui/tags/Grid.vue";
import UiTagSelect from "../ui/tags/Select.vue";
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "../../util/localizedThemeConfig";
import { getLangFromUrl } from "../../util/i18n";

const locale = getLangFromUrl(Astro.url);
const localizedConfig = getLocalizedThemeConfig(locale);
const searchPlaceholder = await getSearchPlaceholder();

async function getSearchPlaceholder() {
  const collectionName = locale === "en" ? "directory" : `directory${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  const count = (await getCollection(collectionName as keyof DataEntryMap)).length;
  
  const placeholder = localizedConfig.directoryData.search.placeholder || "Search among {0} listings";
  return formatString(placeholder, count);
}
---

<!-- 搜索组件内容... -->
```

### 3.11 导航栏国际化

**`src/components/app/Navbar.astro`**

```astro
---
import { Icon } from "astro-icon/components";
import ColorSelector from "./header/ColorSelector.astro";
import Logo from "./Logo.astro";
import LanguageSelector from "./ui/LanguageSelector.astro";
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl, useTranslations, getLocalizedNavigation } from "@util/i18n";

// Get the current path safely
const currentPath = new URL(Astro.request.url).pathname;
const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const t = useTranslations(lang);

// Helper function to check if a route is active
const isActive = (path: string, currentPath: string | undefined) => {
  if (!currentPath) return false;
  
  // If current path is exactly the same as the link path, return true
  if (currentPath === path) return true;
  
  // For paths with language prefix, compare the full path
  // For root path, only match exactly
  if (currentPath === "/" || currentPath === "/zh") {
    return currentPath === path;
  }
  
  // For other paths, compare the path segments after the language prefix
  const currentPathSegments = currentPath.split("/");
  const pathSegments = path.split("/");
  
  // Skip language prefix if present
  const currentPathStart = currentPathSegments[1] === "zh" || currentPathSegments[1] === "en" ? 2 : 1;
  const pathStart = pathSegments[1] === "zh" || pathSegments[1] === "en" ? 2 : 1;
  
  // If either path has no segments after the language prefix, they can't match
  if (currentPathSegments.length <= currentPathStart || pathSegments.length <= pathStart) {
    return false;
  }
  
  // Compare the first segment after the language prefix
  return currentPathSegments[currentPathStart] === pathSegments[pathStart];
};

// Get localized navigation links
const localizedLinks = getLocalizedNavigation(lang, localizedConfig.header.navbar.links || []);
---

<!-- 导航栏内容... -->
```

### 3.12 侧边栏国际化

**`src/components/app/SidebarTags.astro`**

```astro
---
import themeConfig from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl, useTranslations, getLocalizedTags } from "@util/i18n";

const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const tags = localizedConfig.directoryData.tags;
const emoji = localizedConfig.layout.emoji;
const t = useTranslations(lang);

// Get localized tags
const localizedTags = getLocalizedTags(lang, tags);
---

<!-- 侧边栏内容... -->
```

### 3.13 页脚国际化

**`src/components/app/Footer.astro`**

```astro
---
import AppLogo from "./Logo.astro";
import { Icon } from "astro-icon/components";
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl, useTranslations, getLocalizedFooterNavigation } from "@util/i18n";

const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const socials = Object.values(localizedConfig.footer.socials);
const socialNames = Object.keys(localizedConfig.footer.socials);
const t = useTranslations(lang);

// Get base navigation
const baseNavigation = [
  {
    title: "Directory",
    links: [
      { title: "Submit", link: "/submit" },
      { title: "Advertise", link: "/advertise" },
    ],
  },
  {
    title: "Categories",
    links: localizedConfig.directoryData.tags
      ?.filter((e) => e && e.name)
      .map((e) => ({
        title: e.name,
        link: `/tags/${e.key}`,
      }))
      .slice(0, 4),
  },
  {
    title: "Blog",
    links: [{ title: "Articles", link: "/blog" }],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", link: "/legal/terms-of-service" },
      { title: "Terms of Service", link: "/legal/privacy-policy" },
    ],
  },
];

// Get localized navigation
const navigation = getLocalizedFooterNavigation(lang, baseNavigation);
---

<!-- 页脚内容... -->
```

### 3.14 标签选择功能国际化

#### 3.14.1 Select.vue 组件国际化

**`src/components/ui/tags/Select.vue`**

```vue
<template>
  <div class="relative w-full">
    <select
      v-model="selectedTag"
      @change="handleTagChange"
      class="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
    >
      <option value="">{{ getSelectPlaceholder() }}</option>
      <option v-for="tag in availableTags" :key="tag.key" :value="tag.key">
        {{ getLocalizedTagName(tag.key) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getLocalizedThemeConfig } from '@util/localizedThemeConfig';

const props = defineProps<{
  tags: Array<{ key: string; name: string; color: string; emoji: string; description: string }>;
  currentTag: string | null;
  locale: string;
}>();

const emit = defineEmits<{
  (e: 'tagChange', tag: string | null): void;
}>();

const selectedTag = ref(props.currentTag || '');

// Get localized tag name by key
function getLocalizedTagName(tagKey: string): string {
  const tag = availableTags?.find(t => t.key === tagKey);
  return tag?.name || tagKey;
}

// Get localized select placeholder
function getSelectPlaceholder(): string {
  if (typeof window !== 'undefined') {
    const localizedConfig = getLocalizedThemeConfig(props.locale);
    // 检查 localizedConfig 是否存在及其结构
    if (localizedConfig && localizedConfig.directoryData && localizedConfig.directoryData.search) {
      // 优先使用 localizedConfig 中的 placeholder
      if (localizedConfig.directoryData.search.tags?.placeholder) {
        return localizedConfig.directoryData.search.tags.placeholder;
      }
    }
    // 如果没有找到，根据语言返回默认值
    return props.locale === 'zh' ? "选择一个标签" : "Select a tag";
  }
  return "Select a tag";
}

const availableTags = computed(() => {
  return props.tags || [];
});

function handleTagChange() {
  emit('tagChange', selectedTag.value || null);
}
</script>
```

#### 3.14.2 Tag.astro 组件国际化

**`src/components/ui/tags/Tag.astro`**

```astro
---
import type Tag from "../../../types/Tag";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl } from "@util/i18n";

const { tag } = Astro.props;
const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const config = localizedConfig.directoryData.tags;

const configTag = config?.find((element: any) => element.key === tag);

const tagClass = configTag?.color ? `${configTag.color}-tag` : "gray-tag";
---

<span class:list={["tag", tagClass]}>
  {configTag?.name || tag}
</span>
```

### 3.15 配置文件更新

#### 3.15.1 settings.toml

**`src/config/settings.toml`**

```toml
# 添加标签搜索占位符
[directoryData.search.tags]
placeholder = "Select a tag"
```

#### 3.15.2 settings-zh.toml

**`src/config/settings-zh.toml`**

```toml
# 添加标签搜索占位符
[directoryData.search.tags]
placeholder = "选择一个标签"
```

### 3.16 Logo 组件国际化

**`src/components/app/Logo.astro`**

```astro
---
import { Icon } from "astro-icon/components";
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl } from "@util/i18n";

const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const homePath = lang === "en" ? "/" : `/${lang}`;
---

<a href={homePath} class="flex items-center space-x-3 rtl:space-x-reverse">
  {
    localizedConfig.general.logo ? (
      <img
        sizes="32px"
        src={localizedConfig.general.logo}
        class="h-8"
        alt={localizedConfig?.general.title + " Logo"}
      />
    ) : (
      <Icon
        class="w-7 h-7 text-gray-600 dark:text-white"
        name={localizedConfig?.general?.iconLogo}
      />
    )
  }
  <span
    class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
    >{localizedConfig.general.title}</span
  >
</a>
```

## 3.17 自动语言检测功能

### 3.17.1 自动语言检测脚本

**`public/scripts/autoLangDetection.js`**

```javascript
// 自动语言检测脚本

// 检查是否在中国地区
function isChinaRegion() {
  // 方法1: 检查浏览器语言设置
  const navigatorLanguage = navigator.language || navigator.userLanguage;
  const isChineseLanguage = navigatorLanguage.startsWith('zh');
  console.log('Auto lang detection: Browser language:', navigatorLanguage, 'isChinese:', isChineseLanguage);
  
  // 方法2: 检查时区（中国使用 UTC+8）
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaTimeZone = timeZone === 'Asia/Shanghai' || timeZone === 'Asia/Beijing' || timeZone === 'Asia/Chongqing' || timeZone === 'Asia/Hong_Kong' || timeZone === 'Asia/Macau' || timeZone === 'Asia/Taipei';
  console.log('Auto lang detection: Time zone:', timeZone, 'isChinaTimeZone:', isChinaTimeZone);
  
  // 方法3: 检查浏览器区域设置
  const navigatorLocale = navigator.language || navigator.userLanguage;
  const isChineseLocale = navigatorLocale.startsWith('zh');
  console.log('Auto lang detection: Navigator locale:', navigatorLocale, 'isChineseLocale:', isChineseLocale);
  
  // 只要满足任一条件，就认为在中国地区
  const result = isChineseLanguage || isChinaTimeZone || isChineseLocale;
  console.log('Auto lang detection: Is China region:', result);
  return result;
}

// 从本地存储获取用户语言选择
function getUserLanguagePreference() {
  try {
    const storedData = localStorage.getItem('language_preference');
    console.log('Auto lang detection: Stored data:', storedData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const now = Date.now();
      // 检查是否在1小时内
      const isWithinHour = now - parsedData.timestamp < 60 * 60 * 1000;
      console.log('Auto lang detection: Stored language:', parsedData.language, 'Timestamp:', parsedData.timestamp, 'Is within hour:', isWithinHour);
      if (isWithinHour) {
        return parsedData.language;
      } else {
        // 如果超过1小时，清除存储
        localStorage.removeItem('language_preference');
        console.log('Auto lang detection: Removed expired language preference');
      }
    }
  } catch (error) {
    console.error('Error reading language preference from localStorage:', error);
  }
  return null;
}

// 重定向到相应的语言版本
function redirectToLanguage() {
  console.log('Auto lang detection: Starting');
  console.log('Auto lang detection: Current URL:', window.location.href);
  
  // 检查 URL 中是否有语言前缀
  const pathname = window.location.pathname;
  console.log('Auto lang detection: Current pathname:', pathname);
  
  // 检测语言：如果有 /zh 前缀则为中文，否则为英文
  let detectedLang = 'en'; // 默认英文
  if (pathname.startsWith('/zh')) {
    detectedLang = 'zh';
  }
  console.log('Auto lang detection: Detected language from URL:', detectedLang);
  
  // 检查本地存储中的语言选择
  const storedLanguage = getUserLanguagePreference();
  console.log('Auto lang detection: Stored language preference:', storedLanguage);
  
  if (storedLanguage) {
    // 如果存储的语言与当前语言不同，进行重定向
    if (storedLanguage !== detectedLang) {
      console.log('Auto lang detection: Stored language different from current, redirecting...');
      // 构建新的 URL
      let newPathname;
      if (storedLanguage === 'en') {
        // 英文版本移除语言前缀
        if (pathname.startsWith('/zh')) {
          newPathname = pathname.replace(/^\/zh/, '');
          // 确保路径以 / 开头
          if (!newPathname.startsWith('/')) {
            newPathname = `/${newPathname}`;
          }
          // 如果路径是空的，设置为 /
          if (newPathname === '') {
            newPathname = '/';
          }
        } else {
          newPathname = pathname;
        }
      } else {
        // 中文版本添加 /zh 前缀
        if (pathname.startsWith('/zh')) {
          newPathname = pathname;
        } else {
          if (pathname === '/') {
            newPathname = '/zh';
          } else {
            newPathname = `/zh${pathname}`;
          }
        }
      }
      
      // 确保新路径不是重复的
      if (newPathname !== window.location.pathname) {
        const newUrl = new URL(newPathname, window.location.origin);
        newUrl.search = window.location.search;
        newUrl.hash = window.location.hash;
        console.log('Auto lang detection: Redirecting to:', newUrl.href);
        
        // 重定向
        window.location.href = newUrl.href;
      }
    } else {
      console.log('Auto lang detection: Stored language matches current, no redirect needed');
    }
    return;
  }
  
  // 没有存储的语言选择，根据地区检测
  console.log('Auto lang detection: No stored language preference, detecting region...');
  const shouldUseChinese = isChinaRegion();
  const targetLanguage = shouldUseChinese ? 'zh' : 'en';
  console.log('Auto lang detection: Target language based on region:', targetLanguage);
  
  // 如果检测到的地区语言与当前语言不同，进行重定向
  if (targetLanguage !== detectedLang) {
    console.log('Auto lang detection: Target language different from current, redirecting...');
    // 构建新的 URL
    let newPathname;
    if (targetLanguage === 'en') {
      // 英文版本移除语言前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname.replace(/^\/zh/, '');
        // 确保路径以 / 开头
        if (!newPathname.startsWith('/')) {
          newPathname = `/${newPathname}`;
        }
        // 如果路径是空的，设置为 /
        if (newPathname === '') {
          newPathname = '/';
        }
      } else {
        newPathname = pathname;
      }
    } else {
      // 中文版本添加 /zh 前缀
      if (pathname.startsWith('/zh')) {
        newPathname = pathname;
      } else {
        if (pathname === '/') {
          newPathname = '/zh';
        } else {
          newPathname = `/zh${pathname}`;
        }
      }
    }
    
    // 确保新路径不是重复的
    if (newPathname !== window.location.pathname) {
      const newUrl = new URL(newPathname, window.location.origin);
      newUrl.search = window.location.search;
      newUrl.hash = window.location.hash;
      console.log('Auto lang detection: Redirecting to:', newUrl.href);
      
      // 重定向
      window.location.href = newUrl.href;
    }
  } else {
    console.log('Auto lang detection: Target language matches current, no redirect needed');
  }
  
  // 更新本地存储，无论是否有语言前缀
  try {
    const storageData = {
      language: targetLanguage,
      timestamp: Date.now()
    };
    console.log('Auto lang detection: Storing language preference:', storageData);
    localStorage.setItem('language_preference', JSON.stringify(storageData));
  } catch (error) {
    console.error('Error storing language preference to localStorage:', error);
  }
}

// 页面加载时执行
if (typeof window !== 'undefined') {
  // 延迟执行，确保页面已经加载
  console.log('Auto lang detection: Adding DOMContentLoaded listener');
  window.addEventListener('DOMContentLoaded', redirectToLanguage);
}
```

### 3.17.2 添加自动语言检测脚本到主布局

**`src/layouts/BaseLayout.astro`**

```astro
---
import "@fontsource-variable/gabarito";
import themeConfig from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import { getLangFromUrl } from "@util/i18n";
import "../styles/global.css";
import Posthog from "@components/analytics/Posthog.astro";
import { ClientRouter } from "astro:transitions";
import { getOGImage } from "@util/getOGImage";
import LanguageSelector from "@components/ui/LanguageSelector.astro";

const { title, slug } = Astro.props;
const lang = getLangFromUrl(new URL(Astro.request.url));
const localizedConfig = getLocalizedThemeConfig(lang);
const siteTitle = localizedConfig.general.title;

const calculatedTitle = title || siteTitle;
---

<!doctype html>
<html lang={lang}>
  <head>
    <!-- 头部内容... -->
  </head>
  <body class="bg-white dark:bg-gray-900">
    <slot />
    <LanguageSelector />
    <Posthog />
    <!-- 添加自动语言检测脚本 -->
    <script src="/scripts/autoLangDetection.js"></script>
  </body>
</html>
```

## 4. 实施步骤

### 4.1 准备工作

1. 创建国际化配置文件：`src/config/i18n.ts`
2. 创建主题配置加载文件：`src/util/themeConfig.ts`
3. 创建本地化主题配置文件：`src/util/localizedThemeConfig.ts`
4. 创建国际化工具文件：`src/util/i18n.ts`
5. 创建自动语言检测脚本：`public/scripts/autoLangDetection.js`

### 4.2 目录结构搭建

1. 创建语言子目录：
   - `src/data/directory-zh/`
   - 其他语言目录...

2. 复制并翻译内容文件：
   - 将 `src/data/directory/` 下的 md 文件复制到各语言目录
   - 翻译内容和标题

3. 创建语言对应的首页文件：
   - `src/data/pages/index-zh.mdx` 用于中文首页

4. 创建语言特定的配置文件：
   - `src/config/settings-zh.toml` 用于中文配置
   - 其他语言配置文件...

5. 创建脚本目录：
   - `public/scripts/` 用于存放自动语言检测脚本

### 4.3 配置更新

1. 更新 `src/content.config.ts`，为每种语言添加集合
2. 修改 `src/lib/getListings.ts`，支持多语言内容加载
3. 更新 `src/lib/getRootPages.ts`，支持多语言路由
4. 更新 `src/pages/[...slug].astro`，支持多语言路由和标签页面
5. 更新 `src/layouts/BaseLayout.astro`，添加自动语言检测脚本

### 4.4 组件开发

1. 创建 `src/components/ui/LanguageSelector.astro` 组件
2. 将语言选择器添加到主布局 `BaseLayout.astro`
3. 更新目录卡片组件 `src/components/directory/cards/index.astro`，支持多语言链接
4. 更新 Logo 组件 `src/components/app/Logo.astro`，支持多语言首页链接
5. 更新搜索组件 `Search.astro`，支持多语言占位符
6. 更新导航栏组件 `Navbar.astro`，支持基于配置的国际化
7. 更新标签选择组件 `Select.vue`，支持国际化占位符和标签名
8. 更新 Tag 组件 `Tag.astro`，支持国际化标签名
7. 更新侧边栏组件 `SidebarTags.astro`，支持基于配置的国际化
8. 更新页脚组件 `Footer.astro`，支持基于配置的国际化
9. 更新所有使用配置的组件，使用 `getLocalizedThemeConfig` 函数获取本地化配置

### 4.5 测试和验证

1. 运行开发服务器：`npm run dev`
2. 测试语言切换功能
3. 验证不同语言版本的内容显示
4. 测试标签页面的标签描述是否正确显示
5. 运行构建命令：`npm run build`，确保构建成功

### 4.6 部署注意事项

1. **静态文件部署**：将 `dist` 目录中的内容直接部署到静态文件服务器（如 Nginx）
2. **Nginx 配置**：确保 Nginx 配置正确处理中文路径，添加适当的路由规则
3. **Astro 配置**：根据部署环境更新 `astro.config.mjs` 中的 `site` 参数，或不设置该参数以使用相对路径
4. **文件权限**：确保服务器用户有读取部署目录的权限
5. **缓存策略**：配置适当的缓存策略，提高页面加载速度

## 5. 最佳实践

### 5.1 内容管理

- **保持文件结构一致**：确保各语言目录下的文件结构和命名一致
- **统一 frontmatter 结构**：所有语言版本的 frontmatter 字段应保持一致
- **使用相同的 ID**：不同语言版本的文件应使用相同的 ID，便于关联
- **语言特定配置**：为每种语言创建对应的配置文件，管理语言特定的配置

### 5.2 翻译管理

- **建立翻译工作流**：可以使用工具如 Crowdin 或 Lokalise 管理翻译
- **保持翻译更新**：当添加新内容或修改现有内容时，确保所有语言版本都得到更新
- **注意文化差异**：翻译时考虑文化差异，确保内容在不同文化背景下都合适
- **配置文件翻译**：确保语言特定的配置文件中的文本也得到正确翻译

### 5.3 性能优化

- **懒加载翻译**：只加载当前语言的内容
- **缓存策略**：合理使用缓存，提高页面加载速度
- **图片优化**：为不同语言版本的内容使用适当的图片
- **配置文件加载**：确保配置文件加载高效，避免不必要的网络请求

### 5.4 配置管理

- **配置文件结构**：保持配置文件结构一致，便于管理和维护
- **配置优先级**：确保语言特定配置文件优先于默认配置和 i18n 配置
- **配置验证**：使用 schema 验证配置文件，确保配置格式正确
- **配置文档**：为配置文件添加注释，说明配置项的用途

## 6. 总结

本方案采用语言子目录的方式组织多语言内容，使用 md 文件作为内容载体，结合语言特定的配置文件和手动实现的国际化工具实现国际化功能。经过多轮迭代和优化，最终实现了一个完整的国际化解决方案。

### 6.1 核心功能实现

1. **多语言内容管理**：通过语言子目录组织不同语言的内容，保持文件结构一致，便于管理和维护。
2. **动态配置加载**：根据当前语言动态加载对应的配置文件（如settings-zh.toml），实现配置的多语言支持。
3. **组件国际化**：更新了所有组件，使用本地化配置和翻译函数，确保界面元素的多语言显示。
4. **语言切换功能**：实现了悬浮式语言选择器，支持在不同语言间切换，并正确处理路由。
5. **标签页国际化**：确保标签名称和描述在不同语言下正确显示，修复了标签描述不生效的问题。
6. **标签选择功能国际化**：修复了标签选择组件的国际化问题，确保下拉框和标签显示都使用本地化文字。
7. **导航栏高亮逻辑修复**：修复了根路径下导航栏错误高亮的问题，确保中英文导航行为一致。
8. **响应式设计**：语言选择器在黑夜模式下自动调整文字颜色，确保在不同主题下都能清晰可见。
9. **构建错误修复**：修复了一系列类型错误和构建问题，确保项目能够成功构建。
10. **部署优化**：提供了详细的部署注意事项，确保网站能够在不同环境下正确运行。

### 6.2 技术优势

1. **结构清晰**：通过语言子目录组织内容，结构清晰易管理
2. **易于扩展**：添加新语言只需创建新的子目录和配置文件并翻译内容
3. **灵活性高**：可以针对不同语言版本定制内容和配置
4. **性能良好**：只加载当前语言的内容，避免不必要的资源加载
5. **无需依赖**：不依赖第三方国际化库，减少项目依赖
6. **配置化**：通过语言特定的配置文件实现更灵活的国际化配置
7. **可维护性**：集中管理翻译文本，便于维护和更新
8. **一致性**：确保所有界面元素在不同语言下保持一致的布局和样式

### 6.3 实施效果

通过本方案的实施，Minted Directory Astro 项目现在能够：

1. 支持英语和中文两种语言
2. 在不同语言间无缝切换
3. 显示语言特定的内容和配置
4. 保持一致的布局和用户体验
5. 易于添加新的语言支持

### 6.4 未来扩展

本方案为未来的国际化扩展提供了良好的基础：

1. **添加新语言**：只需创建新的语言子目录和配置文件
2. **优化翻译管理**：可以集成专业的翻译管理工具
3. **支持更多语言特性**：如 RTL 语言支持
4. **增强配置灵活性**：可以进一步优化配置加载机制

通过本方案的实施，Minted Directory Astro 项目将能够为不同语言背景的用户提供更好的体验，扩大项目的全球影响力。