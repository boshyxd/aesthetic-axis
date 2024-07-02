import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button, Text, Progress, Card, CardHeader, CardBody, Stack, Grid, GridItem, Container, Flex, Spacer } from "@chakra-ui/react";
import Link from 'next/link';
import { styleDescriptions } from '../data/quizQuestions';
import AxisGraphic from '../components/AxisGraphic';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Results = () => {
  const router = useRouter();
  const [aesthetics, setAesthetics] = useState([]);
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (router.query.scores) {
      const parsedScores = JSON.parse(router.query.scores);
      const total = Object.values(parsedScores).reduce((sum, score) => sum + Math.abs(score), 0);
      
      let percentages;
      if (total === 0) {
        const equalPercentage = (100 / Object.keys(parsedScores).length).toFixed(2);
        percentages = Object.keys(parsedScores).map(style => ({
          style,
          percentage: equalPercentage
        }));
      } else {
        percentages = Object.entries(parsedScores).map(([style, score]) => ({
          style,
          percentage: ((Math.abs(score) / total) * 100).toFixed(2)
        }));
      }
      
      percentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
      
      setAesthetics(percentages);
      
      const graphScores = percentages.reduce((acc, { style, percentage }) => {
        acc[style] = parseFloat(percentage);
        return acc;
      }, {});
      setScores(graphScores);
      
      console.log("All percentages:", percentages);
      
      setIsLoading(false);

      // Save results to Firebase
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          quizResults: arrayUnion({
            date: new Date().toISOString(),
            results: graphScores
          })
        }, { merge: true })
        .then(() => {
          console.log("Results saved successfully");
        })
        .catch(error => {
          console.error("Error saving results:", error);
        });
      }
    }
  }, [router.query.scores, user]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const mainResult = aesthetics[0];

  return (
    <Box bg="green.700" minHeight="100vh" overflowY="auto">
      <Navbar />
      <Spacer height="80px" />
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} width="100%" align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading as="h1" size="2xl" color="white" textAlign="center">
              Your AestheticAxis Results
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {Object.keys(scores).length > 0 && <AxisGraphic results={scores} />}
          </MotionBox>

          {/* Main Result Card */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card bg="yellow.100" shadow="xl" borderRadius="lg" borderWidth="2px" borderColor="yellow.400">
              <CardHeader bg="yellow.300" borderTopRadius="lg">
                <Heading size="lg" color="green.700" textAlign="center">Your Top Aesthetic</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Heading size="xl" color="green.700" textAlign="center">
                    {mainResult.style.charAt(0).toUpperCase() + mainResult.style.slice(1)}
                  </Heading>
                  <Text fontSize="lg" textAlign="center">{styleDescriptions[mainResult.style]}</Text>
                  <Progress value={parseFloat(mainResult.percentage)} colorScheme="green" size="lg" />
                  <Text fontWeight="bold" textAlign="center" fontSize="2xl">{mainResult.percentage}%</Text>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>

          <Heading as="h2" size="xl" color="white" textAlign="center" mt={8}>
            Your Aesthetic Breakdown
          </Heading>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
            {aesthetics.slice(1).map(({ style, percentage }, index) => (
              <MotionBox
                key={style}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Card bg="white" shadow="md" borderRadius="lg" height="100%">
                  <CardHeader bg="green.100">
                    <Heading size="md" color="green.700">{style.charAt(0).toUpperCase() + style.slice(1)}</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch" height="100%">
                      <Text flex="1">{styleDescriptions[style]}</Text>
                      <Progress value={parseFloat(percentage)} colorScheme="green" size="sm" />
                      <Text fontWeight="bold" textAlign="right">{percentage}%</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </Grid>

          <Flex justify="center" mt={8}>
            <Link href="/profile" passHref>
              <Button
                as="a"
                colorScheme="yellow"
                size="lg"
                fontWeight="bold"
                _hover={{ bg: "yellow.500" }}
              >
                View Profile
              </Button>
            </Link>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}

export default Results;
