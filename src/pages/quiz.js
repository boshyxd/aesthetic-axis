import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, VStack, Button, Flex, Container, Spacer } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import QuizQuestion from '../components/QuizQuestion';
import ProgressBar from '../components/ProgressBar';
import { quizQuestions } from '../data/quizQuestions';
import Navbar from '../components/Navbar';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [sliderValue, setSliderValue] = useState(3);
  const [mountainTops, setMountainTops] = useState([]);
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMountainTops([
      [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
      [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
      [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
      [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
      [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600]
    ]);

    // Animate mountains after a short delay
    setTimeout(() => {
      animateMountainTops(true);
    }, 500);

    const allQuestions = [...Array(quizQuestions.length).keys()];
    const initialQuestionIndex = Math.floor(Math.random() * quizQuestions.length);
    setCurrentQuestion(initialQuestionIndex);
    setAvailableQuestions(allQuestions.filter(index => index !== initialQuestionIndex));
  }, []);

  const animateMountainTops = (isInitial = false) => {
    const animateLayer = (layerIndex) => {
      if (layerIndex >= 5) {
        setIsInitialAnimation(false);
        return; // All layers animated
      }

      setMountainTops(prevTops => 
        prevTops.map((layer, index) => 
          index === layerIndex ? layer.map((_, index) => {
            const minHeight = layerIndex * 100 + 50;
            const maxHeight = minHeight + 100;
            const targetHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
            return 600 - (600 - targetHeight);
          }) : layer
        )
      );

      // Animate next layer after a delay (longer for initial animation)
      setTimeout(() => animateLayer(layerIndex + 1), isInitial ? 500 : 50);
    };

    animateLayer(0); // Start with the first layer
  };

  const getRandomQuestion = () => {
    if (answeredQuestions + 1 >= quizQuestions.length) {
      // All questions have been answered
      router.push({
        pathname: '/results',
        query: { scores: JSON.stringify(scores) },
      });
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = availableQuestions[randomIndex];

    // Remove the selected question from available questions
    setAvailableQuestions(prevQuestions => 
      prevQuestions.filter((_, index) => index !== randomIndex)
    );

    return questionIndex;
  };

  const handleAnswer = (value) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      Object.entries(quizQuestions[currentQuestion].styles).forEach(([style, weight]) => {
        const scoreToAdd = value === 3 ? 0 : (value - 3) * weight;
        newScores[style] = (newScores[style] || 0) + scoreToAdd;
      });
      return newScores;
    });
  
    setAnsweredQuestions(prev => prev + 1);

    const nextQuestion = getRandomQuestion();
    if (nextQuestion !== null) {
      setCurrentQuestion(nextQuestion);
      animateMountainTops(false);
    }
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const generateSVGPath = (tops) => {
    const width = 900;
    const segments = tops.length - 1;
    const segmentWidth = width / segments;
    
    let path = `M0 ${tops[0]}`;
    tops.forEach((top, index) => {
      if (index > 0) {
        path += `L${index * segmentWidth} ${top}`;
      }
    });
    path += `L900 ${tops[tops.length - 1]}L900 600L0 600Z`;
    return path;
  };

  const colors = ['#38a169', '#2f855a', '#276749', '#1e4e3a', '#15352b'];

  return (
    <>
      <Navbar />
      <MotionBox 
        className="bg-bg-primary min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0"
        >
          <svg id="visual" viewBox="0 0 900 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            {mountainTops.map((layer, index) => (
              <motion.path
                key={index}
                d={generateSVGPath(layer)}
                fill={colors[index]}
                initial={{ d: generateSVGPath(new Array(12).fill(600)) }}
                animate={{ d: generateSVGPath(layer) }}
                transition={{ 
                  duration: isInitialAnimation ? 1.5 : 0.5, 
                  ease: "easeOut", 
                  delay: isInitialAnimation ? index * 0.5 : 0 
                }}
              />
            ))}
          </svg>
        </Box>
        <Container maxW="4xl" height="calc(100vh - 64px)" display="flex" flexDirection="column" position="relative" zIndex="1">
          <Spacer minHeight="22vh" />
          <VStack spacing={12} align="flex">
            <Heading as="h1" size="2xl" className="text-quaternary text-center" textAlign="center">
              AestheticAxis Quiz
            </Heading>
            <ProgressBar current={answeredQuestions + 1} total={quizQuestions.length} />
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
    </>
  );
}

export default Quiz;