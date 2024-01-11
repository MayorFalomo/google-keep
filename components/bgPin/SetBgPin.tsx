import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
import axios from "axios";
import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

type Props = {};

//Parent component is BgPin.tsx
const SetBgPin = (props: any) => {
  const { contextValue }: any = useAppContext();

  const appendBgColorToPin = async (e: any) => {
    e.preventDefault();
    const bgObject = {
      id: props.noteUrlParams,
      bgColor: props?.color?.color,
      bgImage: " ",
    };

    try {
      // console.log(bgObject);

      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/set-pinned-bgcolor`,
          bgObject
        )
        .catch((err) =>
          console.log(err && toast("setting Background color failed"))
        );

      // Update the contextValue.notes array with updated note
      const updatedNotes = contextValue?.pinnedNote.map((note: any) =>
        note._id == props.noteUrlParams
          ? { ...note, bgColor: bgObject.bgColor, bgImage: bgObject.bgImage }
          : note
      );

      //? Then i Update the contextValue.notes array with the updated notes
      contextValue?.setPinnedNote(updatedNotes);

      //! Or do it this way, I'm using this way because it's not as clean as the one above
      // Update the contextValue.notes array with the modified note
      // contextValue?.setNotes((prevState: any) =>
      //   prevState.map((note: any) =>
      //     note._id == props.noteUrlParams ?
      //        { ...note, bgColor: bgObject.bgColor }
      //       : note
      //   )
      // );
      toast.success("Bg color set successfully");
      props?.setOpenBgModal(false);
      props?.setOverLay(false);
    } catch (error) {
      console.error("Error updating bgColor:", error);
    }
  };

  return (
    <div>
      <form
        className="flex items-center gap-2 w-[100%]"
        onSubmit={appendBgColorToPin}
      >
        <Tippy placement="bottom" content={`${props?.color?.name}`}>
          <button
            type="submit"
            className={`w-[40px] h-[40px] hover:border-2 border-white outline-none border-none rounded-full`}
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

export default SetBgPin;
