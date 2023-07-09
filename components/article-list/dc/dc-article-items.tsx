'use client'

import CustomSpinner from '@/components/atom/spinner'
import { DCArticleModel } from '@/utils/model/dc-model'
import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  id: string
  page: number | null
  selected: number | null
  setSelected: Dispatch<SetStateAction<number | null>>
  articles: DCArticleModel[]
  setArticles: Dispatch<SetStateAction<DCArticleModel[]>>
}

/**
 * 게시글 목록
 * @param id 현재 선택한 갤러리 id
 * @param page 현재 Page
 * @param selected 현재 선택한 게시글 index
 * @param setSelected
 * @param articles 게시글 List
 * @param setArticles
 */
export default function DCArticleItems(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleSelected = (idx: number) => () =>
    props.setSelected(props.selected === idx ? null : idx)

  // 갤러리나 page 변경 시 게시글 목록 가져오기
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true)
        await axios
          .get('/api/dc/list', {
            params: { id: props.id, page: props.page ?? 1 },
          })
          .then((res) => res.data.data)
          .then((data) => props.setArticles(data))
      } catch (err) {
        props.setArticles([])
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [props.id, props.page])

  // 로딩중
  if (isLoading) return <CustomSpinner />

  return (
    <Stack divider={<StackDivider />} spacing="4">
      {props.articles.map((article, idx) => (
        <Box
          key={idx}
          className="hover:text-orange-500 cursor-pointer"
          onClick={handleSelected(idx)}
        >
          {/* 제목 */}
          <div>
            <Heading size="xs" textTransform="uppercase">
              {article.title}
            </Heading>
          </div>
        </Box>
      ))}
    </Stack>
  )
}
