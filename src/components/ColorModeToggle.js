import React from 'react';
import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue('gray.600', 'white');

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      color={iconColor}
      aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
    />
  );
}

export default ColorModeToggle;