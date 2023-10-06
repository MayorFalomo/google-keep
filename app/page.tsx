import Image from 'next/image'
import Homepage from './home/page'
import Head from 'next/head'

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/keep.png"></link>
        <meta name="theme-color" content="#202124" />
      </Head>
    </main>
  )
}
