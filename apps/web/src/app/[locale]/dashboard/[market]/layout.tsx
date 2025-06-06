import { setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
    market: string // Added market to params
  }
}

export const dynamicParams = true

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  setRequestLocale(params.locale)

  return (
    <main className="container w-9/12 mt-8 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
        <Link href="/dashboard" className="text-foreground">
          Dashboard{' '}
        </Link>
        <span className="text-foreground">&gt;</span>
        <span className="text-foreground font-bold">{params.market}</span>
      </div>
      {children}
    </main>
  )
}
