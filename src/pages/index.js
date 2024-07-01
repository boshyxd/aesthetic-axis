import Head from 'next/head'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

export default function Home() {
  return (
    <>
      <main>
        <Hero />
      </main>
    </>
  )
}