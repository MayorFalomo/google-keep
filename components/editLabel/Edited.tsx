import React, { useState } from "react";
import { BiCheck, BiEdit, BiLabel, BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import "./EditLabel.css";
import { TfiTrash } from "react-icons/tfi";
import { MdOutlineLabel } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
type Props = {};

const Edited = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [openInputEdit, setOpenInputEdit] = useState(false);
  const [newLabelValue, setNewLabelValue] = useState("");

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

  const deleteLabel = () => {
    const labelObject = {
      _id: props?.labelNotes?._id,
      label: props?.labelNotes?.label,
      labelId: props?.labelNotes?.labelId,
    };
    try {
      axios
        .post(`http://localhost:5000/api/delete-label`, labelObject)
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevNotes: any) => {
        prevNotes.map((note: any) => {
          return {
            ...note,
            label: "",
            labelId: "",
          };
        });
      });
      props?.setShowEditLabel(false);
      toast.success("label is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const editLabel = (e: any) => {
    e.preventDefault();
    const editedLabelObject = {
      _id: props?.label?._id,
      label: newLabelValue,
      labelId: generateId(24),
    };

    try {
      axios
        .put(`http://localhost:5000/api/notes/edit-label`, editedLabelObject)
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevNotes: any) => {
        return prevNotes.map((note: any) => {
          if (note._id == props?.labelNotes?._id) {
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
          props?.showDeleteIcon ? (
            <span onClick={deleteLabel}>
              {
                <TfiTrash
                  className="max-sm:text-2xl md:text-2x1 max-lg:text-2xl xl:text-2xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
          ) : (
            <span
              onMouseOver={() => props?.setShowDeleteIcon(true)}
              onMouseOut={() => props?.setShowDeleteIcon(false)}
            >
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
              className="border-r-0 border-l-0 border-t-0 border-b-[1px] border-[#202124] outline-none text-[20px] bg-transparent "
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
