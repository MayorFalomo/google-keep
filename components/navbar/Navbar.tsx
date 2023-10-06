'use client'
import Image from 'next/image'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { HiSearch  } from 'react-icons/hi'
import { IoRefreshSharp, IoSettingsOutline } from 'react-icons/io5'
import { CiGrid2H } from 'react-icons/ci'
import { CgMenuGridO } from 'react-icons/cg'


type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between px-6 py-2 border-2 border-[#525355] border-y-[#525355]"  >
      <div  className='flex items-center gap-16 w-2/4' >
      <div className='flex items-center gap-4' >
      <span>{<FiMenu fontSize='30px' />} </span>
      <Image src='/keep.png' width="100" height='100' alt='img' />
        <h1 className='text-[30px]' >Keep </h1>
      </div>
      <form className='flex items-center bg-searchbar min-w-[80%] w-full rounded-xl py-2 px-6' >
        <span>{<HiSearch fontSize='30px' color='#fff'  />} </span>
        <input className='p-4 bg-searchbar placeholder: text-white text-[20px] ' type='text' placeholder='Search' />
        </form>
        </div>
      <div className='flex items-center gap-6 min-w-[400px] justify-between ' >
        <div  className='flex items-center gap-8 ' >
        <span>{<IoRefreshSharp  fontSize='35px' />} </span>
        <span>{<CiGrid2H   fontSize='35px' />} </span>
          <span>{<IoSettingsOutline  fontSize='30px' />} </span>
        </div>
        <div  className='flex items-center gap-8' >
          <span>{<CgMenuGridO  fontSize='35px' />} </span>
          <Image className='rounded-full' src='/irene.jpg' width="50" height='50' alt='img' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar