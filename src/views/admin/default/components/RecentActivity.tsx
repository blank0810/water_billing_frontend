import { recentActivities } from '@/variables/charts';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';

export default function RecentActivities() {
  // Color mode values
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardBg = useColorModeValue('white', 'navy.700');
  const headerBg = useColorModeValue('gray.100', 'navy.800');
  const rowBg = useColorModeValue('gray.50', 'navy.600');
  const hoverBg = useColorModeValue('gray.100', 'navy.500');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const shadowHover = useColorModeValue('md', 'dark-lg')

  // Badge colors per status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return { bg: 'green.100', text: 'green.600' };
      case 'Failure':
        return { bg: 'red.100', text: 'red.600' };
      case 'Pending':
        return { bg: 'orange.100', text: 'orange.600' };
      default:
        return { bg: 'gray.200', text: 'gray.700' };
    }
  };

  return (
    <Box
      borderRadius="lg"
      bg={cardBg}
      p="6"
      w="100%"
      mb="6"
      shadow="sm"
      border="1px solid"
      borderColor={borderColor}
            _hover={{
        transform: 'translateY(-4px)',
        boxShadow: shadowHover,
      }}
    >
      <Text fontSize="lg" fontWeight="700" mb="8" color={textColor} textTransform="uppercase">
        Consumer Recent Activities
      </Text>

      <Table variant="unstyled" size="md">
        <Thead bg={headerBg}>
          <Tr>
            {['Activity ID', 'Date', 'User', 'Action', 'Meter No.', 'Status'].map((header) => (
              <Th
                key={header}
                color={textColor}
                fontSize="sm"
                fontWeight="600"
                py="5"
                px="4"
                textTransform="capitalize"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {recentActivities.map((activity) => {
            const { bg, text } = getStatusColor(activity.status);
            return (
              <Tr
                key={activity.id}
                bg={rowBg}
                _hover={{ bg: hoverBg, cursor: 'pointer' }}
                transition="all 0.2s ease"
              >
                <Td py="3" px="4">{activity.id}</Td>
                <Td py="3" px="4">{activity.date}</Td>
                <Td py="3" px="4">{activity.user}</Td>
                <Td py="3" px="4">{activity.action}</Td>
                <Td py="3" px="4">{activity.meterNo}</Td>
                <Td py="3" px="4">
                  <Badge
                    bg={bg}
                    color={text}
                    fontWeight="600"
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {activity.status}
                  </Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
