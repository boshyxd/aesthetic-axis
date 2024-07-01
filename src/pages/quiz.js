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
            <svg id="visual" viewBox="0 0 900 600" preserveAspectRatio="none" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
              <path d="M0 181L82 139L164 259L245 115L327 181L409 145L491 121L573 193L655 79L736 247L818 217L900 151L900 0L818 0L736 0L655 0L573 0L491 0L409 0L327 0L245 0L164 0L82 0L0 0Z" fill="#38a169"></path>
              <path d="M0 313L82 289L164 349L245 313L327 319L409 271L491 295L573 343L655 265L736 433L818 337L900 355L900 149L818 215L736 245L655 77L573 191L491 119L409 143L327 179L245 113L164 257L82 137L0 179Z" fill="#2f855a"></path>
              <path d="M0 415L82 379L164 445L245 421L327 427L409 391L491 391L573 475L655 373L736 481L818 427L900 427L900 353L818 335L736 431L655 263L573 341L491 293L409 269L327 317L245 311L164 347L82 287L0 311Z" fill="#276749"></path>
              <path d="M0 517L82 505L164 499L245 535L327 511L409 529L491 547L573 553L655 505L736 559L818 547L900 523L900 425L818 425L736 479L655 371L573 473L491 389L409 389L327 425L245 419L164 443L82 377L0 413Z" fill="#1e4e3a"></path>
              <path d="M0 601L82 601L164 601L245 601L327 601L409 601L491 601L573 601L655 601L736 601L818 601L900 601L900 521L818 545L736 557L655 503L573 551L491 545L409 527L327 509L245 533L164 497L82 503L0 515Z" fill="#15352b"></path>
            </svg>
          `,
        }}
      />
      <Container maxW="4xl" height="50vh" display="flex" flexDirection="column" position="relative" zIndex="1">
        <Spacer minHeight="22vh" />
        <VStack spacing={12} align="flex">
          <Heading as="h1" size="2xl" className="text-quaternary text-center" textAlign="center">
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
