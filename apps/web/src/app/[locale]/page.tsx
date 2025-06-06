import { getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { InstallationBox } from '@/components/installation-box'
import { FeaturedCard } from '@/components/featured-card'
import { Announcement } from '@/components/announcement'
import { buttonVariants } from '@/components/ui/button'
import { FlipWords } from '@/components/ui/flip-words'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  PageHeader,
  PageActions,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

export const generateStaticParams = () => {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

const Vortex = dynamic(() => import('../../components/ui/vortex'), {
  ssr: false,
})

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  setRequestLocale(params.locale)

  const t = await getTranslations()

  return (
    <div className="container relative">
      <PageHeader>
        <Announcement title="Welcome to getTheSignal" href="/dashboard" />

        <PageHeaderHeading>
          <FlipWords
            words={['Get', 'Trading', 'Signals']}
            className="text-9xl -z-10"
          />

          <TextGenerateEffect words="Market Signals Across Diverse Sectors" />
        </PageHeaderHeading>

        <PageHeaderDescription>
          Explore our dashboard for real-time insights powered by Deep Learning
          and Machine Learning, and visit the docs for detailed guidance.
        </PageHeaderDescription>

        <PageActions className="flex-wrap gap-3 sm:gap-0">
          <Link href="/docs" className={cn(buttonVariants())}>
            View Documentation
          </Link>

          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Explore Dashboard
          </Link>
        </PageActions>

        <div className="fixed left-0 -top-40 size-full -z-10 overflow-hidden">
          <Vortex
            backgroundColor="transparent"
            className="flex size-full"
            rangeY={300}
            baseRadius={2}
            particleCount={20}
            rangeSpeed={1.5}
          />
        </div>
      </PageHeader>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          <FeaturedCard
            icon="📈"
            title="Time Series Analysis"
            description="Advanced analysis of market data using state-of-the-art time series techniques"
          />

          <FeaturedCard
            icon="🤖"
            title="ML Predictions"
            description="Machine learning models trained on historical data for accurate signal generation"
          />

          <FeaturedCard
            icon="⚡"
            title="Real-time Signals"
            description="Get trading signals in real-time with our high-performance engine"
          />

          <FeaturedCard
            icon="📊"
            title="Rich Analytics"
            description="Comprehensive analytics and visualization of market trends and signals"
          />
        </div>

        <FeaturedCard
          icon="🎯"
          orientation="horizontal"
          title="Precision Trading"
          description="Make informed trading decisions with our comprehensive suite of tools and analysis"
        />
      </section>
    </div>
  )
}
