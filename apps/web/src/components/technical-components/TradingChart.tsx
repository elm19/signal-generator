'use client'
import { useEffect, useRef, useState } from 'react'
import {
  createChart,
  SeriesMarkerPosition,
  BusinessDay,
} from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { PredictionData } from '@/types/PredictionData'

export default function TradingChart({
  predictions,
  market,
}: {
  predictions: PredictionData[]
  market: string
}) {
  console.log('the predictions at the chart comppioontent', predictions)
  const chartRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 650, height: 500 })
  const [loading, setLoading] = useState(false) // Add loading state
  let chart: any = null // Declare chart variable

  const toggleDimensions = () => {
    setDimensions((prev) => ({
      width: prev.width === 650 ? 1000 : 650,
      height: prev.height === 500 ? 600 : 500,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Set loading to true when fetching starts

      const res = await fetch(`/api/ohcl_data?symbol=${market}`)
      const { data }: { data: any[] } = await res.json()

      const candlestickData = data
        .map((item: any) => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
        .sort((a, b) => a.time - b.time) // Ensure ascending order by time

      const reversedPredictions = [...predictions].reverse()

      const markers = reversedPredictions
        .filter(
          (pred) => pred.prediction === 'buy' || pred.prediction === 'sell'
        )
        .map((pred) => {
          const markerType = pred.prediction

          // Convert date string to the expected format and ensure compatibility with Time type
          const formattedDate = new Date(pred.date as string)
            .toISOString()
            .split('T')[0] as unknown as BusinessDay // Convert to 'unknown' first, then cast to BusinessDay

          return {
            time: formattedDate,
            position:
              markerType === 'buy'
                ? 'belowBar'
                : ('aboveBar' as SeriesMarkerPosition), // Explicitly cast to SeriesMarkerPosition
            color: markerType === 'buy' ? 'green' : 'red',
            shape: markerType === 'buy' ? 'arrowUp' : 'arrowDown',
            text: markerType === 'buy' ? 'Buy Signal' : 'Sell Signal',
          }
        })
        .sort((a, b) => {
          return (
            new Date(a.time as unknown as string).getTime() -
            new Date(b.time as unknown as string).getTime()
          )
        }) // Ensure ascending order by time

      if (!chartRef.current) {
        console.error('Chart container is not available.')
        setLoading(false) // Set loading to false if chart container is unavailable
        return
      }

      // Remove any existing chart before creating a new one
      if (chartRef.current.firstChild) {
        chartRef.current.removeChild(chartRef.current.firstChild)
      }

      chart = createChart(chartRef.current, {
        width: dimensions.width,
        height: dimensions.height,
        layout: {
          background: { color: theme === 'dark' ? '#1a1a1a' : '#ffffff' },
          textColor: theme === 'dark' ? '#d1d4dc' : '#000000',
        },
        grid: {
          vertLines: {
            color: theme === 'dark' ? '#333333' : '#e6e6e6',
          },
          horzLines: {
            color: theme === 'dark' ? '#333333' : '#e6e6e6',
          },
        },
        crosshair: {
          mode: 1, // 1 for normal crosshair
          horzLine: {
            color: theme === 'dark' ? '#ffffff' : '#000000',
            width: 1,
          },
          vertLine: {
            color: theme === 'dark' ? '#ffffff' : '#000000',
            width: 1,
          },
        },
      })

      const series = chart.addCandlestickSeries()
      series.setData(candlestickData)
      series.setMarkers(markers)

      setLoading(false) // Set loading to false when fetching is complete
    }

    fetchData()

    return () => {
      if (chartRef.current && chartRef.current.firstChild) {
        chartRef.current.removeChild(chartRef.current.firstChild)
      }
    }
  }, [theme, dimensions, predictions])

  useEffect(() => {
    const handleResize = () => {
      const width =
        window.innerWidth < 768 ? window.innerWidth - 40 : dimensions.width
      const height = window.innerWidth < 768 ? width * 0.75 : dimensions.height
      setDimensions({ width, height })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial resize

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500) // Delay appearance by 500ms
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        border: theme === 'dark' ? '1px solid #333333' : '1px solid #e6e6e6',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        width: `${dimensions.width + 50}px`,
        height: `${dimensions.height + 50}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '8px',
        transition: `
          width 0.5s ease-in-out,
          height 0.5s ease-in-out,
          opacity 0.5s ease-in-out
        `,
        opacity: isVisible ? 1 : 0, // Use isVisible to control opacity
      }}
    >
      {loading && (
        <div
          style={{
            marginBottom: '10px',
            color: theme === 'dark' ? '#ffffff' : '#000000',
          }}
        >
          Loading predictions...
        </div>
      )}
      <button
        onClick={toggleDimensions}
        className="hidden sm:flex"
        style={{
          position: 'relative',
          marginBottom: '10px',
          left: 'calc(50% - 20px)',
          width: '40px',
          height: '40px',
          backgroundColor: theme === 'dark' ? '#333333' : '#e6e6e6',
          color: theme === 'dark' ? '#ffffff' : '#000000',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          // display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '20px' }}>↔</span>
      </button>
      {/* Chart container */}
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: '100%',
          transition: 'all 0.5s ease-in-out', // Unified transition for width and height
        }}
      />
    </div>
  )
}
