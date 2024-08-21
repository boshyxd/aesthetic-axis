import React from 'react';
import Head from 'next/head';
import { Box, Container, Button, Link as ChakraLink, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';
import Link from 'next/link';
import Hero from '../components/Hero';

// Use dynamic import for IconCloud, with loading fallback
const IconCloud = dynamic(() => import('../components/ui/icon-cloud'), { 
  ssr: true,
  loading: () => <div>Loading...</div>
});

const slugs = [
  "typescript", "javascript", "react", "html5", "css3", "nodedotjs", "express",
  "nextdotjs", "prisma", "amazonaws", "postgresql", "firebase", "nginx", "vercel",
  "testinglibrary", "jest", "cypress", "docker", "git", "github", "visualstudiocode",
  "chakraui", "tailwindcss",
];

// Move IconCloudDemo to a separate component
const IconCloudDemo = () => (
  <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
    <IconCloud iconSlugs={slugs} />
  </div>
);

export default function Home() {
  const bgColor = useColorModeValue("green.700", "green.900");

  return (
    <>
      <Head>
        <title>AestheticAxis - Discover Your Style</title>
        <meta name="description" content="Find your unique aesthetic through our interactive quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <FeatureSection />

        <Box minHeight="100vh" bg={bgColor} py={16} position="relative" overflow="hidden">
          <div className="stars">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </div>
          <Container maxW="6xl" position="relative" zIndex={2}>
            <VStack spacing={8} align="center">
              <Heading
                as="h2"
                fontSize="4xl"
                color="white"
                textAlign="center"
                fontWeight="bold"
                letterSpacing="wide"
                textShadow="2px 2px 4px rgba(0,0,0,0.4)"
              >
                Modern Web Technologies
              </Heading>
              <Text fontSize="xl" textAlign="center" maxWidth="800px" color="white" fontWeight="medium">
                AestheticAxis is built using a powerful stack of cutting-edge technologies,
                ensuring a smooth, responsive, and visually appealing experience for our users.
              </Text>
              <IconCloudDemo />
            </VStack>
          </Container>
        </Box>

        <Box as="section" py={20} bg={bgColor} position="relative">
          <Container maxW="6xl" centerContent position="relative" zIndex={2}>
            <Box textAlign="center" mb={10}>
              <ChakraLink as={Link} href="/quiz" passHref>
                <Button
                  as="a"
                  size="lg"
                  colorScheme="yellow"
                  fontWeight="bold"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.3s ease"
                >
                  Start Your Style Journey
                </Button>
              </ChakraLink>
            </Box>
          </Container>
        </Box>
      </main>

      <Footer />
    </>
  );
}