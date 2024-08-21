"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Box, VStack, Heading, Text, Container } from "@chakra-ui/react";
import Particles from "react-tsparticles";
import { ISourceOptions } from "tsparticles-engine";
import QuizQuestion from "@/components/QuizQuestion";

const QuizPage = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <Box className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200 dark:from-sky-900 dark:to-sky-700">
      {/* Mountain SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 text-gray-900 dark:text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Particles */}
      <Particles
        id="tsparticles"
        options={{
          particles: {
            number: { value: 50 },
            color: { value: color },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />

      {/* Content */}
      <Container maxW="container.xl" className="relative z-10">
        <VStack spacing={8} align="center" className="pt-20 pb-32">
          <Heading
            as="h1"
            size="2xl"
            className="text-white dark:text-gray-100 text-center font-bold"
          >
            Scale Your Style Peaks
          </Heading>
          <Text
            fontSize="xl"
            className="text-white dark:text-gray-200 text-center mb-12"
          >
            Navigate the AestheticAxis
          </Text>
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="xl"
            p={8}
            width="full"
            maxW="2xl"
            className="bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80"
          >
            <QuizQuestion
              question="How much do you value minimalism in design?"
              onSliderChange={(value: number) => console.log(value)}
            />
          </Box>
          {/* Add more QuizQuestion components as needed */}
        </VStack>
      </Container>
    </Box>
  );
};

export default QuizPage;