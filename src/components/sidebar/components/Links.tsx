import {
  Box,
  Collapse,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { IRoute } from '@/types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks({ routes }: SidebarLinksProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Style tokens
  const fontSize = 'md';
  const fontFamily = 'body';
  const activeFontWeight = 'bold';
  const inactiveFontWeight = 'medium';

  // Theme-based color styles
  const activeColor = useColorModeValue('gray.800', 'white');
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');
  const iconActiveColor = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('gray.500', 'gray.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('gray.200', 'gray.600');

  const activeRoute = useCallback(
    (routePath: string) => pathname?.toLowerCase() === routePath.toLowerCase(),
    [pathname]
  );

  const renderLinks = () =>
    routes.map((route, index) => {
      const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;

      if (hasSubRoutes) {
        const isSubRouteActive = route.subRoutes?.some((sr) =>
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
              py="10px"
              px="12px"
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              bg={isSubRouteActive ? activeBg : 'transparent'}
              borderRadius="8px"
              onClick={handleToggle}
              transition="background 0.2s"
            >
              {route.icon && (
                <Box color={isSubRouteActive ? iconActiveColor : textColor} me="12px">
                  {route.icon}
                </Box>
              )}
              <Text
                color={isSubRouteActive ? activeColor : inactiveColor}
                fontWeight={isSubRouteActive ? activeFontWeight : inactiveFontWeight}
                fontSize={fontSize}
                fontFamily={fontFamily}
                flex="1"
                lineHeight="1"
                pt="1px"
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
                {route.subRoutes?.map((sub, subIndex) => {
                  const fullPath = sub.layout + sub.path;
                  const isSubActive = activeRoute(fullPath);

                  return (
                    <Link key={subIndex} href={fullPath}>
                      <Flex
                        align="center"
                        py="6px"
                        mt="6px"
                        px="10px"
                        bg={isSubActive ? activeBg : 'transparent'}
                        borderRadius="6px"
                        _hover={{ bg: hoverBg }}
                        cursor="pointer"
                        transition="background 0.2s"
                      >
                        {sub.icon && (
                          <Box color={isSubActive ? iconActiveColor : textColor} me="12px">
                            {sub.icon}
                          </Box>
                        )}
                        <Text
                          color={isSubActive ? activeColor : inactiveColor}
                          fontWeight={isSubActive ? activeFontWeight : inactiveFontWeight}
                          fontSize={fontSize}
                          fontFamily={fontFamily}
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
            py="10px"
            px="12px"
            mb="12px"
            _hover={{ bg: hoverBg }}
            bg={isActive ? activeBg : 'transparent'}
            borderRadius="8px"
            cursor="pointer"
            transition="background 0.2s"
          >
            <Flex align="center">
              {route.icon && (
                <Box color={isActive ? iconActiveColor : textColor} me="12px">
                  {route.icon}
                </Box>
              )}
              <Text
                color={isActive ? activeColor : inactiveColor}
                fontWeight={isActive ? activeFontWeight : inactiveFontWeight}
                fontSize={fontSize}
                fontFamily={fontFamily}
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
