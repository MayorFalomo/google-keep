"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { FcGoogle} from 'react-icons/fc'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import {  AppContext, useAppContext } from '@/helpers/Helpers'
import { auth, provider } from "../../firebase.config";
import { useRouter } from 'next/navigation'

type Props = {
}

const Register = (props: Props) => {

  const { contextValue }:any = useAppContext()
  
  const router = useRouter()
  // const {getCurrentUser} = useContext(AppContextProvider)
  const [email, setEmail] = useState<string>("")
  const [userNames, setUserName] = useState<string>("")
  const [passwords, setPasswords] = useState<string>("")
  const [cookies, setCookie] = useCookies(["user"])
  const [name, setName] = useState("")
  // const [isAuth, setIsAuth] = useState<boolean>(false)

  // Sign Up With Google
  const signUpWithGoogle = async () => {
    try{
    signInWithPopup(auth, provider).then((res) => {
      setCookie("user", res.user.uid, { path: "/" })            
      let userInfo = {
        userId: res.user.uid,
        username: res.user.displayName,
        password: "12345",
        email: res.user.email,
        profilePic: res.user.photoURL == null || "" ? "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg" : res.user.photoURL ,
        notifications: [],
        // bio: "Regular Human",
        // location: "Lagos, Nigeria",
        // links: "https://mayowa-falomo.netlify.app"
      }
      // console.log(userInfo);
      axios.post("http://localhost:5000/api/users/register", userInfo)
        .then(() => router.push("/"))
        .then(() => window.location.reload())
        .then(() => console.log(userInfo))
        .catch((err) => console.log(err)
      )
      contextValue?.getCurrentUser(res.user.uid)
      // console.log(userInfo);
    })
    } catch (err) {
      console.log("Sign up with Google error:", err) 
    }
  }
  

//Sign up by creating account
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, passwords).then((res) => {
      setCookie("user", res.user.uid, { path: "/" })
      
      const userInfo = {
        // id: res.user.uid,
        username: userNames,
        email: email,
        password: passwords,
        profileDp: "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg",
        notifications: [],
        bio: "Regular Human",
        // location: "Lagos, Nigeria",
        // birthday: "April 19th, 1999",
        // links: "https://mayowa-falomo.netlify.app"
      }
     
      axios.post("http://localhost:5000/api/users/register", userInfo)
        .then(() => router.push("/"))
        .then(() => window.location.reload())
        .catch((err) => err && contextValue.setIsAuth(true))
      // getCurrentUser(res.user.uid)
    }).catch((err) => console.log(err))
  }

  const getRandomEmail = () => {
    if (name.length > 0) {
      setEmail(name + "@fake.com")
    } else {
      axios.get("https://random-word-api.herokuapp.com/word")
        .then((res) => setEmail(res.data[0] + "@fake.com"))
        .catch((err) => console.log(err))
    }
  }

  const getRandomName = () => {
    if (email.includes("@fake.com")) {
      setUserName(email.split("@")[0])
    } else {
      axios.get("https://random-word-api.herokuapp.com/word")
        .then((res) => setUserName(res.data[0]))
        .catch((err) => console.log(err))
    }
  };

  
  const getRandomPassword = () => {
    let passNum = ""
    let passChar = ""

    for (let i = 0; i < 10; i++) {
      passNum += Math.floor(Math.random() * 10)
    }
    for (let i = 0; i < 10; i++) {
      passChar += String.fromCharCode(Math.floor(Math.random() * 28) + 98)
    }

    let result = Array.from(passNum.length > passChar.length ? passNum : passChar,
      (_, i) => (passNum[i] || "") + (passChar[i] || "")).join("")
    return result;
  }
   
   
 

  return (
      <div className='bg-white border-2 border-blue-600 text-black h-[100vh] flex justify-center items-center' >
          <div className='flex flex-col justify-between items-center w-[650px] h-[90%]' >
              <div  className='border-2 border-black-200 rounded-xl p-8 mt-2 flex flex-col justify-end mx-[auto] gap-6 w-[90%] ' >
              <div  className='flex flex-col items-center gap-3' >
                  <Image className='flex justify-center m-auto' src='./google.svg' width="120" height="120" alt='Google' />
              <h1 className='text-[25px] text-center' >Create a Hi-Notepad account </h1>
              <button onClick={signUpWithGoogle} className='w-[60%] text-[22px] border-2 border-black-500 rounded-[35px] flex justify-center gap-2 p-4' >{<FcGoogle size={30}  />} Sign Up With Google</button>
              </div>
                      <form className='flex flex-col items-end gap-4' >
                  <input className='p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3' type="text" name="username" placeholder="Username" />
                  <input  className='p-4 w-full  rounded-[6px] border-2 border-black-500 placeholder:px-3' type="email" name="email" placeholder="Email" />
                  <input  className='p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3' type="password" name="confirmPassword" placeholder="Enter Password" />
              <button className='border-2 border-blue-600 mt-6 p-3 w-1/4  bg-[#1B66C9] rounded-[8px] text-[18px] text-white' >Sign Up </button>
              </form>
                  </div>
          <div className=' w-[90%]' >
          <ul className='flex items-start justify-between w-full' >
              <li className='flex items-center gap-8' >English (United States)  <span>{<MdOutlineArrowDropDown />} </span> </li>
              <div className='flex items-center gap-4'>
                  <span>Help </span>
                  <span>Privacy </span>
                  <span>Terms </span>
                  </div>
              </ul>
              </div>
              </div>
    </div>
  )
}

export default Register