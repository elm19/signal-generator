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
      default: 'Dashboard',
      template: `%s - Dashboard`,
    },
    description:
      'Explore predictions and models for various markets. View statistics and make informed decisions.',
    keywords: [
      'dashboard',
      'market predictions',
      'models',
      'statistics',
      'trading signals',
    ],
    authors: [{ name: 'Dashboard Team' }],
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto py-8">{children}</div>
}
