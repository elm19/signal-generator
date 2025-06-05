'use client'
import { useParams } from 'next/navigation'
import { predictions } from '@/config/dummy-data'
import TradingViewChart from '@/components/technical-components/TradingViewChart'

export default function MarketPage() {
  const { market } = useParams()

  return (
    <main className="container mx-auto py-8">
      <TradingViewChart />
      {/* edf */}
    </main>
  )
}
