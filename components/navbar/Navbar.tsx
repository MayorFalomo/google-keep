import React from 'react'
import {MdLightbulbOutline} from 'react-icons/md'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineLabel} from 'react-icons/md'
import {BiArchiveIn, BiPencil} from 'react-icons/bi'
import { TfiTrash } from 'react-icons/tfi'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='h-[90vh] flex flex-col ' >
      <ul className=' h-full max-[600px]:flex flex-col items-center' >
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<MdLightbulbOutline className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />}  </span>
          <span className='font-[Cinzel]  max-md:hidden' >Notes </span>
        </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<IoMdNotificationsOutline className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />}
          </span>
          <span  className='max-md:hidden' > Remainders</span>
        </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<MdOutlineLabel className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />}  </span>
          <span  className='max-md:hidden' > 7 </span>
        </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<BiPencil className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />} </span>
          <span  className='max-md:hidden' >Edit labels </span>
          </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<BiArchiveIn className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />} </span>
         <span  className='max-md:hidden' >Archive </span>
        </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>{<TfiTrash className='max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl' color='#9AA0A6' cursor='pointer' />} </span>
        <span className='max-md:hidden' >Trash </span>
        </li>
      </ul>
      <p className='max-[850px]:hidden px-4 text-[#9AA0A6] text-[18px] hover:text-white cursor-pointer' > Open-source licenses </p>
    </nav>
  )
}

export default Navbar