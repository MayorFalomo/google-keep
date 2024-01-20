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
import "../showNotes/notes.css";
import PickDate from "../pickdateandtime/PickDate";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast, { Toaster } from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Collaborators from "../collaborators/Collaborators";
import Background from "../background/Background";
import Image from "next/image";
import Fade from "../animate/Fade";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
import Options from "../options/Options";
import Canvas from "@/components/canvas/Canvas";
import CreateLabel from "../label/CreateLabel";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/helpers/Helpers";
type Props = {};

//Parent component is showNotes.tsx
const Results = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []); //Options for country
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [openCanvasModal, setOpenCanvasModal] = useState<boolean>(false);
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [trashNote, setTrashNote] = useState<any>();
  const [openOptionsModal, setOpenOptionsModal] = useState<boolean>(false);
  const [noteUrlParams, setNoteUrlParams] = useState<any>(
    contextValue?.searchResults?.searchResults?._id
  );
  const handleClick = (e: any) => {
    e.preventDefault();
    // e.stopPropagation();
    props.setNoteUrlParams(contextValue?.searchResults?.searchResults?._id);
    // console.log(contextValue?.searchResults?.searchResults?._id, "This is the id");
    props?.setNoteModal(true);
    // console.log(noteModal, "This is Note Modal");
    // props?.setNoteModal(true);
    contextValue?.setOverLay(true);

    // console.log(noteModal, "Hello!!....I am Clicking");
  };

  const pinNote = async (e: any) => {
    e.preventDefault();

    const pinThisNote = {
      _id: contextValue?.searchResults?.searchResults?._id,
      userId: contextValue?.searchResults?.searchResults?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: contextValue?.searchResults?.searchResults?._id, //I need something unique from contextValue?.searchResults?.searchResults to be in pinned, so you can't add more than one of the same pinned note
      username: contextValue?.searchResults?.searchResults?.username,
      title: contextValue?.searchResults?.searchResults?.title,
      note: contextValue?.searchResults?.searchResults?.note,
      picture: contextValue?.searchResults?.searchResults?.picture,
      video: contextValue?.searchResults?.searchResults?.video,
      drawing: contextValue?.searchResults?.searchResults?.drawing,
      bgImage: contextValue?.searchResults?.searchResults?.bgImage,
      bgColor: contextValue?.searchResults?.searchResults?.bgColor,
      remainder: contextValue?.searchResults?.searchResults?.remainder,
      collaborator: contextValue?.searchResults?.searchResults?.collaborator,
      labels: contextValue?.searchResults?.searchResults?.label,
      location: contextValue?.searchResults?.searchResults?.location,
      canvas: contextValue?.searchResults?.searchResults?.canvas,
      createdAt: new Date(),
    };
    // console.log(props?.note?.canvas);

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

  const changeHandler = (countryValue: any) => {
    setCountryValue(countryValue);
  };

  const tomorrowRemainder = (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: contextValue?.searchResults?.searchResults?._id,
      userId: contextValue?.searchResults?.searchResults?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: contextValue?.searchResults?.searchResults?.username,
      title: contextValue?.searchResults?.searchResults?.title,
      note: contextValue?.searchResults?.searchResults?.note,
      picture: contextValue?.searchResults?.searchResults?.picture,
      drawing: contextValue?.searchResults?.searchResults?.drawing,
      bgImage: contextValue?.searchResults?.searchResults?.bgImage,
      bgColor: contextValue?.searchResults?.searchResults?.bgColor,
      remainder: contextValue?.searchResults?.searchResults?.remainder,
      collaborator: contextValue?.searchResults?.searchResults?.collaborator,
      label: contextValue?.searchResults?.searchResults?.label,
      labelId: contextValue?.searchResults?.searchResults?.labelId,
      location: contextValue?.searchResults?.searchResults?.location,
      canvas: contextValue?.searchResults?.searchResults?.canvas,
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
      toast.success("Remainder set for tomorrow ");
      setOpenNotifyModal(false);
    } catch (error) {
      console.log(error, "This did not work");
    }
  };

  const nextMondayRemainder = async (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: contextValue?.searchResults?.searchResults?._id,
      userId: contextValue?.searchResults?.searchResults?.userId,
      pinnedId: contextValue?.searchResults?.searchResults?._id,
      username: contextValue?.searchResults?.searchResults?.username,
      title: contextValue?.searchResults?.searchResults?.title,
      note: contextValue?.searchResults?.searchResults?.note,
      picture: contextValue?.searchResults?.searchResults?.picture,
      video: props?.note?.video,
      bgImage: contextValue?.searchResults?.searchResults?.bgImage,
      bgColor: contextValue?.searchResults?.searchResults?.bgColor,
      remainder: contextValue?.searchResults?.searchResults?.remainder,
      collaborator: contextValue?.searchResults?.searchResults?.collaborator,
      label: contextValue?.searchResults?.searchResults?.label,
      labelId: props?.note?.labelId,
      location: contextValue?.searchResults?.searchResults?.location,
      createdAt: new Date(),
    };
    try {
      await axios.post(
        "https://keep-backend-theta.vercel.app/api/notes/set-notification/next-week",
        noteRemainder
      );
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

  const setLocation = (e: any) => {
    e.preventDefault();
    const country = {
      _id: contextValue?.searchResults?.searchResults?._id,
      location:
        countryValue?.label ||
        contextValue?.searchResults?.searchResults?.location,
    };
    try {
      axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/add-country/${contextValue?.searchResults?.searchResults?._id}`,
        country
      );
      contextValue?.setNotes((prevState: any) =>
        prevState.map((note: any) =>
          note._id == contextValue?.searchResults?.searchResults?._id
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

  const removeLocation = async (e: any) => {
    e.preventDefault();
    props?.setNoteModal(false);

    const noteId = contextValue?.searchResults?.searchResults?._id;

    try {
      props?.setNoteModal(false);
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/delete-country/${noteId}`
      );
      // console.log(noteId, "This is noteId");

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

  // console.log(props?.noteUrlParams, "This is note props");

  const archiveNote = async (e: any) => {
    e.preventDefault();

    const archiveThisNote = {
      _id: contextValue?.searchResults?.searchResults?._id,
      userId: contextValue?.searchResults?.searchResults?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: contextValue?.searchResults?.searchResults?._id, //I need something unique from contextValue?.searchResults?.searchResults to be in pinned, so you can't add more than one of the same pinned note
      username: contextValue?.searchResults?.searchResults?.username,
      title: contextValue?.searchResults?.searchResults?.title,
      note: contextValue?.searchResults?.searchResults?.note,
      picture: contextValue?.searchResults?.searchResults?.picture,
      drawing: contextValue?.searchResults?.searchResults?.drawing,
      bgImage: contextValue?.searchResults?.searchResults?.bgImage,
      bgColor: contextValue?.searchResults?.searchResults?.bgColor,
      remainder: contextValue?.searchResults?.searchResults?.remainder,
      collaborator: contextValue?.searchResults?.searchResults?.collaborator,
      labels: contextValue?.searchResults?.searchResults?.label,
      location: contextValue?.searchResults?.searchResults?.location,
      createdAt: props?.note.createdAt,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/archive-note`,
          archiveThisNote
        )
        .catch((err) => console.log(err));
      contextValue?.setNotes((prevState: any) =>
        prevState.filter(
          (note: any) =>
            note._id !== contextValue?.searchResults?.searchResults?._id
        )
      );
      if (
        contextValue?.pinnedNote.some(
          (note: any) =>
            note._id == contextValue?.searchResults?.searchResults?._id
        )
      ) {
        contextValue?.setPinnedNote((prevState: any) =>
          prevState.filter(
            (note: any) =>
              note._id !== contextValue?.searchResults?.searchResults?._id
          )
        );
        contextValue?.setArchivedNote((prevNotes: any) => {
          prevNotes.map((note: any) => [
            ...note,
            contextValue?.searchResults?.searchResults,
          ]);
        });
      } else {
        return null;
      }
      toast.success("Note archived successfully");
      // Update the contextValue.notes array with updated note
    } catch (err) {
      console.log(err);
    }
  };

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: contextValue?.searchResults?.searchResults?._id,
  // });

  // console.log(props?.noteUrlParams, "This is picture");

  const addOptions = () => {
    setTrashNote({
      _id: contextValue?.searchResults?.searchResults?._id,
      userId: contextValue?.searchResults?.searchResults?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: contextValue?.searchResults?.searchResults?._id, //I need something unique from contextValue?.searchResults?.searchResults to be in pinned, so you can't add more than one of the same pinned note
      username: contextValue?.searchResults?.searchResults?.username,
      title: contextValue?.searchResults?.searchResults?.title,
      note: contextValue?.searchResults?.searchResults?.note,
      picture: contextValue?.searchResults?.searchResults?.picture,
      video: contextValue?.searchResults?.searchResults?.video,
      bgImage: contextValue?.searchResults?.searchResults?.bgImage,
      bgColor: contextValue?.searchResults?.searchResults?.bgColor,
      remainder: contextValue?.searchResults?.searchResults?.remainder,
      collaborator: contextValue?.searchResults?.searchResults?.collaborator,
      label: contextValue?.searchResults?.searchResults?.label,
      labelId: contextValue?.searchResults?.searchResults?.labelId,
      location: contextValue?.searchResults?.searchResults?.location,
      canvas: contextValue?.searchResults?.searchResults?.canvas,
      createdAt: props?.note.createdAt,
    });
    setOpenOptionsModal(!openOptionsModal);
    props?.setNoteUrlParams(props?.note?._id);
    setOpenNotifyModal(false);
  };

  const uploadPicOrVid = async (files: any, mediaType: any) => {
    props.setNoteUrlParams(contextValue?.searchResults?.searchResults?._id);
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
              ? "https://keep-backend-theta.vercel.app/api/notes/upload-picture"
              : "https://keep-backend-theta.vercel.app/api/notes/upload-video";

          try {
            // console.log(mediaObject, "mediaObject");
            // console.log(props?.note?._id, "id");

            await axios
              .post(updateEndpoint, {
                _id: contextValue?.searchResults?.searchResults?._id,
                ...mediaObject,
              })
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setNotes((prevState: any) =>
              prevState.map((note: any) =>
                note._id == noteUrlParams
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
  // console.log(showId, "show Id");
  // console.log(contextValue?.searchResults?.searchResults?._id, "search Id");

  return (
    <div>
      <div
        onMouseEnter={() => {
          setShowIconsOnHover(true);
          setShowId(contextValue?.searchResults?.searchResults?._id);
        }}
        onMouseLeave={() => {
          setShowIconsOnHover(false);
          setShowId("");
        }}
        onTouchStart={() => {
          setShowIconsOnHover(true);
          setShowId(contextValue?.searchResults?.searchResults?._id);
        }}
        className={
          "relative max-w-[300px] min-w-[300px] h-fit min-h-[140px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px] max-md:max-w-[250px] break-words "
        }
        style={{
          backgroundColor: contextValue?.searchResults?.searchResults?.bgColor
            ? contextValue?.searchResults?.searchResults?.bgColor
            : "#202124",
          backgroundImage: `url(${contextValue?.searchResults?.searchResults?.bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {contextValue?.overLay ? (
          <AnimatePresence>
            <motion.div
              onClick={() => {
                setNoteModal(false);

                contextValue?.setOverLay(false);
                setShowBgModal(false);
              }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed z-20 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
            ></motion.div>
          </AnimatePresence>
        ) : (
          ""
        )}
        <div
          style={{
            backgroundColor: contextValue?.backgroundColor,
          }}
          className="mapped"
        >
          <div className="subContainer" onClick={handleClick}>
            {contextValue?.searchResults?.searchResults?.canvas?.map(
              (canvas: any, index: number) => {
                return <CanvasImage key={index} canvas={canvas} />;
              }
            )}
            {contextValue?.searchResults?.searchResults?.picture ? (
              <div className="w-[100%]">
                <Image
                  className="w-[100%]"
                  width={120}
                  height={120}
                  src={contextValue?.searchResults?.searchResults?.picture}
                  loading="lazy"
                  // fill={true}
                  objectFit="cover"
                  alt=" "
                />
              </div>
            ) : (
              ""
            )}
            {contextValue?.searchResults?.searchResults?.video ? (
              <video
                className="w-[100%] max-h-[150px]"
                width={200}
                height={120}
                controls
                src={contextValue?.searchResults?.searchResults?.video}
                // objectFit="cover"
              ></video>
            ) : (
              ""
            )}
            {contextValue?.searchResults?.searchResults?.title?.length == 0 &&
            contextValue?.searchResults?.searchResults?.note?.length == 0 ? (
              <div className="p-4">
                <input
                  className="bg-transparent border-none outline-none "
                  placeholder="Empty Note"
                />
              </div>
            ) : (
              <div className="p-4">
                <h1 className="text-[20px] max-sm:text-[18px] ">
                  {contextValue?.searchResults?.searchResults?.title}
                </h1>
                <p className="mt-[15px] text-[18px] font-medium whitespace-break-spaces max-sm:text-[16px] ">
                  {contextValue?.searchResults?.searchResults?.note?.slice(
                    0,
                    600
                  )}
                  ...
                </p>
                {contextValue?.searchResults?.searchResults?.location?.length >
                0 ? (
                  <form onSubmit={removeLocation}>
                    {contextValue?.searchResults?.searchResults?.location
                      ?.length > 0 ? (
                      <p
                        onMouseOver={() => {
                          setCloseIcon(true);
                        }}
                        onMouseLeave={() => setCloseIcon(false)}
                        className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                      >
                        <IoLocationOutline />
                        {
                          contextValue?.searchResults?.searchResults?.location
                        }{" "}
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="outline-none border-none cursor-pointer p-1 rounded-full hover:bg-lighterHover "
                        >
                          {closeIcon ? (
                            <Tippy
                              placement="bottom"
                              content="Delete location "
                            >
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
            )}
          </div>
          {showId == contextValue?.searchResults?.searchResults?._id ? (
            <Tippy placement="bottom" content="Select note">
              <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
            </Tippy>
          ) : (
            " "
          )}
          {showId == contextValue?.searchResults?.searchResults?._id ? (
            <div
              style={{
                backgroundColor: contextValue?.searchResults?.searchResults
                  ?.bgColor
                  ? contextValue?.searchResults?.searchResults?.bgColor
                  : "#202124",
                backgroundImage: contextValue?.searchResults?.searchResults
                  ?.bgImage
                  ? `url(${contextValue?.searchResults?.searchResults?.bgImage})`
                  : "#202124",
              }}
              className={
                contextValue?.changeNoteLayout
                  ? "absolute z-10 bottom-[6px] left-0 w-full  flex justify-around item-center "
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
                    // className="absolute bottom-[-200px] left-0 z-30 w-[300px] p-2 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124] "
                  >
                    <div className="rounded-[20px]">
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
                      <motion.div
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <PickDate
                          setPickADayModal={setPickADayModal}
                          notepad={contextValue?.searchResults?.searchResults}
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
                    setNoteUrlParams(
                      contextValue?.searchResults?.searchResults?._id
                    );
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
                    setShowBgModal(true);
                    contextValue?.setOverLay(true);
                    setNoteUrlParams(
                      contextValue?.searchResults?.searchResults?._id
                    );
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

              {/* <Tippy placement="bottom" content="Add image">
            <label
              // onClick={(e) => {
              //   // e.stopPropagation();
              //   props.setNoteUrlParams(contextValue?.searchResults?.searchResults?._id);
              //   uploadPicOrVid;
              // }}
              htmlFor="fileInput"
              className="p-2 border-2 border-red-600 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
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
            onClick={() => uploadPicOrVid}
            onChange={(e) => uploadPicOrVid}
            id="fileInput"
            style={{ display: "none" }}
          /> */}
              <form
                className="flex item-center "
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
                    // onClick={archiveNote}
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
              (pinned: any) =>
                pinned?._id == contextValue?.searchResults?.searchResults?._id
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
            {contextValue?.searchResults?.searchResultsModal ? (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <NoteModal
                  noteUrlParams={noteUrlParams}
                  setNoteModal={props?.setNoteModal}
                  noteModal={contextValue?.searchResults?.searchResultsModal}
                  setNoteUrlParams={props.setNoteUrlParams}
                  // setOverLay={props.setOverLay}
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
                <Collaborators
                  noteUrlParams={noteUrlParams}
                  // setShowCollaboratorModal={setShowCollaboratorModal}
                  // setOpenCollabModal={setOpenCollabModal}
                />
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
                  noteUrlParams={noteUrlParams}
                  showBgModal={props?.showBgModal}
                  setShowBgModal={props?.setShowBgModal}
                  // overLay={props?.overLay}
                  // setOverLay={props?.setOverLay}
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
                noteUrlParams={noteUrlParams}
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
                noteUrlParams={noteUrlParams}
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
      </div>
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
      {/* <img src={canvas?.canvas?.imageDataURL} className="w-[100%] h-[100%]" /> */}
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

export default Results;
