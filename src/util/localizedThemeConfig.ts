import { getSettingsByLang } from "./themeConfig";

/**
 * Get localized theme configuration based on the current language
 * @param lang The current language code
 * @returns The localized theme configuration
 */
export function getLocalizedThemeConfig(lang: string) {
  // Load language-specific config file
  const baseSettings = getSettingsByLang(lang);
  
  // Return a deep copy of the base settings
  return JSON.parse(JSON.stringify(baseSettings));
}
