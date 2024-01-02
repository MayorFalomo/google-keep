"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React, { useState } from "react";
import { BsCheck, BsPin, BsPinFill } from "react-icons/bs";
import { LuClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
} from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import PinnedModal from "../pinnedModal/PinnedModal";
// import "react-responsive-modal/styles.css";
import "./showPinned.css";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Collaborators from "../collaborators/Collaborators";
import BgImage from "../background/BgImage";
import BgPin from "../bgPin/BgPin";

type Props = {};

//Parent Component is Pinned.tsx
const ShowPinned = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  // const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);
  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [openCollabModal, setOpenCollabModal] = React.useState<boolean>(false); //Toggle the [openCollabModal]
  const [openBgModal, setOpenBgModal] = useState(false);
  const [pinnedModal, setPinnedModal] = React.useState(false); //toggle create note modal

  const handleClick = (e: any) => {
    e.preventDefault();
    setNoteUrlParams(props.pinned?._id);
    // console.log(props.note?.createdAt, "This is the id");
    setPinnedModal(true);
    props?.setOverLayBg(true);
  };

  const unPinNote = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://keep-backend-theta.vercel.app/api/notes/remove-pinned/${props?.pinned?._id}`
      );
      let filtered = contextValue.pinnedNote?.filter(
        (pinned: any) => pinned?._id !== props?.pinned?._id
      );
      contextValue?.setPinnedNote(filtered);
      toast.success("Note unpinned successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const uploadMedia = async (files: any, mediaType: string) => {
    setNoteUrlParams(props.note?._id);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    const uploadEndpoint =
      mediaType == "image"
        ? "https://api.cloudinary.com/v1_1/dsghy4siv/image/upload"
        : "https://api.cloudinary.com/v1_1/dsghy4siv/video/upload";

    await axios
      .post(uploadEndpoint, formData)
      .then((res) => {
        // setPicture("");
        // setVideo("");

        if (res.data.url) {
          const mediaObject =
            mediaType == "image"
              ? { picture: res.data.url, video: "" }
              : { video: res.data.url, picture: "" };

          const updateEndpoint =
            mediaType == "image"
              ? "https://keep-backend-theta.vercel.app/api/notes/pinned/upload-picture"
              : "https://keep-backend-theta.vercel.app/api/notes/pinned/upload-video";

          try {
            axios
              .post(updateEndpoint, {
                id: noteUrlParams,
                ...mediaObject,
              })
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setPinnedNote((prevState: any) =>
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

  const archiveNote = async (e: any) => {
    e.preventDefault();
    const archiveObject = {
      _id: props.pinned?._id,
      userId: props.pinned?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.pinned?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.pinned?.username,
      title: props.pinned?.title,
      note: props.pinned?.note,
      picture: props.pinned?.picture,
      canvas: props.pinned?.canvas,
      bgImage: props.pinned?.bgImage,
      bgColor: props.pinned?.bgColor,
      remainder: props.pinned?.remainder,
      collaborator: props.pinned?.collaborator,
      labels: props.pinned?.label,
      labelId: props?.pinned?.labelId,
      location: props.pinned?.location,
      createdAt: props?.pinned.createdAt,
    };
    try {
      await axios
        .post(
          `http:localhost:5000/api/notes/add-archived/from-pinned`,
          archiveObject
        )
        .catch((err) => console.log(err));
      contextValue?.setPinnedNote((prev: any) =>
        prev.filter((note: any) => note?._id !== props?.pinned?._id)
      );
      contextValue?.setNotes((prev: any) =>
        prev.filter((note: any) => note?._id !== props?.pinned?._id)
      );
      contextValue?.setArchivedNote((prevNotes: any) => [
        archiveObject,
        ...prevNotes,
      ]);
      toast.success("Note archived successfully");
      contextValue?.setAr;
    } catch (error) {
      error && toast.error("Error archiving note");
    }
  };

  // console.log(contextValue?.pinnedNote);

  return (
    <div>
      <div onClick={handleClick} className="subContainer">
        {props?.pinned?.canvas?.map((canvas: any, index: number) => {
          return <CanvasImage key={index} canvas={canvas} />;
        })}
        {props?.pinned?.picture ? (
          <Image
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            src={props?.pinned?.picture}
            alt=" "
          />
        ) : (
          ""
        )}
        {props?.pinned?.video ? (
          <video
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            controls
            src={props?.pinned?.video}
            // objectFit="cover"
          ></video>
        ) : (
          ""
        )}
        {props.pinned?.title?.length == 0 && props.pinned?.note?.length == 0 ? (
          <div className="p-4">
            <input
              className="bg-transparent border-none outline-none "
              placeholder="Empty Note"
            />
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-[20px]">{props.pinned?.title}</h1>
            <p className="text-[16px] whitespace-break-spaces ">
              {props.pinned?.note?.slice(0, 600)}...
            </p>
          </div>
        )}
      </div>
      {props?.showId == props?.pinned?._id ? (
        <Tippy placement="bottom" content="Select note">
          <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
        </Tippy>
      ) : (
        " "
      )}
      {props?.showId == props?.pinned?._id ? (
        <div
          style={{
            backgroundColor:
              props?.pinned?.bgColor || props?.pinned?.bgImage
                ? props?.pinned?.bgColor || props?.pinned?.bgImage
                : "",
          }}
          className="absolute z-10 bottom-0 left-0 w-full flex justify-around  "
        >
          <Tippy placement="bottom" content="Notification">
            <span
              className="p-2 rounded-full hover:bg-hover"
              onClick={() => setOpenNotifyModal(true)}
            >
              {
                <BiBellPlus
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }
            </span>
          </Tippy>

          {openNotifyModal ? (
            <div className="absolute left-0 bottom-[-210px] z-20 p-4 rounded-[10px] bg-darkmode text-white">
              <div className=" ">
                <p>Remainder: </p>
                <ul>
                  <li className="hover:bg-hover p-2 cursor-pointer ">
                    Tomorrow <span>8am </span>{" "}
                  </li>
                  <li className="hover:bg-hover p-2 cursor-pointer">
                    Next Week <span>8am </span>{" "}
                  </li>
                  <li className="flex items-center gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <LuClock /> Pick date and time{" "}
                  </li>
                  <li className="flex items-center gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <IoLocationOutline /> Pick place and time{" "}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <Tippy placement="bottom" content="Collaborator ">
            <span
              onClick={() => {
                setNoteUrlParams(props.pinned?._id);
                setOpenCollabModal(!openCollabModal);
                props?.setOverLayBg(true);
              }}
              className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 "
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
                setNoteUrlParams(props.pinned?._id);
                setOpenBgModal(true);
              }}
              className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 cursor-pointer "
            >
              {
                <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
              }{" "}
            </span>
          </Tippy>
          <Tippy placement="bottom" content="Add image">
            <label
              onClick={() => {
                setNoteUrlParams(props.note?._id);
              }}
              htmlFor="fileInputImage"
              className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 "
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
            onChange={(e) => uploadMedia(e.target.files, "image")}
            id="fileInputImage"
            style={{ display: "none" }}
          />
          {/* <form> */}
          <Tippy placement="bottom" content="Archive ">
            <button
              onClick={archiveNote}
              className="p-2 rounded-full hover:bg-hover cursor-pointer "
            >
              {
                <BiArchiveIn
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </button>
          </Tippy>
          {/* </form> */}
          <Tippy placement="bottom" content="More ">
            <span className="p-2 rounded-full hover:bg-hover cursor-pointer ">
              {
                <BiDotsVerticalRounded
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
        </div>
      ) : (
        ""
      )}
      {props?.showId == props?.pinned?._id ? (
        <form onSubmit={unPinNote}>
          <Tippy placement="bottom" content="Unpin note ">
            <button
              type="submit"
              className="absolute top-[10px] right-[5px] z-10 p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] border-none outline-none "
            >
              <BsPinFill
                className="  text-[18px] max-sm:text-[18px] max-md:text-[26px] "
                cursor="pointer"
              />
            </button>
          </Tippy>
        </form>
      ) : (
        " "
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

      {openCollabModal ? (
        <AnimatePresence>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" "
          >
            <Collaborators
              noteUrlParams={noteUrlParams}
              setOpenCollabModal={setOpenCollabModal}
              setOverLayBg={props.setOverLayBg}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}

      {openBgModal ? (
        <div>
          <BgPin
            noteUrlParams={noteUrlParams}
            setOpenBgModal={setOpenBgModal}
          />
        </div>
      ) : (
        ""
      )}

      {pinnedModal ? (
        <div>
          <PinnedModal
            noteUrlParams={noteUrlParams}
            setPinnedModal={setPinnedModal}
            pinnedModal={pinnedModal}
            setOverLayBg={props.setOverLayBg}
          />
        </div>
      ) : (
        ""
      )}
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

export default ShowPinned;
