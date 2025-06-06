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
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState('')

  const symbol = getSymbolFromMarket(market as string)

  const availableModels = [
    { id: 'model-001', name: 'Model 1' },
    { id: 'model-002', name: 'Model 2' },
    { id: 'model-003', name: 'Model 3' },
  ] // Replace with actual models for the market

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value)
  }

  useEffect(() => {
    setLoading(true)

    // Simulate chart loading
    const timer = setTimeout(() => setLoading(false), 1000) // Adjust time as needed

    return () => clearTimeout(timer)
  }, [market])

  if (!market) {
    return <div className="container mx-auto py-8">Market not specified</div>
  }

  if (loading) {
    return <div className="container mx-auto py-8">Loading chart...</div>
  }

  return (
    <main className="container mx-auto ">
      <TradingChart />
    </main>
    <div className="container mx-auto">
      <div className="mb-4">
        <label
          htmlFor="model-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Choose a model
          </option>
          {availableModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <TradingChart selectedModel={selectedModel} />
    </div>
  )
}
