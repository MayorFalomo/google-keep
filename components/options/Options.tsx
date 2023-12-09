import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
        .post(`http://localhost:5000/api/notes/trash-note`, props.trashNote)
        .then(() =>
          contextValue?.setNotes(
            (prevState: any) =>
              prevState.filter(
                (note: any) => note._id !== props.trashNote?._id
              ),
            toast("Moved to Trash successfully")
          )
        )
        .catch((err: any) => console.log(err));
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
      <ToastContainer />
    </div>
  );
};

export default Options;
