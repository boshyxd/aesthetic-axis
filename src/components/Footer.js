import React from 'react';
import { Box, Container, Flex, Text, Link, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  return (
    <Box as="footer" bg={bgColor} color={textColor} py={8}>
      <Container maxW="6xl">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
          <Text fontSize="sm" mb={{ base: 4, md: 0 }}>
            © {new Date().getFullYear()} AestheticAxis. All rights reserved.
          </Text>
          <Stack direction="row" spacing={4}>
            <Link href="https://github.com/boshyxd/aesthetic-axis" isExternal>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                size="md"
                colorScheme="gray"
                variant="ghost"
              />
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
