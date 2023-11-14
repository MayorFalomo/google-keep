"use client";
import axios from "axios";
import moment from "moment";
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
  const [singleNote, setSingleNote] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");
  const [editPicture, setEditPicture] = useState<string>("");
  const [editDrawing, setEditDrawing] = useState<string>("");
  const [editBgImage, setEditBGImage] = useState<string>("");
  const [editBgColor, setEditBGColor] = useState<string>("");
  const [editRemainder, setEditRemainder] = useState<string>("");
  const [editCollaborator, setEditCollaborator] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/get-note/${props.noteUrlParams}`)
      .then((res) => setSingleNote(res.data))
      .catch((err) => console.log(err));
  }, [props.noteUrlParams]);
  // console.log(singleNote);

  const handleEditNote = async (e: any) => {
    e.preventDefault();
    const updatedNote = {
      _id: singleNote?._id,
      note: editNote.length > 1 ? editNote : singleNote?.note,
      title: editTitle.length > 1 ? editTitle : singleNote?.title,
      picture: editPicture.length > 1 ? editPicture : singleNote?.picture,
      drawing: editDrawing.length > 1 ? editDrawing : singleNote?.drawing,
      bgImage: editBgImage.length > 1 ? editBgImage : singleNote?.bgImage,
      bgColor: editBgColor.length > 1 ? editBgColor : singleNote?.bgColor,
      remainder:
        editRemainder.length > 1 ? editRemainder : singleNote?.remainder,
      collaborator:
        editCollaborator.length > 1
          ? editCollaborator
          : singleNote?.collaborator,
      label: label.length > 1 ? label : singleNote?.label,
    };
    console.log(updatedNote);

    try {
      await axios.put(
        `http://localhost:5000/api/notes/update-note/${props.noteUrlParams}`,
        updatedNote
      );
    } catch (error) {
      console.log(error);
    }
    props.setNoteModal(false);
    props.setOverLayBg(false);
  };

  return (
    <div className="bg-darkmode fixed z-20 min-h-[200px] h-auto max-h-[300px] w-1/2 m-auto inset-x-0 inset-y-0 rounded-[10px] border-2 border-[#5F6368] p-[8px]">
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
              // className="bg-darkmode w-full "
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
              onChange={(e) => setEditNote(e.target.value)}
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
