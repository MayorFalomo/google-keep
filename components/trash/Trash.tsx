import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiTrash,
} from "react-icons/bi";
import { BsCheck, BsPin } from "react-icons/bs";
import {
  IoArrowBackSharp,
  IoCloseOutline,
  IoColorPaletteOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import countryList from "react-select-country-list";
import Select from "react-select";
import axios from "axios";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { TbTrashX } from "react-icons/tb";
type Props = {};

const Archive = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []); //Options for country
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  // const [showBgModal, setShowBgModal] = useState(false);
  const [picture, setPicture] = React.useState<any>();
  const [video, setVideo] = useState<string>();
  const [openOptionsModal, setOpenOptionsModal] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [trashNote, setTrashNote] = useState<any>();
  const changeHandler = (countryValue: any) => {
    setCountryValue(countryValue);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    // e.stopPropagation();
    props.setNoteUrlParams(props?.trashedNote?._id);
    console.log(props?.trashedNote?._id, "This is the id");
    props?.setNoteModal(true);
    // console.log(noteModal, "This is Note Modal");
    // props?.setNoteModal(true);
    props?.setOverLay(true);

    // console.log(noteModal, "Hello!!....I am Clicking");
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
      _id: props?.trashedNote?._id,
      userId: props?.trashedNote?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props?.trashedNote?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props?.trashedNote?.username,
      title: props?.trashedNote?.title,
      note: props?.trashedNote?.note,
      picture: props?.trashedNote?.picture,
      video: props?.trashedNote?.video,
      drawing: props?.trashedNote?.drawing,
      bgImage: props?.trashedNote?.bgImage,
      bgColor: props?.trashedNote?.bgColor,
      remainder: props?.trashedNote?.remainder,
      collaborator: props?.trashedNote?.collaborator,
      labels: props?.trashedNote?.labels,
      location: props?.trashedNote?.location,
      createdAt: new Date(),
    };
    console.log(pinThisNote, "pin this note");

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/add-pinned/from-trash`,
          pinThisNote
        )
        .catch((err) => console.log(err));

      contextValue.setTrashedNotes((prevState: any) => {
        return prevState.filter(
          (note: any) => note?._id !== props?.trashedNote?._id
        );
      });
      contextValue.setPinnedNote((prevState: any) => {
        return [pinThisNote, ...prevState];
      });
      contextValue.setNotes((prevState: any) => {
        return [pinThisNote, ...prevState];
      });
      toast.success("Note Pinned Successfully!");
    } catch (err) {
      console.log(err);
      toast.success("Note not pinned!");
    }
  };

  const RestoreNote = async (e: any) => {
    e.preventDefault();
    const restoreThisNote = {
      _id: props?.trashedNote._id,
      userId: props?.trashedNote?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props?.trashedNote?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props?.trashedNote?.username,
      title: props?.trashedNote?.title,
      note: props?.trashedNote?.note,
      picture: props?.trashedNote?.picture,
      canvas: props?.trashedNote?.canvas,
      bgImage: props?.trashedNote?.bgImage,
      bgColor: props?.trashedNote?.bgColor,
      remainder: props?.trashedNote?.remainder,
      collaborator: props?.trashedNote?.collaborator,
      label: props?.trashedNote?.label,
      location: props?.trashedNote?.location,
      createdAt: props?.trashedNote.createdAt,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/untrash-note`,
          restoreThisNote
        )
        .catch((err) => console.log(err));
      contextValue?.setTrashedNotes((prevState: any) =>
        prevState.filter((note: any) => note._id !== props?.trashedNote?._id)
      );
      contextValue?.setNotes((prevState: any) => {
        return [restoreThisNote, ...prevState];
      });
      toast.success("Note removed from Trash");
      // Update the contextValue.notes array with updated note
    } catch (err) {
      console.log(err);
    }
  };

  const deleteForever = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const id = props?.trashedNote?._id;

    try {
      await axios.post(
        `https://keep-backend-theta.vercel.app/api/notes/delete-forever/${id}`
      );

      contextValue?.setTrashedNotes((prevState: any) =>
        prevState.filter((note: any) => note?._id !== props?.trashedNote?._id)
      );
      toast.success("Note deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: props?.trashedNote?.bgColor
          ? props?.trashedNote?.bgColor
          : "#202124",
        backgroundImage: props?.trashedNote?.bgImage
          ? `url(${props?.trashedNote?.bgImage})`
          : "#202124",
      }}
      className="mapped"
    >
      <div className="subContainer" onClick={handleClick}>
        {props?.trashedNote?.canvas?.map((canvas: any, index: number) => {
          return <CanvasImage key={index} canvas={canvas} />;
        })}
        {props?.trashedNote?.picture ? (
          <Image
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            src={props?.trashedNote?.picture}
            loading="lazy"
            // objectFit="cover"
            alt=" "
          />
        ) : (
          ""
        )}
        {props?.trashedNote?.video ? (
          <video
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            controls
            src={props?.trashedNote?.video}
            // objectFit="cover"
          ></video>
        ) : (
          ""
        )}
        {props?.trashedNote?.title?.length == 0 &&
        props.note?.note?.length == 0 ? (
          <div className="p-4">
            <input
              className="bg-transparent border-none outline-none "
              placeholder="Empty Note"
            />
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-[20px]">{props?.trashedNote?.title}</h1>
            <p className="text-[16px] whitespace-break-spaces ">
              {props?.trashedNote?.note?.slice(0, 600)}...
            </p>
            {props?.trashedNote?.location?.length > 1 ? (
              <form>
                <p
                  onMouseOver={() => {
                    setCloseIcon(true);
                  }}
                  onMouseLeave={() => setCloseIcon(false)}
                  className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                >
                  <IoLocationOutline />
                  {props?.trashedNote?.location}{" "}
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="outline-none border-none cursor-pointer p-1 rounded-full hover:bg-lighterHover "
                  >
                    {closeIcon ? (
                      <Tippy placement="bottom" content="Delete location ">
                        <IoCloseOutline />
                      </Tippy>
                    ) : (
                      ""
                    )}{" "}
                  </button>
                </p>
              </form>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {props?.showId == props?.trashedNote?._id ? (
        <Tippy placement="bottom" content="Select note">
          <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
        </Tippy>
      ) : (
        " "
      )}

      {props?.showId == props?.trashedNote?._id ? (
        <div className="absolute z-10 bottom-[5px] left-0 w-full flex gap-[8px] item-center ">
          <form onSubmit={deleteForever}>
            <Tippy placement="bottom" content="Delete forever ">
              <button
                type="submit"
                className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
              >
                {
                  <TbTrashX
                    className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                    cursor="pointer"
                  />
                }{" "}
              </button>
            </Tippy>
          </form>

          <form onSubmit={RestoreNote}>
            <Tippy placement="bottom" content="Restore ">
              <button
                type="submit"
                className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 cursor-pointer "
              >
                {
                  <MdOutlineRestoreFromTrash className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
                }{" "}
              </button>
            </Tippy>
          </form>

          <AnimatePresence>
            {openOptionsModal ? (
              <div className="py-2" id="options">
                {/* <Options trashNote={trashNote} /> */}
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
          (pinned: any) => pinned?._id == props?.trashedNote?._id
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
                className="absolute top-[10px] right-[5px] z-[9] p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] cursor-pointer border-none outline-none "
              >
                <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
              </button>
            </Tippy>
          </form>
        )
      ) : (
        ""
      )}

      {/* {props?.pinnedSuccess && <ToastContainer />} */}
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

export default Archive;
