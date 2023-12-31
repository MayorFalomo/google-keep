import React, { useState } from "react";
import { BiCheck, BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import "./EditLabel.css";
import { TfiTrash } from "react-icons/tfi";
import { MdOutlineLabel } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
type Props = {};

//Parent component is EditLabel.tsx
const Edited = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [openInputEdit, setOpenInputEdit] = useState(false);
  const [newLabelValue, setNewLabelValue] = useState("");
  const [showDeleteIcon, setShowDeleteIcon] = React.useState(false);

  //generateId
  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  const deleteLabel = (e: any) => {
    e.preventDefault();
    const labelObject = {
      _id: props?.label?._id,
      label: " ",
      labelId: " ",
    };
    try {
      // console.log(labelObject, "this is label object");
      // console.log(props?.labelNotes?._id, "this is label props id");
      axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/delete-label`,
          labelObject
        )
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevNotes: any) => {
        // Use filter to exclude the note with the specified _id
        const updatedNotes = prevNotes.filter(
          (note: any) => note._id !== props?.label?._id
        );
        return updatedNotes;
      });
      // props?.setOpenEditLabel(false);
      toast.success("label is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const editLabel = async (e: any) => {
    e.preventDefault();
    const editedLabelObject = {
      _id: props?.label?._id,
      label: newLabelValue,
      labelId: generateId(24),
    };

    try {
      await axios
        .put(
          `https://keep-backend-theta.vercel.app/api/notes/edit-label`,
          editedLabelObject
        )
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevNotes: any) => {
        return prevNotes.map((note: any) => {
          if (note._id == props?.label?._id) {
            return {
              ...note,
              label: newLabelValue,
              labelId: generateId(24),
            };
          }
          return note;
        });
      });
      toast.success("label is edited ");
    } catch (err) {
      console.log(err);
      toast.error("error editing label ");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 py-2 ">
      <div className="flex items-center justify-between gap-2 ">
        {props?.label?.label ? (
          showDeleteIcon ? (
            <form onSubmit={deleteLabel}>
              <button
                onMouseLeave={() => setShowDeleteIcon(false)}
                // onMouseOut={() => setShowDeleteIcon(false)}
                type="submit"
              >
                {
                  <TfiTrash
                    className="max-sm:text-2xl md:text-2x1 max-lg:text-2xl xl:text-2xl"
                    color="#9AA0A6"
                    cursor="pointer"
                  />
                }{" "}
              </button>
            </form>
          ) : (
            <span onMouseOver={() => setShowDeleteIcon(!showDeleteIcon)}>
              {
                <MdOutlineLabel
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
          )
        ) : (
          ""
        )}
        {props?.label?.label ? (
          openInputEdit && props?.label?._id == props?.showId ? (
            <input
              className="border-r-0 border-l-0 border-t-0 border-b-[1px] border-[#9AA0A6] outline-none text-[20px] bg-transparent "
              onChange={(e: any) => setNewLabelValue(e.target.value)}
              type="text"
              placeholder="edit label"
              autoFocus
            />
          ) : (
            <p className="text-[20px]">{props?.label?.label}</p>
          )
        ) : (
          ""
        )}
      </div>
      {props?.label?.label ? (
        newLabelValue.length > 1 ? (
          <Tippy placement="bottom" content="Rename label ">
            <form onSubmit={editLabel}>
              <button type="submit">
                <BiCheck
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              </button>
            </form>
          </Tippy>
        ) : (
          <Tippy placement="bottom" content="Rename label ">
            <span
              onClick={() => setOpenInputEdit(!openInputEdit)}
              className="text-[20px]"
            >
              {" "}
              <BiPencil
                className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                color="#9AA0A6"
                cursor="pointer"
              />
            </span>
          </Tippy>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Edited;
