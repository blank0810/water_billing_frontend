// components/loading.tsx
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

export default function Loading() {
  // Keyframe animation for Chakra
  const waveKeyframes = keyframes`
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(-200%) rotate(360deg);
    }
  `;

  return (
    <Box
      position="fixed"
      zIndex="9999"
      inset="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-b, blue.200, blue.100)"
    >
      <Box
        position="relative"
        width="200px"
        height="200px"
        bg="cyan.400"
        borderRadius="full"
        overflow="hidden"
        boxShadow="0 0 30px rgba(0, 188, 212, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Two wave layers */}
        <Box
          position="absolute"
          width="200%"
          height="200%"
          top="100%"
          left="-50%"
          bg="whiteAlpha.400"
          borderRadius="40%"
          animation={`${waveKeyframes} 5s linear infinite`}
        />
        <Box
          position="absolute"
          width="200%"
          height="200%"
          top="100%"
          left="-50%"
          bg="whiteAlpha.400"
          borderRadius="40%"
          animation={`${waveKeyframes} 5s linear infinite`}
          transitionDelay="-2.5s"
        />
        <Text
          color="white"
          fontSize="xl"
          fontWeight="bold"
          zIndex="2"
          fontFamily="Poppins"
        >
          Loading...
        </Text>
      </Box>
    </Box>
  );
}
