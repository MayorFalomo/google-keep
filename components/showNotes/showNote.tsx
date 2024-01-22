"use client";
import React, { useState, useMemo } from "react";
import NoteModal from "../createNoteModal/NoteModal";
import { BsCheck, BsPin } from "react-icons/bs";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
} from "react-icons/bi";
import { LuClock } from "react-icons/lu";
import {
  IoArrowBackSharp,
  IoCloseOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import "./notes.css";
import PickDate from "../pickdateandtime/PickDate";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Collaborators from "../collaborators/Collaborators";
import Background from "../background/Background";
import Image from "next/image";
import Options from "../options/Options";
import { AnimatePresence, motion } from "framer-motion";
import Canvas from "@/components/canvas/Canvas";
import CreateLabel from "../label/CreateLabel";

type Props = {};

const ShowNote = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []); //Options for country
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [picture, setPicture] = React.useState<any>();
  const [video, setVideo] = useState<string>();
  const [openOptionsModal, setOpenOptionsModal] = useState<boolean>(false);
  const [trashNote, setTrashNote] = useState<any>();
  const [openCanvasModal, setOpenCanvasModal] = useState<boolean>(false);
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);

  const changeHandler = (countryValue: any) => {
    setCountryValue(countryValue);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    props.setNoteUrlParams(props.note?._id);
    props?.setNoteModal(true);

    contextValue?.setOverLay(true);
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

  //Function to pin note
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
      video: props.note?.video,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      labels: props.note?.label,
      location: props.note?.location,
      canvas: props.note?.canvas,
      createdAt: new Date(),
    };

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/add-pinned`,
          pinThisNote
        )
        .then(() =>
          contextValue.setPinnedNote(
            [...contextValue?.pinnedNote, pinThisNote].reverse()
          )
        )
        .catch((err) => console.log(err));

      toast.success("Note Pinned Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const laterToday = (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      video: props?.note?.video,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      labelId: props?.note?.labelId,
      location: props.note?.location,
      canvas: props?.note?.canvas,
      createdAt: new Date(),
    };
    console.log(noteRemainder, "note remainder");
    try {
      axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/set-notification/later-today",
          noteRemainder
        )
        .catch((err) => console.log(err && toast.error("internal error")));
      contextValue?.setUser((prevUser: any) => [
        ...prevUser?.pending,
        noteRemainder,
      ]);
      toast.success("Remainder set for tomorrow ");
      setOpenNotifyModal(false);
    } catch (error) {
      console.log(error, "This did not work");
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
      video: props?.note?.video,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      labelId: props?.note?.labelId,
      location: props.note?.location,
      canvas: props?.note?.canvas,
      createdAt: new Date(),
    };
    console.log(noteRemainder, "note remainder");
    try {
      axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/set-notification/tomorrow",
          noteRemainder
        )
        .catch((err) => console.log(err && toast.error("internal error")));
      contextValue?.setUser((prevUser: any) => [
        ...prevUser?.pending,
        noteRemainder,
      ]);
      // console.log(contextValue?.user);
      toast.success("Remainder set for tomorrow ");
      setOpenNotifyModal(false);
    } catch (error) {
      console.log(error, "This did not work");
    }
  };
  // console.log(contextValue?.user);

  const nextMondayRemainder = async (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId,
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      video: props?.note?.video,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      labelId: props?.note?.labelId,
      canvas: props?.note?.canvas,
      location: props.note?.location,
      createdAt: new Date(),
    };
    try {
      await axios.post(
        "https://keep-backend-theta.vercel.app/api/notes/set-notification/next-week",
        noteRemainder
      );
      contextValue?.setUser((prevUser: any) => [
        ...prevUser?.pending,
        noteRemainder,
      ]);
      toast.success("Remainder set for tomorrow ");
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

  //Function to set Location
  const setLocation = (e: any) => {
    e.preventDefault();
    const country = {
      _id: props.note?._id,
      location: countryValue?.label || props.note?.location,
    };
    try {
      axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/add-country/${props.note?._id}`,
        country
      );
      contextValue?.setNotes((prevState: any) =>
        prevState.map((note: any) =>
          note._id == props.note?._id
            ? { ...note, location: country.location }
            : note
        )
      );
      toast.success("Location added successfully");
    } catch (err) {
      console.log(err);
    }
    setPickALocation(false);
  };

  //Function to remove location
  const removeLocation = async (e: any) => {
    e.preventDefault();
    props?.setNoteModal(false);

    const noteId = props.note?._id;

    try {
      props?.setNoteModal(false);
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/delete-country/${noteId}`
      );

      contextValue?.setNotes((prevNotes: any) => {
        const updatedNotes = prevNotes.map((note: any) => {
          if (note._id == noteId) {
            // Update the location to an empty string for the specific note
            return { ...note, location: " " };
          }
          return note;
        });
        return updatedNotes;
      });
      setPickALocation(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to archive note
  const archiveNote = async (e: any) => {
    e.preventDefault();

    const archiveThisNote = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      location: props.note?.location,
      createdAt: props?.note.createdAt,
      canvas: props?.note?.canvas,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/archive-note`,
          archiveThisNote
        )
        .catch((err) => console.log(err));
      contextValue?.setNotes((prevState: any) =>
        prevState.filter((note: any) => note._id !== props.note?._id)
      );
      if (
        contextValue?.pinnedNote.some(
          (note: any) => note._id == props.note?._id
        )
      ) {
        contextValue?.setPinnedNote((prevState: any) =>
          prevState.filter((note: any) => note._id !== props.note?._id)
        );
        contextValue?.setArchivedNote((prevNotes: any) => {
          prevNotes.map((note: any) => [...note, props.note]);
        });
      } else {
        return null;
      }
      toast.success("Note archived successfully");
    } catch (err) {
      console.log(err);
    }
  };

  //Function to trash note to options
  const addOptions = () => {
    setTrashNote({
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      video: props.note?.video,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      labelId: props.note?.labelId,
      location: props.note?.location,
      canvas: props.note?.canvas,
      createdAt: props?.note.createdAt,
    });
    setOpenOptionsModal(!openOptionsModal);
    props?.setNoteUrlParams(props?.note?._id);
    setOpenNotifyModal(false);
    props?.setShowBgModal(false);
  };

  //Function to upload a picture/video and update the note
  const uploadPicOrVid = async (files: any, mediaType: any) => {
    props.setNoteUrlParams(props.note?._id);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    const uploadEndpoint =
      mediaType == "image"
        ? "https://api.cloudinary.com/v1_1/dsghy4siv/image/upload"
        : "https://api.cloudinary.com/v1_1/dsghy4siv/video/upload";

    await axios
      .post(uploadEndpoint, formData)
      .then(async (res) => {
        // setPicture("");
        // setVideo("");

        if (res.data.url) {
          const mediaObject =
            mediaType == "image"
              ? { picture: res.data.url, video: "" }
              : { video: res.data.url, picture: "" };

          const updateEndpoint =
            mediaType == "image"
              ? "https://keep-backend-theta.vercel.app/api/api/notes/upload-picture"
              : "https://keep-backend-theta.vercel.app/api/notes/upload-video";

          try {
            await axios
              .post(updateEndpoint, {
                _id: props.note?._id,
                ...mediaObject,
              })
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setNotes((prevState: any) =>
              prevState.map((note: any) =>
                note._id == props?.noteUrlParams
                  ? {
                      ...note,
                      ...mediaObject,
                    }
                  : note
              )
            );

            toast.success(
              mediaType == "image"
                ? "Picture has been uploaded successfully"
                : "Video has been uploaded successfully"
            );
          } catch (error) {
            console.error(
              error &&
                (mediaType == "image"
                  ? "Error updating picture"
                  : "Error updating video")
            );
          }
        }
      })
      .catch((err) => console.log(err));
  };

  //Function to select notes by pushing _id to an array
  const selectedNotes = () => {
    contextValue?.setIsSelectedShow(true);
    props?.setNoteUrlParams(props?.note?._id);
    contextValue?.setIsSelected((prevState: any) => [
      props?.note?._id,
      ...prevState,
    ]);
  };

  //Function to unSelect notes by popping out _id from an array
  const unSelectNotes = () => {
    contextValue?.setIsSelectedShow(false);
    props?.setNoteUrlParams(props?.note?._id);
    contextValue?.setIsSelected((prevState: any) =>
      prevState.filter((note: any) => note !== props?.note?._id)
    );
  };

  return (
    <div
      style={{
        backgroundColor: contextValue?.backgroundColor,
      }}
      className="mapped"
    >
      <div className="subContainer" onClick={handleClick}>
        {props?.note?.canvas?.map((canvas: any, index: number) => {
          return <CanvasImage key={index} canvas={canvas} />;
        })}
        {props?.note?.picture ? (
          <div className="w-[100%]">
            <Image
              className="w-[100%]"
              width={120}
              height={120}
              src={props?.note?.picture}
              loading="lazy"
              // objectFit="cover"
              alt=" "
            />
          </div>
        ) : (
          ""
        )}
        {props?.note?.video ? (
          <video
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            controls
            src={props?.note?.video}
            // objectFit="cover"
          ></video>
        ) : (
          ""
        )}
        {
          <div className="p-4">
            {props.note?.title ? (
              <h1 className="text-[20px] font-semibold max-sm:text-[18px] ">
                {props.note?.title}
              </h1>
            ) : (
              ""
            )}
            {props.note?.note ? (
              <p className="mt-[15px] text-[18px] font-medium whitespace-break-spaces max-sm:text-[16px] ">
                {props.note?.note?.slice(0, 600)}...
              </p>
            ) : (
              <input
                className="bg-transparent border-none outline-none "
                placeholder="Empty Note"
              />
            )}
            {props.note?.location?.length > 0 ? (
              <form onSubmit={removeLocation}>
                {props.note?.location?.length > 0 ? (
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
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="outline-none border-none cursor-pointer p-1 rounded-full hover:bg-lighterHover "
                    >
                      {closeIcon ? (
                        <Tippy placement="bottom" content="Delete location ">
                          <span>
                            <IoCloseOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px] " />
                          </span>
                        </Tippy>
                      ) : (
                        ""
                      )}{" "}
                    </button>
                  </p>
                ) : (
                  ""
                )}
              </form>
            ) : (
              ""
            )}
          </div>
        }
      </div>
      {props?.showId == props?.note?._id ? (
        contextValue.isSelected.some(
          (selected: any) => selected == props?.note?._id
        ) ? (
          <Tippy placement="bottom" content="unselect note">
            <span
              style={{ backgroundColor: "#5F6368" }}
              onClick={unSelectNotes}
              className=" bg-#fff absolute top-[-18px] left-[-18px] rounded-full cursor-pointer  z-10 "
            >
              <BsCheck
                style={{ backgroundColor: "#5F6368" }}
                className=" rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl "
              />
            </span>
          </Tippy>
        ) : (
          <Tippy placement="bottom" content="select note">
            <span
              onClick={selectedNotes}
              className="absolute top-[-18px] left-[-18px] z-10 cursor-pointer "
            >
              <BsCheck className="  bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
            </span>
          </Tippy>
        )
      ) : (
        ""
      )}
      {props?.showId == props?.note?._id ? (
        <div
          style={{
            backgroundColor: props?.note?.bgColor
              ? props?.note?.bgColor
              : "#202124",
            backgroundImage: props?.note?.bgImage
              ? `url(${props?.note?.bgImage})`
              : "#202124",
          }}
          className={
            contextValue?.changeNoteLayout
              ? "absolute z-10 bottom-[6px] left-0 w-full  flex justify-around item-end"
              : "absolute z-10 bottom-[6px] left-0 w-full flex justify-around item-center "
          }
        >
          <Tippy placement="bottom" content="Notification">
            <span className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 ">
              {
                <BiBellPlus
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                  onClick={() => {
                    setOpenNotifyModal(!openNotifyModal);
                    setOpenOptionsModal(false);
                    props?.setShowBgModal(false);
                  }}
                />
              }{" "}
            </span>
          </Tippy>
          <AnimatePresence>
            {openNotifyModal ? (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="shadow"
                className="convex"
              >
                <div className="rounded-[20px]">
                  <p>Remainder: </p>
                  <ul>
                    <li
                      onClick={laterToday}
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
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <PickDate
                      setPickADayModal={setPickADayModal}
                      notepad={props.note}
                    />
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
          {pickALocation ? (
            <form onSubmit={setLocation} className="pickLocation ">
              <h1 className="flex items-center gap-[8px] py-3 text-[20px] border-1 border-[#313235]">
                {
                  <Tippy placement="bottom" content="Go back ">
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
                  </Tippy>
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
          <Tippy placement="bottom" content="Collaborator ">
            <span
              onClick={() => {
                contextValue?.setShowCollaboratorModal(true);
                setOpenNotifyModal(false);
                props.setNoteUrlParams(props.note?._id);
              }}
              className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
            >
              {
                <MdOutlinePersonAddAlt1
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>

          <Tippy placement="bottom" content="Background options ">
            <span
              onClick={() => {
                props?.setShowBgModal(true);
                contextValue?.setOverLay(true);
                props?.setNoteUrlParams(props.note?._id);
                setOpenNotifyModal(false);
                setOpenOptionsModal(false);
              }}
              className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 cursor-pointer "
            >
              {
                <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
              }{" "}
            </span>
          </Tippy>

          <form
            className="flex items-center p-2"
            onSubmit={(e) => uploadPicOrVid(e, "images")}
          >
            <Tippy placement="bottom" content="Add image">
              <label
                htmlFor="fileInputFile"
                className=" rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
              >
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                    cursor="pointer"
                  />
                }{" "}
              </label>
            </Tippy>
            <input
              type="file"
              onChange={(e) => uploadPicOrVid(e.target.files, "image")}
              id="fileInputFile"
              style={{ display: "none" }}
            />
          </form>
          <form onSubmit={archiveNote}>
            <Tippy placement="bottom" content="Archive ">
              <button
                type="submit"
                className="p-2 rounded-full hover:bg-[#313236] cursor-pointer "
              >
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                    cursor="pointer"
                  />
                }{" "}
              </button>
            </Tippy>
          </form>

          <Tippy placement="bottom" content="More ">
            <span
              onClick={addOptions}
              className="p-2 rounded-full hover:bg-[#313236] cursor-pointer "
            >
              {
                <BiDotsVerticalRounded
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
          <AnimatePresence>
            {openOptionsModal ? (
              <div className="py-2" id="options">
                <Options
                  trashNote={trashNote}
                  setOpenOptionsModal={setOpenOptionsModal}
                  openCanvasModal={openCanvasModal}
                  setOpenCanvasModal={setOpenCanvasModal}
                  openLabelModal={openLabelModal}
                  setOpenLabelModal={setOpenLabelModal}
                />
              </div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      ) : (
        ""
      )}
      {props?.showIconsOnHover ? (
        contextValue?.pinnedNote?.some(
          (pinned: any) => pinned?._id == props?.note?._id
        ) ? (
          <Tippy placement="bottom" content="Unpin note ">
            <button
              disabled
              className="absolute top-[10px] right-[5px] z-10 p-2 text-[#5F6368] border-none outline-none cursor-not-allowed"
            >
              <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />{" "}
            </button>
          </Tippy>
        ) : (
          <form onSubmit={pinNote}>
            <Tippy placement="bottom" content="Pin note ">
              <button
                type="submit"
                className="absolute top-[10px] right-[5px] z-[9] p-2 hover:bg-[#27292C] rounded-full  hover:text-white text-[#5F6368] cursor-pointer border-none outline-none "
              >
                <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
              </button>
            </Tippy>
          </form>
        )
      ) : (
        ""
      )}
      <AnimatePresence>
        {props?.noteModal ? (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <NoteModal
              noteUrlParams={props.noteUrlParams}
              setNoteModal={props?.setNoteModal}
              noteModal={props?.noteModal}
              setNoteUrlParams={props.setNoteUrlParams}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {contextValue?.showCollaboratorModal ? (
        <AnimatePresence>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" "
          >
            <Collaborators noteUrlParams={props.noteUrlParams} />
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}
      {props?.showBgModal ? (
        <AnimatePresence>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Background
              noteUrlParams={props?.noteUrlParams}
              showBgModal={props?.showBgModal}
              setShowBgModal={props?.setShowBgModal}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}
      {contextValue?.showCollaboratorModal ? (
        <div
          onClick={() => {
            contextValue?.setShowCollaboratorModal(false);
          }}
          className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
        ></div>
      ) : (
        ""
      )}
      {openCanvasModal ? (
        <div className="fixed z-50 top-0 left-0 h-full w-full">
          <Canvas
            noteUrlParams={props?.noteUrlParams}
            setOpenCanvasModal={setOpenCanvasModal}
            canvasNote={trashNote}
          />
        </div>
      ) : (
        ""
      )}
      {openLabelModal ? (
        <div id="shadow" className="label-modal">
          <CreateLabel
            noteUrlParams={props?.noteUrlParams}
            clickedNote={trashNote}
            setOpenLabelModal={setOpenLabelModal}
          />
        </div>
      ) : (
        ""
      )}
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#313235",
            color: "#fff",
            width: "350px",
            height: "70px",
          },
        }}
      />
    </div>
  );
};

const CanvasImage = (canvas: any) => {
  // console.log(canvas.canvas, "canvasImage");
  return (
    <div>
      {canvas.canvas.map((canvas: any, index: number) => {
        return <ShowCanvasImage key={index} canvas={canvas} />;
      })}
    </div>
  );
};

const ShowCanvasImage = (canvas: any) => {
  // console.log(draw.draw?.imageDataURL, "canvasImage");
  return (
    <div className="w-[100%] h-[100%]">
      <img src={canvas.canvas?.imageDataURL} className="w-[100%] h-[100%]" />
    </div>
  );
};

export default ShowNote;
