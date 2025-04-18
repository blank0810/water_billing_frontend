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
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import Card from 'components/card/Card';
import MonthlyConsumersPaid from 'views/admin/default/components/ConsumerPaid';
import TableTopCreators from 'views/admin/default/components/TableTopCreators';
import tableDataTopCreators from 'views/admin/default/variables/tableDataTopCreators';
import BillingHistory from 'views/admin/default/components/BillingHistory';

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
        {/* Left: Consumer Table */}
        <Box flex="1" minW="300px">
          <Card px="0px">
            <TableTopCreators tableData={tableDataTopCreators} />
          </Card>
        </Box>

        {/* Right: Stats */}
        <Box flex="1" minW="300px">
          <Text
            color={useColorModeValue('secondaryGray.950', 'white')}
            fontSize="3xl"
            fontWeight="bold"
            mb="20px"
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
                  icon={<Icon w="28px" h="28px" as={MdBarChart} color={brandColor} />}
                />
              }
              name="Total Consumers"
              value="3540"
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="95px"
                  h="95px"
                  bg="linear-gradient(94deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="24px" h="24px" as={MdAddTask} color="white" />}
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
                  icon={<Icon w="28px" h="28px" as={MdFileCopy} color={brandColor} />}
                />
              }
              name="Total Active"
              value="2935"
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="95px"
                  h="95px"
                  bg={boxBg}
                  icon={<Icon w="28px" h="28px" as={MdAttachMoney} color={brandColor} />}
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
      </SimpleGrid>
    </Box>
  );
}
