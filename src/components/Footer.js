import React from 'react';
import { Box, Container, Flex, Text, Link, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" color="gray.700" py={8}>
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
