'use client'
import { useEffect, useRef, useState } from 'react'
import {
  createChart,
  Time,
  SeriesMarkerPosition,
  SeriesMarkerShape,
} from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { predictions } from '@/config/dummy-data'

export default function TradingChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 650, height: 500 })

  const toggleDimensions = () => {
    setDimensions((prev) => ({
      width: prev.width === 650 ? 1000 : 650,
      height: prev.height === 500 ? 600 : 500,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/gold')
      const { data }: { data: any[] } = await res.json()

      const candlestickData = data.map((item: any) => ({
        time: item.time, // UNIX timestamp in seconds
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }))

      if (!chartRef.current) {
        console.error('Chart container is not available.')
        return
      }

      // Remove any existing chart before creating a new one
      if (chartRef.current && chartRef.current.firstChild) {
        chartRef.current.removeChild(chartRef.current.firstChild)
      }

      const chart = createChart(chartRef.current, {
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

      // Add markers for buy and sell signals
      const markers = predictions
        .filter(
          (prediction) => prediction.signal === 1 || prediction.signal === -1
        )
        .map((prediction) => {
          const markerType = prediction.signal === 1 ? 'buy' : 'sell'

          return {
            time: (new Date(prediction.date).getTime() / 1000) as Time, // Convert date to UNIX timestamp in seconds and cast to Time
            position: (markerType === 'buy'
              ? 'belowBar'
              : 'aboveBar') as SeriesMarkerPosition,
            color: markerType === 'buy' ? 'green' : 'red',
            shape: (markerType === 'buy'
              ? 'arrowUp'
              : 'arrowDown') as SeriesMarkerShape,
            text: markerType === 'buy' ? 'Buy Signal' : 'Sell Signal',
          }
        })

      series.setMarkers(markers)

      return () => chart.remove()
    }

    fetchData()
  }, [theme, dimensions])

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
          transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out',
        }}
      />
    </div>
  )
}
