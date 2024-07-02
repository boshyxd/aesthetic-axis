import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Register from '../components/Register';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
  const [starShadows, setStarShadows] = useState({
    small: '',
    medium: '',
    big: ''
  });

  useEffect(() => {
    const generateShadows = (n) => {
      return Array.from({ length: n }, () => {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        return `${x}px ${y}px rgba(255, 255, 255, 0.8)`; // Slightly transparent white
      }).join(', ');
    };

    setStarShadows({
      small: generateShadows(700),
      medium: generateShadows(200),
      big: generateShadows(100)
    });
  }, []);

  return (
    <Box
      minHeight="100vh"
      background="linear-gradient(to bottom, #38A169, #276749)" // Green gradient
      overflow="hidden"
      position="relative"
    >
      <style jsx global>{`
        :root {
          --star-shadows-small: ${starShadows.small};
          --star-shadows-medium: ${starShadows.medium};
          --star-shadows-big: ${starShadows.big};
        }
      `}</style>
      <Navbar />
      <Box pt={20} position="relative" zIndex={1}>
        <Register />
      </Box>
      <div id="stars" className="stars"></div>
      <div id="stars2" className="stars"></div>
      <div id="stars3" className="stars"></div>
    </Box>
  );
};

export default RegisterPage;
