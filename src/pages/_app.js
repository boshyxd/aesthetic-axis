import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import theme from "../theme";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
        <title>AestheticAxis</title>
        <meta name="description" content="AestheticAxis - Find Your Style" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href={`${router.basePath}/images/favicon.ico`} />
      </Head>
      {mounted && <Component {...pageProps} />}
    </ChakraProvider>
  )
}

export default MyApp