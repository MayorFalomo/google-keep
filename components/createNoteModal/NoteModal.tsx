"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

//Parent component is ShowNote.tsx
const NoteModal = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [singleNote, setSingleNote] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");
  const [editPicture, setEditPicture] = useState<string>("");
  const [editDrawing, setEditDrawing] = useState<string>("");
  const [editBgImage, setEditBGImage] = useState<string>("");
  const [editBgColor, setEditBGColor] = useState<string>("");
  const [editRemainder, setEditRemainder] = useState<boolean>(false);
  const [editCollaborator, setEditCollaborator] = useState<any>();
  const [label, setLabel] = useState<string>("");
  const [editLocation, EditLocation] = useState<string>("");
  const [id, setId] = useState<string>(props.noteUrlParams);

  const storeId = props.noteUrlParams;

  useEffect(() => {
    if (props.noteUrlParams) {
      axios
        .get(`https://keep-backend-theta.vercel.app/api/notes/get-note/${props.noteUrlParams}`)
        .then((res) => setSingleNote(res.data))
        .catch((err) => console.log(err));
    }
  }, [props?.noteUrlParams]);

  // console.log(singleNote?._id, "THIS IS Single Note Id");
  // console.log(props.noteUrlParams, "This is noteUrlParams");
  // console.log(props, "This is props");

  const handleEditNote = async (e: any) => {
    e.preventDefault();
    // console.log(singleNote?._id, "This is single note id");

    const updatedNote = {
      _id: props.noteUrlParams,
      note: editNote || singleNote?.note,
      title: editTitle || singleNote?.title,
      picture: editPicture || singleNote?.picture,
      drawing: editDrawing || singleNote?.drawing,
      bgImage: editBgImage || singleNote?.bgImage,
      bgColor: editBgColor || singleNote?.bgColor,
      remainder: editRemainder || singleNote?.remainder,
      collaborator: editCollaborator || singleNote?.collaborator,
      label: label || singleNote?.label,
      location: editLocation || singleNote?.location,
    };
    try {
      await axios.put(
        `http://localhost:5000/api/notes/update-note/${storeId}`,
        updatedNote
      );

      contextValue?.setNotes((prevNotes: any) => {
        const index = prevNotes.findIndex(
          (note: any) => note?._id == singleNote?._id
        );

        if (index !== -1) {
          // If the note is found, update it
          const updatedNotes = [...prevNotes];
          updatedNotes[index] = { ...prevNotes[index], ...updatedNote };
          return updatedNotes.reverse();
        }

        // If the note is not found, return the original array
        return prevNotes;
      });
      // contextValue?.setNotes((prevNotes: any) =>
      //   prevNotes.map((note: any) =>
      //     note._id == singleNote?._id ? { ...note, ...updatedNote } : note
      //   )
      // );
      // contextValue?.setNotes((prevNotes: any) => [
      //   { ...prevNotes, ...updatedNote },
      // ]);
      // console.log(
      //   contextValue?.notes,
      //   [{ ...updatedNote }],
      //   "This is note modal"
      // );
      props.setNoteModal(false);
      props.setOverLay(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: singleNote?.bgColor ? singleNote?.bgColor : "#202124",
        backgroundImage: `url(${
          singleNote?.bgImage ? singleNote?.bgImage : ""
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="fixed z-20 min-h-[200px] h-fit w-1/2 m-auto inset-x-0 inset-y-0 rounded-[10px] border-2 border-[#5F6368] p-[8px]"
    >
      {singleNote?.picture ? (
        <Image
          className="w-[100%] max-h-[350px] h-300px object-cover "
          width={200}
          height={120}
          src={singleNote?.picture}
          objectFit="cover"
          alt=" "
        />
      ) : (
        ""
      )}
      {singleNote?.video ? (
        <video
          className="w-[100%] max-h-[350px] h-300px object-cover "
          width={200}
          height={120}
          controls
          src={singleNote?.video}
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
              defaultValue={singleNote?.title}
              placeholder="Title"
              autoFocus
              onChange={(e: any) => {
                setEditTitle(e.target.value);
                // e.stopPropagation();
              }}
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
          <div className="max-h-[100%]">
            <textarea
              typeof="text"
              className="bg-transparent text-white h-full w-full text-[16px] outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              // className="bg-darkmode w-full "
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
              onChange={(e: any) => {
                setEditNote(e.target.value);
                // e.stopPropagation();
              }}
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
              <button
                type="submit"
                // onClick={() => }
                className="cursor-pointer "
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

export default NoteModal;
