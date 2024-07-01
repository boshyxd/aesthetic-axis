import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Icon, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaClock, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const MotionBox = motion(Box);

const Feature = ({ title, text, icon, color }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      rounded="xl"
      shadow="xl"
      borderTop="4px solid"
      borderColor={color}
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
    >
      <Icon as={icon} w={10} h={10} color={color} mb={4} />
      <Heading as="h3" size="md" mb={2} color={useColorModeValue('gray.700', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </MotionBox>
  );
};

const FeatureSection = () => {
  return (
    <Box as="section" py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="6xl">
        <VStack spacing={12}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('gray.800', 'white')}>
              Discover Your Style with Ease!
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl" mx="auto">
              AestheticAxis provides you with cutting-edge tools to explore and define your unique aesthetic.
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            <Feature
              icon={FaClock}
              title="Quick and Engaging Quiz"
              color="teal.500"
              text="Our interactive quiz uses advanced algorithms to assess your style preferences efficiently."
            />
            <Feature
              icon={FaChartLine}
              title="Detailed Style Analysis"
              color="purple.500"
              text="Get comprehensive insights into your aesthetic profile with our state-of-the-art analysis tools."
            />
            <Feature
              icon={FaShieldAlt}
              title="Personalized Recommendations"
              color="pink.500"
              text="Receive tailored style suggestions powered by machine learning and trend forecasting."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeatureSection;
