import Image from 'next/image'
import Homepage from './pages/home/page'
import Head from 'next/head'
import Navbar from '@/components/navbar/Navbar'
import Notes from '@/components/notes/Notes'
import style from './Home.module.css'
import Headerbar from '@/components/header/Headerbar'


export default function Home() {

//    const getCurrentUser = async(id: string) => {
//  await fetch(`https://twitter-clone-server-nu.vercel.app/api/users/${id}`)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("User ID not found");
//       }
//     })
//    .then((res) => {
//       setUser(res.user);
//     })
//     .catch((err) => {
//       console.log(err);
//       router.push("/login"); // Redirect to login page if user ID is not found
//     });
  // };
  
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