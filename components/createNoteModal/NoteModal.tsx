"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import moment, { Moment } from "moment";
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
import toast, { ToastBar, Toaster } from "react-hot-toast";

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
  const [editCollaborator, setEditCollaborator] = useState<any>([]);
  const [label, setLabel] = useState<any>([]);
  const [noteCanvas, setNoteCanvas] = useState<any>([]);

  const [editLocation, EditLocation] = useState<string>("");
  const [id, setId] = useState<string>(props.noteUrlParams);

  const storeId = props.noteUrlParams;

  // console.log(props?.noteUrlParams, "THis is note url params");

  useEffect(() => {
    if (props.noteUrlParams) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/get-note/${props.noteUrlParams}`
        )
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
      labels: label || singleNote?.label,
      location: editLocation || singleNote?.location,
      canvas: noteCanvas || singleNote?.canvas,
    };
    try {
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/update-note/${props?.noteUrlParams}`,
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
      // Or write the above function it this way
      //* contextValue?.setNotes((prevNotes: any) =>
      //*   prevNotes.map((note: any) =>
      //*     note._id == singleNote?._id ? { ...note, ...updatedNote } : note
      //   )
      // );
      //? contextValue?.setNotes((prevNotes: any) => [
      //?   { ...prevNotes, ...updatedNote },
      //? ]);
      // console.log(
      //   contextValue?.notes,
      //   [{ ...updatedNote }],
      //   "This is note modal"
      // );
      props.setNoteModal(false);
      contextValue?.setOverLay(false);
      toast.success("Note updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate: Moment = moment(singleNote?.createdAt);
  // console.log(formattedDate.format("MMMM Do"), "This is the formattedDate"); // Adjust the format as needed

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
          // objectFit="cover"
          alt=" "
        />
      ) : (
        ""
      )}
      {singleNote?.video ? (
        <video
          className="w-[100%] max-h-[350px] h-300px object-contain "
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
            <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
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
            Edited {formattedDate.format("MMMM Do")}{" "}
          </p>
          <div className="flex justify-between item-center gap-4 ">
            <div className="flex item-center gap-4 ">
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiBellPlus
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <MdOutlinePersonAddAlt1
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <IoColorPaletteOutline
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiDotsVerticalRounded
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[18px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer ">
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
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }: any) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
};

export default NoteModal;
