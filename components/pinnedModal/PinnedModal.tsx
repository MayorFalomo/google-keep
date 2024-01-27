"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
  BiUndo,
} from "react-icons/bi";
import { BsPin } from "react-icons/bs";
import { GrRedo } from "react-icons/gr";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

type Props = {};

const PinnedModal = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [singleNote, setSingleNote] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");
  const [editPicture, setEditPicture] = useState<string>("");
  const [editVideo, setEditVideo] = useState<string>("");
  const [editBgImage, setEditBGImage] = useState<string>("");
  const [editBgColor, setEditBGColor] = useState<string>("");
  const [editRemainder, setEditRemainder] = useState<boolean>(false);
  const [editCollaborator, setEditCollaborator] = useState<string>("");
  const [label, setLabel] = useState<any>("");
  const [location, setLocation] = useState<string>("");

  // console.log(props?.noteUrlParams, "this is url params");

  useEffect(() => {
    if (props?.noteUrlParams) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/pinned-id/${props.noteUrlParams}`
        )
        .then((res) => setSingleNote(res.data))
        .catch((err) => console.log(err));
    }
  }, [props.noteUrlParams]);

  const handleEditNote = async (e: any) => {
    e.preventDefault();
    const updatedNote = {
      _id: singleNote?._id,
      note: editNote ? editNote : singleNote?.note,
      title: editTitle ? editTitle : singleNote?.title,
      picture: editPicture ? editPicture : singleNote?.picture,
      video: editVideo ? editVideo : singleNote?.video,
      bgImage: editBgImage ? editBgImage : singleNote?.bgImage,
      bgColor: editBgColor ? editBgColor : singleNote?.bgColor,
      remainder: editRemainder ? editRemainder : singleNote?.remainder,
      collaborator: editCollaborator
        ? editCollaborator
        : singleNote?.collaborator,
      label: label ? label : singleNote?.label,
      // labelId: singleNote?.labelId,
      location: location.length > 1 ? location : singleNote?.location,
      createdAt: Date.now(),
    };
    try {
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/update/pinned-note/${props.noteUrlParams}`,
        updatedNote
      );

      // Update the note in contextValue.notes
      contextValue.setNotes((prevNotes: any) =>
        prevNotes.map((note: any) =>
          note._id == updatedNote._id ? updatedNote : note
        )
      );

      // Update the note in contextValue.pinnedNote if it exists
      contextValue.setPinnedNote((prevPinnedNotes: any) =>
        prevPinnedNotes.map((note: any) =>
          note._id == updatedNote?._id ? updatedNote : note
        )
      );
      props.setPinnedModal(false);
      props?.setOverLayBg(false);
      contextValue?.setOverLay(false);
      editNote.length > 0 ? toast.success("Note updated successfully") : "";
    } catch (error) {
      console.log(error);
    }
  };

  //Function to calculate how many columns should be used for the modal size
  const calculateColumns = (noteLength: number) => {
    // Define your breakpoints and corresponding column numbers
    const breakpoints = [30, 100, 900]; // You can adjust these values
    const columns = [2, 4, 7, 10]; // Adjust these based on your layout needs

    // Find the appropriate column based on the note length
    for (let i = 0; i < breakpoints.length; i++) {
      if (noteLength <= breakpoints[i]) {
        return columns[i];
      }
    }

    // Default to the last column value
    return columns[columns.length - 1];
  };

  const columns: number = calculateColumns(singleNote?.note?.length);

  return (
    <div
      className="fixed z-30 min-h-[200px] bg-darkmode h-fit w-1/2 border-2 border-[#5F6368] m-auto inset-x-0 inset-y-0 rounded-[10px] p-[8px]  max-[1000px]:w-[80%] max-[600px]:h-screen max-[600px]:w-full max-[600px]:rounded-none max-[600px]:border-none max-[600px]:overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']  "
      style={{
        backgroundColor: singleNote?.bgColor ? singleNote?.bgColor : "#202124",
        backgroundImage: `url(${
          singleNote?.bgImage ? singleNote?.bgImage : ""
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {singleNote?.canvas?.map((canvas: any, index: number) => {
        return <CanvasImage key={index} canvas={canvas} />;
      })}
      {singleNote?.picture ? (
        <div>
          <Image
            className="w-[100%] max-h-[350px] h-300px object-cover "
            width={200}
            height={120}
            src={singleNote?.picture}
            // objectFit="cover"
            alt=" "
          />
        </div>
      ) : (
        ""
      )}
      {singleNote?.video ? (
        <video
          className="w-[100%] max-h-[150px]"
          width={200}
          height={120}
          controls
          src={singleNote?.video}
          // objectFit="cover"
        ></video>
      ) : (
        ""
      )}
      <div className="h-[100%]">
        <form className="h-full max-sm:mt-[20px]" onSubmit={handleEditNote}>
          <div className="flex items-center">
            <input
              className="w-full bg-transparent p-2 text-[22px] font-semibold border-none outline-none"
              type="text"
              defaultValue={singleNote?.title || editTitle}
              placeholder="Title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <span className="p-3 rounded-full hover:bg-[#28292C]">
              {
                <BsPin
                  className="  text-[#9AA0A6] text-[22px] max-sm:text-[20px] max-md:text-[16px] lg:text-3xl cursor-not-allowed "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </div>
          <div className="max-[600px]:h-[75%] max-[600px]:max-h-fit max-[450px]:h-[70%]">
            <textarea
              className="max-h-[100%] bg-transparent text-white h-100% whitespace-break-spaces  w-full text-[16px] outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] max-[600px]:h-[100%]"
              onChange={(e) => setEditNote(e.target.value)}
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
            />
          </div>
          <p className="flex justify-end m-2 ">
            Edited {moment(singleNote?.createdAt).format("MMMM do")}{" "}
          </p>
          <div className="flex justify-between item-center gap-4 max-[450px]:flex-col max-sm:gap-2">
            <div className="flex item-center gap-2 max-sm:gap-[5px] ">
              <span className="p-3 rounded-full hover:bg-[#28292C] cursor-pointer ">
                {
                  <BiBellPlus
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <MdOutlinePersonAddAlt1
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <IoColorPaletteOutline
                    className="  text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <BiDotsVerticalRounded
                    className="  text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#28292C]">
                {
                  <GrRedo
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </div>

            <div className=" flex justify-end">
              <button
                type="submit"
                className="cursor-pointer text-[22px] max-md:text-[18px] max-sm:text-[16px]"
              >
                Close{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CanvasImage = (canvas: any) => {
  // console.log(canvas.canvas, "canvasImage");
  return (
    <div className=" ">
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
    <div className="w-[100%] h-[100%] max-[600px]:h-[100%] ">
      <img
        src={canvas.canvas?.imageDataURL}
        className="w-[100%] h-[100%] max-[600px]:h-[30%] "
      />
    </div>
  );
};

export default PinnedModal;
