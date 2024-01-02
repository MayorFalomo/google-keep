"use client";
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
  const [singleNote, setSingleNote] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");
  const [editPicture, setEditPicture] = useState<string>("");
  const [editDrawing, setEditDrawing] = useState<string>("");
  const [editBgImage, setEditBGImage] = useState<string>("");
  const [editBgColor, setEditBGColor] = useState<string>("");
  const [editRemainder, setEditRemainder] = useState<boolean>(false);
  const [editCollaborator, setEditCollaborator] = useState<string>("");
  const [label, setLabel] = useState<any>([]);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/pinned-id/${props.noteUrlParams}`
      )
      .then((res) => setSingleNote(res.data))
      .catch((err) => console.log(err));
  }, [props.noteUrlParams]);
  // console.log(singleNote);

  const handleEditNote = async (e: any) => {
    e.preventDefault();
    const updatedNote = {
      _id: singleNote?._id,
      note: editNote ? editNote : singleNote?.note,
      title: editTitle ? editTitle : singleNote?.title,
      picture: editPicture ? editPicture : singleNote?.picture,
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
      props.setPinnedModal(false);
      props.setOverLayBg(false);
      toast.success("Note updated successfully");
    } catch (error) {
      console.log(error);
    }
    // props.setNoteModal(false);
    // props.setOverLayBg(false);
  };

  // console.log(singleNote);

  return (
    <div
      className="fixed z-20 min-h-[200px] h-fit w-1/2 border-2 border-[#5F6368] m-auto inset-x-0 inset-y-0 rounded-[10px] p-[8px]"
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
        <form className="h-full " onSubmit={handleEditNote}>
          <div className="flex items-center">
            <input
              className="w-full bg-transparent p-2 text-[22px] font-semibold border-none outline-none"
              type="text"
              defaultValue={singleNote?.title || editTitle}
              placeholder="Title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <span className="p-3 rounded-full hover:bg-hover">
              {
                <BsPin
                  className=" text-[#9AA0A6] text-[24px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </div>
          <div className=" h-[50%]">
            <textarea
              className="bg-transparent text-white h-full w-full text-[16px] outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              onChange={(e) => setEditNote(e.target.value)}
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
            />
          </div>
          <p className="flex justify-end m-2 ">
            Edited {moment(singleNote?.createdAt).format("MMMM do")}{" "}
          </p>
          <div className="flex justify-between item-center gap-4 ">
            <div className="flex item-center gap-4 ">
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiBellPlus
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <MdOutlinePersonAddAlt1
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <IoColorPaletteOutline
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiDotsVerticalRounded
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-hover">
                {
                  <GrRedo
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[22px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </div>

            <div className=" flex justify-end">
              <button type="submit" className="cursor-pointer ">
                Close{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinnedModal;
