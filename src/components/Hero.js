import React from 'react';
import { Box, Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion(Box);

export default function Hero() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, green.500, green.700)">
      <Container centerContent>
        <VStack spacing={8} zIndex={10}>
        <Box width={200} height={200} position="relative">
            <img
              src="/images/aesthetic-axis-logo.png"
              alt="AestheticAxis Logo"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </Box>
          <Heading as="h1" size="4xl" color="white" fontWeight="extrabold" letterSpacing="tight">
            AestheticAxis
          </Heading>
          <Text fontSize="xl" color="green.100" maxWidth="2xl" textAlign="center">
            Discover your unique style through our interactive quiz. Explore popular aesthetics and find where you fit on the style spectrum.
          </Text>
          <Link href="/quiz" passHref>
            <Button
              as="a"
              size="lg"
              bg="white"
              color="green.700"
              _hover={{ bg: "green.100" }}
              fontWeight="bold"
              transition="colors 0.3s"
            >
              Start Quiz
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}