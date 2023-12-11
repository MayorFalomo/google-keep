"use client";
import React, { useState } from "react";
import { BsPin } from "react-icons/bs";
import { GrRedo } from "react-icons/gr";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { IoBrushOutline, IoColorPaletteOutline } from "react-icons/io5";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiUndo,
} from "react-icons/bi";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
type Props = {};

const Notes = (props: Props) => {
  const { contextValue }: any = useAppContext();
  const [noteId, setNoteId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [drawing, setDrawing] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [remainder, setRemainder] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  //generateId
  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  // console.log(contextValue?.currentUser);

  const createNote = async (e: any) => {
    e.preventDefault();
    const newNote = {
      userId: contextValue.user?._id,
      username: contextValue.user?.username,
      _id: generateId(24),
      title,
      note,
      picture,
      drawing,
      bgImage,
      bgColor,
      remainder,
      collaborator,
      label,
      location,
    };
    try {
      await axios.post(
        `https://keep-backend-theta.vercel.app/api/notes/create-note`,
        newNote
      );
      // window.location.replace("/tweets/" + res.data._id)
      contextValue?.setNotes([...contextValue?.notes, newNote].reverse());
      // console.log("Note has been added successfully");
      contextValue.setOpenTextArea(false);
      setTitle("");
      setNote(" ");
      // console.log(tweets);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-red">
      <form onSubmit={createNote} className="flex justify-center">
        {contextValue.openTextArea ? (
          <div className="p-4  rounded-[10px] border-2 border-[#525355] ">
            <div className="flex items-center justify-between ">
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent p-2 text-[22px] font-semibold border-none outline-none"
                placeholder="Title"
              />
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BsPin
                    className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </div>
            <textarea
              onChange={(e) => setNote(e.target.value)}
              className="bg-transparent text-white w-full text-[18px] border-none outline-none resize-none whitespace-break-spaces [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] "
              placeholder="Take a note..."
            />
            <div className="flex item-center gap-6 ">
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
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <IoColorPaletteOutline
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiDotsVerticalRounded
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <GrRedo
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
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
        ) : (
          <div className="flex items-center min-w-[50%] rounded-[10px] border-2 border-[#525355]  ">
            <input
              className="bg-transparent outline-none w-full placeholder:text-[#E9E9E9]  px-4 text-[20px] font-weight: black"
              onClick={() => contextValue.setOpenTextArea(true)}
              type="text"
              placeholder="Take a note..."
            />
            <div className="flex items-center gap-6">
              <span className="p-4 rounded-full hover:bg-hover">
                {
                  <AiOutlineCheckSquare
                    className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-4 rounded-full hover:bg-hover">
                {
                  <IoBrushOutline
                    className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-4 rounded-full hover:bg-hover">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Notes;
