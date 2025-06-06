import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=gold`
    )

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch news: ${response.statusText}` })
    }

    const data = await response.json()
    const news = data.news || []

    const formattedNews = news.map((item: any) => {
      const thumbnail = item.thumbnail?.resolutions?.find(
        (resolution: any) => resolution.tag === '140x140'
      )

      return {
        title: item.title,
        link: item.link,
        summary: item.summary,
        date: item.providerPublishTime
          ? new Date(item.providerPublishTime * 1000).toISOString()
          : null, // Convert UNIX timestamp to ISO string
        thumbnail: thumbnail?.url || null,
      }
    })

    return res.status(200).json({ news: formattedNews })
  } catch (error) {
    console.error('Error fetching news:', error)
    return res.status(500).json({ error: 'Failed to fetch news data' })
  }
}
