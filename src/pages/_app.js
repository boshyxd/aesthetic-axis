import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'
import Head from 'next/head'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'green.700',
        color: 'white',
      },
    },
  },
  colors: {
    green: {
      700: '#b8d8be', // Dark green background
    },
    yellow: {
      400: '#1F51FF', // Lamp color
    },
    gray: {
      700: '#374151', // Button hover color
      800: '#1f2937', // Button color
      900: '#111827', // Button text color

    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>AestheticAxis</title>
        <meta name="description" content="Find your unique aesthetic through our interactive quiz" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp