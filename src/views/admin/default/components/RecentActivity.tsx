// RECENTACTIVITIES.tsx
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, useColorModeValue, Badge } from '@chakra-ui/react';
import { recentActivities } from 'variables/charts';

export default function RecentActivities() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const headerColor = useColorModeValue('gray.100', 'navy.800');
  const rowColor = useColorModeValue('gray.50', 'navy.700');
  
  // Function to get the status color and text color
  const getStatusColor = (status: string) => {
    if (status === 'Success') return { bg: 'green.400', text: 'green.600' }; // Success -> Green
    if (status === 'Failure') return { bg: 'red.400', text: 'red.600' }; // Failure -> Red
    if (status === 'Pending') return { bg: 'orange.400', text: 'orange.600' }; // Pending -> Orange
    return { bg: 'gray.400', text: 'gray.700' }; // Default color
  };

  return (
    <Box
      borderRadius="12px"
      bg={useColorModeValue('white', 'navy.800')}
      p="24px"
      w="100%"
      mb="20px"
    >
      <Text fontSize="xl" fontWeight="700" mb="24px" color={textColor} textTransform="uppercase">
        Consumer Recent Activities
      </Text>
      
      <Table variant="simple">
        <Thead bg={headerColor}>
          <Tr>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              Activity ID
            </Th>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              Date
            </Th>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              User
            </Th>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              Action
            </Th>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              Meter No.
            </Th>
            <Th color={textColor} fontSize="sm" fontWeight="600" padding="12px">
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentActivities.map((activity) => {
            const { bg, text } = getStatusColor(activity.status); // Destructure the background and text color for the status
            return (
              <Tr key={activity.id} bg={rowColor} _hover={{ bg: 'gray.100' }} transition="background-color 0.3s ease">
                <Td padding="16px">{activity.id}</Td>
                <Td padding="16px">{activity.date}</Td>
                <Td padding="16px">{activity.user}</Td>
                <Td padding="16px">{activity.action}</Td>
                <Td padding="16px">{activity.meterNo}</Td>
                <Td padding="16px">
                  <Badge
                    colorScheme={bg === 'green.400' ? 'green' : 
                               bg === 'red.400' ? 'red' : 'orange'}
                    fontWeight="600"
                    px="8px"
                    py="4px"
                    borderRadius="md"
                    fontSize="sm"
                    color={text} // Set the text color based on status
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
