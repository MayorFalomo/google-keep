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

  const appendBgImageToNote = () => {
    const bgObject = {
      id: props.noteUrlParams,
      bgImage: props?.bgImage?.image,
      bgColor: " ",
    };

    try {
      console.log(bgObject);

      axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/set-bgimage`,
          bgObject
        )
        .catch((err) =>
          console.log(err && toast("setting Background color failed"))
        );
      // Update the contextValue.notes array with updated note
      const updatedNotes = contextValue?.notes.map((note: any) =>
        note._id == props.noteUrlParams
          ? { ...note, bgImage: bgObject.bgImage, bgColor: bgObject.bgColor }
          : note
      );
      // console.log(updatedNotes, "updated");

      //? Then i Update the contextValue.notes array with the updated notes
      contextValue?.setNotes(updatedNotes);

      //! Or do it this way, I'm using this way because it's not as clean as the one above
      // Update the contextValue.notes array with the modified note
      // contextValue?.setNotes((prevState: any) =>
      //   prevState.map((note: any) =>
      //     note._id == props.noteUrlParams ?
      //        { ...note, bgImage: bgObject.bgImage }
      //       : note
      //   )
      // );
      toast.success("Background Image set successfully");
      props.setShowBgModal(false);
      props?.setOverLay(false);
    } catch (error) {
      console.error("Error updating bgColor:", error);
    }
  };

  // console.log(props?.bgImage?.image);

  return (
    <div>
      <form
        className="flex items-center gap-2 w-[100%]"
        onSubmit={appendBgImageToNote}
      >
        <Tippy placement="bottom" content={`${props?.bgImage?.name}`}>
          <button
            type="submit"
            className={`w-[50px] h-[50px]  outline-none border-none rounded-full`}
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
