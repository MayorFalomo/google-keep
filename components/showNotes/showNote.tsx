"use client";
import React, { useState } from "react";
import NoteModal from "../createNoteModal/NoteModal";
import { BsCheck, BsCheck2, BsCheckCircle, BsPin } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiUndo,
} from "react-icons/bi";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrRedo } from "react-icons/gr";

type Props = {};

const ShowNote = (props: any) => {
  const [noteModal, setNoteModal] = React.useState(false); //toggle create note modal
  const [noteUrlParams, setNoteUrlParams] = React.useState(""); //Send the id of the clicked note
  const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setNoteUrlParams(props.note?._id);
    // console.log(props.note?.createdAt, "This is the id");
    setNoteModal(true);
    props.setOverLayBg(true);
  };

  const pinNote = () => {
    const pinThisNote = {
      id: props.note?._id,
      userId: props.note?.userId,
      title: props.note?.title,
      note: props.note?.note,
      createdAt: props?.note.createdAt,
    };
  };

  return (
    <div
      onMouseOver={() => setShowIconsOnHover(true)}
      onMouseOut={() => setShowIconsOnHover(false)}
      className="mapped"
    >
      <div onClick={handleClick} className="subContainer">
        {props.note.title.length == 0 && props.note.note.length == 0 ? (
          <div className="p-4">
            <input
              className="bg-transparent border-none outline-none "
              placeholder="Empty Note"
            />
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-[20px]">{props.note?.title}</h1>
            <p className="text-[16px]">{props.note?.note.slice(0, 600)}...</p>
          </div>
        )}
      </div>
      {showIconsOnHover ? (
        <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
      ) : (
        " "
      )}
      {showIconsOnHover ? (
        <div className="absolute z-10 bottom-[5px] left-0 w-full flex justify-around item-center ">
          <span className="p-2 rounded-full hover:bg-hover">
            {
              <BiBellPlus
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 ">
            {
              <MdOutlinePersonAddAlt1
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 cursor-pointer ">
            {
              <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 ">
            {
              <BiImageAlt
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover cursor-pointer ">
            {
              <BiArchiveIn
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover cursor-pointer ">
            {
              <BiDotsVerticalRounded
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
        </div>
      ) : (
        ""
      )}
      {showIconsOnHover ? (
        <span
          onClick={pinNote}
          className="absolute top-[10px] right-[5px] z-10 p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] "
        >
          <BsPin
            className="  text-[22px] max-sm:text-[18px] max-md:text-[26px] "
            cursor="pointer"
          />
        </span>
      ) : (
        " "
      )}
      <div className="">
        {noteModal ? (
          <NoteModal
            noteUrlParams={noteUrlParams}
            setNoteModal={setNoteModal}
            noteModal={noteModal}
            setOverLayBg={props.setOverLayBg}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowNote;