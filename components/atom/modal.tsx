'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Tooltip,
  position,
} from '@chakra-ui/react'
import CustomContainer from './container'

interface Props {
  title?: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onClickOverlay?: () => void
}

export default function CustomModal(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
      <ModalOverlay onClick={props.onClickOverlay} />
      <ModalContent
        width="100%"
        maxWidth="100%"
        mt={'5'}
        overflow="hidden"
        h="100%"
      >
        {props.title && (
          <ModalHeader __css={{ position: 'fix' }}>{props.title}</ModalHeader>
        )}
        <Divider />
        <Tooltip label="닫기">
          <ModalCloseButton className="hover:text-orange-500 hover:cursor-pointer text-xl" />
        </Tooltip>
        <ModalBody mt={5}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
