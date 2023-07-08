'use client'
import { DCArticleModel } from '@/utils/model/dc-model'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DCArticleDetail from './dc-article-detail'
import DCSelectGallery from './dc-select-gallery'
import CustomSpinner from '@/components/atom/spinner'

/**
 * DC 게시글목록 List
 * @state id : 갤러리 id (defalut : 실시간베스트)
 * @state page : 현재 page
 * @state selected : 현재 선택한 게시글의 index
 * @state articles : 게시글 목록
 * @state isLoading : 로딩중 여부
 */
export default function DCArticleList() {
  const [id, setId] = useState<string>('dcbest')
  const [page, setPage] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [articles, setArticles] = useState<DCArticleModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 선택한 게시글 index를 handling
  const handleSelected = (idx: number) => () => {
    // 이미 선택한 게시글을 다시 클릭 → 게시글 닫기 → index를 null로 시팅
    if (idx === selected) {
      setSelected(null)
    } else {
      setSelected(idx)
    }
  }

  useEffect(
    () => {
      const init = async () => {
        try {
          setIsLoading(true)
          const data = await axios
            .get('/api/dc/list', {
              params: { id: id, page: page ?? 1 },
            })
            .then((res) => res.data.data)
          if (data) setArticles(data)
        } catch (err) {
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      }
      init()
    },
    // 갤러리, 페이지 변경 시 마다 게시글 목록 다시 가져오기
    [id, page],
  )

  return (
    <>
      {/* 갤러리 선택창 */}
      <div className="mt-2 mb-5">
        <DCSelectGallery id={id} setId={setId} />
      </div>
      {/* 게시글 목록 */}
      {isLoading ? (
        <div>
          <CustomSpinner />
        </div>
      ) : (
        <Accordion>
          {articles.map((article, idx) => (
            <div
              key={idx}
              className={`my-2${
                selected === idx &&
                'text-lg font-semibold shadow-slate-200 bg-slate-100'
              }`}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton onClick={handleSelected(idx)}>
                    <Box flex="1" textAlign="left">
                      {article.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <Divider borderWidth={'2px'} borderColor={'whiteAlpha.700'} />
                {selected === idx && (
                  <AccordionPanel>
                    {/* TODO : Detail 페이지 */}
                    <DCArticleDetail />
                  </AccordionPanel>
                )}
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      )}
    </>
  )
}
