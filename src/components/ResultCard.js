import React from 'react';
import { Box, Heading, Text, SimpleGrid, Image, Progress } from "@chakra-ui/react";

const ResultCard = ({ aesthetic, description, percentage, isMainResult }) => {
  return (
    <Box className={`bg-primary p-6 rounded-lg shadow-lg ${isMainResult ? 'border-4 border-secondary' : ''}`}>
      <Heading as="h2" size="xl" className="text-quaternary mb-4">
        {isMainResult ? 'Your Main Aesthetic:' : ''} {aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)}
      </Heading>
      <Text className="text-tertiary mb-6">{description}</Text>
      <Progress value={parseFloat(percentage)} className="mb-4" />
      <Text className="text-tertiary mb-6">Match: {percentage}%</Text>
    </Box>
  );
};

export default ResultCard;