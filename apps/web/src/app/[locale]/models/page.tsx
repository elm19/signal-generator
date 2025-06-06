'use client'
import { modelInfoList } from '@/config/model-info'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
  ModelInfoCard,
  ModelInfo,
} from '@/components/technical-components/ModelInfoCard'

export default function ModelsPage() {
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null)

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
        <thead className="">
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
              key={model.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedModel(model)}
            >
              <td className="border px-4 py-2">{model.name}</td>
              <td className="border px-4 py-2">{model.accuracy}%</td>
              <td className="border px-4 py-2">{model.precision}%</td>
              <td className="border px-4 py-2">{model.recall}%</td>
              <td className="border px-4 py-2">{model.market}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedModel && (
        <div style={{ maxWidth: '400px' }} className="flex justify-end">
          <ModelInfoCard pageContext={'market'} modelInfo={selectedModel} />
        </div>
      )}
    </div>
  )
}
