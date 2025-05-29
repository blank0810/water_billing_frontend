// Chakra imports
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from '@/components/separator/Separator';

export function SidebarHead() {
	// Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column' gap='12px' mb='16px'>
			<Image
				src='/img/auth/logo.png'
				alt='Logo'
				boxSize='100px'
			/>
			<Text fontWeight='bold' fontSize='md' color={logoColor}>
				ADMINISTRATOR
			</Text>
			<HSeparator mb='10px' />
		</Flex>
	);
}

export default SidebarHead;
