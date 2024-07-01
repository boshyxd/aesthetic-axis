import Head from 'next/head'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>AestheticAxis</title>
        <meta name="description" content="Find your unique aesthetic through our interactive quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
      </main>
    </>
  )
}