import Image from 'next/image'
import Homepage from './pages/home/page'
import Head from 'next/head'
import Navbar from '@/components/navbar/Navbar'
import Notes from '@/components/notes/Notes'
import style from './Home.module.css'
import Headerbar from '@/components/header/Headerbar'


export default function Home() {
  return (
    <div  >
      <Headerbar />
      <div className={style.container} >
      <Navbar />
      <Notes/>
      </div>
      </div>
  )
}