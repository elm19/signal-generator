export const fetchOHLCData = async (
  symbol: string = 'BTCUSDT',
  interval: string = '1d',
  limit: number = 100
) => {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    )
    const rawData = await response.json()

    return rawData.map((item: any) => ({
      time: new Date(item[0]).toISOString().split('T')[0],
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    }))
  } catch (error) {
    console.error('Failed to fetch OHLC data:', error)
    return []
  }
}
