/* eslint-disable @next/next/next-script-for-ga */
import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { getObjectValueByLocale } from '@/lib/opendocs/utils/locale'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { defaultLocale } from '@/config/i18n'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'

interface AppLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleOptions }
}): Promise<Metadata> {
  setRequestLocale(params.locale || defaultLocale)

  return {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },

    description: getObjectValueByLocale(siteConfig.description, params.locale),

    keywords: [
      'Docs',
      'Blog',
      'i18n',
      'React',
      'shadcn',
      'Next.js',
      'trading',
      'models',
      'ai',
      'Documentation',
      'machine learning',
      'signals',
    ],

    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.site,
      },
    ],

    creator: siteConfig.author.name,

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      siteName: siteConfig.name,

      description: getObjectValueByLocale(
        siteConfig.description,
        params.locale
      ),

      images: [
        {
          ...siteConfig.og.size,
          alt: siteConfig.name,
          url: siteConfig.og.image,
        },
      ],
    },

    twitter: {
      creator: siteConfig.links.twitter.username,
      title: siteConfig.name,
      card: 'summary_large_image',
      images: [siteConfig.og.image],

      description: getObjectValueByLocale(
        siteConfig.description,
        params.locale
      ),
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      shortcut: '/favicon-16x16.png',
    },

    manifest: `${siteConfig.url}/site.webmanifest`,
  }
}

export const dynamicParams = true

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children, params }: AppLayoutProps) {
  setRequestLocale(params.locale)

  return (
    <html lang={params.locale || defaultLocale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#181423" />
        <meta
          name="google-site-verification"
          content="A_BsV8PVGd1Hk-Pa0y2hkuExpdttUCRp91rYAj3k-I0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KHCHP2FX');`,
          }}
        />
      </head>

      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHCHP2FX"
            height="0"
            width="0"
            className="none hidden"
          ></iframe>
        </noscript>
        <NextIntlClientProvider
          locale={params.locale || defaultLocale}
          messages={{}}
        >
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <div>
              <div className="relative z-10 flex min-h-screen flex-col">
                <SiteHeader />

                <main className="flex-1">{children}</main>

                <SiteFooter />
              </div>

              <div className="fixed left-0 top-0 size-full bg-gradient-to-b from-[#a277ff] via-transparent to-transparent opacity-10" />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
