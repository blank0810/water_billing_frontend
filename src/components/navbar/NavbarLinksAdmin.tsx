'use client';

import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchBar } from '@/components/navbar/searchBar/SearchBar';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdInfoOutline, MdNotificationsNone } from 'react-icons/md';
import routes from '@/routes';
import { useRouter } from 'next/navigation';
import LogoutModal from '../modals/logoutModal';
import { SidebarResponsive } from '../sidebar/Sidebar';

export default function HeaderLinks(props: { secondary: boolean, onOpen: any, fixed: any }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navbarIcon = useColorModeValue('gray.500', 'white');
  const menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('navy.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const textColorBrand = useColorModeValue('brand.500', 'brand.400');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '0px 41px 75px #081132'
  );

  return (
    <Flex
      zIndex="100"
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => (secondary ? { base: '10px', md: 'unset' } : 'unset')}
        me="10px"
        borderRadius="30px"
      />
      <SidebarResponsive routes={routes} />

      {/* Notifications */}
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text>
          </Flex>
        </MenuList>
      </Menu>

      {/* Info */}
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdInfoOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: '30px', md: 'unset' }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: 'unset' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex flexDirection="column"></Flex>
        </MenuList>
      </Menu>

      {/* Theme Toggle */}
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>

      {/* User Menu */}
      <Menu>
        <MenuButton p="0px" style={{ position: 'relative' }}>
          <Box
            _hover={{ cursor: 'pointer' }}
            color="white"
            bg="#11047A"
            w="40px"
            h="40px"
            borderRadius="50%"
          />
          <Center top={0} left={0} position="absolute" w="100%" h="100%">
            <Text fontSize="xs" fontWeight="bold" color="white">
              EJK
            </Text>
          </Center>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, Enan and JanTan
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
              <Text fontSize="sm">Consumer</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={onOpen}
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      {/* Logout Modal */}
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
