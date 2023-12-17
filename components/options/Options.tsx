"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

type Props = {};

//Parent component is ShowNote.tsx
const Options = (props: any) => {
  const { contextValue }: any = useAppContext();

  // useEffect(() => {
  //   if (props.noteUrlParams) {
  //     axios
  //       .get(`http://localhost:5000/api/notes/get-note/${props.noteUrlParams}`)
  //       .then((res) => setSingleNote(res.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [props?.noteUrlParams]);

  const handleTrashNote = async () => {
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/trash-note`,
          props.trashNote
        )
        .then(() =>
          contextValue?.setNotes((prevState: any) =>
            prevState.filter((note: any) => note._id !== props.trashNote?._id)
          )
        )
        .catch((err: any) => console.log(err));
      contextValue?.setPinnedNote((prevState: any) => {
        return prevState.filter(
          (note: any) => note._id !== props.trashNote?._id
        );
      });
      toast.success("Note moved to Trash successfully");
    } catch (error) {
      console.log(error);
    }
  };

  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  const makeACopy = async () => {
    const createCopy = {
      _id: generateId(24),
      userId: props.trashNote?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.trashNote?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.trashNote?.username,
      title: props.trashNote?.title,
      note: props.trashNote?.note,
      picture: props.trashNote?.picture,
      video: props.trashNote?.video,
      drawing: props.trashNote?.drawing,
      bgImage: props.trashNote?.bgImage,
      bgColor: props.trashNote?.bgColor,
      remainder: props.trashNote?.remainder,
      collaborator: props.trashNote?.collaborator,
      labels: props.trashNote?.label,
      location: props.trashNote?.location,
      createdAt: new Date(),
    };
    console.log(createCopy);
    try {
      axios
        .post(`http://localhost:5000/api/notes/create-note`, createCopy)
        .catch((err) => console.log(err && toast.error("failed")));
      contextValue?.setNotes((prevNote: any) => {
        return [...prevNote, createCopy].reverse();
      });
      // contextValue?.setNotes([...contextValue?.notes, makeACopy]);
      toast.success("Copy successfully created");
      props?.setOpenOptionsModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Copy failed to create");
    }
  };

  return (
    <div>
      <ul className="">
        <li
          onClick={handleTrashNote}
          className="hover:bg-[#313236] p-3 w-full transition ease-in-out delay-100 cursor-pointer"
        >
          Delete Note{" "}
        </li>
        <li className="hover:bg-[#313236] p-3 transition ease-in-out delay-100 cursor-pointer">
          Add Label{" "}
        </li>
        <li className="hover:bg-[#313236] p-3 transition ease-in-out delay-100 cursor-pointer">
          Translate Note{" "}
        </li>
        <li className="hover:bg-[#313236] p-3 transition ease-in-out delay-100 cursor-pointer">
          Add Drawing{" "}
        </li>
        <li
          onClick={makeACopy}
          className="hover:bg-[#313236] p-3 transition ease-in-out delay-100 cursor-pointer"
        >
          Make a Copy{" "}
        </li>
      </ul>
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

export default Options;
