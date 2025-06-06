'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import TradingChart from '@/components/technical-components/TradingChart'

const getSymbolFromMarket = (market: string) => {
  // Convert URL parameter to valid trading pair
  const symbolMap: { [key: string]: string } = {
    bitcoin: 'BTCUSDT',
    ethereum: 'ETHUSDT',
    gold: 'GC=F', // Updated to use Yahoo Finance symbol for gold futures
    silver: 'XAGUSDT',
    // Add more mappings as needed
  }
  return symbolMap[market.toLowerCase()] || 'BTCUSDT' // Default to BTCUSDT if market not found
}

export default function MarketPage() {
  const { market } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const symbol = getSymbolFromMarket(market as string)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // Reset states when market changes
  }, [market])

  if (!market) {
    return <div className="container mx-auto py-8">Market not specified</div>
  }

  return (
    <main className="container mx-auto ">
      <TradingChart />
    </main>
  )
}
