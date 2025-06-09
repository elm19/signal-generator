'use client'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { ModelInfoCard } from '@/components/technical-components/ModelInfoCard'
import { backEndLink } from '@/config/backEndLink'

interface ModelInfo {
  modelid: string
  model_name: string
  market: string
  accuracy?: number
  precision?: number
  recall?: number
  final_portfolio_value: number
  max_drawdown_percent: number
  max_drawdown_value: number
  net_profit: number
  returns: number
  sharpe_ratio: number
  sqn: number
  total_trades: number
  last_updated: string
}

export default function ModelsPage() {
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null)
  const [modelInfoList, setModelInfoList] = useState<ModelInfo[]>([])
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${backEndLink}model-info`)
        const data = await response.json()
        setModelInfoList(data.models)
      } catch (error) {
        console.error('Error fetching model info:', error)
      } finally {
        setLoading(false) // Set loading to false when fetching is complete
      }
    }

    fetchModels()
  }, [])

  const markets = [
    'all',
    ...new Set(modelInfoList.map((model) => model.market)),
  ]

  const filteredModels =
    selectedMarket === 'all'
      ? modelInfoList
      : modelInfoList.filter((model) => model.market === selectedMarket)

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Models Overview</h1>

          <div className="flex gap-2 mb-6">
            {markets.map((market) => (
              <Badge
                key={market}
                className={`cursor-pointer px-2 py-1 rounded-md text-sm ${
                  selectedMarket === market
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedMarket(market)}
              >
                {market.charAt(0).toUpperCase() + market.slice(1)}
              </Badge>
            ))}
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Model Name</th>
                <th className="border px-4 py-2 text-left">Accuracy</th>
                <th className="border px-4 py-2 text-left">Precision</th>
                <th className="border px-4 py-2 text-left">Recall</th>
                <th className="border px-4 py-2 text-left">Market</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => (
                <tr
                  key={model.modelid}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedModel(model)}
                >
                  <td className="border px-4 py-2">{model.model_name}</td>
                  <td className="border px-4 py-2">
                    {model.accuracy || 'N/A'}%
                  </td>
                  <td className="border px-4 py-2">
                    {model.precision || 'N/A'}%
                  </td>
                  <td className="border px-4 py-2">{model.recall || 'N/A'}%</td>
                  <td className="border px-4 py-2">{model.market}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedModel && (
            <div className="flex w-full mt-8 justify-end px-10">
              <div style={{ maxWidth: '400px' }} className="mr-8">
                <ModelInfoCard
                  pageContext={'market'}
                  modelSelected={selectedModel.modelid}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
