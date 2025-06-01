// components/no-internet.tsx
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function NoInternet() {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="9999"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      textAlign="center"
      p={4}
    >
      <Image
        src="/no-internet.gif"
        alt="No Internet"
        boxSize="200px"
        mb={6}
        objectFit="contain"
      />
      <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
        No Internet Connection
      </Text>
      <Text fontSize="md" color="gray.500">
        Please check your connection and try again.
      </Text>
    </Box>
  );
}
