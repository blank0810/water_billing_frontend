import React from 'react'
import BarChart from '@/components/charts/BarChart'
import {
  barChartDataTotalConsumersPaid,
  barChartOptionsTotalConsumersPaid,
} from '@/variables/charts'
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Card,
} from '@chakra-ui/react'
import { MdMoreHoriz } from 'react-icons/md'

export default function MonthlyConsumersPaid(props: { [x: string]: any }) {
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  )
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverShadow = useColorModeValue('md', 'dark-lg')

  return (
    <Card
      w="100%"
      bg={cardBg}
      transition="all 0.3s ease"
      _hover={{
        boxShadow: hoverShadow,
        transform: 'translateY(-2px)',
      }}
    >
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Consumers Paid
        </Text>

        {/* Menu for More Options */}
        <Menu>
          <MenuButton
            as={Button}
            alignItems="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="50px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
          >
            <Icon as={MdMoreHoriz} color={iconColor} w="24px" h="24px" />
          </MenuButton>
          <MenuList>
            <MenuItem>See Full Report</MenuItem>
            <MenuItem>Download Report</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box h="240px" mt="auto">
        <BarChart
          chartData={barChartDataTotalConsumersPaid}
          chartOptions={barChartOptionsTotalConsumersPaid}
        />
      </Box>
    </Card>
  )
}
