'use client'

import { DCGalleryIDMapping } from '@/utils/model/dc-model'
import { Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  id: string
  setId: Dispatch<SetStateAction<string>>
}
/**
 * DC 갤러리 선택 버튼
 * @props id : 갤러리 id(string)
 * @props setId: Dispatch<SetStateAction<string>>
 * @state gallery : 선택한 갤러리의 index
 */
export default function DCSelectGallery(props: Props) {
  const [gallIdx, setGallIdx] = useState(0)
  const handleClick = (idx: number) => () => setGallIdx(idx)
  useEffect(() => {
    props.setId(DCGalleryIDMapping[gallIdx].id)
    return
  }, [gallIdx])

  return (
    <div className="w-full flex justify-start">
      {DCGalleryIDMapping.map((item, idx) => (
        <Button
          key={idx}
          width={20}
          rounded={'md'}
          className={
            (gallIdx === idx ? 'bg-sky-600 text-slate-100' : 'text-gray-500') +
            ' hover:text-orange-500 mr-3'
          }
          color={'black'}
          onClick={handleClick(idx)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
