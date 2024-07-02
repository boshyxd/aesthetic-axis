import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { FaGoogle, FaGithub } from 'react-icons/fa';

import {
  Box, VStack, Heading, Text, Input, Button, FormControl,
  FormLabel, InputGroup, InputRightElement, Progress,
  useToast, HStack, Icon, Checkbox, Tooltip
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';

const MotionBox = motion(Box);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      console.log("Attempting to create user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", userCredential.user);
      await updateProfile(userCredential.user, { displayName: name });
      console.log("User profile updated successfully");
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
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
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Social registration failed",
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
          Join AestheticAxis
        </Heading>
        <Text fontSize="md" color="gray.600">
          Create your account to start your aesthetic journey
        </Text>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Create a strong password"
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
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </FormControl>
            <HStack width="100%">
              <Checkbox isChecked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}>
                I agree to the Terms and Conditions
              </Checkbox>
              <Tooltip label="Please read our terms and conditions before proceeding" aria-label="Terms and conditions tooltip">
                <Icon as={FaInfoCircle} color="gray.500" />
              </Tooltip>
            </HStack>
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              mt={4}
              isDisabled={!agreeTerms || passwordStrength < 3}
            >
              Create Account
            </Button>
          </VStack>
        </form>
        <Text fontSize="sm" color="gray.500">
          Or register with
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

export default Register;
