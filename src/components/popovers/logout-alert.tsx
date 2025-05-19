'use client';

import {
  Box,
  Button,
  IconButton,
  Text,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { FiLogOut, FiX } from 'react-icons/fi';
import React from 'react';

export default function LogoutPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logged out');
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FiLogOut />} colorScheme="red" onClick={onOpen}>
        Logout
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={9999}
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(6px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="2xl"
            maxW="360px"
            textAlign="center"
            position="relative"
          >
            <IconButton
              icon={<FiX />}
              aria-label="Close"
              position="absolute"
              top={3}
              right={3}
              size="sm"
              onClick={onClose}
              variant="ghost"
            />

            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Are you sure you want to logout?
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              This action will end your session.
            </Text>

            <Flex justify="center" gap={3}>
              <Button onClick={onClose} variant="outline" colorScheme="blue">
                No
              </Button>
              <Button onClick={handleLogout} colorScheme="red">
                Yes
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
