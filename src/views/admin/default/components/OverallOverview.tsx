import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import {
  MdGroups,
  MdPerson,
  MdCheckCircle,
  MdPaid,
} from "react-icons/md";
import MiniStatistics from '@/components/card/MiniStatistics';
import IconBox from '@/components/icons/IconBox';
import React from "react";

const stats = [
  {
    name: "Total Consumers",
    value: "3,540",
    icon: MdGroups,
    color: "blue.500",
  },
  {
    name: "Total Users",
    value: "14",
    icon: MdPerson,
    color: "green.500",
  },
  {
    name: "Total Active",
    value: "2,935",
    icon: MdCheckCircle,
    color: "teal.500",
  },
  {
    name: "Overall Bill",
    value: "₱121,642.39",
    icon: MdPaid,
    color: "purple.500",
  },
];

const OverallOverview: React.FC = () => {
  const iconBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const shadowHover = useColorModeValue("md", "dark-lg");

  return (
    <Box flex="1" minW="300px" px={{ base: 4, md: 6 }} py={6}>
      <SimpleGrid columns={4} spacing={6}>

        {stats.map((stat) => (
          <Box
            key={stat.name}
            bg={cardBg}
            borderRadius="lg"
            p={4}
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: shadowHover,
            }}
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="64px"
                  h="64px"
                  bg={iconBg}
                  icon={
                    <Icon
                      as={stat.icon}
                      w={6}
                      h={6}
                      color={useColorModeValue(stat.color, stat.color.replace(".500", ".300"))}
                    />
                  }
                />
              }
              name={stat.name}
              value={stat.value}
            />
          </Box>
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default OverallOverview;
