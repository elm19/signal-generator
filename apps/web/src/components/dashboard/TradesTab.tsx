'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircledIcon,
  CircleIcon,
} from '@radix-ui/react-icons'
import { backEndLink } from '@/config/backEndLink'

interface Trade {
  entry_date: string
  entry_price: number
  exit_date: string
  exit_price: number
  id: number
  modelid: string
  pnl: number
  size: number
  type: 'buy' | 'sell'
}

interface ApiResponse {
  total_trades: number
  trades: Trade[]
}

export function TradesTab({ modelId }: { modelId: string }) {
  const PAGE_SIZE = 5
  const CHUNK_SIZE = 20

  const [loadedTrades, setLoadedTrades] = useState<Trade[]>([])
  const [totalTrades, setTotalTrades] = useState(0)
  const [rangeIdx, setRangeIdx] = useState(0) // zero-based for your backend
  const [pageIdx, setPageIdx] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${backEndLink}trades?modelid=${modelId}&range=${rangeIdx}`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        const { trades = [], total_trades } = data
        setLoadedTrades((prev) => [...prev, ...trades])
        setTotalTrades(total_trades)
      })
      .catch((error) => console.error('Error fetching trades:', error))
      .finally(() => setLoading(false))
  }, [modelId, rangeIdx])

  const totalPages = Math.ceil(totalTrades / PAGE_SIZE)

  const handleNext = () => {
    const nextPage = pageIdx + 1

    // if asking for a page beyond loadedTrades, but more remain, fetch next chunk
    if (
      nextPage * PAGE_SIZE > loadedTrades.length &&
      loadedTrades.length < totalTrades
    ) {
      setRangeIdx((r) => r + 1)
    }
    if (nextPage <= totalPages) {
      setPageIdx(nextPage)
    }
  }

  const handlePrev = () => {
    if (pageIdx > 1) {
      setPageIdx((p) => p - 1)
    }
  }

  const start = (pageIdx - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Entry Date
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Entry Price
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Exit Date
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Exit Price
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                PnL
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Size
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loadedTrades.slice(start, end).map((trade) => (
              <tr
                key={trade.id}
                className={
                  trade.type === 'buy'
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                }
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {new Date(trade.entry_date).toISOString().split('T')[0]}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {trade.entry_price.toFixed(2)}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {new Date(trade.exit_date).toISOString().split('T')[0]}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {trade.exit_price.toFixed(2)}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {trade.pnl.toFixed(2)}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {trade.size.toFixed(2)}
                </td>
                <td className="border bg-white dark:bg-black border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  {trade.pnl > 0 ? (
                    <CheckCircledIcon className="text-green-500 dark:text-green-400" />
                  ) : (
                    <CircleIcon className="text-red-500 dark:text-red-400" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          disabled={pageIdx === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
          Page {pageIdx} / {totalPages}
        </span>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          disabled={pageIdx === totalPages}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}
