'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { createChart, CrosshairMode, IChartApi } from 'lightweight-charts'
import { fetchOHLCData } from '@/lib/fetchOHLCData'

const TradingViewChart = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const initializeChart = async () => {
      // Clean up existing chart if it exists
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }

      const formattedData = await fetchOHLCData()

      if (containerRef.current) {
        // Create the chart
        chartRef.current = createChart(containerRef.current, {
          width: containerRef.current.clientWidth,
          height: 500,
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
            mode: CrosshairMode.Normal,
          },
          timeScale: {
            borderColor: theme === 'dark' ? '#333333' : '#e6e6e6',
          },
        })

        // Add a candlestick series
        const candlestickSeries = chartRef.current.addCandlestickSeries({
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
        })

        // Set the OHLC data
        candlestickSeries.setData(formattedData)

        // Handle window resize
        const handleResize = () => {
          if (containerRef.current && chartRef.current) {
            chartRef.current.resize(containerRef.current.clientWidth, 500)
          }
        }
        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }
    }

    initializeChart()

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        border: theme === 'dark' ? '1px solid #333333' : '1px solid #e6e6e6',
        borderRadius: '8px',
      }}
    />
  )
}

export default TradingViewChart
