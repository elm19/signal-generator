'use client'
import { useParams } from 'next/navigation'
import TradingChart from '@/components/technical-components/TradingChart'
import { ModelInfoCard } from '@/components/technical-components/ModelInfoCard'
import { useModelContext } from '@/context/ModelContext'
import { modelInfoList } from '@/config/model-info'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PredictionsTab from '@/components/dashboard/PredictionsTab'
import NewsTab from '@/components/dashboard/NewsTab'
import ContactTab from '@/components/dashboard/ContactTab'

export default function MarketPage() {
  const params = useParams()
  const market = params?.market as string
  const { selectedModel } = useModelContext()

  const modelInfo = modelInfoList.find((model) => model.id === selectedModel)

  if (!market) {
    return <div className="container mx-auto py-8">Market not specified</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1">
          <TradingChart />
        </div>
        <div className="lg:w-1/3">
          {modelInfo && <ModelInfoCard modelInfo={modelInfo} />}
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
            <PredictionsTab selectedModel={selectedModel} />
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
