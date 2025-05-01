'use client';

import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdCheckCircle,
  MdGroups,
  MdPaid,
  MdPerson,
} from 'react-icons/md';
import Card from 'components/card/Card';
import MonthlyConsumersPaid from 'views/admin/default/components/ConsumerPaid';
import TableTopCreators from 'views/admin/default/components/ConsumerDetails';
import tableDataTopCreators from 'views/admin/default/variables/tableDataTopCreators';
import BillingHistory from 'views/admin/default/components/BillingHistory';
import PieChart from 'components/charts/PieChart';
import PieCard from 'views/admin/default/components/PieCard';
import RecentActivities from 'views/admin/default/components/RecentActivity';

export default function Default() {
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
  {/* Consumer Table Section */}
  <Box flex="1" minW="300px">
    <Card px="0px">
      <TableTopCreators tableData={tableDataTopCreators} />
    </Card>
  </Box>

  {/* Overall Overview Section */}
  <Box flex="1" minW="300px">
    <Text
      fontSize="3xl"
      fontWeight="bold"
      mb="6"
      color={useColorModeValue('secondaryGray.950', 'white')}
    >
      Overall Overview
    </Text>

    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
  <MiniStatistics
    startContent={
      <IconBox
        w="95px"
        h="95px"
        bg={boxBg}
        icon={<Icon as={MdGroups} w="28px" h="28px" color={brandColor} />}
      />
    }
    name="Total Consumers"
    value="3,540"
  />

  <MiniStatistics
    startContent={
      <IconBox
        w="95px"
        h="95px"
        bg={boxBg}
        icon={<Icon as={MdPerson} w="24px" h="24px" color={brandColor} />}
      />
    }
    name="Total Users"
    value="14"
  />

  <MiniStatistics
    startContent={
      <IconBox
        w="95px"
        h="95px"
        bg={boxBg}
        icon={<Icon as={MdCheckCircle} w="28px" h="28px" color={brandColor} />}
      />
    }
    name="Total Active"
    value="2,935"
  />

  <MiniStatistics
    startContent={
      <IconBox
        w="95px"
        h="95px"
        bg={boxBg}
        icon={<Icon as={MdPaid} w="28px" h="28px" color={brandColor} />}
      />
    }
    name="Overall Bill"
    value="₱121,642.39"
  />
</SimpleGrid>
  </Box>
</Flex>


      {/* Bottom Grid Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mb="40px">
        <BillingHistory />
        <MonthlyConsumersPaid />
        <PieCard />
        <RecentActivities />
      </SimpleGrid>
    </Box>
  );
}
