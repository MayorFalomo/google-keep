"use client";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiUndo,
} from "react-icons/bi";
import { BsPin } from "react-icons/bs";
import { GrRedo } from "react-icons/gr";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

type Props = {};

const NoteModal = (props: any) => {
  const [singleNote, setSingleNote] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/${props.noteUrlParams}`)
      .then((res) => setSingleNote(res.data))
      .catch((err) => console.log(err));
  }, [props.noteUrlParams]);
  // console.log(singleNote);

  const handleEditNote = (e: any) => {
    e.preventDefault();
    props.setNoteModal(false);
    props.setOverLayBg(false);
  };

  return (
    <div className="bg-darkmode fixed z-20 min-h-[200px] h-auto max-h-[300px] w-1/2 m-auto inset-x-0 inset-y-0 rounded-[10px] border-2 border-[#5F6368] p-[8px]">
      <div className="h-[100%]">
        <form className="h-full " onSubmit={handleEditNote}>
          <div className="flex items-center">
            <input
              className="w-full bg-transparent p-2 text-[22px] font-semibold border-none outline-none"
              type="text"
              defaultValue={singleNote?.title || editTitle}
              placeholder="Title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <span className="p-3 rounded-full hover:bg-hover">
              {
                <BsPin
                  className=" text-[#9AA0A6] text-[24px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </div>
          <div className=" h-[50%]">
            <textarea
              className="bg-transparent text-white h-full w-full text-[16px] outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              // className="bg-darkmode w-full "
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
            />
          </div>
          <p className="flex justify-end m-2 ">
            Edited {moment().format("MMMM do")}{" "}
          </p>
          <div className="flex justify-between item-center gap-4 ">
            <div className="flex item-center gap-4 ">
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiBellPlus
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <MdOutlinePersonAddAlt1
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <IoColorPaletteOutline
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiDotsVerticalRounded
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <GrRedo
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[22px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </div>

            <div className=" flex justify-end">
              <button
                type="submit"
                // onClick={() => }
                className="cursor-pointer "
              >
                Close{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
