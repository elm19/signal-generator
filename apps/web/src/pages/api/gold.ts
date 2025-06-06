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
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=10y`

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
        time: Number(time), // convert to number explicitly
        open: indicators.open[i],
        high: indicators.high[i],
        low: indicators.low[i],
        close: indicators.close[i],
      }))
      .filter(
        (d) =>
          !isNaN(d.time) &&
          typeof d.time === 'number' &&
          d.open != null &&
          d.high != null &&
          d.low != null &&
          d.close != null
      )
      .sort((a, b) => a.time - b.time) // ensure ascending order

    return res.status(200).json({ data })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch data' })
  }
}
