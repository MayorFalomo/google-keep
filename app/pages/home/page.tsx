import Image from 'next/image'
import Homepage from './page'
import Head from 'next/head'
import Navbar from '@/components/navbar/Navbar'
import Notes from '@/components/notes/Notes'
import style from './Home.module.css'


export default function Home() {
  return (
    <div className={style.container} >
      <Navbar />
      <Notes/>
    </div>
  )
}
