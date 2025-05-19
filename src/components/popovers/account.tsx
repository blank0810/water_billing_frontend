'use client';

import React from 'react';
import {
  Box,
  Button,
  Icon,
  Text,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

type AlertPopoverProps = {
  status: 'success' | 'error';
  title: string;
  description?: string;
  triggerText: string;
  triggerColor?: string;
};

export default function AlertPopover({
  status,
  title,
  description,
  triggerText,
  triggerColor = 'blue',
}: AlertPopoverProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const icon = status === 'success' ? FiCheckCircle : FiXCircle;
  const color = status === 'success' ? 'green.500' : 'red.500';

  return (
    <>
      <Button colorScheme={triggerColor} onClick={onOpen}>
        {triggerText}
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
            textAlign="center"
            maxW="360px"
            minW="300px"
          >
            <Flex justify="center" mb={3}>
              <Icon as={icon} boxSize={10} color={color} />
            </Flex>

            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {title}
            </Text>

            {description && (
              <Text fontSize="sm" color="gray.600" mb={4}>
                {description}
              </Text>
            )}

            <Button colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}


<AlertPopover
  status="success"
  title="User Added Successfully!"
  triggerText="Simulate User Success"
/>

<AlertPopover
  status="error"
  title="Failed to Add User"
  description="Please check the form and try again."
  triggerText="Simulate User Fail"
/>

<AlertPopover
  status="success"
  title="Consumer Added Successfully!"
  triggerText="Simulate Consumer Success"
/>

<AlertPopover
  status="error"
  title="Failed to Add Consumer"
  description="Something went wrong while saving the data."
  triggerText="Simulate Consumer Fail"
/>
