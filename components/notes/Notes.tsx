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
import { AnimatePresence, motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import toast from "react-hot-toast";
import Canvas from "../createCanvas/canvas/Canvas";
type Props = {};

const Notes = (props: Props) => {
  const { contextValue }: any = useAppContext();
  const [noteId, setNoteId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [drawing, setDrawing] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [remainder, setRemainder] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<string>("");
  const [labels, setLabels] = useState<any>([]);
  const [location, setLocation] = useState<string>("");
  const [noteCanvas, setNoteCanvas] = useState<any>([]);
  const [noteUrlParams, setNoteUrlParams] = useState<string>("");
  const [openCreateCanvas, setOpenCreateCanvas] = useState<boolean>(false);

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
      video,
      drawing,
      bgImage,
      bgColor,
      remainder,
      collaborator,
      labels,
      location,
      canvas: noteCanvas,
    };
    try {
      await axios.post(
        `https://keep-backend-theta.vercel.app/api/notes/create-note`,
        newNote
      );
      // window.location.replace("/tweets/" + res.data._id)
      contextValue?.setNotes((prevNotes: any) => [newNote, ...prevNotes]);
      // contextValue?.setNotes(...contextValue?.notes.unshift(newNote));
      // contextValue?.setNotes([...contextValue?.notes, newNote].reverse());
      // console.log("Note has been added successfully");
      contextValue.setOpenTextArea(false);
      setTitle("");
      setNote(" ");
      // console.log(tweets);
    } catch (err) {
      console.log(err);
    }
  };

  const createNoteWithPicture = (files: any, mediaType: string) => {
    setNoteUrlParams(generateId(24));
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    const uploadEndpoint =
      mediaType == "image"
        ? "https://api.cloudinary.com/v1_1/dsghy4siv/image/upload"
        : "https://api.cloudinary.com/v1_1/dsghy4siv/video/upload";

    axios
      .post(uploadEndpoint, formData)
      .then((res) => {
        // setPicture("");
        // setVideo("");

        if (res.data.url) {
          const mediaObject =
            mediaType == "image"
              ? { picture: res.data.url, video: "" }
              : { video: res.data.url, picture: "" };

          const newNoteObject = {
            id: generateId(24),
            ...mediaObject,
            userId: contextValue.user?._id,
            username: contextValue.user?.username,
            title,
            note,
            drawing,
            bgImage,
            bgColor,
            remainder,
            collaborator,
            labels,
            location,
            canvas: noteCanvas,
          };

          //route to upload a picture or video
          // const updateEndpoint = mediaType == "image"
          //     ? "https://keep-backend-theta.vercel.app/api/notes/upload-picture"
          //     : "https://keep-backend-theta.vercel.app/api/notes/upload-video";

          try {
            axios
              .post(`http:localhost:5000/api/notes/create-note`, newNoteObject)
              .catch((err) => console.log(err));
            contextValue?.setNotes((prevNotes: any) => [
              newNoteObject,
              ...prevNotes,
            ]);

            contextValue?.setNotes(
              [...contextValue?.notes, newNoteObject].reverse()
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

  const canvasNoteObject = {
    userId: contextValue.user?._id,
    username: contextValue.user?.username,
    _id: generateId(24),
    title,
    note,
    picture,
    video,
    drawing,
    bgImage,
    bgColor,
    remainder,
    collaborator,
    labels,
    location,
  };

  return (
    <div className="bg-red">
      <form onSubmit={createNote} className="flex justify-center">
        {contextValue.openTextArea ? (
          <AnimatePresence>
            <motion.div
              className="p-4  rounded-[10px] border-2 border-[#525355] "
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
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
                <Tippy placement="bottom" content="Remind me">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <BiBellPlus
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Collaborator ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <MdOutlinePersonAddAlt1
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Background options ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <IoColorPaletteOutline
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Add image">
                  <label
                    htmlFor="fileInputImage"
                    className="p-3 rounded-full hover:bg-hover"
                  >
                    {
                      <BiImageAlt
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </label>
                </Tippy>
                <input
                  type="file"
                  onChange={(e) =>
                    createNoteWithPicture(e.target.files, "image")
                  }
                  id="fileInputImage"
                  style={{ display: "none" }}
                />
                <Tippy placement="bottom" content="Archive ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <BiArchiveIn
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="More ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <BiDotsVerticalRounded
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Undo ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <BiUndo
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Redo ">
                  <span className="p-3 rounded-full hover:bg-hover">
                    {
                      <GrRedo
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
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
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              className="flex items-center min-w-[50%] rounded-[10px] border-2 border-[#525355]  "
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <input
                className="bg-transparent outline-none w-full placeholder:text-[#E9E9E9]  px-4 text-[20px] font-weight: black"
                onClick={() => contextValue.setOpenTextArea(true)}
                type="text"
                placeholder="Take a note..."
              />
              <div className="flex items-center gap-6">
                <Tippy placement="bottom" content="New list ">
                  <span className="p-4 rounded-full hover:bg-hover">
                    {
                      <AiOutlineCheckSquare
                        className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="New note with Drawing ">
                  <span
                    onClick={() => setOpenCreateCanvas(true)}
                    className="p-4 rounded-full hover:bg-hover"
                  >
                    {
                      <IoBrushOutline
                        className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="New note with picture ">
                  <label
                    htmlFor="fileInputImage"
                    className="p-4 rounded-full hover:bg-hover"
                  >
                    {
                      <BiImageAlt
                        className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </label>
                </Tippy>
                <input
                  type="file"
                  onChange={(e) =>
                    createNoteWithPicture(e.target.files, "image")
                  }
                  id="fileInputImage"
                  style={{ display: "none" }}
                />
                {openCreateCanvas && (
                  <div className="fixed z-50 top-0 left-0 h-full w-full">
                    <Canvas
                      setOpenCreateCanvas={setOpenCreateCanvas}
                      canvasNoteObject={canvasNoteObject}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </form>
    </div>
  );
};

export default Notes;
