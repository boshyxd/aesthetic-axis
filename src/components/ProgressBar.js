import React from 'react';
import { Box, Progress, Text } from "@chakra-ui/react";

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <Box className="w-full max-w-2xl mx-auto mb-8">
      <Progress value={progress} colorScheme="yellow" height="4px" borderRadius="full" />
      <Text className="text-tertiary text-right mt-2 font-medium">
        Question {current} of {total}
      </Text>
    </Box>
  );
}

export default ProgressBar;
