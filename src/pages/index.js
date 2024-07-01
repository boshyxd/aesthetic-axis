import { Box, Text, VStack, Heading, Flex, Link, Container, Button, UnorderedList, ListItem, Icon } from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar';
import { FaClock, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false })
const IconCloud = dynamic(() => import('../components/magicui/icon-cloud'), { ssr: false })

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "chakraui",
  "tailwindcss",
];

function IconCloudDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Box minHeight="100vh" bg="bg-primary" py={16}>
          <VStack spacing={8} align="center">
            <Heading
              as="h2"
              fontSize="4xl"
              color="white"
              textAlign="center"
              fontWeight="bold"
              letterSpacing="wide"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
            >
              Modern Web Technologies
            </Heading>
            <Text fontSize="xl" textAlign="center" maxWidth="800px" color="white" fontWeight="medium">
              AestheticAxis is built using a powerful stack of cutting-edge technologies, 
              ensuring a smooth, responsive, and visually appealing experience for our users.
            </Text>
            <IconCloudDemo />
          </VStack>
        </Box>
        <Box as="section" py={20} bg="bg-primary">
          <Container maxW="6xl" px={[4, 10, 20, 16]}>
            <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
              <Box w={["full", "full", "2/3"]} px={3}>
                <Box maxW="lg" mx="auto">
                  <Heading as="h2" mb={4} fontSize={["3xl", "4xl"]} fontWeight="bold" lineHeight="tight" color="white">
                    Discover Your Style with Ease!
                  </Heading>
                  <Text mb={4} fontWeight="medium" color="gray.100">
                    AestheticAxis provides you with all the tools you need to explore and define your unique aesthetic. Our features include:
                  </Text>
                  <UnorderedList spacing={3} styleType="none">
                    <ListItem display="flex" alignItems="center">
                      <Icon as={FaClock} w={8} h={8} color="yellow.300" mr={4} />
                      <Text fontWeight="medium" color="white">Quick and Engaging Style Quiz</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Icon as={FaChartLine} w={8} h={8} color="yellow.300" mr={4} />
                      <Text fontWeight="medium" color="white">Detailed Style Analysis and Results</Text>
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <Icon as={FaShieldAlt} w={8} h={8} color="yellow.300" mr={4} />
                      <Text fontWeight="medium" color="white">Personalized Style Recommendations</Text>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
            </Flex>
          </Container>
        </Box>
      </main>
      <Box as="footer" bg="white" color="gray.700" py={8}>
        <Container maxW="7xl">
          <Flex flexDirection={["column", "row"]} alignItems="center" justifyContent="space-between">
            <Box flex="1" textAlign={["center", "left"]}>
              <Link href="#" fontSize="xl" fontWeight="black" color="white">
                AestheticAxis<Text as="span" color="yellow.300">.</Text>
              </Link>
            </Box>
            <Box flex="1" textAlign="center" my={[4, 0]}>
              <Text fontSize="sm" color="gray.300">
                &copy; 2023 AestheticAxis - Find Your Style
              </Text>
            </Box>
            <Box flex="1" display="flex" justifyContent={["center", "flex-end"]}>
              <Link 
                href="https://github.com/boshyxd/aesthetic-axis" 
                target="_blank" 
                rel="noopener noreferrer"
                color="gray.300" 
                _hover={{ color: "white" }}
              >
                <Box as="svg" w={6} h={6} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </Box>
              </Link>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
