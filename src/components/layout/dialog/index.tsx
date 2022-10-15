import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    Button,
} from  '@chakra-ui/react';
import { useRef } from 'react';

const Dialog = ({
    isOpen,
    onClose,
    heading,
    desc,
    onAction,
    cancelText,
    actionText,
    actionColor
}:{
    isOpen: boolean,
    onClose: () => void,
    onAction: () => void,
    heading: string,
    desc: string,
    cancelText: string,
    actionText: string,
    actionColor: string
}) => {

    const cancelRef = useRef(null);

  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {heading}
            </AlertDialogHeader>

            <AlertDialogBody>
                {desc}
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
            </Button>
            <Button colorScheme={actionColor} onClick={onAction} ml={3}>
                {actionText}
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default Dialog
