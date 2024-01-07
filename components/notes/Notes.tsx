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
import Drawing from "../createCanvas/canvas/Drawing";
import NoteBg from "../noteBg/NoteBg";
import BgImage from "../noteBg/BgImage";
import Collaborators from "../collaborators/Collaborators";
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
  const [label, setLabel] = useState<any>(" ");
  const [labelId, setLabelId] = useState<any>(" ");
  const [location, setLocation] = useState<string>("");
  const [noteCanvas, setNoteCanvas] = useState<any>([]);
  const [noteUrlParams, setNoteUrlParams] = useState<string>("");
  const [openCreateCanvas, setOpenCreateCanvas] = useState<boolean>(false);
  const [showBgModal, setShowBgModal] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [openCollabModal, setOpenCollabModal] = useState<boolean>(false); //State that controls the collab modal

  //generateId
  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    if (typeof window !== "undefined") {
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join("");
    }
  }

  const randomId = generateId(24);
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
      label,
      location,
      canvas: noteCanvas,
    };
    try {
      const response = await axios.post(
        `https://keep-backend-theta.vercel.app/api/notes/create-note`,
        newNote
      );
      // console.log(response);

      const createdNote = response.data; // Assuming the server returns the created note
      // console.log(createdNote);

      // window.location.replace("/tweets/" + res.data._id)
      contextValue?.setNotes((prevNotes: any) => [createdNote, ...prevNotes]);
      // contextValue?.setNotes(...contextValue?.notes.unshift(newNote));
      // contextValue?.setNotes([...contextValue?.notes, response].reverse());
      // console.log("Note has been added successfully");
      contextValue.setOpenTextArea(false);
      setTitle("");
      setNote(" ");
      // console.log(tweets);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(randomId, "This is randomId");

  const createNoteWithPicture = (files: any, mediaType: string) => {
    setNoteUrlParams(randomId !== undefined ? randomId : "");
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
            label,
            labelId,
            location,
            canvas: noteCanvas,
          };

          //route to upload a picture or video
          // const updateEndpoint = mediaType == "image"
          //     ? "https://keep-backend-theta.vercel.app/api/notes/upload-picture"
          //     : "https://keep-backend-theta.vercel.app/api/notes/upload-video";

          try {
            // console.log(newNoteObject, mediaObject);

            axios
              .post(
                `https://keep-backend-theta.vercel.app/api/notes/create-note-with-picture`,
                newNoteObject
              )
              .catch((err) => console.log(err));
            contextValue?.setNotes((prevNotes: any) => [
              newNoteObject,
              ...prevNotes,
            ]);

            // contextValue?.setNotes(
            //   [...contextValue?.notes, newNoteObject].reverse()
            // );

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
    label,
    location,
  };

  const colors = [
    {
      id: 1,
      name: "Coral",
      color: "#77172E",
    },
    {
      id: 2,
      name: "Peach",
      color: "#692B17",
    },
    {
      id: 3,
      name: "Sand",
      color: "#7C4A03",
    },
    {
      id: 4,
      name: "Mint",
      color: "#264D3B",
    },
    {
      id: 5,
      name: "Sage",
      color: "#0C625D",
    },
    {
      id: 6,
      name: "Fog",
      color: "#256377",
    },
    {
      id: 7,
      name: "Storm",
      color: "#284255",
    },
    {
      id: 8,
      name: "Dusk",
      color: "#472E5B",
    },
    {
      id: 9,
      name: "Blossom",
      color: "#6C394F",
    },
    {
      id: 10,
      name: "Clay",
      color: "#4B443A",
    },
    {
      id: 11,
      name: "Chalk",
      color: "#232427",
    },
  ];

  const bgImages = [
    {
      id: 1,
      name: "Groceries",
      image: `https://www.gstatic.com/keep/backgrounds/grocery_dark_thumb_0615.svg`,
    },
    {
      id: 2,
      name: "Food",
      image: `https://www.gstatic.com/keep/backgrounds/food_dark_thumb_0615.svg`,
    },
    {
      id: 3,
      name: "Music",
      image: `https://www.gstatic.com/keep/backgrounds/music_dark_thumb_0615.svg`,
    },
    {
      id: 4,
      name: "Recipe",
      image: `https://www.gstatic.com/keep/backgrounds/recipe_dark_thumb_0615.svg`,
    },
    {
      id: 5,
      name: "Notes",
      image: `https://www.gstatic.com/keep/backgrounds/notes_dark_thumb_0715.svg`,
    },
    {
      id: 6,
      name: "Places",
      image: `https://www.gstatic.com/keep/backgrounds/places_dark_thumb_0615.svg`,
    },
    {
      id: 7,
      name: "Travel",
      image: `https://www.gstatic.com/keep/backgrounds/travel_dark_thumb_0615.svg`,
    },
    {
      id: 8,
      name: "Videos",
      image: `https://www.gstatic.com/keep/backgrounds/video_dark_thumb_0615.svg`,
    },
    {
      id: 9,
      name: "Celebration",
      image: `https://www.gstatic.com/keep/backgrounds/celebration_dark_thumb_0715.svg`,
    },
  ];

  const createPinned = async () => {
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
      label,
      location,
      canvas: noteCanvas,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/add-pinned`,
          newNote
        )
        .then(() =>
          axios.post(
            `https://keep-backend-theta.vercel.app/api/notes/create-note`,
            newNote
          )
        )
        .then(() =>
          contextValue?.setPinnedNote((prevNotes: any) => [
            newNote,
            ...prevNotes,
          ])
        )
        .then(() => contextValue?.setNotes((prev: any) => [newNote, ...prev]))
        .catch((err) => console.log(err));

      contextValue.setOpenTextArea(false);
      setTitle("");
      setNote(" ");
    } catch (err) {
      console.log(err);
    }
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
              style={{
                backgroundColor: bgColor ? bgColor : "transparent",
                backgroundImage: backgroundImage
                  ? `url(${backgroundImage})`
                  : "",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center justify-between ">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent p-2 text-[22px] font-semibold border-none outline-none"
                  placeholder="Title"
                />
                <Tippy placement="bottom" content="pin note ">
                  <button
                    onClick={() => createPinned}
                    className="p-3 rounded-full hover:bg-[#28292C]"
                  >
                    {
                      <BsPin
                        className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </button>
                </Tippy>
              </div>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                className="bg-transparent text-white w-full text-[18px] border-none outline-none resize-none whitespace-break-spaces [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] "
                placeholder="Take a note..."
              />
              <div className="flex item-center gap-6 ">
                <Tippy placement="bottom" content="Remind me">
                  <span className="p-3 rounded-full cursor-not-allowed ">
                    {
                      <BiBellPlus
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        // cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Collaborator ">
                  <span
                    onClick={() => setOpenCollabModal(true)}
                    className="p-3 rounded-full hover:bg-[#28292C]"
                  >
                    {
                      <MdOutlinePersonAddAlt1
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                {openCollabModal ? (
                  <Collaborators setOpenCollabModal={setOpenCollabModal} />
                ) : (
                  ""
                )}
                <Tippy placement="bottom" content="Background options ">
                  <span
                    onClick={() => setShowBgModal(!showBgModal)}
                    className="p-3 rounded-full hover:bg-[#28292C]"
                  >
                    {
                      <IoColorPaletteOutline
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                {showBgModal ? (
                  <AnimatePresence>
                    <motion.div
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[#2D2E30] fixed z-30 h-fit max-h-[200px] w-fit m-auto inset-x-0 inset-y-0 rounded-[10px]"
                    >
                      <div className="flex flex-col items-start justify-center gap-2 h-full p-1">
                        <div className="flex items-start gap-3">
                          {colors?.map((bgColor: any) => {
                            return (
                              <div key={bgColor?.id}>
                                <NoteBg
                                  bgColor={bgColor}
                                  setBgColor={setBgColor}
                                  setBackgroundImage={setBackgroundImage}
                                  setShowBgModal={setShowBgModal}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div
                          style={{ border: "1px solid #5F6368" }}
                          className="w-full "
                        ></div>
                        <div className="flex items-center gap-3">
                          {bgImages.map((bgImage: any) => {
                            return (
                              <div className="" key={bgImage?.id}>
                                <BgImage
                                  bgImage={bgImage}
                                  setBgColor={setBgColor}
                                  setBackgroundImage={setBackgroundImage}
                                  setShowBgModal={setShowBgModal}
                                  // setBackgroundColor={setBackgroundColor}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  ""
                )}
                <Tippy placement="bottom" content="Add image">
                  <label
                    htmlFor="fileInputImage"
                    className="p-3 rounded-full hover:bg-[#28292C]"
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
                  <span
                    onClick={() => toast.success("Note archived")}
                    className="p-3 rounded-full hover:bg-[#28292C]"
                  >
                    {
                      <BiArchiveIn
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="More ">
                  <span className="p-3 rounded-full hover:bg-[#28292C]">
                    {
                      <BiDotsVerticalRounded
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Undo ">
                  <span className="p-3 rounded-full  cursor-not-allowed ">
                    {
                      <BiUndo
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        // cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="Redo ">
                  <span className="p-3 rounded-full cursor-not-allowed ">
                    {
                      <GrRedo
                        className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                        // cursor="pointer"
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
                  <span className="p-4 rounded-full hover:bg-[#28292C]">
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
                    className="p-4 rounded-full hover:bg-[#28292C]"
                  >
                    {
                      <IoBrushOutline
                        className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                        cursor="pointer"
                      />
                    }{" "}
                  </span>
                </Tippy>
                <Tippy placement="bottom" content="New note with image ">
                  <label
                    htmlFor="fileInputImage"
                    className="p-4 rounded-full hover:bg-[#28292C]"
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
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </form>
      {openCreateCanvas ? (
        <div className="fixed z-50 top-0 left-0 h-full w-full">
          <Drawing
            setOpenCreateCanvas={setOpenCreateCanvas}
            canvasNoteObject={canvasNoteObject}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
