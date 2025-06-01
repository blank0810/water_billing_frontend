'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  Avatar,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { RowObj } from '@/views/data/user/userData';

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: RowObj | null;
  onEdit?: () => void;
  onPrint?: () => void;
}

export default function ViewUserModal({
  isOpen,
  onClose,
  user,
  onEdit,
  onPrint,
}: ViewUserModalProps) {
  if (!user) return null;

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const labelColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xs', md: 'md' }}>
      <ModalOverlay />
      <ModalContent bg={bg} p={{ base: 4, md: 6 }}>
        <ModalHeader color={textColor} fontSize="xl" fontWeight="bold" px={0}>
          View User Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={0} pt={2}>
          <Flex direction="column" gap={6}>
            <Flex align="center" gap={4}>
              <Avatar name={user.name} size="lg" />
              <Box>
                <Text fontWeight="semibold" fontSize="lg" color={textColor}>
                  {user.name}
                </Text>
                <Text fontSize="sm" color={labelColor}>
                  @{user.username}
                </Text>
              </Box>
            </Flex>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Email
              </Text>
              <Text color={textColor}>{user.email}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                User Type
              </Text>
              <Text color={textColor}>{user.userType}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Status
              </Text>
              <Text color={textColor}>{user.status}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Created At
              </Text>
              <Text color={textColor}>{user.createdAt}</Text>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter px={0} pt={6}>
          <Flex w="full" justify="space-between" gap={3} direction={{ base: 'column', sm: 'row' }}>
            <Button variant="outline" colorScheme="gray" w={{ base: '100%', sm: 'auto' }} onClick={onPrint}>
              Print
            </Button>
            <Button colorScheme="blue" w={{ base: '100%', sm: 'auto' }} onClick={onEdit}>
              Edit User
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}