import Image from 'next/image'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineArrowDropDown } from 'react-icons/md'

type Props = {}

const Login = (props: Props) => {
  return (
     <div className='bg-white border-2 border-blue-600 text-black h-[100vh] flex justify-center items-center' >
          <div className='flex flex-col justify-between items-center w-[650px] h-[90%]' >
              <div  className='border-2 border-black-200 rounded-xl p-8 mt-2 flex flex-col justify-end mx-[auto] gap-6 w-[90%] ' >
              <div  className='flex flex-col items-center gap-3' >
                  <Image className='flex justify-center m-auto' src='./google.svg' width="120" height="120" alt='Google' />
              <h1 className='text-[25px] text-center' >Create a Hi-Notepad account </h1>
              <button className='w-[60%] text-[22px] border-2 border-black-500 rounded-[35px] flex justify-center gap-2 p-4' >{<FcGoogle size={30}  />} Sign in With Google</button>
              </div>
                      <form className='flex flex-col items-end gap-4' >
                  <input  className='p-4 w-full  rounded-[6px] border-2 border-black-500 placeholder:px-3' type="email" name="email" placeholder="Email" />
                  <input  className='p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3' type="password" name="confirmPassword" placeholder="Enter Password" />
              <button className='border-2 border-blue-600 mt-6 p-3 w-1/4  bg-[#1B66C9] rounded-[8px] text-[18px] text-white' >Sign In </button>
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

export default Login