import {
    Box,
    Container,
    Flex,
    Image,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';


const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
};


const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={5}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <ListHeader>Site</ListHeader>
                        <Box as="a" href={'/'}>
                            Homepage
                        </Box>
                        <Box as="a" href={'dashboard'}>
                            Dashboard
                        </Box>
                        <Box as="a" href={'issues'}>
                            Issues
                        </Box>
                        <Box as="a" href={'market'}>
                            Marketplace
                        </Box>
                    </Stack>
                    {/* <Stack align={'flex-start'}>
                        <ListHeader>Legal</ListHeader>
                        <Box as="a" href={'#'}>
                            Cookies Policy
                        </Box>
                        <Box as="a" href={'#'}>
                            Privacy Policy
                        </Box>
                        <Box as="a" href={'#'}>
                            Terms of Service
                        </Box>
                        <Box as="a" href={'#'}>
                            Law Enforcement
                        </Box>
                        <Box as="a" href={'#'}>
                            Status
                        </Box>
                    </Stack> */}
                    {/* <Stack align={'flex-start'}>
                    <ListHeader>Follow Us</ListHeader>
                    <Box as="a" href={'#'}>
                    Facebook
                    </Box>
                    <Box as="a" href={'#'}>
                    Twitter
                    </Box>
                    <Box as="a" href={'#'}>
                    Dribbble
                    </Box>
                    <Box as="a" href={'#'}>
                    Instagram
                    </Box>
                    <Box as="a" href={'#'}>
                    LinkedIn
                    </Box>
                    </Stack> */}
                </SimpleGrid>
            </Container>
            <Box py={5}>
                <Flex
                    align={'center'}
                    _before={{
                    content: '""',
                    borderBottom: '1px solid',
                    borderColor: useColorModeValue('gray.200', 'gray.700'),
                    flexGrow: 1,
                    mr: 8,
                    }}
                    _after={{
                    content: '""',
                    borderBottom: '1px solid',
                    borderColor: useColorModeValue('gray.200', 'gray.700'),
                    flexGrow: 1,
                    ml: 8,
                    }}>
                    <Image
                        borderRadius='full'
                        src='/logo128.png'
                        alt='DCC Unit Association Logo'/>
                </Flex>
                <Text pt={6} fontSize={'sm'} textAlign={'center'}>
                    © {new Date().getFullYear()} DCC Unit Association. All rights reserved
                </Text>
            </Box>
        </Box>
    )
};


export default Footer