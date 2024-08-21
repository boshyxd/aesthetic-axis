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

          {/* Create Your Style Profile */}
          <MotionBox
            w="full"
            variants={itemVariants}
            position="relative"
          >
            <MotionFlex
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
              w="full"
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              position="relative"
              overflow="hidden"
            >
              <MotionBox
                position="absolute"
                top="-5px"
                left="-5px"
                right="-5px"
                bottom="-5px"
                border="2px solid"
                borderColor="purple.500"
                borderRadius="xl"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                as={motion.div}
              />
              <Box flex={1} mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
                <Flex align="center" mb={4}>
                  <Icon as={FaUserCircle} w={8} h={8} color="purple.500" mr={4} />
                  <Heading as="h3" size="lg">
                    Create Your Style Profile
                  </Heading>
                </Flex>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
                  Sign up to save your quiz results, track your style evolution, and connect with like-minded individuals.
                </Text>
                <SimpleGrid columns={2} spacing={4} mb={8}>
                  <Feature
                    icon={FaSave}
                    title="Save Results"
                    color="purple.500"
                    text="Keep track of your style journey over time."
                  />
                  <Feature
                    icon={FaShareAlt}
                    title="Share Your Style"
                    color="purple.500"
                    text="Show off your unique aesthetic to friends and followers."
                  />
                </SimpleGrid>
                <MotionBox
                  display="flex"
                  justifyContent="center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Badge colorScheme="purple" fontSize="md" p={2} borderRadius="full" boxShadow="md">
                    New Feature!
                  </Badge>
                </MotionBox>
              </Box>
            </MotionFlex>
          </MotionBox>

          {/* Explore Trending Aesthetics and New Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
            {/* Explore Trending Aesthetics */}
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              position="relative"
              overflow="hidden"
            >
              <Flex align="center" mb={4}>
                <Icon as={FaCompass} w={8} h={8} color="blue.500" mr={4} />
                <Heading as="h3" size="lg">
                  Explore Trending Aesthetics
                </Heading>
              </Flex>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Stay up-to-date with the latest style trends and discover new aesthetics that resonate with you.
              </Text>
              <Icon as={FaPalette} w={20} h={20} color="blue.500" mt={4} />
            </Box>

            {/* Track Your Style Evolution */}
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              position="relative"
              overflow="hidden"
            >
              <Flex align="center" mb={4}>
                <Icon as={FaChartLine} w={8} h={8} color="green.500" mr={4} />
                <Heading as="h3" size="lg">
                  Track Your Style Evolution
                </Heading>
              </Flex>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Visualize how your style preferences change over time and gain insights into your aesthetic journey.
              </Text>
              <Icon as={FaChartLine} w={20} h={20} color="green.500" mt={4} />
            </Box>
          </SimpleGrid>

          {/* Three Panels */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {[
              {
                icon: FaClock,
                title: "Quick and Engaging Quiz",
                color: "teal.500",
                text: "Our interactive quiz uses advanced algorithms to assess your style preferences efficiently."
              },
              {
                icon: FaChartLine,
                title: "Detailed Style Analysis",
                color: "purple.500",
                text: "Get comprehensive insights into your aesthetic profile with our state-of-the-art analysis tools."
              },
              {
                icon: FaShieldAlt,
                title: "Personalized Recommendations",
                color: "pink.500",
                text: "Receive tailored style suggestions powered by machine learning and trend forecasting."
              }
            ].map((feature, index) => (
              <MotionBox key={index} variants={itemVariants}>
                <Feature {...feature} />
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Two Panels */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
            <MotionBox
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              variants={itemVariants}
            >
              <Icon as={FaUsers} w={12} h={12} color="green.500" mb={4} />
              <Heading as="h3" size="lg" mb={4}>
                Community Insights
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Connect with like-minded individuals and share your style journey with our vibrant community.
              </Text>
            </MotionBox>
            <MotionBox
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              rounded="xl"
              shadow="xl"
              variants={itemVariants}
            >
              <Icon as={FaMobileAlt} w={12} h={12} color="orange.500" mb={4} />
              <Heading as="h3" size="lg" mb={4}>
                Mobile-Friendly Experience
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Access your style profile and recommendations on-the-go with our responsive mobile design.
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