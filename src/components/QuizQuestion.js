import React from 'react';
import { Box, Text, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex } from "@chakra-ui/react";

const QuizQuestion = ({ question, onSliderChange }) => {
  return (
    <Box className="w-full max-w-2xl mx-auto bg-bg-secondary rounded-lg shadow-lg p-8">
      <Text fontSize="2xl" className="text-quaternary mb-8 font-semibold text-center">
        {question}
      </Text>
      <VStack spacing={8} align="stretch">
        <Slider 
          defaultValue={3} 
          min={1} 
          max={5} 
          step={0.1} 
          onChangeEnd={onSliderChange} 
          colorScheme="yellow"
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack bg="yellow.400" />
          </SliderTrack>
          <SliderThumb boxSize={6} bg="yellow.500" />
        </Slider>
        <Flex justify="space-between" className="text-sm">
          <Text className="text-tertiary font-medium">Strongly Disagree</Text>
          <Text className="text-tertiary font-medium">Strongly Agree</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default QuizQuestion;