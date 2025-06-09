import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Alert } from '../ui/alert'
import { ModelData } from '@/types/ModelData'
import { useEffect, useState } from 'react'

export interface ModelInfo {
  id: string
  name: string
  lastTrained: string
  dateCreated: string
  loss: number
  accuracy: number
  backtestingMetrics: {
    sharpeRatio: number
    maxDrawdown: number
    annualizedReturn: number
  }
  market: string
}

// Fixed persistent formatting issue in the `ModelInfoCard` component
export function ModelInfoCard({
  modelSelected,
  pageContext,
}: {
  modelSelected: string
  pageContext: 'market' | 'models'
}) {
  const [modelInfo, setModelInfo] = useState<ModelData | null>(null)

  useEffect(() => {
    async function fetchModelInfo() {
      if (!modelSelected) {
        console.warn('No model selected to fetch info for.')
        return
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/model-info/${modelSelected}`,
          {
            cache: 'no-store',
          }
        )
        const data = await response.json()
        setModelInfo(data.model || null)
      } catch (error) {
        console.error('Error fetching model info:', error)
        setModelInfo(null)
      }
    }

    fetchModelInfo()
  }, [modelSelected])

  const backtestingMetrics = modelInfo?.backtestingMetrics || {
    sharpeRatio: 'N/A',
    maxDrawdown: 'N/A',
    annualizedReturn: 'N/A',
  }

  return (
    <div className="space-y-4">
      <Card className="mt-4 p-4">
        <h2 className="text-lg font-bold mb-4">Model Information</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="general">
            <AccordionTrigger>General Information</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>ID:</strong> {modelInfo?.modelid || 'N/A'}
              </p>
              <p>
                <strong>Name:</strong> {modelInfo?.model_name || 'N/A'}
              </p>
              <p>
                <strong>Market:</strong> {modelInfo?.market || 'N/A'}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="training">
            <AccordionTrigger>Training Details</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Last Trained:</strong>{' '}
                {modelInfo?.last_updated || 'N/A'}
              </p>
              <p>
                <strong>Date Created:</strong> {modelInfo?.dateCreated || 'N/A'}
              </p>
              <p>
                <strong>Loss:</strong> {modelInfo?.loss || 'N/A'}
              </p>
              <p>
                <strong>Accuracy:</strong> {modelInfo?.accuracy || 'N/A'}%
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="backtesting">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Backtesting Metrics
                <a
                  href="/docs/models/metrics"
                  className="text-muted-foreground hover:text-primary"
                  title="Learn more about these metrics"
                >
                  <QuestionMarkCircledIcon className="h-4 w-4" />
                </a>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Sharpe Ratio:</strong>{' '}
                {modelInfo?.sharpe_ratio?.toFixed(3)}
              </p>
              <p>
                <strong>Max Drawdown:</strong>{' '}
                {modelInfo?.max_drawdown_percent?.toFixed(3)}%
              </p>
              <p>
                <strong>Annualized Return:</strong>{' '}
                {modelInfo?.returns?.toFixed(3)}%
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="mt-4 text-sm text-gray-600">
          For more details about this model (its training methodology,
          underlying architecture), please visit{' '}
          <a href="#" className="text-blue-500 underline">
            here
          </a>
          .
        </p>
      </Card>

      <Alert className="backdrop-blur-sm border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <p className="text-sm text-muted-foreground">
          {pageContext === 'market' ? (
            <>
              Want to see its predictions for {modelInfo?.market || 'N/A'}?{' '}
              <a
                href={`/dashboard/${modelInfo?.market?.toLowerCase() || ''}`}
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
              >
                Click here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </>
          ) : (
            <>
              Want to explore more models for {modelInfo?.market || 'N/A'}?{' '}
              <a
                href={`/models`}
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
              >
                View all models
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </>
          )}
        </p>
      </Alert>
    </div>
  )
}
