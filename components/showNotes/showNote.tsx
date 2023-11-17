"use client";
import React, { useState, useEffect } from "react";
import NoteModal from "../createNoteModal/NoteModal";
import {
  Bs0CircleFill,
  BsCheck,
  BsCheck2,
  BsCheckCircle,
  BsPin,
} from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiUndo,
} from "react-icons/bi";
import { LuClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrRedo } from "react-icons/gr";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import "./notes.css";
import moment from "moment";

type Props = {};

const ShowNote = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = React.useState(false); //toggle create note modal
  const [noteUrlParams, setNoteUrlParams] = React.useState(""); //Send the id of the clicked note
  const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);
  const [trackId, setTrackId] = React.useState("");
  const [openNotifyModal, setOpenNotifyModal] = React.useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setNoteUrlParams(props.note?._id);
    // console.log(props.note?.createdAt, "This is the id");
    setNoteModal(true);
    props.setOverLayBg(true);
  };

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

  // console.log(props.note);

  const pinNote = async (e: any) => {
    e.preventDefault();

    const pinThisNote = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      createdAt: props?.note.createdAt,
    };
    try {
      await axios.post(
        `http://localhost:5000/api/notes/add-pinned`,
        pinThisNote
      );
      contextValue.setPinnedNote(
        [...contextValue?.pinnedNote, pinThisNote].reverse()
      );
      // console.log("Note has been pinned");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const tomorrow = new Date(now);
  //   tomorrow.setDate(now.getDate() + 1);
  //   tomorrow.setHours(8, 0, 0, 0); // Set time to 8 AM

  //   const timeUntilTomorrow8AM = tomorrow.getTime() - now.getTime();

  //   const timeOut = setTimeout(() => {
  //     // Do something after timeUntilTomorrow
  //     tomorrowRemainder();
  //   }, timeUntilTomorrow8AM);

  //   return () => clearTimeout(timeOut); // Cleanup on component unmount
  // }, []);

  const setRemainderTomorrow = async (e: any) => {
    e.preventDefault();

    // Calculate the time until 8 AM tomorrow
    const now = new Date();
    const tomorrow = new Date(now);
    console.log(tomorrow, "This is tomorrow");
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(21, 42, 0, 0); // Set time to 8 AM

    const timeUntilTomorrow8AM = tomorrow.getTime() - now.getTime();
    setTimeout(() => {
      // Do something after timeUntilTomorrow
      tomorrowRemainder();
    }, timeUntilTomorrow8AM);
    // return () => clearTimeout(timeOut);

    // useEffect(() => {
    //   const timeOut = setTimeout(() => {
    //     // Do something after timeUntilTomorrow
    //     tomorrowRemainder();
    //   }, timeUntilTomorrow8AM);
    //   return () => clearTimeout(timeOut);
    // }, []);
    // console.log("Remainder set");
  };

  const tomorrowRemainder = () => {
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      createdAt: new Date(),
    };
    try {
      axios.post(
        "http://localhost:5000/api/notes/set-notification",
        noteRemainder
      );
    } catch (error) {
      console.log(error, "This did not work");
    }
  };

  const setRemainderNextMonday = (e: any) => {
    e.preventDefault();

    // Calculate the time until next Monday at 8 AM
    const now = new Date();
    const daysUntilNextMonday = ((1 - now.getDay() + 7) % 7) + 1; // Calculate days until next Monday
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilNextMonday);
    nextMonday.setHours(8, 0, 0, 0); // Set time to 8 AM

    const timeUntilNextMonday8AM = nextMonday.getTime() - now.getTime();
    setTimeout(() => {
      // Do something after timeUntilNextMonday
      nextMondayRemainder();
    }, timeUntilNextMonday8AM);
    // useEffect(() => {
    //   const timeOut = setTimeout(() => {
    //     // Do something after timeUntilNextMonday
    //     nextMondayRemainder();
    //   }, timeUntilNextMonday8AM);
    //   return () => clearTimeout(timeOut);
    // }, []);
    console.log("It is done");
  };

  const nextMondayRemainder = async () => {
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId,
      pinnedId: props.note?._id,
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      createdAt: new Date(),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/notes/set-notification",
        noteRemainder
      );
    } catch (error) {
      console.log(error, "This did not work");
    }
  };

  // const now = new Date();
  // const tomorrow = new Date(now);
  // console.log(tomorrow, "This is tomorrow");
  // tomorrow.setDate(now.getDate() + 1);
  // tomorrow.setHours(8, 0, 0, 0); // Set time to 8 AM

  // const timeUntilTomorrow8AM = tomorrow.getTime() - now.getTime();
  // console.log(timeUntilTomorrow8AM, "This is timeUntilTomorrow8AM");
  // console.log(moment(timeUntilTomorrow8AM).format("HH"));
  // console.log(new Date(), "New Date");
  // console.log(new Date().toLocaleString(), "Date.LocaleString()");
  // console.log(new Date().toLocaleTimeString(), "Date.toLocaleSTimeString");

  // console.log(new Date().toLocaleDateString(), "Date.toLocaleDateString()");

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
            <p className="text-[16px] whitespace-break-spaces ">
              {props.note?.note.slice(0, 600)}...
            </p>
          </div>
        )}
      </div>
      {showIconsOnHover ? (
        <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
      ) : (
        " "
      )}
      {showIconsOnHover ? (
        <div className="absolute z-10 bottom-[5px] left-0 w-full flex justify-around item-center bg-darkmode ">
          <span className="p-2 rounded-full hover:bg-hover">
            {
              <BiBellPlus
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
                onClick={() => setOpenNotifyModal(!openNotifyModal)}
              />
            }{" "}
          </span>
          {openNotifyModal ? (
            <div
              id="shadow"
              className="absolute bottom-[-200px] left-0 z-30 w-[300px] p-2 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124] "
            >
              <div className="rounded-[20px]  ">
                <p>Remainder: </p>
                <ul>
                  <li
                    onClick={setRemainderTomorrow}
                    className="flex justify-between items-center hover:bg-hover p-2 cursor-pointer "
                  >
                    Tomorrow <span>8am </span>{" "}
                  </li>
                  <li
                    onClick={setRemainderNextMonday}
                    className="flex justify-between items-center hover:bg-hover p-2 cursor-pointer"
                  >
                    Next Week <span>8am </span>{" "}
                  </li>
                  <li className=" flex items-center gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <LuClock /> Pick date and time{" "}
                  </li>
                  <li className="flex gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <IoLocationOutline /> Pick place and time{" "}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
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
        contextValue?.pinnedNote?.some(
          (pinned: any) => pinned.pinnedId === props?.note?._id
        ) ? (
          <button
            disabled
            className="absolute top-[10px] right-[5px] z-10 p-2 text-[#5F6368] border-none outline-none cursor-not-allowed"
          >
            <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />{" "}
          </button>
        ) : (
          <span
            onClick={pinNote}
            className="absolute top-[10px] right-[5px] z-10 p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] cursor-pointer "
          >
            <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
          </span>
        )
      ) : (
        ""
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
