import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button, Text } from "@chakra-ui/react";
import ResultCard from '../components/ResultCard';
import Link from 'next/link';
import { styleDescriptions } from '../data/quizQuestions';
import AxisGraphic from '../components/AxisGraphic';

const Results = () => {
  const router = useRouter();
  const [aesthetics, setAesthetics] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    if (router.query.scores) {
      const parsedScores = JSON.parse(router.query.scores);
      const sortedScores = Object.entries(parsedScores)
        .sort(([,a],[,b]) => b-a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      
      const total = Object.values(sortedScores).reduce((sum, score) => sum + score, 0);
      const percentages = Object.entries(sortedScores).map(([style, score]) => ({
        style,
        percentage: ((score / total) * 100).toFixed(2)
      }));

      setAesthetics(percentages);
      setScores(sortedScores); // Store the original scores for AxisGraphic
    }
  }, [router.query.scores]);

  return (
    <Box className="min-h-screen bg-bg-primary p-8">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" className="text-quaternary">
          Your AestheticAxis Results
        </Heading>
        {Object.keys(scores).length > 0 && <AxisGraphic results={scores} />}
        {aesthetics.map(({style, percentage}, index) => (
          <ResultCard 
            key={style}
            aesthetic={style} 
            description={styleDescriptions[style]}
            percentage={percentage}
            isMainResult={index === 0}
          />
        ))}
        <Link href="/">
          <Button className="bg-secondary hover:bg-primary text-quaternary font-bold">
            Back to Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Results;
