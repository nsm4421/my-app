'use client'

import { DCArticleModel } from '@/utils/model'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function DCArticleList() {
  const [id, setId] = useState<string | null>(null) // 갤러리 id
  const [page, setPage] = useState<number | null>(null)
  const [articles, setArticles] = useState<DCArticleModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true)
        const data = await axios
          .get('/api/dc/list', {
            params: { id: id ?? 'dcbest', page: page ?? 1 },
          })
          .then((res) => res.data.data)
        if (data) setArticles(data)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [id, page])

  return (
    <>
      {articles &&
        articles.map((article, idx) => (
          <div key={idx}>
            <div>
              <label>Title</label>
              <p>{article.title}</p>
            </div>
            <div>
              <label>Author</label>
              <p>{article.author}</p>
            </div>
            <div>
              <label>Date</label>
              <time>{article.date}</time>
            </div>
            <div>
              <label>View</label>
              <p>{article.viewCnt}</p>
            </div>
            <div>
              <label>Recommend</label>
              <p>{article.likeCnt}</p>
            </div>
            <br />
          </div>
        ))}
    </>
  )
}
