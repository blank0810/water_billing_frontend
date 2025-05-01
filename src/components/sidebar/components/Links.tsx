import {
  Box,
  Collapse,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks({ routes }: SidebarLinksProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
  const activeIcon = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const activeBg = useColorModeValue('gray.200', 'gray.600');

  const activeRoute = useCallback(
    (routePath: string) => pathname?.toLowerCase() === routePath.toLowerCase(),
    [pathname]
  );

  const renderLinks = () =>
    routes.map((route, index) => {
      const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;

      if (hasSubRoutes) {
        const isSubRouteActive = route.subRoutes.some((sr) =>
          activeRoute(sr.layout + sr.path)
        );
        const isExpanded = expandedSection === route.name || isSubRouteActive;

        const handleToggle = () => {
          setExpandedSection(isExpanded ? null : route.name);
        };

        return (
          <Box key={index} mb="16px">
            <Flex
              align="center"
              py="12px"
              px="12px"
              cursor="pointer"
              _hover={{ bg: activeBg }}
              bg={isSubRouteActive ? activeBg : 'transparent'}
              borderRadius="8px"
              onClick={handleToggle}
            >
              {route.icon && (
                <Box color={isSubRouteActive ? activeIcon : textColor} me="12px">
                  {route.icon}
                </Box>
              )}
              <Text
                color={isSubRouteActive ? activeColor : textColor}
                fontWeight={isSubRouteActive ? 'bold' : 'medium'}
                fontSize="lg"
                lineHeight="1"
                pt="1px"
                flex="1"
              >
                {route.name}
              </Text>
              <ChevronRightIcon
                boxSize="18px"
                color={isSubRouteActive ? activeColor : textColor}
                transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                transition="transform 0.2s ease"
              />
            </Flex>

            <Collapse in={isExpanded}>
              <Box pl="36px" mt="8px">
                {route.subRoutes.map((sub, subIndex) => {
                  const fullPath = sub.layout + sub.path;
                  const isSubActive = activeRoute(fullPath);

                  return (
                    <Link key={subIndex} href={fullPath}>
                      <Flex
                        align="center"
                        py="6px"
                        mt="6px"
                        px="8px"
                        bg={isSubActive ? activeBg : 'transparent'}
                        borderRadius="6px"
                        _hover={{ bg: activeBg }}
                        cursor="pointer"
                      >
                        {sub.icon && (
                          <Box color={isSubActive ? activeIcon : textColor} me="12px">
                            {sub.icon}
                          </Box>
                        )}
                        <Text
                          color={isSubActive ? activeColor : inactiveColor}
                          fontSize="md"
                          lineHeight="1"
                          pt="1px"
                        >
                          {sub.name}
                        </Text>
                      </Flex>
                    </Link>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        );
      }

      const fullPath = route.layout + route.path;
      const isActive = activeRoute(fullPath);

      return (
        <Link key={index} href={fullPath}>
          <Box
            py="12px"
            px="12px"
            mb="12px"
            _hover={{ bg: activeBg }}
            bg={isActive ? activeBg : 'transparent'}
            borderRadius="8px"
            cursor="pointer"
          >
            <Flex align="center">
              {route.icon && (
                <Box color={isActive ? activeIcon : textColor} me="12px">
                  {route.icon}
                </Box>
              )}
              <Text
                color={isActive ? activeColor : inactiveColor}
                fontWeight={isActive ? 'bold' : 'medium'}
                fontSize="lg"
                lineHeight="1"
                pt="1px"
              >
                {route.name}
              </Text>
            </Flex>
          </Box>
        </Link>
      );
    });

  return <Box position="relative">{renderLinks()}</Box>;
}

export default SidebarLinks;
