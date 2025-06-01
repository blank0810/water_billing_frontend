'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; // async to support await
  updatedUser: Record<string, any> | null;
  isPasswordChanged: boolean;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  onConfirm,
  updatedUser,
  isPasswordChanged,
}: UpdateUserModalProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const boxBorder = useColorModeValue('gray.200', 'gray.600');
  const headerColor = useColorModeValue('blue.600', 'blue.300');
  const toast = useToast();

  const handleConfirm = async () => {
    try {
      await onConfirm(); // call parent handler
      toast({
        title: isPasswordChanged ? 'Password Changed' : 'Profile Updated',
        description: isPasswordChanged
          ? 'Password has been successfully changed.'
          : 'User profile was updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose(); // close modal after success
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Something went wrong while updating the profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const modalSize = isPasswordChanged ? { base: 'xs', md: 'sm' } : { base: 'sm', md: 'md' };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader color={headerColor} fontSize="lg" fontWeight="bold">
          {isPasswordChanged ? 'Confirm Password Change' : 'Confirm Profile Update'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize="sm" color={textColor}>
            {isPasswordChanged
              ? 'Are you sure you want to change your password? This action cannot be undone.'
              : 'Are you sure you want to apply these profile changes? This action cannot be undone.'}
          </Text>

          {isPasswordChanged && (
            <Text fontWeight="semibold" color="red.400" fontSize="sm">
              ⚠️ Password change is irreversible!
            </Text>
          )}

          {!isPasswordChanged && (
            <Box
              maxH="250px"
              overflowY="auto"
              fontSize="sm"
              border="1px solid"
              borderColor={boxBorder}
              p={4}
              borderRadius="md"
              bg={useColorModeValue('gray.50', 'gray.700')}
            >
              <VStack align="start" spacing={2}>
                {updatedUser ? (
                  Object.entries(updatedUser).map(([key, value]) =>
                    ['oldPassword', 'newPassword', 'confirmPassword'].includes(key) ? null : (
                      <Box key={key}>
                        <Text color="gray.500" fontSize="xs" textTransform="uppercase">
                          {key}
                        </Text>
                        <Text color={textColor} fontWeight="medium">
                          {String(value)}
                        </Text>
                      </Box>
                    )
                  )
                ) : (
                  <Text color="gray.500">No updated data available.</Text>
                )}
              </VStack>
            </Box>
          )}
        </ModalBody>

        <ModalFooter mt={2}>
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose}
            _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
          >
            Cancel
          </Button>
          <Button
            colorScheme={isPasswordChanged ? 'red' : 'blue'}
            onClick={handleConfirm}
            _hover={{ bg: isPasswordChanged ? 'red.600' : 'blue.600' }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
