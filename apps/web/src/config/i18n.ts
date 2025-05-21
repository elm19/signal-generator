import type { Locales, LocalizedRecord } from '@/lib/opendocs/types/i18n'

export const defaultLocale = 'en' as const

export const locale = {
  en: defaultLocale,
  fr: 'fr',
} as const

export const labels = {
  [defaultLocale]: 'English',
  [locale.fr]: 'Français',
} as const

export const dateLocales: LocalizedRecord = {
  en: 'en-US',
  fr: 'fr-FR',
} as const

export const locales = Object.values(locale) as Locales
