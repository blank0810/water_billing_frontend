import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
  import Card from 'components/card/Card'
  import React, { useState, useEffect } from 'react'
  import dynamic from 'next/dynamic'
  import { MdPrint, MdDownload, MdCalendarToday } from 'react-icons/md'
  import { lineChartDataTrend, lineChartOptionsTrend } from '../variables/lineChart'
  
  // Line chart component dynamically imported (for Next.js)
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
  
  export default function TrendRate(props: { [x: string]: any }) {
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
  
    // Current Year
    const currentYear = new Date().getFullYear()
    const availableYears = [currentYear, currentYear - 1, currentYear - 2] // Example years
    const [selectedYear, setSelectedYear] = useState(currentYear)
  
    // Dynamic chart data based on selected year
    const [filteredData, setFilteredData] = useState<any[]>([])
  
    useEffect(() => {
      const dataForSelectedYear = lineChartDataTrend.filter(
        (data) => data.name.includes(selectedYear.toString())
      )
      setFilteredData(dataForSelectedYear)
    }, [selectedYear])
  
    // Function to handle the print button (only print the chart section)
    const handlePrint = () => {
      const chartSection = document.getElementById('line-chart-section')
      if (chartSection) {
        const printWindow = window.open('', '', 'height=800,width=1200')
        printWindow?.document.write('<html><head><title>Print Report</title></head><body>')
        printWindow?.document.write(chartSection?.outerHTML)
        printWindow?.document.write('</body></html>')
        printWindow?.document.close()
        printWindow?.print()
      }
    }
  
    // Download logic (you can extend this with specific formats like Excel, PDF, etc.)
    const handleDownload = () => {
      alert('Download logic goes here') // You can implement Excel/PDF/Docs logic
    }
  
    // Handle year selection from the dropdown
    const handleYearSelect = (year: number) => {
      setSelectedYear(year)
    }
  
    return (
      <Card w='100%' {...rest}>
        <Flex align='center' w='100%' px='15px' py='10px'>
          <Text
            me='auto'
            color={textColor}
            fontSize='xl'
            fontWeight='700'
            lineHeight='100%'
          >
            Water Rate Trend
          </Text>
  
          {/* Calendar and Icons */}
          <Flex gap='2' align='center'>
            <Flex align='center' gap='1'>
              <Icon as={MdCalendarToday} color={iconColor} w='18px' h='18px' />
              <Text color={textColor} fontSize='sm' fontWeight='500'>
                {selectedYear}
              </Text>
  
              {/* Dropdown for year selection */}
              <Menu>
                <MenuButton as={Button} variant='link'>
                  ▼
                </MenuButton>
                <MenuList>
                  {availableYears.map((year) => (
                    <MenuItem key={year} onClick={() => handleYearSelect(year)}>
                      {year}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
  
            <Tooltip label='Print Report' hasArrow>
              <Button
                onClick={handlePrint}
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                borderRadius='10px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                p='0'
              >
                <Icon as={MdPrint} color={iconColor} w='20px' h='20px' />
              </Button>
            </Tooltip>
  
            <Tooltip label='Download Report' hasArrow>
              <Button
                onClick={handleDownload}
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                borderRadius='10px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                p='0'
              >
                <Icon as={MdDownload} color={iconColor} w='20px' h='20px' />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
  
        <Box h='240px' mt='auto' id='line-chart-section'>
          <Chart
            options={lineChartOptionsTrend}
            series={filteredData} // Use the filtered data based on selected year
            type='line'
            height='100%'
            width='100%'
          />
        </Box>
      </Card>
    )
  }
  