'use client';

import {
  Box,
  Button,
  IconButton,
  Text,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { FiLogIn, FiX } from 'react-icons/fi';
import React from 'react';

export default function LoginPopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = () => {
    // Your login logic goes here
    console.log('Login submitted');
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FiLogIn />} colorScheme="blue" onClick={onOpen}>
        Login
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

            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Login to Continue
            </Text>

            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="you@example.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="••••••••" />
              </FormControl>
            </VStack>

            <Flex justify="flex-end" mt={6}>
              <Button colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
