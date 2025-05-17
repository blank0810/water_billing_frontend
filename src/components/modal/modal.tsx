// components/modal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showFooter?: boolean;
  footerContent?: ReactNode;
  size?: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  title = 'Modal Title',
  children,
  showFooter = true,
  footerContent,
  size = 'md',
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {showFooter && (
          <ModalFooter>
            {footerContent ? (
              footerContent
            ) : (
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
