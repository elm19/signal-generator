import { setRequestLocale } from 'next-intl/server'
import { useState } from 'react'
import type { Metadata } from 'next'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import Link from 'next/link'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { ModelSelector } from '@/components/dashboard/ModelSelector'
import { ModelProvider } from '@/context/ModelContext'
import { modelInfoList } from '@/config/model-info'
import { backEndLink } from '@/config/backEndLink'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
    market: string // Added market to params
  }
}

export const dynamicParams = true

// Added dynamic metadata generation for the market layout
export async function generateMetadata({
  params,
}: {
  params: { locale: string; market: string }
}): Promise<Metadata> {
  setRequestLocale(params.locale)

  return {
    title: {
      default: `${params.market} Market`,
      template: `%s - Market`,
    },
    description: `Explore the ${params.market} market and its trading signals for informed decisions.`,
    keywords: [
      'market',
      'trading signals',
      'analysis',
      'performance',
      'insights',
    ],
    authors: [{ name: 'Markets Team' }],
  }
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  setRequestLocale(params.locale)

  const res = await fetch(`${backEndLink}market/${params.market}`, {
    cache: 'no-store',
  })
  const modelsForMarket = (await res.json()).models
  console.log('Models for market:', modelsForMarket)
  return (
    <ModelProvider>
      <main className="container mx-auto py-8 flex flex-col gap-8">
        <Alert>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <h1 className="font-bold text-lg leading-none">Dashboard</h1>
            </Link>
            <span>
              {' '}
              {' > '} {params.market}
            </span>
          </div>
          <AlertTitle className="mt-2">
            You are currently on the {params.market} market using the model:
            <ModelSelector
              models={modelsForMarket}
              className="inline-block ml-2"
            />
          </AlertTitle>
        </Alert>

        {children}
      </main>
    </ModelProvider>
  )
}
