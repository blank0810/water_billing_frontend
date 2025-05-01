// Chakra imports
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
} from '@chakra-ui/react'
import Card from 'components/card/Card'
import LineChart from 'components/charts/LineChart'
import React from 'react'

import { MdMoreHoriz } from 'react-icons/md'
import { billingTrendChartData, billingTrendChartOptions } from 'variables/billling'

export default function MonthlyBillTrend(props: { [x: string]: any }) {
  const { ...rest } = props

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' })
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' })

  return (
    <Card w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700">
          Monthly Bill Trend
        </Text>

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
            display="flex"
            {...rest}
          >
            <Icon as={MdMoreHoriz} color={iconColor} w="24px" h="24px" />
          </MenuButton>
          <MenuList>
            <MenuItem>Export Report</MenuItem>
            <MenuItem>Filter by Year</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box h="260px" mt="auto">
        <LineChart
          chartData={billingTrendChartData}
          chartOptions={billingTrendChartOptions}
        />
      </Box>
    </Card>
  )
}
