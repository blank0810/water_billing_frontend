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
  height = '160px',
  width = '160px',
  borderRadius = 'full',
}: BannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('blue.300', 'blue.600');

  return (
    <Box
      position="relative"
      w={width}
      h={height}
      cursor="pointer"
      role="group"
      rounded={borderRadius}
      boxShadow="md"
      borderWidth="2px"
      borderColor={borderColor}
      overflow="hidden"
      bg={bgColor}
      transition="all 0.3s ease"
    >
      {/* Avatar Image */}
      {avatar ? (
        <Image
          src={avatar}
          alt="Avatar"
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
          borderRadius={borderRadius}
          userSelect="none"
          draggable={false}
        />
      ) : (
        <Box
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          color={useColorModeValue('gray.500', 'gray.400')}
          fontWeight="medium"
          fontSize="md"
        >
          No Image
        </Box>
      )}

      {/* Edit Button */}
      <Box position="absolute" bottom="0" right="0" transform="translate(25%, 25%)" zIndex={5}>
        <Tooltip label="Upload Avatar" hasArrow>
          <IconButton
            aria-label="Edit avatar"
            icon={<EditIcon fontSize="16px" />}
            boxSize="36px"
            onClick={handleEditClick}
            borderRadius="full"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            shadow="md"
            _focus={{ boxShadow: 'outline' }}
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
