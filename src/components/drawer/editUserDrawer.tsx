'use client';

import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    Link,
    Flex,
    useColorModeValue,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface RowObj {
    [key: string]: any;
}

interface EditUserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: RowObj | null;
    onSave: (updatedUser: RowObj) => void | Promise<void>;
}

type PasswordField = 'oldPassword' | 'newPassword' | 'confirmPassword';

export default function EditUserDrawer({
    isOpen,
    onClose,
    user,
    onSave,
}: EditUserDrawerProps) {
    const [formData, setFormData] = useState<RowObj | null>(user);
    const [showSecurityForm, setShowSecurityForm] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState<Record<PasswordField, boolean>>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    useEffect(() => {
        setFormData(user);
        setShowSecurityForm(false);
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    const bg = useColorModeValue('white', 'gray.800');
    const labelColor = useColorModeValue('gray.700', 'gray.200');
    const inputBg = useColorModeValue('gray.50', 'gray.700');
    const inputBorder = useColorModeValue('gray.200', 'gray.600');
    const linkColor = useColorModeValue('blue.600', 'blue.300');

    const profileFields = [
        { label: 'First Name', name: 'firstName' },
        { label: 'Last Name', name: 'lastName' },
        { label: 'Username', name: 'username' },
        { label: 'Contact Number', name: 'contactNumber' },
        { label: 'Address', name: 'address' },
    ];

    const passwordFields: { label: string; name: PasswordField }[] = [
        { label: 'Old Password', name: 'oldPassword' },
        { label: 'New Password', name: 'newPassword' },
        { label: 'Confirm Password', name: 'confirmPassword' },
    ];

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent bg={bg}>
                <DrawerCloseButton />
                <DrawerHeader fontSize="xl" fontWeight="semibold">
                    {showSecurityForm ? 'Change Security Details' : 'Edit User'}
                </DrawerHeader>

                <DrawerBody>
                    {formData ? (
                        <>
                            {!showSecurityForm ? (
                                <>
                                    {profileFields.map(({ label, name }) => (
                                        <FormControl mb={4} key={name}>
                                            <FormLabel color={labelColor}>{label}</FormLabel>
                                            <Input
                                                name={name}
                                                value={formData[name] || ''}
                                                onChange={handleChange}
                                                bg={inputBg}
                                                borderColor={inputBorder}
                                            />
                                        </FormControl>
                                    ))}

                                    <FormControl mb={4}>
                                        <FormLabel color={labelColor}>User Type</FormLabel>
                                        <Select
                                            name="userType"
                                            value={formData.userType || ''}
                                            onChange={handleChange}
                                            bg={inputBg}
                                            borderColor={inputBorder}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel color={labelColor}>Gender</FormLabel>
                                        <Select
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={handleChange}
                                            bg={inputBg}
                                            borderColor={inputBorder}
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel color={labelColor}>Birth Date</FormLabel>
                                        <Input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate || ''}
                                            onChange={handleChange}
                                            bg={inputBg}
                                            borderColor={inputBorder}
                                        />
                                    </FormControl>
                                </>
                            ) : (
                                <>
                                    <FormControl mb={4}>
                                        <FormLabel color={labelColor}>Email</FormLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            bg={inputBg}
                                            borderColor={inputBorder}
                                        />
                                    </FormControl>

                                    {passwordFields.map(({ label, name }) => (
                                        <FormControl mb={4} key={name}>
                                            <FormLabel color={labelColor}>{label}</FormLabel>
                                            <InputGroup>
                                                <Input
                                                    name={name}
                                                    type={passwordVisibility[name] ? 'text' : 'password'}
                                                    onChange={handleChange}
                                                    bg={inputBg}
                                                    borderColor={inputBorder}
                                                />
                                                <InputRightElement width="3rem">
                                                    <Button
                                                        h="1.5rem"
                                                        size="sm"
                                                        onClick={() =>
                                                            setPasswordVisibility((prev) => ({
                                                                ...prev,
                                                                [name]: !prev[name],
                                                            }))
                                                        }
                                                        variant="ghost"
                                                    >
                                                        {passwordVisibility[name] ? '🙈' : '👁'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                    ))}
                                </>
                            )}

                            <Flex justify="flex-end" mt={2}>
                                <Link
                                    color={linkColor}
                                    fontSize="sm"
                                    cursor="pointer"
                                    onClick={() => setShowSecurityForm((prev) => !prev)}
                                >
                                    {showSecurityForm
                                        ? 'Edit profile instead?'
                                        : 'Change security details instead?'}
                                </Link>
                            </Flex>
                        </>
                    ) : (
                        <Text color="gray.500">Loading...</Text>
                    )}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" colorScheme="gray" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
