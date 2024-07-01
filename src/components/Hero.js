import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, Highlight } from "@chakra-ui/react";
import Link from 'next/link';
import BoxReveal from "@/components/magicui/box-reveal";
import LetterPullup from "@/components/magicui/letter-pullup";


export default function Hero() {
  return (
    <Box minHeight="90vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, green.500, green.700)">
      <Container centerContent>
        <VStack spacing={4} zIndex={10}>
          <BoxReveal boxColor="#5046e6" duration={0.5}>
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
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.5}>
          <LetterPullup 
              words="AestheticAxis" 
              delay={0.15}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight"
            />
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <Text fontSize="xl" color="green.100" maxWidth="2xl" textAlign="center">
              <Highlight
                query="unique"
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'blue.400', color: 'white' }}
              >
                Discover your unique style through our interactive quiz. Explore popular aesthetics and find where you fit on the style spectrum.
              </Highlight>
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
