import React from 'react'
import { table } from '@/components/docs/mdx-components/table'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { PredictionData } from '@/types/PredictionData'

const PredictionsTab = ({ predictions }: { predictions: PredictionData[] }) => {
  const [currentPage, setCurrentPage] = React.useState(0)
  const itemsPerPage = 5

  const paginatedPredictions = predictions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < predictions.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="relative">
      <p className="mb-4">
        Below are the predictions made by the selected model, including
        probabilities for buy, sell, and hold signals.
      </p>
      {table({
        className: 'border-collapse border border-gray-300 w-full',
        children: (
          <>
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Buy
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Sell
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Hold
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPredictions.map((pred: any, index: number) => (
                <tr key={index} className="dark:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                    {pred.date.split(',')[0] +
                      ', ' +
                      new Date(pred.date).toISOString().split('T')[0]}
                  </td>
                  <td
                    className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left ${
                      pred.prediction === 'buy'
                        ? 'bg-green-100 dark:bg-green-800'
                        : ''
                    }`}
                  >
                    {pred.proba_buy}
                  </td>
                  <td
                    className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left ${
                      pred.prediction === 'sell'
                        ? 'bg-red-100 dark:bg-red-800'
                        : ''
                    }`}
                  >
                    {pred.proba_sell}
                  </td>
                  <td
                    className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left ${
                      pred.prediction === 'hold'
                        ? 'bg-yellow-100 dark:bg-yellow-800'
                        : ''
                    }`}
                  >
                    {pred.proba_hold}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ),
      })}
      <div className="flex justify-end space-x-2">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="icon"
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          disabled={(currentPage + 1) * itemsPerPage >= predictions.length}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}

export default PredictionsTab
