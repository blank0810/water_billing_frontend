'use client';

import {
  Box,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useRef } from 'react';

interface BannerProps {
  avatar?: string;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string;
  width?: string;
  borderRadius?: string;
}

export default function Banner({
  avatar,
  onImageChange,
  height = '200px',
  width = '200px',
  borderRadius = 'full',
}: BannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box position="relative" w={width}>
      {/* Avatar Container */}
      <Box
        w={width}
        h={height}
        borderRadius={borderRadius}
        overflow="hidden"
        position="relative"
      >
        {avatar ? (
          <Image
            src={avatar}
            alt="Avatar"
            objectFit="cover"
            w="full"
            h="full"
          />
        ) : (
          <Box
            bg="gray.200"
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">No Image</Text>
          </Box>
        )}
      </Box>

      {/* Larger Edit Button at bottom-right overlapping */}
      <Box position="absolute" bottom="-5px" right="-5px" zIndex={3}>
        <Tooltip label="Upload Avatar" hasArrow>
          <IconButton
            aria-label="Edit avatar"
            icon={<EditIcon fontSize="lg" />}
            boxSize="44px"
            onClick={handleEditClick}
            borderRadius="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
          />
        </Tooltip>
      </Box>

      {/* Hidden File Input */}
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        display="none"
        onChange={onImageChange}
      />
    </Box>
  );
}
