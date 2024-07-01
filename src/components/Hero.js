import React from 'react';
import { Box, Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion(Box);

const LampHeader = () => (
  <MotionBox
    position="relative"
    height="40"
    overflow="hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <MotionBox
      position="absolute"
      inset="0"
      bgGradient="linear(to-b, green.300, transparent)"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
    <MotionBox
      position="absolute"
      inset="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <Box width="32" height="32" bg="white" borderRadius="full" boxShadow="lg" />
    </MotionBox>
  </MotionBox>
);

export default function Hero() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, green.500, green.700)">
      <LampHeader />
      <Container centerContent>
        <VStack spacing={8} zIndex={10}>
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