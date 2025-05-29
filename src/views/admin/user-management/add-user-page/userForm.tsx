import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Grid,
  Flex,
  useColorModeValue,
  useToast,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Banner from "./userAvatar";
import AddUserModal from "@/components/modals/addUserModal";

export default function UserForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputBg = useColorModeValue("white", "#1B254B");
  const inputColor = useColorModeValue("gray.800", "gray.300");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    contactNumber: "",
    email: "",
    userType: "",
    gender: "",
    birthDate: "",
    createdAt: new Date().toLocaleDateString(),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch.",
        description: "Please ensure both passwords match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      return;
    }

    toast({
      title: "User added successfully.",
      description: `Welcome, ${formData.firstName}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Flex align="center" justify="center" p={4} direction="column">
      <Box
        bgGradient="linear(to-b, #00008B, #1F51FF)"
        w="full"
        py={{ base: 18, md: 24 }}
        borderRadius="2xl"
        textAlign="center"
        mb={-40}
        zIndex={1}
        position="relative"
      >
        <Box color="white">
          <Box fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Add a New User
          </Box>
          <Box fontSize={{ base: "md", md: "lg" }} mt={2}>
            Complete the form below
          </Box>
        </Box>
      </Box>

      <Box maxW="6xl" w="full" mt={-20} zIndex={2} position="relative">
        <Card
          borderRadius="2xl"
          boxShadow="2xl"
          bg={useColorModeValue("white", "#1A202C")}
        >
          <CardBody
            as="form"
            onSubmit={handleOpenConfirm}
            py={10}
            px={{ base: 4, md: 10 }}
          >
            <Stack direction={{ base: "column", md: "row" }} spacing={10} mb={8}>
              <Flex flex="1" justify="center" align="center">
                <Banner
                  avatar={undefined}
                  onImageChange={(e) =>
                    console.log("Avatar uploaded:", e.target.files?.[0])
                  }
                  height="180px"
                  width="180px"
                  borderRadius="full"
                />
              </Flex>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={6}
                flex="2"
              >
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  >
                    <option value="">Select Type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Select>
                </FormControl>
              </Grid>
            </Stack>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              mb={6}
            >
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      size="sm"
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    onChange={handleChange}
                    bg={inputBg}
                    color={inputColor}
                    borderColor={inputBorderColor}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      size="sm"
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              mb={6}
            >
              <FormControl isRequired>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contactNumber"
                  placeholder="11-digit number"
                  maxLength={11}
                  onChange={(e) =>
                    /^\d*$/.test(e.target.value) && handleChange(e)
                  }
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              mb={6}
            >
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  placeholder="Enter address"
                  onChange={handleChange}
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <FormControl isRequired>
                <FormLabel>Birth Date</FormLabel>
                <Input
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date Created</FormLabel>
                <Input
                  name="createdAt"
                  value={formData.createdAt}
                  isReadOnly
                  bg={inputBg}
                  color={inputColor}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            </Grid>

            <Flex justify="flex-end" mt={10}>
              <Button colorScheme="blue" size="lg" px={10} type="submit">
                Add User
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Box>

      <AddUserModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formData={formData}
      />
    </Flex>
  );
}
