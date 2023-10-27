import Image from 'next/image'
import React from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md'

type Props = {}

const Register = (props: Props) => {
  return (
      <div className='h-[100vh] flex justify-center items-center border-2 border-red-600' >
          <div>
              <Image src='./google.svg' width="100" height="100" alt='Google' />
              <h1>Create a Hi-Notepad account </h1>
              <button>Sign Up With Google</button>
              <form>
                  <input type="text" name="username" placeholder="Username" />
                  <input type="email" name="email" placeholder="Email" />
                  <input type="password" name="confirmPassword" placeholder="Enter Password" />
              <button>Sign Up </button>
              </form>
          </div>
          <ul>
              <li>English (United States)  <span>{<MdOutlineArrowDropDown />} </span> </li>
              <div>
                  <span>Help </span>
                  <span>Privacy </span>
                  <span>Terms </span>
              </div>
          </ul>
    </div>
  )
}

export default Register