import { absoluteUrl } from '@/lib/utils'
import en from '@/i18n/locales/en.json'
import fr from '@/i18n/locales/fr.json'

export const siteConfig = {
  name: 'signal-provider',

  description: {
    en: 'Advanced time series analysis and trading signal generation platform. Get accurate market insights with our ML-powered signal generator.',
    fr: "Plateforme avancée d'analyse de séries temporelles et de génération de signaux de trading.",
  },

  url: process.env.NEXT_PUBLIC_APP_URL,

  og: {
    image: absoluteUrl('/og.jpg'),

    size: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    latestVersion: '1.0.0',
  },

  author: {
    name: 'elm19',
    site: './',
  },

  links: {
    twitter: {
      label: 'Twitter',
      username: '@elm19',
      url: 'https://twitter.com/elm19',
    },

    github: {
      label: 'GitHub',
      url: 'https://github.com/elm19/signal-generator',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
