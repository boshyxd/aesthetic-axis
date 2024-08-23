import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Icon, VStack, useColorModeValue, Button, Flex, Badge } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { FaClock, FaChartLine, FaShieldAlt, FaPalette, FaUsers, FaMobileAlt, FaCompass, FaUserCircle, FaShareAlt, FaSave } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

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
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Icon as={icon} w={10} h={10} color={color} mb={4} />
      <Heading as="h3" size="md" mb={2} color={useColorModeValue('gray.700', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')} flex="1">
        {text}
      </Text>
    </MotionBox>
  );
};

const FeatureSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box as="section" py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="6xl">
        <VStack spacing={10} as={motion.div} initial="hidden" animate={controls} variants={containerVariants} ref={ref}>
          <MotionBox textAlign="center" variants={itemVariants}>
            <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('gray.800', 'white')}>
              Discover Your Style with Ease
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl" mx="auto">
              AestheticAxis provides you with cutting-edge tools to explore and define your unique aesthetic.
            </Text>
          </MotionBox>

          {/* Main Features */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {[
              {
                icon: FaCompass,
                title: "Explore Trending Aesthetics",
                color: "blue.500",
                text: "Stay up-to-date with the latest style trends and discover new aesthetics that resonate with you."
              },
              {
                icon: FaChartLine,
                title: "Track Your Style Evolution",
                color: "green.500",
                text: "Visualize how your style preferences change over time and gain insights into your aesthetic journey."
              },
              {
                icon: FaUserCircle,
                title: "Create Your Style Profile",
                color: "purple.500",
                text: "Sign up to save your quiz results, track your style evolution, and connect with like-minded individuals."
              }
            ].map((feature, index) => (
              <MotionBox key={index} variants={itemVariants} height="100%">
                <Feature {...feature} />
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Quick Quiz and Community Insights */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
            <MotionBox
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              variants={itemVariants}
            >
              <Icon as={FaClock} w={12} h={12} color="teal.500" mb={4} />
              <Heading as="h3" size="lg" mb={4}>
                Quick and Engaging Quiz
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Our interactive quiz uses advanced algorithms to assess your style preferences efficiently.
              </Text>
            </MotionBox>
            <MotionBox
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              variants={itemVariants}
            >
              <Icon as={FaUsers} w={12} h={12} color="orange.500" mb={4} />
              <Heading as="h3" size="lg" mb={4}>
                Community Insights
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Connect with like-minded individuals and share your style journey with our vibrant community.
              </Text>
            </MotionBox>
          </SimpleGrid>

          <MotionBox textAlign="center" variants={itemVariants}>
            <Heading as="h3" size="xl" mb={4}>
              Ready to Discover Your Unique Style?
            </Heading>
            <Link href="/quiz" passHref>
              <Button
                as="a"
                colorScheme="teal"
                size="lg"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              >
                Take the Quiz Now
              </Button>
            </Link>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeatureSection;