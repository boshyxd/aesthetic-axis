import React from 'react';
import { Box, Text, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

const QuizQuestion = ({ question, onSliderChange }) => {
  return (
    <Box className="w-full max-w-2xl mx-auto">
      <Text fontSize="xl" className="text-quaternary mb-6">
        {question}
      </Text>
      <VStack spacing={4} align="stretch">
        <Text className="text-tertiary">Strongly Disagree</Text>
        <Slider defaultValue={3} min={1} max={5} step={0.1} onChangeEnd={onSliderChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text className="text-tertiary text-right">Strongly Agree</Text>
      </VStack>
    </Box>
  );
};

export default QuizQuestion;
