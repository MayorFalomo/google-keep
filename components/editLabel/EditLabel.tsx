"use client";
import { useAppContext } from "@/helpers/Helpers";
import React from "react";
import "./EditLabel.css";
import { TfiTrash } from "react-icons/tfi";
import { MdOutlineLabel } from "react-icons/md";
import Edited from "./Edited";
type Props = {};

const EditLabel = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [showDeleteIcon, setShowDeleteIcon] = React.useState(false);
  const [showId, setShowId] = React.useState("");

  // console.log(showId, "this is show id");

  const filteredArray = contextValue?.notes.filter(
    (element: any) => element.labelId?.length > 1
  );

  console.log(filteredArray, "this is filtered array");

  return (
    <div className="editLabelContainer">
      <h1 className="text-[22px] py-2">Edit Labels </h1>
      <div className="w-full border-[1px] border-[#9AA0A6] "></div>
      <div className="flex flex-col gap-2 my-4 min-h-[200px] ">
        {filteredArray.length <= 0 ? (
          filteredArray?.map((label: any) => (
            <div onClick={() => setShowId(label?._id)} key={label?._id}>
              <Edited
                label={label}
                showDeleteIcon={showDeleteIcon}
                setShowDeleteIcon={setShowDeleteIcon}
                showId={showId}
              />
            </div>
          ))
        ) : (
          <p>You have no Labels </p>
        )}{" "}
      </div>
      <p
        onClick={() => contextValue?.setEditLabelModal(false)}
        className="flex justify-end mt-4 cursor-pointer "
      >
        Done{" "}
      </p>
    </div>
    // </div>
  );
};

const LabelItems = ({ label, showDeleteIcon, setShowDeleteIcon }: any) => {
  return (
    <div className="flex items-center">
      {label.label ? (
        showDeleteIcon ? (
          <span>
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
            onMouseOver={() => setShowDeleteIcon(true)}
            onMouseOut={() => setShowDeleteIcon(false)}
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
      <span>{label?.label} </span>
    </div>
  );
};

export default EditLabel;
