import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, useColorModeValue } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import LetterPullup from "@/components/ui/letter-pullup";

const MotionBox = motion(Box);

export default function Hero() {
  const router = useRouter();

  const bgGradient = useColorModeValue(
    "linear(to-b, green.300, green.600)",
    "linear(to-b, green.700, green.900)"
  );

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Background animated shapes */}
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
      >
        {[...Array(5)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            borderRadius="full"
            bg="rgba(255,255,255,0.1)"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </MotionBox>

      <Container maxW="container.xl" centerContent position="relative" zIndex="1">
        <VStack spacing={8} align="center">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`${router.basePath}/images/aesthetic-axis-logo.png`}
              alt="AestheticAxis Logo"
              width={200}
              height={200}
              quality={100}
            />
          </MotionBox>

          <LetterPullup 
            words="AestheticAxis" 
            delay={0.15}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight"
            style={{color: "white"}}
          />

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Text 
              fontSize={["lg", "xl", "2xl"]} 
              color="white" 
              maxWidth="3xl" 
              textAlign="center"
              fontWeight="medium"
              letterSpacing="wide"
              textShadow="1px 1px 2px rgba(0,0,0,0.2)"
              mb={6}
            >
              Discover your unique style through our interactive quiz. Explore popular aesthetics and find where you fit on the style spectrum.
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/quiz" passHref>
              <Button
                as="a"
                size="lg"
                bg="white"
                color="green.700"
                _hover={{ bg: "green.100", transform: "translateY(-5px)" }}
                fontWeight="bold"
                transition="all 0.3s"
                boxShadow="lg"
                fontSize="xl"
                py={6}
                px={10}
                borderRadius="full"
              >
                Start Quiz
              </Button>
            </Link>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}