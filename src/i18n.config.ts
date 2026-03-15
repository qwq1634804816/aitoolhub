import { defineI18nConfig } from 'astro-i18n';

export default defineI18nConfig({
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  routing: {
    prefixDefaultLocale: false,
  },
});