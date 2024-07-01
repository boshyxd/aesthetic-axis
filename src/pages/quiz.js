import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import QuizQuestion from '../components/QuizQuestion';
import ProgressBar from '../components/ProgressBar';
import { quizQuestions } from '../data/quizQuestions';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [sliderValue, setSliderValue] = useState(3);
  const router = useRouter();

  const handleAnswer = (value) => {
    console.log(value)
    setScores(prevScores => {
      const newScores = { ...prevScores };
      Object.entries(quizQuestions[currentQuestion].styles).forEach(([style, weight]) => {
        newScores[style] = (newScores[style] || 0) + (value * weight);
      });
      return newScores;
    });

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz finished, navigate to results page
      router.push({
        pathname: '/results',
        query: { scores: JSON.stringify(scores) },
      });
    }
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <Box className="min-h-screen bg-bg-primary p-8">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" className="text-quaternary">
          AestheticAxis Quiz
        </Heading>
        <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
        <QuizQuestion
          question={quizQuestions[currentQuestion].question}
          onSliderChange={handleSliderChange}
        />
        <Button
          onClick={() => handleAnswer(sliderValue)}
          className="bg-secondary hover:bg-primary text-quaternary font-bold"
        >
          Answer Question
        </Button>
        <Button 
          onClick={() => handleAnswer(3)} 
          className="bg-secondary hover:bg-primary text-quaternary font-bold"
        >
          Skip Question
        </Button>
      </VStack>
    </Box>
  );
}

export default Quiz;
