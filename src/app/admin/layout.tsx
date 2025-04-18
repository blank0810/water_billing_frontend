'use client';

import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import routes from 'routes';
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Helper to get current route info
const findCurrentRoute = (pathname: string, routes: IRoute[]) => {
  const match = routes.find((route) =>
    pathname.startsWith(route.layout + route.path)
  );
  return match || ({} as IRoute);
};

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const bg = useColorModeValue('secondaryGray.300', 'navy.900');

  const currentRoute = findCurrentRoute(pathname, routes);

  return (
    <Box h="100vh" w="100vw" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc(100% - 290px)' }}
          maxWidth={{ base: '100%', xl: 'calc(100% - 290px)' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText="WaterBois"
                brandText={currentRoute?.name || 'Dashboard'}
                secondary={currentRoute?.secondary || false}
                message={currentRoute?.name || ''}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
