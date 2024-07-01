import React, { useState } from 'react';
import { Box, Flex, Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from 'next/link';
import dynamic from 'next/dynamic';

const NavLink = ({ children, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} passHref legacyBehavior>
      <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{ textDecoration: 'none' }}
      >
        <Text
          fontWeight="medium"
          color={useColorModeValue('gray.800', 'white')}
          zIndex={2}
          position="relative"
        >
          {children}
        </Text>
        {isHovered && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="2px"
            bg="green.400"
          />
        )}
      </Box>
    </Link>
  );
};

const Navbar = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      px={4}
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Flex 
        h="56px" // Reduced height from 64px (16) to 56px (14)
        alignItems={'center'} 
        justifyContent={'space-between'} 
        maxWidth="1200px" 
        margin="0 auto"
      >
        <Box
          fontWeight="bold"
          fontSize="xl" // Slightly reduced font size
          color={useColorModeValue('green.600', 'green.300')}
        >
          <Text as="span" color="green.500">Aesthetic</Text>
          <Text as="span" color="green.700">Axis</Text>
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={6} alignItems="center"> {/* Added alignItems="center" */}
            <NavLink href="/">Home</NavLink>

            <Link href="/quiz" passHref legacyBehavior>
              <Button
                as="a"
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'green.400'}
                _hover={{
                  bg: 'green.500',
                }}
                height="32px" // Reduced button height
                minWidth="90px" // Ensure minimum width for the button
              >
                Start Quiz
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
