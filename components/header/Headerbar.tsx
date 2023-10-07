'use client'
import Image from 'next/image'
import React, {useState} from 'react'
import { FiMenu } from 'react-icons/fi'
import { HiSearch  } from 'react-icons/hi'
import { IoRefreshSharp, IoSettingsOutline } from 'react-icons/io5'
import { CiGrid2H } from 'react-icons/ci'
import { CgMenuGridO } from 'react-icons/cg'
import { LiaTimesSolid } from 'react-icons/lia'


type Props = {}

const Headerbar = (props: Props) => {
  const [activeInput, setActiveInput] = useState(false)
  const [mobileSearchBar, setMobileSearchBar] = useState(false)

  return (
    <nav className="flex justify-between mb-4 p-4 border-2 border-[#525355] border-y-[#525355]"  >
      <div className='flex items-center justify-between gap-16 w-[60%] min-[850px]:  ' >
      <div className='flex items-center gap-2' >
      <span >{<FiMenu className='sm:text-[24px] md:text-3x1 ' cursor='pointer' />} </span>
      <img src='./keep.png' className="max-w-8 max-w-8"  />
        <h1 className='max-lg:text-2xl text-[30px]'> Keep </h1>
      </div>
        <form
          onClick={() => setActiveInput(true)}
          className={activeInput ?
            'max-md:hidden flex items-center bg-white w-full rounded-xl py-2 px-6' :
            'max-md:hidden flex items-center bg-searchbar w-full rounded-xl py-2 px-6 '} >
        <span>{<HiSearch className='sm:text-2xl md:text-3x1 lg:text-3xl' color={activeInput ? "black" : '#fff'} cursor='pointer' />} </span>
          <input
            className={activeInput ?
              'min-p-[2px] p-2 bg-white w-full border-none outline-none placeholder: text-black text-[20px] font-weight: black'
              : 'p-2 bg-searchbar border-none outline-none placeholder: text-white text-[20px] font-weight: black'}
            type='text'
            placeholder='Search' />
          {activeInput ?
            <span>{<LiaTimesSolid  color={activeInput ? "black" : '#fff'} cursor='pointer' />} </span> : ""}
        </form>
        </div>
      <div className=' flex items-center justify-between gap-2 min-w-[15%] ' >
        <div className='flex items-center gap-2 ' >
        <span className='min-[850px]:hidden  ' >{<HiSearch  className=' sm:text-[24px] md:text-[26px] lg:text-3xl ' cursor='pointer' />} </span>
        <span className='p-1 rounded-full hover:bg-hover' >{<IoRefreshSharp className=' text-[#9AA0A6] sm:text-[24px] md:text-[26px] lg:text-3xl ' cursor='pointer' />} </span>
        <span className='p-1 max-[900px]:hidden rounded-full hover:bg-hover' >{<CiGrid2H className=' text-[#9AA0A6] sm:text-[24px]  nav:text-[24px] md:text-[26px] lg:text-3xl '  cursor='pointer' />} </span>
          <span className='p-1 rounded-full hover:bg-hover' >{<IoSettingsOutline  className=' text-[#9AA0A6] sm:text-[24px] nav:text-[24px] md:text-[26px] lg:text-3xl '  cursor='pointer' />} </span>
        </div>
        <div  className='flex items-center gap-2 ' >
          <span className='p-41 rounded-full hover:bg-hover' >{<CgMenuGridO className='sm:text-[24px] md:text-[26px] lg:text-3xl' cursor='pointer' />} </span>
          <Image className='rounded-full' src='/irene.jpg' width="40" height='40' alt='img' />
        </div>
      </div>
    </nav>
  )
}

export default Headerbar