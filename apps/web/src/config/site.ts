import { absoluteUrl } from '@/lib/utils'
import en from '@/i18n/locales/en.json'
import pt from '@/i18n/locales/pt.json'

export const siteConfig = {
  name: 'signal-provider',

  description: {
    en: 'Advanced time series analysis and trading signal generation platform. Get accurate market insights with our ML-powered signal generator.',
    pt: 'Plataforma avançada de análise de séries temporais e geração de sinais de negociação.',
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
    name: 'EL Majdi Walid',
    site: './',
  },

  links: {
    twitter: {
      label: 'Twitter',
      username: '@elmajdiwalid',
      url: 'https://twitter.com/elmajdiwalid',
    },

    github: {
      label: 'GitHub',
      url: 'https://github.com/elm19/GoldSpot-Predictor',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
