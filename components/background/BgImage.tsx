import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React from "react";
import Tippy from "@tippyjs/react";
import { ToastContainer, toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
type Props = {};

const BgImage = (props: any) => {
  const { contextValue }: any = useAppContext();

  const appendBgImageToNote = () => {
    const bgObject = {
      id: props.noteUrlParams,
      bgImage: props?.bgImage?.bgImage,
      bgColor: " ",
    };

    try {
      axios
        .post(`http://localhost:5000/api/notes/set-bgImage`, bgObject)
        .catch((err) =>
          console.log(err && toast("setting Background color failed"))
        );
      // Update the contextValue.notes array with updated note
      const updatedNotes = contextValue?.notes.map((note: any) =>
        note._id == props.noteUrlParams
          ? { ...note, bgImage: bgObject.bgImage }
          : note
      );

      //? Then i Update the contextValue.notes array with the updated notes
      contextValue?.setNotes(updatedNotes);

      //! Or do it this way, I'm using this way because it's not as clean as the one above
      // Update the contextValue.notes array with the modified note
      // contextValue?.setNotes((prevState: any) =>
      //   prevState.map((note: any) =>
      //     note._id == props.noteUrlParams ?
      //        { ...note, bgColor: bgObject.bgColor }
      //       : note
      //   )
      // );
      toast("Bg color set successfully");
      props.setShowBgModal(false);
    } catch (error) {
      console.error("Error updating bgColor:", error);
    }
  };

  return (
    <div>
      <form
        className="flex items-center gap-2 w-[100%]"
        onSubmit={appendBgImageToNote}
      >
        <Tippy placement="bottom" content={`${props?.color?.name}`}>
          <button
            type="submit"
            className={`w-[60px] h-[60px] outline-none border-none rounded-full`}
            style={{ backgroundColor: props?.bgImage?.bgImage }}
          ></button>
        </Tippy>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BgImage;
