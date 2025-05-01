import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState } from "react";
import Banner from "./ConsumerAvatar";

export default function ConsumerForm() {
  const toast = useToast();

  const inputBg = useColorModeValue("white", "#1B254B");
  const inputColor = useColorModeValue("gray.800", "gray.300");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    landmark: "",
    contactNumber: "",
    meterNo: "",
    gender: "",
    createdAt: new Date().toLocaleDateString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Form submitted",
        description: "Consumer information has been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Flex minH="100vh" justify="center" align="flex-start" bg={useColorModeValue("gray.50", "#111c44")} py={12} px={4}>
      <Box
        bg={useColorModeValue("white", "#1B254B")}
        p={{ base: 6, md: 10 }}
        rounded="2xl"
        shadow="xl"
        width="full"
        maxW="8xl"
      >
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
            {/* Avatar Section */}
            <GridItem>
              <Box display="flex" justifyContent="center" mb={8}>
                <Banner
                  avatar={undefined}
                  onImageChange={(e) => console.log("Avatar uploaded:", e.target.files?.[0])}
                  height="280px"
                  width="280px"
                  borderRadius="full"
                />
              </Box>
            </GridItem>

            {/* Form Section */}
            <GridItem>
              <Stack spacing={2}>
                <Text fontSize={{ base: "xl", md: "4xl" }} fontWeight="bold" color="blue.500" mb={1}>
                  Add New Consumer
                </Text>

                {/* Basic Info */}
                <Stack spacing={5}>
                  <HStack spacing={4} flexWrap="wrap">
                    <FormControl isRequired flex="1" minW="200px" mb={4}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        name="firstName"
                        placeholder="First name"
                        onChange={handleChange}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={inputColor}
                        borderColor={inputBorderColor}
                      />
                    </FormControl>
                    <FormControl isRequired flex="1" minW="200px" mb={4}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        name="lastName"
                        placeholder="Last name"
                        onChange={handleChange}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={inputColor}
                        borderColor={inputBorderColor}
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={4} flexWrap="wrap">
                    <FormControl isRequired flex="1" minW="200px" mb={4}>
                      <FormLabel>Middle Name</FormLabel>
                      <Input
                        name="middleName"
                        placeholder="Middle name"
                        onChange={handleChange}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={inputColor}
                        borderColor={inputBorderColor}
                      />
                    </FormControl>
                    <FormControl isRequired flex="1" minW="200px" mb={4}>
                      <FormLabel>Meter No.</FormLabel>
                      <Input
                        name="meterNo"
                        placeholder="Meter number"
                        onChange={handleChange}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={inputColor}
                        borderColor={inputBorderColor}
                      />
                    </FormControl>
                  </HStack>

                  <FormControl isRequired mb={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      placeholder="Enter address"
                      onChange={handleChange}
                      focusBorderColor="blue.500"
                      bg={inputBg}
                      color={inputColor}
                      borderColor={inputBorderColor}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </GridItem>
          </Grid>

          {/* Additional Information */}
          <Stack spacing={6}>
            <HStack spacing={4} flexWrap="wrap">
              <FormControl flex="1" minW="200px" isRequired mb={4}>
                <FormLabel>Landmark</FormLabel>
                <Input
                  name="landmark"
                  placeholder="Landmark"
                  onChange={handleChange}
                  focusBorderColor="blue.500"
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
              <FormControl flex="1" minW="200px" isRequired mb={4}>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contactNumber"
                  placeholder="Enter contact number"
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  focusBorderColor="blue.500"
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            </HStack>

            <HStack spacing={4} flexWrap="wrap">
              <FormControl flex="1" minW="200px" isRequired mb={4}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  focusBorderColor="blue.500"
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl flex="1" minW="200px" isRequired>
                <FormLabel>Date Created</FormLabel>
                <Input
                  name="createdAt"
                  value={formData.createdAt}
                  isReadOnly
                  focusBorderColor="gray.400"
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            </HStack>
          </Stack>

          <Flex mt={8} justify="flex-end">
            <Button
              type="submit"
              colorScheme="blue"
              px={10}
              isLoading={isSubmitting}
              loadingText="Submitting"
              rounded="lg"
            >
              Add Consumer
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
