'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TradingChart from '@/components/technical-components/TradingChart'
import { ModelInfoCard } from '@/components/technical-components/ModelInfoCard'
import { useModelContext } from '@/context/ModelContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PredictionsTab from '@/components/dashboard/PredictionsTab'
import NewsTab from '@/components/dashboard/NewsTab'
import ContactTab from '@/components/dashboard/ContactTab'
import { TradesTab } from '@/components/dashboard/TradesTab'
import type { PredictionData } from '@/types/PredictionData'
import { backEndLink } from '@/config/backEndLink'

export default function MarketPage() {
  const params = useParams()
  const market = params?.market as string
  const { selectedModel } = useModelContext()
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [loadingPredictions, setLoadingPredictions] = useState(true)
  const [loadingTrades, setLoadingTrades] = useState(true)
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingContact, setLoadingContact] = useState(true)

  useEffect(() => {
    async function fetchPredictions() {
      if (selectedModel) {
        setLoadingPredictions(true)
        try {
          const response = await fetch(
            `${backEndLink}predict/model?model_id=${selectedModel}&all=true`
          )
          const data = await response.json()
          if (data.length > 2) {
            setPredictions(data || [])
          } else {
            alert(
              'No predictions available for this model. Please select a different model.'
            )
            setPredictions([])
          }
        } catch (error) {
          console.error('Error fetching predictions:', error)
        } finally {
          setLoadingPredictions(false)
        }
      }
    }

    fetchPredictions()
  }, [selectedModel])

  if (!market) {
    return <div className="container mx-auto py-8">Market not specified</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1">
          <TradingChart predictions={predictions} market={market} />
        </div>
        <div className="lg:w-1/3">
          <ModelInfoCard pageContext={'models'} modelSelected={selectedModel} />
        </div>
      </div>

      <div className="border relative top-4 rounded-lg">
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
            <TabsTrigger
              value="predictions"
              className="px-4 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Predictions
            </TabsTrigger>
            <TabsTrigger
              value="trades"
              className="px-4 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Trades
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="px-4 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              News
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="px-4 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Contact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="predictions" className="p-4">
            {loadingPredictions ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <PredictionsTab predictions={predictions} />
            )}
          </TabsContent>
          <TabsContent value="trades" className="p-4">
            <TradesTab modelId={selectedModel} />
          </TabsContent>
          <TabsContent value="news" className="p-4">
            <NewsTab />
          </TabsContent>
          <TabsContent value="contact" className="p-4">
            <ContactTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
