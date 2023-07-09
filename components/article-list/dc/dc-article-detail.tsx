'use client'

import CustomModal from '@/components/atom/modal'
import CustomSpinner from '@/components/atom/spinner'
import { DCArticleModel } from '@/utils/model/dc-model'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  id: string
  selected: number | null
  setSelected: Dispatch<SetStateAction<number | null>>
  articles: DCArticleModel[]
}

interface Response {
  title: string
  content: string
}

export default function DCArticleDetail(props: Props) {
  const [title, setTitle] = useState<string>('')
  const [html, setHtml] = useState<string | null>(null)
  const handleClose = () => props.setSelected(null)

  // 상세 페이지(HTML) 가져오기
  useEffect(() => {
    const init = async () => {
      if (!props.id || props.selected === null) return
      try {
        await axios
          .get('/api/dc/detail', {
            params: {
              id: props.id,
              no: props.articles[props.selected].gall_num,
            },
          })
          .then((res) => res.data.data)
          .then((data: Response) => {
            setTitle(data.title)
            setHtml(data.content)
          })
      } catch (err) {
        console.error(err)
        setHtml(null)
      }
    }
    init()
  }, [props.id, props.selected])

  // Error
  if (!props.id || props.selected === null) return <></>

  return (
    props.selected !== null && (
      <CustomModal title={title} isOpen={true} onClose={handleClose}>
        {html ? (
          // Raw HTML
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          // Loading
          <CustomSpinner />
        )}
      </CustomModal>
    )
  )
}
