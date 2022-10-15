import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const PopUp = ({
    isOpen = false,
    onClose,
    onAction,
    children,
    heading,
    actionText,
    cancelText = 'Cancel'
}:{
    isOpen: boolean,
    onClose: () => void, 
    onAction: () => void,
    children: React.ReactNode,
    heading: string,
    actionText: string,
    cancelText?: string
}) => {
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>

          <ModalCloseButton />
          
          <ModalBody pb={6}>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onAction} colorScheme='teal' mr={3}>
              {actionText}
            </Button>
            <Button onClick={onClose}>{cancelText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default PopUp
