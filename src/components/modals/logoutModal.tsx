'use client';

import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  ScaleFade,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';

function LogoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const textColor = useColorModeValue('navy.700', 'whiteAlpha.900');
  const headerColor = useColorModeValue('red.600', 'red.400');
  const bg = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'navy.700');
  const buttonHoverBg = useColorModeValue('red.600', 'red.500');

  const handleLogout = () => {
    onClose();
    router.push('/auth/sign-in');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay bg="blackAlpha.600" />
      <ScaleFade initialScale={0.9} in={isOpen}>
        <ModalContent
          bg={bg}
          borderRadius="16px"
          px="24px"
          py="20px"
          border="1px solid"
          borderColor={borderColor}
          boxShadow="lg"
        >
          <ModalHeader color={headerColor} fontSize="2xl" fontWeight="extrabold" display="flex" alignItems="center" gap={3}>
            Confirm Logout
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: 'none' }} />
          <ModalBody pb={6}>
            <Text fontSize="md" color={textColor} opacity={0.9}>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </Text>
          </ModalBody>
          <ModalFooter gap="12px">
            <Button
              variant="outline"
              onClick={onClose}
              size="md"
              fontWeight="semibold"
              _hover={{ bg: useColorModeValue('gray.100', 'navy.700') }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              size="md"
              fontWeight="semibold"
              onClick={handleLogout}
              _hover={{ bg: buttonHoverBg }}
            >
              Log out
            </Button>
          </ModalFooter>
        </ModalContent>
      </ScaleFade>
    </Modal>
  );
}

export default LogoutModal;
