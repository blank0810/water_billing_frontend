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
} from '@chakra-ui/react';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  updatedUser: Record<string, any> | null;
  isPasswordChanged: boolean;
  showSuccess?: boolean;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  onConfirm,
  updatedUser,
  isPasswordChanged,
  showSuccess = false,
}: UpdateUserModalProps) {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const boxBorder = useColorModeValue('gray.200', 'gray.600');
  const headerColor = useColorModeValue('blue.600', 'blue.300');

  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xs', md: 'sm' }}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader color={headerColor} fontSize="lg" fontWeight="bold">
            Profile Updated
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>The profile has been successfully updated.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // If password is changed, show simple confirmation without details
  if (isPasswordChanged) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xs', md: 'sm' }}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader color={headerColor} fontSize="lg" fontWeight="bold">
            Confirm Password Change
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} fontSize="sm" color={textColor}>
              Are you sure you want to change your password? This action cannot be undone.
            </Text>
            <Text fontWeight="semibold" color="red.400" fontSize="sm">
              ⚠️ Password change is irreversible!
            </Text>
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
              colorScheme="red"
              onClick={onConfirm}
              _hover={{ bg: 'red.600' }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  // Otherwise show profile update confirmation with details
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'sm', md: 'md' }}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader color={headerColor} fontSize="lg" fontWeight="bold">
          Confirm Profile Update
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize="sm" color={textColor}>
            Are you sure you want to apply these profile changes? This action cannot be undone.
          </Text>

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
                  key !== 'oldPassword' &&
                  key !== 'newPassword' &&
                  key !== 'confirmPassword' ? (
                    <Box key={key}>
                      <Text color="gray.500" fontSize="xs" textTransform="uppercase">
                        {key}
                      </Text>
                      <Text color={textColor} fontWeight="medium">
                        {String(value)}
                      </Text>
                    </Box>
                  ) : null
                )
              ) : (
                <Text color="gray.500">No updated data available.</Text>
              )}
            </VStack>
          </Box>
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
            colorScheme="blue"
            onClick={onConfirm}
            _hover={{ bg: 'blue.600' }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
