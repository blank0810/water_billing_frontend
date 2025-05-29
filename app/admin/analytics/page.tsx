'use client';

import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

;
import Card from '@/components/card/Card';
import MonthlyConsumersPaid from '@/views/admin/default/components/ConsumerPaid';
import TableTopCreators from '@/views/admin/default/components/ConsumerDetails';
import tableDataTopCreators from '@/views/admin/default/variables/tableDataTopCreators';
import BillingHistory from '@/views/admin/default/components/BillingHistory';
import LineChart from '@/views/admin/analytics/components/LineChart';
import LedgerTable from '@/views/admin/analytics/components/LedgerTable';

export default function Analytics() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: '130px', md: '94px', xl: '94px' }} px={{ base: 4, md: 6 }}>
      {/* Side-by-side: TableTopCreators and MiniStatistics */}
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        gap="20px"
        mb="20px"
        align="stretch"
        wrap="wrap"
      >
        {/* Left: Consumer Table */}
        <Box flex="1" minW="300px">
          <Card px="0px">
            <TableTopCreators tableData={tableDataTopCreators} />
          </Card>
        </Box>

        {/* Right: Stats */}
        <Box flex="1" minW="300px">
        <LineChart />
        </Box>
      </Flex>

      {/* Bottom Grid Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mb="40px">
      <LedgerTable />
        <BillingHistory />
        <MonthlyConsumersPaid />
      </SimpleGrid>
    </Box>
  );
}
