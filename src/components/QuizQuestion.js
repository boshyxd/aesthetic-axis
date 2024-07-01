import React from 'react';
import { Box, Text, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex } from "@chakra-ui/react";

const QuizQuestion = ({ question, onSliderChange }) => {
  return (
    <Box className="w-full max-w-2xl mx-auto">
      <Text fontSize="2xl" className="text-quaternary mb-8 font-semibold text-center">
        {question}
      </Text>
      <VStack spacing={6} align="stretch">
        <Slider defaultValue={3} min={1} max={5} step={0.1} onChangeEnd={onSliderChange} colorScheme="yellow">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Flex justify="space-between" className="text-sm">
          <Text className="text-tertiary">Strongly Disagree</Text>
          <Text className="text-tertiary">Strongly Agree</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default QuizQuestion;
