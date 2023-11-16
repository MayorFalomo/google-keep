import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React from "react";
import { BsCheck, BsPin, BsPinFill } from "react-icons/bs";
import { LuClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
} from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import PinnedModal from "../pinnedModal/PinnedModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./showPinned.css";
type Props = {};

const ShowPinned = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = React.useState(false); //toggle create note modal
  const [noteUrlParams, setNoteUrlParams] = React.useState(""); //Send the id of the clicked note
  const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);
  const [openNotifyModal, setOpenNotifyModal] = React.useState(false);
  const myRef = React.useRef(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    setNoteUrlParams(props.pinned?._id);
    // console.log(props.note?.createdAt, "This is the id");
    setNoteModal(true);
    props.setOverLayBg(true);
  };

  const unPinNote = async (e: any) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/notes/remove-pinned/${props?.pinned?._id}`
      );
      let filtered = contextValue.pinnedNote?.filter(
        (pinned: any) => pinned?._id !== props.pinned?._id
      );
      contextValue?.setPinnedNote(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(contextValue?.pinnedNote);

  return (
    <div
      onMouseOver={() => setShowIconsOnHover(true)}
      onMouseOut={() => setShowIconsOnHover(false)}
      style={{ position: "relative" }}
      // ref={myRef}
    >
      <div onClick={handleClick} className="subContainer">
        {props.pinned?.title?.length == 0 && props.pinned?.note?.length == 0 ? (
          <div className="p-4">
            <input
              className="bg-transparent border-none outline-none "
              placeholder="Empty Note"
            />
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-[20px]">{props.pinned?.title}</h1>
            <p className="text-[16px]">
              {props.pinned?.note?.slice(0, 600)}...
            </p>
          </div>
        )}
      </div>
      {showIconsOnHover ? (
        <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
      ) : (
        " "
      )}
      {showIconsOnHover ? (
        <div className="absolute z-10 bottom-[5px] left-0 w-full flex justify-around item-center bg-darkmode ">
          <span
            className="p-2 rounded-full hover:bg-hover"
            onClick={() => setOpenNotifyModal(true)}
          >
            {
              <BiBellPlus
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }
          </span>

          {openNotifyModal ? (
            <div className="absolute left-0 bottom-[-210px] z-20 p-4 rounded-[10px] bg-darkmode text-white">
              <div className=" ">
                <p>Remainder: </p>
                <ul>
                  <li className="hover:bg-hover p-2 cursor-pointer ">
                    Tomorrow <span>8am </span>{" "}
                  </li>
                  <li className="hover:bg-hover p-2 cursor-pointer">
                    Next Week <span>8am </span>{" "}
                  </li>
                  <li className="flex items-center gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <LuClock /> Pick date and time{" "}
                  </li>
                  <li className="flex items-center gap-[10px] cursor-pointer hover:bg-hover p-2">
                    <IoLocationOutline /> Pick place and time{" "}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 ">
            {
              <MdOutlinePersonAddAlt1
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 cursor-pointer ">
            {
              <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover transition ease-in-out delay-150 ">
            {
              <BiImageAlt
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover cursor-pointer ">
            {
              <BiArchiveIn
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-2 rounded-full hover:bg-hover cursor-pointer ">
            {
              <BiDotsVerticalRounded
                className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                cursor="pointer"
              />
            }{" "}
          </span>
        </div>
      ) : (
        ""
      )}
      {showIconsOnHover ? (
        <span
          onClick={unPinNote}
          className="absolute top-[10px] right-[5px] z-10 p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] "
        >
          <BsPinFill
            className="  text-[18px] max-sm:text-[18px] max-md:text-[26px] "
            cursor="pointer"
          />
        </span>
      ) : (
        " "
      )}
      <div className="">
        {noteModal ? (
          <PinnedModal
            noteUrlParams={noteUrlParams}
            setNoteModal={setNoteModal}
            noteModal={noteModal}
            setOverLayBg={props.setOverLayBg}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ShowPinned;
