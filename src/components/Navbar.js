import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Button, Text, useColorModeValue, IconButton,
  Menu, MenuButton, MenuList, MenuItem, Avatar, useDisclosure,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  HStack, VStack, Container
} from "@chakra-ui/react";
import Link from 'next/link';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const Logo = () => (
    <Link href="/" passHref>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        bgGradient="linear(to-r, green.400, green.600)"
        bgClip="text"
        _hover={{
          bgGradient: "linear(to-r, green.500, green.700)",
          cursor: "pointer"
        }}
      >
        AestheticAxis
      </Text>
    </Link>
  );

  const NavItems = () => (
    <HStack spacing={4}>
      <Link href="/quiz" passHref>
        <Button colorScheme="green" variant="ghost">
          Start Quiz
        </Button>
      </Link>
      {user ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
          >
            <Avatar
              size="sm"
              src={user.photoURL}
              name={user.displayName || user.email}
            />
            <ChevronDownIcon ml={1} />
          </MenuButton>
          <MenuList>
            <Link href="/profile" passHref>
              <MenuItem>View Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Link href="/login" passHref>
            <Button colorScheme="green" variant="outline">
              Login
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button colorScheme="green" variant="solid">
              Register
            </Button>
          </Link>
        </>
      )}
    </HStack>
  );

  return (
    <Box
      bg={bgColor}
      boxShadow={isScrolled ? "md" : "none"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      transition="box-shadow 0.2s, background-color 0.2s"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Logo />
          <HStack spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
            <NavItems />
          </HStack>
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onOpen}
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <NavItems />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
