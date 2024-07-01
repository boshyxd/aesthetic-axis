import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button, Text, Progress, Card, CardHeader, CardBody, Stack, Grid, GridItem } from "@chakra-ui/react";
import Link from 'next/link';
import { styleDescriptions } from '../data/quizQuestions';
import AxisGraphic from '../components/AxisGraphic';

const Results = () => {
  const router = useRouter();
  const [aesthetics, setAesthetics] = useState([]);
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.scores) {
      const parsedScores = JSON.parse(router.query.scores);
      const total = Object.values(parsedScores).reduce((sum, score) => sum + Math.abs(score), 0);
      
      let percentages;
      if (total === 0) {
        // If all scores are 0, assign equal percentages
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
      
      // Sort percentages in descending order
      percentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
      
      setAesthetics(percentages);
      
      // Create scores object for AxisGraphic
      const graphScores = percentages.reduce((acc, { style, percentage }) => {
        acc[style] = parseFloat(percentage);
        return acc;
      }, {});
      setScores(graphScores);
      
      // Log all percentages
      console.log("All percentages:", percentages);
      
      setIsLoading(false);
    }
  }, [router.query.scores]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="green.700" minHeight="100vh" overflowY="auto" py={8}>
      <VStack spacing={8} width="100%" maxWidth="800px" margin="0 auto" px={4}>
        <Heading as="h1" size="2xl" color="white">
          Your AestheticAxis Results
        </Heading>
        {Object.keys(scores).length > 0 && <AxisGraphic results={scores} />}
        <Stack spacing={4} width="100%">
          {aesthetics.map(({style, percentage}, index) => (
            index === 0 ? (
              <Card 
                key={style} 
                variant="elevated" 
                borderWidth="4px" 
                borderColor="yellow.300"
                mx="auto"
              >
                <CardHeader>
                  <Heading size="lg" color="gray.700">
                    Your Main Aesthetic: {style.charAt(0).toUpperCase() + style.slice(1)}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="gray.600" mb={4}>{styleDescriptions[style]}</Text>
                  <Progress value={parseFloat(percentage)} colorScheme="blue" mb={2} />
                  <Text color="gray.600">Match: {percentage}%</Text>
                </CardBody>
              </Card>
            ) : null
          ))}
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {aesthetics.map(({style, percentage}, index) => (
              index !== 0 && (
                <GridItem key={style}>
                  <Card variant="elevated" borderWidth="1px" borderColor="gray.200">
                    <CardHeader>
                      <Heading size="md" color="gray.700">
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text color="gray.600" mb={4}>{styleDescriptions[style]}</Text>
                      <Progress value={parseFloat(percentage)} colorScheme="blue" mb={2} />
                      <Text color="gray.600">Match: {percentage}%</Text>
                    </CardBody>
                  </Card>
                </GridItem>
              )
            ))}
          </Grid>
        </Stack>
        <Link href="/" passHref>
          <Button as="a" colorScheme="blue" size="lg">
            Back to Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Results;
