'use client';


import BillingHistory from '@/views/admin/default/components/BillingHistory';
import TopAreaTable from '@/views/admin/default/components/ConsumerDetails';
import MonthlyConsumersPaid from '@/views/admin/default/components/ConsumerPaid';
import OverallOverview from '@/views/admin/default/components/OverallOverview';
import PieCard from '@/views/admin/default/components/PieCard';
import RecentActivities from '@/views/admin/default/components/RecentActivity';
import tableColumnsTopAreas from '@/views/admin/default/variables/tableDataTopCreators';

import {
  Box,
  Card,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';



export default function Default() {
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: '8px', md: '8px', xl: '8px' }} px={{ base: 4, md: 6 }}>

      {/* Side-by-side: ConsumerDetails and Overall Overview */}
<Flex
  direction={{ base: 'column', xl: 'row' }}
  gap="20px"
  mb="20px"
  align="stretch"
  wrap="wrap"
>
  <OverallOverview />
</Flex>

      {/* Bottom Grid Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mb="40px">
                    <TopAreaTable tableData={tableColumnsTopAreas} />
        <BillingHistory />
        <MonthlyConsumersPaid />
        <PieCard />
        <RecentActivities />
      </SimpleGrid>
    </Box>
  );
}
