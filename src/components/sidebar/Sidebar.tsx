'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IoMenuOutline } from 'react-icons/io5';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Content from '@/components/sidebar/components/Content';
import { IRoute } from '@/types/navigation';

const Scrollbars = dynamic(
  () => import('react-custom-scrollbars-2').then((mod) => mod.Scrollbars),
  { ssr: true }
);

interface SidebarProps {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar({ routes }: SidebarProps) {
  const [isCollapsed] = useState(false);
  const variantChange = 'all 0.3s ease';
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarWidth = isCollapsed ? '80px' : '300px';

  return (
    <Box
      display={{ base: 'none', xl: 'block' }}
      position="fixed"
      top={0}
      left={0}
      zIndex="overlay"
      minH="100vh"
      w={sidebarWidth}
      transition={variantChange}
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        h="100vh"
        overflowX="hidden"
        boxShadow={shadow}
        w="full"
      >
        {/* Collapse/Expand Button */}

        {/* Scrollable Content */}
        <Scrollbars universal={true}>
          <Content routes={routes} isCollapsed={isCollapsed} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export function SidebarResponsive({ routes }: SidebarProps) {
  const menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Hamburger Icon */}
      <Flex display={{ base: 'flex', xl: 'none' }} alignItems="center">
        <IconButton
          icon={<IoMenuOutline />}
          variant="ghost"
          aria-label="Open Menu"
          onClick={onOpen}
          color={menuColor}
          fontSize="20px"
          mr="10px"
        />
      </Flex>

      {/* Drawer for Mobile Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'navy.800')}>
          <DrawerBody p="0">
            <Scrollbars universal={true}>
              <Content routes={routes} isCollapsed={false} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
