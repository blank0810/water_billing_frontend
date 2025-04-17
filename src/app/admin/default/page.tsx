'use client';

import {
  Box,
  Flex,
  FormLabel,
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
    <Box pt={{ base: '130px', md: '94px', xl: '94px' }}>
      {/* TableTopCreators and MiniStatistics Side-by-Side */}
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        gap="20px"
        mb="20px"
        align="flex-start"
      >
        <Card flex="1" px="0px">
          <TableTopCreators tableData={tableDataTopCreators} />
        </Card>

        {/* Overall Overview Section with 4 MiniStatistics Cards */}
        <Box flex="1">
          <Text
            color={useColorModeValue('secondaryGray.940', 'white')}
            fontSize="3xl"
            fontWeight="600"
            mb="14px"
          >
            Overall Overview
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
            {/* Total Consumers */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="94px"
                  h="94px"
                  bg={boxBg}
                  icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
                />
              }
              name="Total Consumers"
              value="3540"
            />

            {/* Total Users */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="94px"
                  h="94px"
                  bg="linear-gradient(94deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="Total Users"
              value="14"
            />

            {/* Total Active */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="94px"
                  h="94px"
                  bg={boxBg}
                  icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
                />
              }
              name="Total Active"
              value="2935"
            />

            {/* Overall Bill */}
            <MiniStatistics
              startContent={
                <IconBox
                  w="94px"
                  h="94px"
                  bg={boxBg}
                  icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />}
                />
              }
              name="Overall Bill"
              value="121,642.39"
            />
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Other Sections Below */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="40px">
      <BillingHistory />
        <MonthlyConsumersPaid />
      </SimpleGrid>
    </Box>
  );
}
