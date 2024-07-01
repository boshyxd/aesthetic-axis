import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button, Flex, Container, Spacer } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import QuizQuestion from '../components/QuizQuestion';
import ProgressBar from '../components/ProgressBar';
import { quizQuestions } from '../data/quizQuestions';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

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
    <MotionBox 
      className="bg-bg-primary min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="0"
        dangerouslySetInnerHTML={{
          __html: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style="width: 100%; height: 100%;">
              <path fill="#a3c9a8" fill-opacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="#97c1a9" fill-opacity="0.5" d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,245.3C960,267,1056,277,1152,266.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="#8ab9aa" fill-opacity="0.5" d="M0,288L48,277.3C96,267,192,245,288,234.7C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          `,
        }}
      />

      <Container maxW="4xl" height="50vh" display="flex" flexDirection="column" position="relative" zIndex="1">
        <Spacer minHeight="16vh" />
        <VStack spacing={12} align="flex">
          <Heading as="h1" size="2xl" className="text-quaternary text-center">
            AestheticAxis Quiz
          </Heading>
          <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <QuizQuestion
                question={quizQuestions[currentQuestion].question}
                onSliderChange={handleSliderChange}
              />
            </MotionBox>
          </AnimatePresence>
          <Flex justify="center" gap={4}>
            <MotionButton
              onClick={() => handleAnswer(sliderValue)}
              className="bg-secondary hover:bg-primary text-quaternary font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Answer Question
            </MotionButton>
            <MotionButton 
              onClick={() => handleAnswer(3)} 
              className="bg-secondary hover:bg-primary text-quaternary font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip Question
            </MotionButton>
          </Flex>
        </VStack>
        <Spacer />
      </Container>
    </MotionBox>
  );
}

export default Quiz;
