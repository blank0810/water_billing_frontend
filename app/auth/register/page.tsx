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
} from '@chakra-ui/react';
import DefaultAuthLayout from 'layouts/auth/Default';
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function Register() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
          <Image src="/img/auth/image.png" alt="Logo" mb="20px" width="150px" height="auto" mx="auto" />
          <Heading color={textColor} fontSize="36px" mb="10px" textAlign="center">
            CREATE NEW ACCOUNT
          </Heading>
          <Text
            mb="10px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
            textAlign="center"
          >
            Register your credentials to gain access.
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
            isRequired={true}
            variant="auth"
            fontSize="sm"
            placeholder="Enter your username"
            mb="24px"
            size="lg"
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Email<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            placeholder="Enter your email"
            mb="24px"
            size="lg"
            type="email"
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Password<Text color={brandStars}>*</Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type={show ? 'text' : 'password'}
              variant="auth"
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
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
          >
            Register
          </Button>
          <Flex justifyContent="center">
            <Link href="/auth/sign-in">
              <Text color={textColorBrand} fontSize="sm" fontWeight="500">
                Already have an account? Sign In
              </Text>
            </Link>
          </Flex>
        </FormControl>
      </Flex>
    </DefaultAuthLayout>
  );
}
