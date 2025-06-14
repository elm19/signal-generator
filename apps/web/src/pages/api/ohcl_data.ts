import type { NextApiRequest, NextApiResponse } from 'next'

export interface OHLC {
  time: number // UNIX timestamp in seconds
  open: number
  high: number
  low: number
  close: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol = 'GC=F' } = req.query

  if (typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Invalid symbol parameter' })
  }

  try {
    const period1 = Math.floor(new Date('2010-3-25').getTime() / 1000)
    const period2 = Math.floor(new Date('2025-06-13').getTime() / 1000)

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}=F?interval=1d&period1=${period1}&period2=${period2}`
    const response = await fetch(url)
    const rawData = await response.json()

    const result = rawData.chart?.result?.[0]
    const timestamps: number[] = result?.timestamp
    const indicators = result?.indicators?.quote?.[0]

    if (!timestamps || !indicators) {
      return res.status(500).json({ error: 'Invalid data format' })
    }

    const data: OHLC[] = timestamps
      .map((time: number, i: number) => ({
        time: Number(time),
        open: indicators.open[i],
        high: indicators.high[i],
        low: indicators.low[i],
        close: indicators.close[i],
      }))
      .filter(
        (d) =>
          !isNaN(d.time) &&
          d.open != null &&
          d.high != null &&
          d.low != null &&
          d.close != null
      )
      .sort((a, b) => a.time - b.time)

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch data' })
  }
}
