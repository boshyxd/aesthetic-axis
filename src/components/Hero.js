import React from 'react';
import { Box, Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BoxReveal from "@/components/magicui/box-reveal";
import LetterPullup from "@/components/magicui/letter-pullup";

export default function Hero() {
  const router = useRouter();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, green.500, green.700)">
      <Container centerContent maxW="container.xl">
        <VStack spacing={4} zIndex={10}>
          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <Box width={250} height={250} position="relative">
              <Image
                src={`${router.basePath}/images/aesthetic-axis-logo.png`}
                alt="AestheticAxis Logo"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <Box
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
              letterSpacing="wide"
            >
              <LetterPullup 
                words="AestheticAxis" 
                delay={0.15}
                className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl font-extrabold text-white tracking-tight"
              />
            </Box>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <Text 
              fontSize={["xl", "2xl", "3xl"]} 
              color="white" 
              maxWidth="4xl" 
              textAlign="center"
              fontWeight="medium"
              letterSpacing="wide"
              textShadow="1px 1px 2px rgba(0,0,0,0.2)"
            >
              Discover your unique style through our interactive quiz. Explore popular aesthetics and find where you fit on the style spectrum.
            </Text>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <Link href="/quiz" passHref>
              <Button
                as="a"
                size="lg"
                bg="white"
                color="green.700"
                _hover={{ bg: "green.100" }}
                fontWeight="bold"
                transition="colors 0.3s"
                boxShadow="md"
                fontSize="xl"
                py={6}
                px={8}
              >
                Start Quiz
              </Button>
            </Link>
          </BoxReveal>
        </VStack>
      </Container>
    </Box>
  );
}