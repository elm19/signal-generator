import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface NewsArticle {
  title: string
  link: string
  summary: string
  date?: string
  thumbnail?: string
}

const NewsTab = () => {
  const [news, setNews] = useState<NewsArticle[]>([])

  useEffect(() => {
    const fetchLatestNews = async () => {
      const response = await fetch('/api/news')
      const latestNews = await response.json()
      setNews(latestNews.news)
    }

    fetchLatestNews()
  }, [])

  return (
    <div>
      <p className="mb-4">
        Our models are trained without considering news events. However, we plan
        to introduce models that incorporate news analysis in the future. Below
        are the latest news articles related to gold.
      </p>
      <div className="max-h-64 overflow-y-auto">
        <ul className="space-y-2">
          {news.map((article, index) => (
            <li
              key={index}
              className="border p-2 rounded flex items-center space-x-2"
            >
              {article.thumbnail && (
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              <div className="flex-1">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-xs text-gray-500">
                  Published on:{' '}
                  {article.date
                    ? new Date(article.date).toLocaleDateString()
                    : 'Unknown'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewsTab
