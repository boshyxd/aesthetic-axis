import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Avatar, Container, Button, SimpleGrid, Skeleton, useToast, ScaleFade, SlideFade, Divider, Icon, Flex, Wrap, WrapItem, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import AxisGraphic from '../components/AxisGraphic';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaUserCircle, FaChartPie, FaSignOutAlt, FaMedal, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';

const MotionBox = motion(Box);

const Profile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            toast({
              title: "No user data found",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error fetching user data",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, toast]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return (
      <Box bg="green.700" minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Container maxW="container.md" py={24} flex="1">
          <ScaleFade initialScale={0.9} in={true}>
            <VStack spacing={8} align="stretch" bg="gray.800" p={55} borderRadius="xl" boxShadow="xl">
              <Heading as="h1" size="2xl" className="text-white text-center">
                Please log in to view your profile
              </Heading>
              <Link href="/login" passHref>
                <Button as="a" colorScheme="green" size="lg" leftIcon={<FaUserCircle />}>
                  Log In
                </Button>
              </Link>
            </VStack>
          </ScaleFade>
        </Container>
        <Footer />
      </Box>
    );
  }
  
  return (
    <Box className="min-h-screen bg-green-700">
      <Navbar />
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box height="8px" />
          <ScaleFade initialScale={0.9} in={true}>
            <Box bg="white" p={8} borderRadius="xl" boxShadow="xl">
              <Flex direction={["column", "row"]} align="center" justify="space-between">
                <VStack align={["center", "start"]} spacing={4}>
                  <Avatar size="2xl" name={user.displayName} src={user.photoURL} />
                  <VStack align={["center", "start"]} spacing={1}>
                    <Heading as="h1" size="2xl" className="text-quaternary">
                      {user.displayName}
                    </Heading>
                    <Text fontSize="lg" className="text-tertiary">{user.email}</Text>
                  </VStack>
                </VStack>
                <VStack spacing={4} mt={[4, 0]}>
                  <Skeleton isLoaded={!isLoading}>
                    <Badge colorScheme="purple" p={2} borderRadius="md">
                      <Icon as={FaMedal} mr={2} />
                      Quizzes Taken: {userData?.quizResults?.length || 0}
                    </Badge>
                  </Skeleton>
                  <Button onClick={handleLogout} colorScheme="red" leftIcon={<FaSignOutAlt />}>
                    Log Out
                  </Button>
                </VStack>
              </Flex>
            </Box>
          </ScaleFade>

          <SlideFade in={true} offsetY="20px">
            <Box bg="white" p={8} borderRadius="xl" boxShadow="xl">
              <Flex align="center" mb={6}>
                <Icon as={FaChartPie} w={8} h={8} color="blue.500" mr={4} />
                <Heading as="h2" size="xl" className="text-quaternary">
                  Your Aesthetic Journey
                </Heading>
              </Flex>
              <Divider mb={6} />
              {isLoading ? (
                <SimpleGrid columns={[1, null, 2]} spacing={8}>
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height="200px" />
                  ))}
                </SimpleGrid>
              ) : (
                userData?.quizResults?.length > 0 ? (
                  <SimpleGrid columns={[1, null, 2]} spacing={8}>
                    {userData.quizResults.map((result, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-primary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <Flex justify="space-between" align="center" mb={4}>
                          <Text className="text-tertiary font-semibold">
                            <Icon as={FaCalendarAlt} mr={2} />
                            {new Date(result.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </Text>
                          <Badge colorScheme="green">Quiz #{index + 1}</Badge>
                        </Flex>
                        <AxisGraphic results={result.scores || result.results || {}} />
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text fontSize="lg" className="text-tertiary text-center">No quiz results yet. Take a quiz to see your aesthetic profile!</Text>
                )
              )}
              <Flex justify="center" mt={8}>
                <Link href="/quiz" passHref>
                  <Button
                    as="a"
                    size="lg"
                    colorScheme="yellow"
                    leftIcon={<FaChartPie />}
                    className="font-bold"
                  >
                    Take Another Quiz
                  </Button>
                </Link>
              </Flex>
            </Box>
          </SlideFade>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default Profile;
