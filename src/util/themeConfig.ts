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