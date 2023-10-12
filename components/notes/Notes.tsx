'use client'
import React, { useState } from 'react'
import {BsPin} from 'react-icons/bs'
import {GrRedo} from 'react-icons/gr'
import {AiOutlineCheckSquare} from 'react-icons/ai'
import { IoBrushOutline, IoColorPaletteOutline } from 'react-icons/io5'
import { BiArchiveIn, BiBellPlus, BiDotsVerticalRounded, BiImageAlt, BiUndo } from 'react-icons/bi'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
type Props = {}

const Notes = (props: Props) => {

  const [openTextArea, setOpenTextArea] = useState(false)


  return (
    <div clsssName='bg-red' >
      <form className='flex justify-center' >
        {openTextArea ? <div className='p-4  rounded-[10px] border-2 border-[#525355] ' >
          <div className='flex items-center justify-between ' >
            <h3>Title </h3>
            <span>{<BsPin  className=' text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  '  cursor='pointer'  />} </span>
          </div>
          <textarea className="bg-transparent text-white w-full border-none outline-none" placeholder='Take a note...' />
          <div className='flex item-center gap-6 ' >
            <span className='p-3 rounded-full hover:bg-hover' >{< BiBellPlus className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{<MdOutlinePersonAddAlt1  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{<IoColorPaletteOutline  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' />} </span>
            <span className='p-3 rounded-full hover:bg-hover' >{< BiImageAlt  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{< BiArchiveIn  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{< BiDotsVerticalRounded  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{< BiUndo  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
            <span className='p-3 rounded-full hover:bg-hover' >{< GrRedo  className=' text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  '  cursor='pointer' /> } </span>
          </div>
          <p className='flex justify-end cursor-pointer ' >Close </p>
        </div> :
          <div className='flex items-center min-w-[50%] p-3 rounded-[10px] border-2 border-[#525355]  ' >
            <input className='bg-transparent outline-none w-full py-3 placeholder:text-[#E9E9E9]  px-4 text-[20px] font-weight: black' onClick={() => setOpenTextArea(true)} type="text" placeholder='Take a note...' />
            <div className='flex items-center gap-6'>
            <span className='p-3 rounded-full hover:bg-hover' >{<AiOutlineCheckSquare className=' text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  '  cursor='pointer'  />} </span>
            <span className='p-3 rounded-full hover:bg-hover' >{<IoBrushOutline className=' text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  '  cursor='pointer'  />} </span>
              <span className='p-3 rounded-full hover:bg-hover' >{<BiImageAlt className=' text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  '  cursor='pointer'  />} </span>
              </div>
            </div>
        }
      </form>
    </div>
  )
}

export default Notes