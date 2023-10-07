'use client'
import React, { useState } from 'react'
import {BsPin} from 'react-icons/bs'
type Props = {}

const Notes = (props: Props) => {

  const [openTextArea, setOpenTextArea] = useState(false)


  return (
    <div>
      <form>
        <div>
          <h3>Title </h3>
          <span>{<BsPin /> } </span>
          </div>
        <textarea placeholder='Take a note...' />
        <input type="text" name="note" />
      </form>
    </div>
  )
}

export default Notes