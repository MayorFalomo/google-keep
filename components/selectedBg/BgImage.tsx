"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React from "react";
import Tippy from "@tippyjs/react";
import toast, { Toaster } from "react-hot-toast";

import Image from "next/image";
type Props = {};

//Parent component is Background.tsx
const BgImage = (props: any) => {
  const { contextValue }: any = useAppContext();
  // console.log(props?.noteUrlParams, "This is noteUrl");

  const appendBgImageToNote = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const arrayOfNoteIds = contextValue?.isSelected;

    const newBgImage = {
      bgImage: props?.bgImage?.image,
      bgColor: " ",
    };

    //I had to find the notes here too so i can update it in the frontend
    const selectedNotes = arrayOfNoteIds.map((ids: any) =>
      contextValue?.notes.find((note: any) => note._id == ids)
    );

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/update/selected-bgimage`,
          {
            arrayOfNoteIds,
            newBgImage,
          }
        )
        .catch((err) =>
          console.log(err && toast("setting Background color failed"))
        );
      // console.log(arrayOfNoteIds);
      // console.log(newBgImage);

      const updatedNotes = selectedNotes?.map((note: any) => {
        return {
          ...note,
          bgImage: newBgImage?.bgImage,
          bgColor: newBgImage?.bgColor,
        };
      });

      // Update the state with the modified notes
      contextValue?.setNotes((prevNotes: any) =>
        prevNotes.map((note: any) =>
          arrayOfNoteIds.includes(note._id)
            ? updatedNotes.find(
                (updatedNote: any) => updatedNote._id === note._id
              )
            : note
        )
      );

      toast.success("Background Image set successfully");
      props.setOpenBgModal(false);
      contextValue?.setIsSelected([]);
      // contextValue?.setOverLay(false);
    } catch (error) {
      console.error("Error updating bgColor:", error);
    }
  };

  return (
    <div>
      <form
        className="flex items-center gap-2 w-[100%] max-[600px]:flex-wrap "
        onSubmit={appendBgImageToNote}
      >
        <Tippy placement="bottom" content={`${props?.bgImage?.name}`}>
          <button
            type="submit"
            className={`w-[50px] h-[50px]  outline-none border-none rounded-full max-[600px]:w-auto  `}
          >
            <Image
              src={props?.bgImage?.image}
              width={50}
              height={50}
              className={`w-[50px] h-[50px]  outline-none border-none rounded-full`}
              // style={{
              //   backgroundImage: props?.bgImage?.image,
              //   backgroundRepeat: "no-repeat",
              //   backgroundPosition: "center",
              //   backgroundSize: "cover",
              // }}
              alt="img"
            />
          </button>
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
      />
    </div>
  );
};

export default BgImage;
