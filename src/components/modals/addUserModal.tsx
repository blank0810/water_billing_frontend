import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };
}

const AddUserModal = ({ isOpen, onClose, onConfirm, formData }: AddUserModalProps) => {
  const { firstName, lastName, username, email, password } = formData;

  const labelColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={bg}
        borderRadius="2xl"
        px={6}
        py={8}
        maxW="md"
        boxShadow="lg"
      >
        <ModalHeader fontSize="2xl" fontWeight="bold" pb={2}>
          Confirm User Details
        </ModalHeader>
        <ModalCloseButton top={4} right={4} />

        <ModalBody>
          <Stack spacing={4}>
            <Box>
              <Text fontSize="sm" color={labelColor}>
                First Name
              </Text>
              <Text fontSize="md" fontWeight="medium" color={valueColor}>
                {firstName}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Last Name
              </Text>
              <Text fontSize="md" fontWeight="medium" color={valueColor}>
                {lastName}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Username
              </Text>
              <Text fontSize="md" fontWeight="medium" color={valueColor}>
                {username}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor}>
                Email
              </Text>
              <Text fontSize="md" fontWeight="medium" color={valueColor}>
                {email}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor} mb={1}>
                Password
              </Text>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  fontWeight="medium"
                  color={valueColor}
                  borderColor="gray.300"
                  _focus={{ boxShadow: "none", borderColor: "blue.400" }}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    variant="ghost"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={togglePassword}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter mt={6} justifyContent="flex-end" gap={3}>
          <Button variant="ghost" onClick={onClose} colorScheme="gray">
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onConfirm} px={6}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
