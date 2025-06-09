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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/news')
        const latestNews = await response.json()
        setNews(latestNews.news)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <p className="mb-4">
            Our models are trained without considering news events. However, we
            plan to introduce models that incorporate news analysis in the
            future. Below are the latest news articles related to gold.
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
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  )}
                  <div>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {article.title}
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default NewsTab
