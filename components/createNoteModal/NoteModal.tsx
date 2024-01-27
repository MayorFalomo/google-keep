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
import {
  IoCloseOutline,
  IoColorPaletteOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";

type Props = {};

//Parent component is ShowNote.tsx
const NoteModal = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [singleNote, setSingleNote] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");
  const [editPicture, setEditPicture] = useState<string>("");
  const [editVideo, setEditVideo] = useState<string>("");
  const [editBgImage, setEditBGImage] = useState<string>("");
  const [editBgColor, setEditBGColor] = useState<string>("");
  const [editRemainder, setEditRemainder] = useState<boolean>(false);
  const [editCollaborator, setEditCollaborator] = useState<any>([]);
  const [label, setLabel] = useState<any>("");
  const [noteCanvas, setNoteCanvas] = useState<any>([]);
  const [closeIcon, setCloseIcon] = useState(false);
  const [editLocation, EditLocation] = useState<string>("");

  const storeId = props.noteUrlParams;

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

  const handleEditNote = async (e: any) => {
    e.preventDefault();

    const updatedNote = {
      _id: props.noteUrlParams,
      note: editNote || singleNote?.note,
      title: editTitle || singleNote?.title,
      picture: editPicture || singleNote?.picture,
      video: editVideo || singleNote?.video,
      bgImage: editBgImage || singleNote?.bgImage,
      bgColor: editBgColor || singleNote?.bgColor,
      remainder: editRemainder || singleNote?.remainder,
      collaborator: editCollaborator || singleNote?.collaborator,
      label: label || singleNote?.label,
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
          updatedNotes[index] = {
            ...prevNotes[index],
            ...updatedNote,
          };
          return updatedNotes;
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
      props.setNoteModal(false);
      contextValue?.setOverLay(false);
      editNote.length > 0 ? toast.success("Note updated successfully") : "";
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate: Moment = moment(singleNote?.createdAt);

  const removeLocation = async (e: any) => {
    e.preventDefault();
    props?.setNoteModal(false);

    const noteId = props.note?._id;

    try {
      props?.setNoteModal(false);
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/delete-country/${noteId}`
      );

      contextValue?.setNotes((prevNotes: any) => {
        const updatedNotes = prevNotes.map((note: any) => {
          if (note._id == noteId) {
            // Update the location to an empty string for the specific note
            return { ...note, location: " " };
          }
          return note;
        });
        return updatedNotes;
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Function to pin note
  const pinNote = async (e: any) => {
    e.preventDefault();

    const pinThisNote = {
      _id: props.noteUrlParams,
      userId: singleNote?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: singleNote?.username,
      title: singleNote?.title,
      note: singleNote?.note,
      picture: singleNote?.picture,
      video: singleNote?.video,
      drawing: singleNote?.drawing,
      bgImage: singleNote?.bgImage,
      bgColor: singleNote?.bgColor,
      remainder: singleNote?.remainder,
      collaborator: singleNote?.collaborator,
      label: singleNote?.label,
      location: singleNote?.location,
      canvas: singleNote?.canvas,
      createdAt: new Date(),
    };

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/add-pinned`,
          pinThisNote
        )
        .then(() =>
          contextValue.setPinnedNote(
            [...contextValue?.pinnedNote, pinThisNote].reverse()
          )
        )
        .catch((err) => console.log(err));

      toast.success("Note Pinned Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  //Function for responsive/resizable note modal based on the content inside
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
      style={{
        backgroundColor:
          singleNote?.bgColor.length > 0 ? singleNote?.bgColor : "#202124",
        backgroundImage: `url(${
          singleNote?.bgImage ? singleNote?.bgImage : ""
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`${
        singleNote?.bgColor.length > 0 ? singleNote?.bgColor : "#202124"
      } bg-darkmode fixed top-[10px] left-0 z-20 h-fit w-1/2 m-auto border-[#5F6368] inset-x-0 inset-y-0 rounded-[10px] border-2 border-[#] p-[8px] max-[1000px]:w-[80%] max-[600px]:h-screen max-[600px]:w-full max-[600px]:rounded-none max-[600px]:border-none max-[600px]:border-2 max-[600px]:overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] `}
    >
      {singleNote?.canvas?.map((canvas: any, index: number) => {
        return <CanvasImage key={index} canvas={canvas} />;
      })}
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
        <form className="h-full mt-[10px] " onSubmit={handleEditNote}>
          <div className="flex items-center max-[600px]:mt-5px  ">
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
            <span
              onClick={pinNote}
              className="p-3 rounded-full hover:bg-[#313236] cursor-pointer"
            >
              {
                <BsPin
                  className=" text-[#9AA0A6] text-[22px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl "
                  cursor="pointer"
                />
              }
            </span>
          </div>
          <div className="max-[600px]:h-[75%] max-[600px]:max-h-fit max-[450px]:h-[70%]">
            <textarea
              typeof="text"
              className="max-h-[100%] bg-transparent text-white h-100% whitespace-break-spaces  w-full text-[16px] font-medium outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] max-[600px]:h-[100%] "
              // className="bg-darkmode w-full "
              defaultValue={singleNote?.note || editNote}
              placeholder="Note"
              rows={columns}
              // rows={singleNote?.note.length > 300 ? 6 : 4}
              onChange={(e: any) => {
                setEditNote(e.target.value);
                // e.stopPropagation();
              }}
            />
          </div>
          <form onSubmit={removeLocation}>
            {props.note?.location ? (
              <p
                onMouseOver={() => {
                  setCloseIcon(true);
                }}
                onMouseLeave={() => setCloseIcon(false)}
                className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
              >
                <IoLocationOutline />
                {props.note?.location}{" "}
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
            ) : (
              ""
            )}
          </form>
          <p className="flex justify-end m-2  ">
            Edited {formattedDate.format("MMMM Do")}{" "}
          </p>
          <div className="flex justify-between item-center gap-4 max-[450px]:flex-col max-sm:gap-2 ">
            <div className="flex item-center gap-2 max-sm:gap-[5px]">
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiBellPlus
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <MdOutlinePersonAddAlt1
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <IoColorPaletteOutline
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiImageAlt
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px] "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiDotsVerticalRounded
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer">
                {
                  <BiUndo
                    className=" text-[#9AA0A6] text-[22px] max-sm:text-[16px] max-md:text-[20px]  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
              <span className="p-3 rounded-full hover:bg-[#313236] cursor-pointer ">
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
                // onClick={() => }
                className="cursor-pointer text-[22px] max-md:text-[18px] max-sm:text-[16px] "
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

const CanvasImage = (canvas: any) => {
  // console.log(canvas.canvas, "canvasImage");
  return (
    <div className=" ">
      {canvas.canvas.map((canvas: any, index: number) => {
        return <ShowCanvasImage key={index} canvas={canvas} />;
      })}
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

export default NoteModal;
