import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';
import { isWindowAvailable } from 'utils/navigation';

export default function AdminNavbar(props: {
  secondary: boolean;
  message: string | boolean;
  brandText: string;
  logoText: string;
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isWindowAvailable()) {
      window.addEventListener('scroll', changeNavbar);
      return () => window.removeEventListener('scroll', changeNavbar);
    }
  }, []);

  const { secondary, message, brandText } = props;

  const mainText = useColorModeValue('navy.700', 'white');
  const secondaryText = useColorModeValue('gray.700', 'white');
  const navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)'
  );

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      position="fixed"
      bg={navbarBg}
      backdropFilter="blur(20px)"
      borderColor="transparent"
      borderRadius="16px"
      minH="75px"
      w={{
        base: 'calc(100vw - 6%)',
        md: 'calc(100vw - 8%)',
        xl: 'calc(100vw - 350px)',
        '2xl': 'calc(100vw - 365px)',
      }}
      top={{ base: '12px', md: '16px', xl: '18px' }}
      right={{ base: '12px', md: '30px', xl: '30px' }}
      px={{ sm: '15px', md: '10px' }}
      pt="8px"
      pb="8px"
      zIndex={10}
    >
      <Flex
        w="100%"
        flexDirection={{ sm: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color={secondaryText}>Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink color={secondaryText}>{brandText}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Link
            color={mainText}
            fontWeight="bold"
            fontSize="34px"
            _hover={{ color: mainText }}
            _active={{ bg: 'inherit' }}
            _focus={{ boxShadow: 'none' }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: '100%', md: 'unset' }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Box>
  );
}
