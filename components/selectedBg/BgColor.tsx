"use client";
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import toast, { ToastBar, Toaster } from "react-hot-toast";

type Props = {};

//Parent Component is Background.tsx
const BgColor = (props: any) => {
  const { contextValue }: any = useAppContext();

  const appendBgColorToNote = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const arrayOfNoteIds = contextValue?.isSelected;
    const newBgColor = {
      bgColor: props?.color?.color,
      bgImage: " ",
    };

    const selectedNotes = arrayOfNoteIds.map((ids: any) =>
      contextValue?.notes.find((note: any) => note._id == ids)
    );

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/update/selected-bgcolor`,
          {
            arrayOfNoteIds,
            newBgColor,
          }
        )
        .catch((err) =>
          console.log(err && toast.error("setting Background color failed"))
        );

      // function to update the notes with the updated bgColor for all matching notes
      //First i map over selected notes to retrieve the ids then i get the previous state of setNotes map over it, match it with the id of the selected notes and if it is i spread the note and add the bgColor then i return it
      selectedNotes.map((selected: any) => {
        contextValue?.setNotes((prevState: any) =>
          prevState.map((note: any) =>
            note._id == selected?._id
              ? {
                  ...note,
                  bgColor: newBgColor.bgColor,
                  bgImage: newBgColor?.bgImage,
                }
              : note
          )
        );
      });

      toast.success("Bg color set successfully");
      props?.setOpenBgModal(false);
      contextValue?.setIsSelected([]);
      // contextValue?.setOverLay(false);
    } catch (error) {
      error && toast.error("setting Background color failed");
    }
  };

  // console.log(props.noteUrlParams);

  return (
    <div>
      <form
        className="flex items-center gap-2 w-[100%]"
        onSubmit={appendBgColorToNote}
      >
        <Tippy placement="bottom" content={`${props?.color?.name}`}>
          <button
            type="submit"
            className={`w-[40px] h-[40px] hover:border-2 border-white outline-none border-none rounded-full  `}
            style={{ backgroundColor: props?.color?.color }}
          ></button>
        </Tippy>
      </form>
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

export default BgColor;
