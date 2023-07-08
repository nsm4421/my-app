'use client'

import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import DCArticleList from './dc/dc-article-list'
import { useState } from 'react'
import Image from 'next/image'

const items = [
  {
    label: 'DC INSIDE',
    src: '/dc-logo.png',
    component: <DCArticleList />,
  },
  {
    label: '네이트판',
    src: '/nate-logo.png',
    component: null,
  },
]

/**
 * 게시글 목록
 */
export default function ArticleList() {
  const [_, setTabIndex] = useState(0)
  return (
    <Tabs isLazy variant="enclosed" onChange={(index) => setTabIndex(index)}>
      <TabList>
        {items.map((item, idx) => (
          <Tab key={idx} _selected={{ bg: 'blue.500' }}>
            <Image src={item.src} alt={item.label} width={50} height={50} />
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {items.map((item, idx) => (
          <TabPanel key={idx}> {item.component} </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
