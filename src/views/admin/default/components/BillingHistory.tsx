import React from 'react'
import LineChart from '@/components/charts/LineChart'
import {
  billingTrendChartData,
  billingTrendChartOptions,
} from '@/variables/billling'
import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdMoreHoriz } from 'react-icons/md'

export default function MonthlyBillTrend() {
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const iconColor = useColorModeValue('gray.600', 'gray.300')
  const bgButton = useColorModeValue('gray.100', 'whiteAlpha.100')
  const hoverBg = useColorModeValue('gray.200', 'whiteAlpha.200')
  const menuBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const cardBg = useColorModeValue('white', 'gray.800')
  const shadowHover = useColorModeValue('md', 'dark-lg')

  return (
    <Card
      w="100%"
      px={6}
      py={4}
      bg={cardBg}
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: shadowHover,
      }}
    >
      {/* Sticky Header */}
      <Flex
        align="center"
        justify="space-between"
        position="sticky"
        top={0}
        zIndex={1}
        bg={cardBg}
        backdropFilter="blur(6px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        pb={3}
        mb={4}
      >
        <Text fontSize="xl" fontWeight="semibold" color={textColor}>
          Monthly Bill Trend
        </Text>

        <Menu>
          <MenuButton
            as={Button}
            bg={bgButton}
            _hover={{
              bg: hoverBg,
              transform: 'scale(1.05)',
            }}
            _active={{
              bg: hoverBg,
            }}
            transition="all 0.2s ease"
            borderRadius="md"
            w="36px"
            h="36px"
            p={0}
          >
            <Icon as={MdMoreHoriz} color={iconColor} boxSize={5} />
          </MenuButton>
          <MenuList bg={menuBg} borderRadius="md" shadow="md">
            <MenuItem>Export Report</MenuItem>
            <MenuItem>Filter by Year</MenuItem>
            <MenuItem>See Full Report</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Chart Section */}
      <Box h="260px">
        <LineChart
          chartData={billingTrendChartData}
          chartOptions={billingTrendChartOptions}
        />
      </Box>
    </Card>
  )
}
