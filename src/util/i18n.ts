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