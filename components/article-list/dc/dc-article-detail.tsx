'use client'

import CustomModal from '@/components/atom/modal'
import { DCArticleModel } from '@/utils/model/dc-model'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  id: string
  selected: number | null
  setSelected: Dispatch<SetStateAction<number | null>>
  articles: DCArticleModel[]
}

export default function DCArticleDetail(props: Props) {
  const [src, setSrc] = useState<string | null>(null)

  const handleClose = () => {
    props.setSelected(null)
    setSrc(null)
  }

  useEffect(() => {
    if (!props.id || props.selected == null) return
    setSrc(
      `https://gall.dcinside.com/board/view/?id=${props.id}&no=${
        props.articles[props.selected].gall_num
      }`,
    )
  }, [props.id, props.selected])

  return (
    src &&
    props.selected !== null && (
      <CustomModal
        title={props.articles[props.selected].title}
        isOpen={true}
        onClose={handleClose}
        onClickOverlay={handleClose}
      >
        <div className="flex items-center justify-center h-screen mx-10">
          <div className="w-full h-full overflow-x-hidden">
            <iframe src={src} className="w-full h-full" />
          </div>
        </div>
      </CustomModal>
    )
  )
}
