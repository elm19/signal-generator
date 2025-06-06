import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { defaultLocale } from '@/config/i18n'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  setRequestLocale(params.locale || defaultLocale)

  return {
    title: {
      default: 'Models',
      template: `%s - Models`,
    },
    description:
      'Discover detailed insights into various models and their performance.',
    keywords: [
      'models',
      'performance',
      'insights',
      'machine learning',
      'statistics',
    ],
    authors: [{ name: 'Models Team' }],
  }
}

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto py-8">{children}</div>
}
