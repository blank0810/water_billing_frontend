import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | string;
  onDelete: (userId: number | string) => Promise<void>; // assuming async delete
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  userId,
  onDelete,
}: DeleteUserModalProps) {
  const toast = useToast();

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const handleDeleteUser = async () => {
    try {
      await onDelete(userId);
      toast({
        title: 'User deleted.',
        description: `User with ID ${userId} has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Deletion failed.',
        description: 'Something went wrong while deleting the user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader fontSize="xl" fontWeight="semibold" color={textColor}>
          Delete User
        </ModalHeader>
        <ModalBody>
          <Text color={textColor}>
            Are you sure you want to delete this user? This action cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleDeleteUser}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
