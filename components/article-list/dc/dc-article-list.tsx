'use client'
import { DCArticleModel } from '@/utils/model/dc-model'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import DCSelectGallery from './dc-select-gallery'
import DCArticleItems from './dc-article-items'
import DCArticleDetail from './dc-article-detail'

/**
 * DC 게시글목록 List
 * @state id : 갤러리 id (defalut : 실시간베스트)
 * @state page : 현재 page
 * @state selected : 현재 선택한 게시글의 index
 * @state articles : 게시글 목록
 */
export default function DCArticleList() {
  const [id, setId] = useState<string>('dcbest')
  const [page, setPage] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [articles, setArticles] = useState<DCArticleModel[]>([])

  useEffect(() => {
    setSelected(null)
  }, [id])

  return (
    <>
      {/* 게시글 상세 페이지 */}
      <DCArticleDetail
        id={id}
        selected={selected}
        setSelected={setSelected}
        articles={articles}
      />

      <Card>
        {/* 갤러리 선택창 */}
        <CardHeader>
          <DCSelectGallery id={id} setId={setId} />
        </CardHeader>

        {/* 게시글 목록 */}
        <CardBody>
          <DCArticleItems
            id={id}
            page={page}
            articles={articles}
            setArticles={setArticles}
            selected={selected}
            setSelected={setSelected}
          />
        </CardBody>
      </Card>
    </>
  )
}
