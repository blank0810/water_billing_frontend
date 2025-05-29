'use client';
import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import DefaultAuthLayout from 'layouts/auth/Default';
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClick = () => setShow(!show);

  const handleSignIn = async () => {
    try {
      const res = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      // Store token or user data in localStorage if needed
      // localStorage.setItem('token', data.token);

      toast({
        title: 'Login successful.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.push('/admin/default');
    } catch (error: any) {
      toast({
        title: 'Login failed.',
        description: error.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.jpg'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="90%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="90%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box textAlign="center" mb="20px">
          <Image
            src="/img/auth/logo.png"
            alt="Logo"
            mb="20px"
            width="120px"
            height="auto"
            mx="auto"
          />
          <Heading color={textColor} fontSize="36px" mb="10px" textAlign="center">
            ADMINISTRATOR LOGIN
          </Heading>
          <Text
            mb="10px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
            textAlign="center"
          >
            Make sure to enter your registered username and password!
          </Text>
        </Box>
        <FormControl>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Username<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired
            variant="auth"
            fontSize="sm"
            type="text"
            placeholder="Enter username here."
            mb="24px"
            fontWeight="500"
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Password<Text color={brandStars}>*</Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type={show ? 'text' : 'password'}
              variant="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: 'pointer' }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>

          <Flex justifyContent="space-between" align="center" mb="24px">
            <Link href="/auth/forgot-password">
              <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                Forgot password?
              </Text>
            </Link>
          </Flex>

          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </FormControl>
      </Flex>
    </DefaultAuthLayout>
  );
}
