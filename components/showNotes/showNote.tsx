"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import {
  IoArrowBackSharp,
  IoCloseOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrRedo } from "react-icons/gr";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import "./notes.css";
import moment from "moment";
import PickDate from "../pickdateandtime/PickDate";
import Select from "react-select";
import countryList from "react-select-country-list";

type Props = {};

const ShowNote = (props: any) => {
  const { contextValue }: any = useAppContext();

  // const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  // const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
  //   false
  // );
  const [trackId, setTrackId] = React.useState<string>("");
  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []);
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [closeIconState, setCloseIconState] = useState(false);

  const changeHandler = (countryValue: any) => {
    setCountryValue(countryValue);
  };

  // console.log(countryValue, "This is country Value");

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setNoteUrlParams(props.note?._id);
    // console.log(props.note?.createdAt, "This is the id");
    props?.setNoteModal(true);
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
      location: props.note?.location,
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

  const tomorrowRemainder = (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
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
      location: props.note?.location,
      createdAt: new Date(),
    };
    // console.log(noteRemainder);

    try {
      axios.post(
        "http://localhost:5000/api/notes/set-notification/tomorrow",
        noteRemainder
      );
    } catch (error) {
      console.log(error, "This did not work");
    }
    setOpenNotifyModal(false);
  };

  const nextMondayRemainder = async (e: any) => {
    e.preventDefault();
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
      location: props.note?.location,
      createdAt: new Date(),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/notes/set-notification/next-week",
        noteRemainder
      );
    } catch (error) {
      console.log(error, "This did not work");
    }
    setOpenNotifyModal(false);
  };

  const CustomStyle = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#444547" : "#202124",
    }),
    menuList: (base: any) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#444547",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "red",
      },
    }),
  };

  const setLocation = (e: any) => {
    e.preventDefault();
    const country = {
      _id: props.note?._id,
      userId: props.note?.userId,
      note: props.note?.note,
      title: props.note?.title,
      picture: props.note?.picture,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note.collaborator,
      label: props.note?.label,
      location:
        countryValue?.label.length > 1
          ? countryValue.label
          : props.note?.location,
    };
    try {
      axios.put(
        `http://localhost:5000/api/notes/update-note/${props.note?._id}`,
        country
      );
      contextValue?.setNotes((prevState: any) => [
        { ...prevState, ...country },
      ]);
    } catch (err) {
      console.log(err);
    }
    setPickALocation(false);
  };

  const removeLocation = async (e: any) => {
    e.preventDefault();
    props?.setNoteModal(false);

    const noteId = props.note?._id;

    try {
      props?.setNoteModal(false);
      await axios.put(
        `http://localhost:5000/api/notes/delete-country/${noteId}`
      );
      console.log(noteId, "This is noteId");

      contextValue?.setNotes((prevNotes: any) => {
        const updatedNotes = prevNotes.map((note: any) => {
          if (note._id == noteId) {
            console.log(note?._id, "Same thing");

            // Update the location to an empty string for the specific note
            return { ...note, location: " " };
          }
          return note;
        });
        return updatedNotes;
      });
      // contextValue?.setNotes((prevNotes: any) => [
      //   { ...prevNotes, location: " " },
      // ]);
      setPickALocation(false);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(props.note, "show note");

  // console.log(countryValue?.label, "Country Value");
  // console.log(props.noteModal, "This is noteModal");
  // console.log(closeIconState, "This is closeIconState");

  return (
    <div className="mapped">
      <div onClick={handleClick} className="subContainer">
        {props.note?.title?.length == 0 && props.note?.note?.length == 0 ? (
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
              {props.note?.note?.slice(0, 600)}...
            </p>
            {props.note?.location?.length > 1 ? (
              <form onSubmit={removeLocation}>
                <p
                  onMouseOver={() => {
                    setCloseIcon(true);
                  }}
                  onMouseLeave={() => setCloseIcon(false)}
                  className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                >
                  <IoLocationOutline />
                  {props.note?.location}{" "}
                  <button
                    type="submit"
                    // onMouseEnter={() => setCloseIconState(true)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    // style={{ cursor: "pointer" }}
                    className="outline-none border-none cursor-pointer p-1 rounded-full hover:bg-lighterHover "
                  >
                    {closeIcon ? <IoCloseOutline /> : ""}{" "}
                  </button>
                </p>
              </form>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {props?.showIconsOnHover ? (
        <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
      ) : (
        " "
      )}
      {props?.showIconsOnHover ? (
        <div className="absolute z-10 bottom-[5px] left-0 w-full flex justify-around item-center bg-darkmode ">
          <span className="p-2 rounded-full hover:bg-[#313236]r">
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
              className="convex"
              // className="absolute bottom-[-200px] left-0 z-30 w-[300px] p-2 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124] "
            >
              <div className="rounded-[20px]  ">
                <p>Remainder: </p>
                <ul>
                  <li
                    onClick={tomorrowRemainder}
                    className="flex justify-between items-center hover:bg-lighterHover p-2 cursor-pointer "
                  >
                    Later Today <span>8:00 PM </span>{" "}
                  </li>
                  <li
                    onClick={tomorrowRemainder}
                    className="flex justify-between items-center hover:bg-lighterHover  p-2 cursor-pointer "
                  >
                    Tomorrow <span>8:00 AM </span>{" "}
                  </li>
                  <li
                    onClick={nextMondayRemainder}
                    className="flex justify-between items-center hover:bg-lighterHover  p-2 cursor-pointer"
                  >
                    Next Week <span>8:00 AM </span>{" "}
                  </li>
                  <li
                    onClick={() => setPickADayModal(true)}
                    className=" flex items-center gap-[10px] cursor-pointer hover:bg-lighterHover  p-2"
                  >
                    <LuClock /> Pick date and time{" "}
                  </li>
                  <li
                    onClick={() => {
                      setPickALocation(true);
                      setOpenNotifyModal(false);
                    }}
                    className="flex gap-[10px] cursor-pointer hover:bg-lighterHover  p-2"
                  >
                    <IoLocationOutline /> Pick place{" "}
                  </li>
                </ul>
              </div>
              {pickADayModal ? (
                <PickDate
                  setPickADayModal={setPickADayModal}
                  notepad={props.note}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {pickALocation ? (
            <form onSubmit={setLocation} className="pickLocation ">
              <h1 className="flex items-center gap-[8px] py-3 text-[20px] border-1 border-[#313235]">
                {
                  <span className="p-2 rounded-full hover:bg-lighterHover">
                    <IoArrowBackSharp
                      onClick={() => {
                        setPickALocation(false);
                        setOpenNotifyModal(true);
                      }}
                      className="text-[24px] cursor-pointer hover:bg-lighterHover rounded-[50%]"
                      color="#9AA0A6"
                    />
                  </span>
                }{" "}
                Pick a Location{" "}
              </h1>
              <Select
                styles={CustomStyle}
                placeholder="Choose a location"
                options={options}
                value={countryValue}
                onChange={changeHandler}
                className="bg-transparent"
              />
              <div className="flex justify-end w-[90%] mt-2 ">
                <button
                  className="p-3 outline-none border-none hover:bg-lighterHover cursor-pointer"
                  type="submit"
                >
                  Save{" "}
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
          <span className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 ">
            {
              <MdOutlinePersonAddAlt1
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 cursor-pointer ">
            {
              <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 ">
            {
              <BiImageAlt
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-[#313236] cursor-pointer ">
            {
              <BiArchiveIn
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-[#313236] cursor-pointer ">
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
      {props?.showIconsOnHover ? (
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
        {props?.noteModal ? (
          <NoteModal
            noteUrlParams={noteUrlParams}
            setNoteModal={props?.setNoteModal}
            noteModal={props?.noteModal}
            setOverLayBg={props.setOverLayBg}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowNote;
