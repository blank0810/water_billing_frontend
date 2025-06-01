// Chakra imports
import PieChart from '@/components/charts/PieChart'
import { pieChartData, pieChartOptions } from '@/variables/charts'
import {
  Box,
  Card,
  Flex,
  Text,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'

export default function BillCollectionChart(props: { [x: string]: any }) {
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const cardColor = useColorModeValue('white', 'navy.700')
  const shadowHover = useColorModeValue('md', 'dark-lg')

  return (
    <Card
      p='20px'
      alignItems='center'
      flexDirection='column'
      w='100%'
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: shadowHover,
      }}
    >
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent='space-between'
        alignItems='center'
        w='90%'
        mb='16px'
      >
        <Text color={textColor} fontSize='md' fontWeight='600'>
          Collected vs Uncollected Bills
        </Text>
      </Flex>

      <Box w='100%' h='240px'>
        <PieChart
          h='100%'
          w='100%'
          chartData={pieChartData}
          chartOptions={pieChartOptions}
        />
      </Box>

      <Card
        bg={cardColor}
        flexDirection='row'
        w='100%'
        p='20px'
        mt='20px'
        justifyContent='space-between'
        flexWrap='wrap'
        gap='20px'
      >
        {/* Reusable status box */}
        {[
          { label: 'Collected', color: '#00308F', value: '63%' },
          { label: 'Uncollected', color: '#4169E1', value: '25%' },
          { label: 'Pending', color: '#87CEFA', value: '12%' },
          { label: 'Error', color: '#FF0000', value: '2%' },
        ].map((status, i) => (
          <Flex direction='column' key={i} minW='100px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg={status.color} borderRadius='50%' me='4px' />
              <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
                {status.label}
              </Text>
            </Flex>
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              {status.value}
            </Text>
          </Flex>
        ))}
      </Card>
    </Card>
  )
}
