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
        <li className="hover:bg-[#313236] p-3 transition ease-in-out delay-100 cursor-pointer">
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
