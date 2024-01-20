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
// import "./notes.css";
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
// import Canvas from "@/components/canvas/Canvas";
// import CreateLabel from "../label/CreateLabel";
type Props = {};

const Remainder = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []); //Options for country
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState<boolean>(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    props.setNoteUrlParams(props.remainder?._id);
    props?.setNoteModal(true);

    contextValue?.setOverLay(true);
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

  //Function to upload a picture/video and update the note
  const uploadPicOrVid = async (files: any, mediaType: any) => {
    props.setNoteUrlParams(props.remainder?._id);
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
                _id: props.remainder?._id,
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

  //Function to archive note
  const archiveNote = async (e: any) => {
    e.preventDefault();

    const archiveThisNote = {
      _id: props.remainder?._id,
      userId: props.remainder?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.remainder?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.remainder?.username,
      title: props.remainder?.title,
      note: props.remainder?.note,
      picture: props.remainder?.picture,
      drawing: props.remainder?.drawing,
      bgImage: props.remainder?.bgImage,
      bgColor: props.remainder?.bgColor,
      remainder: props.remainder?.remainder,
      collaborator: props.remainder?.collaborator,
      labels: props.remainder?.label,
      location: props.remainder?.location,
      createdAt: props?.remainder.createdAt,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/archive-note`,
          archiveThisNote
        )
        .catch((err) => console.log(err));
      contextValue?.setNotes((prevState: any) =>
        prevState.filter((note: any) => note._id !== props.remainder?._id)
      );
      if (
        contextValue?.pinnedNote.some(
          (note: any) => note._id == props.remainder?._id
        )
      ) {
        contextValue?.setPinnedNote((prevState: any) =>
          prevState.filter((note: any) => note._id !== props.remainder?._id)
        );
        contextValue?.setArchivedNote((prevNotes: any) => {
          prevNotes.map((note: any) => [...note, props.remainder]);
        });
      } else {
        return null;
      }
      toast.success("Note archived successfully");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(props?.remainder);

  return (
    <div
      style={{
        backgroundColor: contextValue?.backgroundColor,
      }}
      className="mapped"
    >
      <div className="subContainer" onClick={handleClick}>
        {props?.remainder?.canvas?.map((canvas: any, index: number) => {
          return <CanvasImage key={index} canvas={canvas} />;
        })}
        {props?.remainder?.picture ? (
          <div className="w-[100%]">
            <Image
              className="w-[100%]"
              width={120}
              height={120}
              src={props?.remainder?.picture}
              loading="lazy"
              // objectFit="cover"
              alt=" "
            />
          </div>
        ) : (
          ""
        )}
        {props?.remainder?.video ? (
          <video
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            controls
            src={props?.remainder?.video}
            // objectFit="cover"
          ></video>
        ) : (
          ""
        )}
        {
          <div className="p-4">
            {props.remainder?.title ? (
              <h1 className="text-[20px] font-semibold max-sm:text-[18px] ">
                {props.remainder?.title}
              </h1>
            ) : (
              ""
            )}
            {props?.remainder?.note ? (
              <p className="mt-[15px] text-[18px] font-medium whitespace-break-spaces max-sm:text-[16px] ">
                {props.remainder?.note?.slice(0, 600)}...
              </p>
            ) : (
              <input
                className="bg-transparent border-none outline-none "
                placeholder="Empty Note"
              />
            )}
            {props?.remainder?.location?.length > 0 ? (
              <form>
                {props?.remainder?.location?.length > 0 ? (
                  <p
                    onMouseOver={() => {
                      setCloseIcon(true);
                    }}
                    onMouseLeave={() => setCloseIcon(false)}
                    className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                  >
                    <IoLocationOutline />
                    {props?.remainder?.location}{" "}
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
      {props?.showId == props?.remainder?._id ? (
        contextValue.isSelected.some(
          (selected: any) => selected == props?.remainder?._id
        ) ? (
          <Tippy placement="bottom" content="unselect note">
            <span
              style={{ backgroundColor: "#5F6368" }}
              //   onClick={unSelectNotes}
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
              //   onClick={selectedNotes}
              className="absolute top-[-18px] left-[-18px] z-10 cursor-pointer "
            >
              <BsCheck className="  bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
            </span>
          </Tippy>
        )
      ) : (
        ""
      )}
      {props?.showId == props?.remainder?._id ? (
        <div
          style={{
            backgroundColor: props?.remainder?.bgColor
              ? props?.remainder?.bgColor
              : "#202124",
            backgroundImage: props?.remainder?.bgImage
              ? `url(${props?.remainder?.bgImage})`
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
                    <li className="flex justify-between items-center hover:bg-lighterHover p-2 cursor-pointer ">
                      Later Today <span>8:00 PM </span>{" "}
                    </li>
                    <li className="flex justify-between items-center hover:bg-lighterHover  p-2 cursor-pointer ">
                      Tomorrow <span>8:00 AM </span>{" "}
                    </li>
                    <li
                      // onClick={nextMondayRemainder}
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
                      notepad={props?.remainder}
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
            <form className="pickLocation ">
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
                // onChange={changeHandler}
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
                props.setNoteUrlParams(props?.remainder?._id);
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
                props?.setNoteUrlParams(props?.remainder?._id);
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
              // onClick={addOptions}
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
                  // trashNote={trashNote}
                  setOpenOptionsModal={setOpenOptionsModal}
                  // openCanvasModal={openCanvasModal}
                  // setOpenCanvasModal={setOpenCanvasModal}
                  // openLabelModal={openLabelModal}
                  // setOpenLabelModal={setOpenLabelModal}
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
          (pinned: any) => pinned?._id == props?.remainder?._id
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
          <form>
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

export default Remainder;
