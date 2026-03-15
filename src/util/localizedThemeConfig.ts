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
