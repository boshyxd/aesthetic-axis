import React, { useState } from 'react';
import { 
  Box, VStack, Heading, Text, Input, Button, FormControl, 
  FormLabel, InputGroup, InputRightElement, Progress, 
  useToast, Divider, HStack, Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';

const MotionBox = motion(Box);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { user } = useAuth();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      let authProvider;
      switch (provider) {
        case 'google':
          authProvider = new GoogleAuthProvider();
          break;
        case 'github':
          authProvider = new GithubAuthProvider();
          break;
        default:
          throw new Error('Invalid provider');
      }
      await signInWithPopup(auth, authProvider);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Social login failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth="400px"
      margin="auto"
      padding="6"
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
    >
      <VStack spacing={6}>
        <Heading as="h1" size="xl" color="green.500">
          Welcome Back
        </Heading>
        <Text fontSize="md" color="gray.600">
          Sign in to continue your aesthetic journey
        </Text>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {password && (
              <Progress
                value={passwordStrength * 20}
                colorScheme={passwordStrength < 3 ? "red" : passwordStrength < 4 ? "yellow" : "green"}
                size="sm"
                width="100%"
              />
            )}
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              mt={4}
            >
              Sign In
            </Button>
          </VStack>
        </form>
        <Divider />
        <Text fontSize="sm" color="gray.500">
          Or continue with
        </Text>
        <HStack spacing={4}>
          <Button onClick={() => handleSocialLogin('google')} leftIcon={<FaGoogle />} colorScheme="red" variant="outline">
            Google
          </Button>
          <Button onClick={() => handleSocialLogin('github')} leftIcon={<FaGithub />} colorScheme="gray" variant="outline">
            GitHub
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default Login;
