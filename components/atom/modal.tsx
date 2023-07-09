'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

interface Props {
  title?: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onClickOverlay?: () => VoidFunction
}

export default function CustomModal(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
      <ModalOverlay onClick={props.onClickOverlay} />
      <ModalContent width="100%" maxWidth="90%" margin="10">
        {props.title && <ModalHeader>{props.title}</ModalHeader>}
        <ModalCloseButton className="hover:text-orange-500 hover:cursor-pointer" />
        <ModalBody mt={5}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
