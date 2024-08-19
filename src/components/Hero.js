import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, Flex } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LetterPullup from "@/components/magicui/letter-pullup";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Hero() {
  const router = useRouter();

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      bgGradient="linear(to-b, green.500, green.700)"
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

      <Container centerContent maxW="container.xl" zIndex={1}>
        <VStack spacing={2}>
          <MotionBox
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={`${router.basePath}/images/aesthetic-axis-logo.png`}
              alt="AestheticAxis Logo"
              width={300}
              height={300}
            />
          </MotionBox>

          <MotionBox
            textShadow="2px 2px 4px rgba(0,0,0,0.4)"
            letterSpacing="wide"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LetterPullup 
              words="AestheticAxis" 
              delay={0.15}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl font-extrabold text-white tracking-tight"
            />
          </MotionBox>

          <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
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
          </MotionBox>

          <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
                boxShadow="md"
                fontSize="xl"
                py={6}
                px={8}
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
