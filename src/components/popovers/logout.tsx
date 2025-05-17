 'use client';

import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';

export default function LogoutPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Replace this with your actual logout logic
    console.log('Logging out...');
    onClose();
  };

  return (
    <>
      <Button
        leftIcon={<FiLogOut />}
        colorScheme="red"
        variant="solid"
        onClick={onOpen}
      >
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
            width="90%"
            maxW="400px"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Are you sure you want to logout?
            </Text>

            <Flex justifyContent="center" gap={4}>
              <Button colorScheme="red" onClick={handleLogout}>
                Yes
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
