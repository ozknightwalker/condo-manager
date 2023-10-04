import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, Link as RouteLink } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import { auth, signInWithGoogle } from "../services/firebase";


const LoggedInUserNavBarItems = ({user}) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                >
                <Avatar size={"sm"} src={user.photoURL} />
            </MenuButton>
            <MenuList alignItems={"center"}>
                <br />
                <Center>
                    <Avatar size={"2xl"} src={user.photoURL} />
                </Center>
                <br />
                <Center>
                    <p>{user.displayName}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Listings</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
};

const AnonymousUserNavBarItems = () => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                onClick={signInWithGoogle}
                >
                Login
            </MenuButton>
        </Menu>
    )
};

const NavLink = (props) => {
    const { children } = props;

    return (
      <RouteLink
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        to={children.toLowerCase()}>
        {children}
      </RouteLink>
    )
};

const Links = ['Dashboard', 'Issues', 'Marketplace']


const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useContext(AppContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                <Box
                    as="a"
                    onClick={() => navigate('/')}
                    bgGradient="linear(to-r, primary.400, primary.600)"
                    backgroundClip="text">
                    Deo City Condominium
                </Box>
                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                ))}
                </HStack>
                </HStack>

                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={7}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>

                        {user?.isAnonymous === false
                            ? <LoggedInUserNavBarItems  user={user}/>
                            : <AnonymousUserNavBarItems />
                        }
                    </Stack>
                </Flex>
            </Flex>
            {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                ))}
                </Stack>
            </Box>
            ) : null}
        </Box>
    </div>
  );
};

export default Navbar;
