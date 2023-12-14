import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BiArchiveIn,
  BiBellPlus,
  BiDotsVerticalRounded,
  BiImageAlt,
} from "react-icons/bi";
import { BsCheck, BsPin } from "react-icons/bs";
import {
  IoArrowBackSharp,
  IoCloseOutline,
  IoColorPaletteOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import countryList from "react-select-country-list";
import Select from "react-select";

type Props = {};

const Archive = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [openNotifyModal, setOpenNotifyModal] = React.useState<boolean>(false);
  const [pickADayModal, setPickADayModal] = React.useState<boolean>(false);
  const [countryValue, setCountryValue] = React.useState<any>("");
  const options = useMemo(() => countryList().getData(), []); //Options for country
  const [pickALocation, setPickALocation] = React.useState<boolean>(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  // const [showBgModal, setShowBgModal] = useState(false);
  const [picture, setPicture] = React.useState<any>();
  const [video, setVideo] = useState<string>();
  const [openOptionsModal, setOpenOptionsModal] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [trashNote, setTrashNote] = useState<any>();

  const handleClick = (e: any) => {
    e.preventDefault();
    // e.stopPropagation();
    props.setNoteUrlParams(props.archived?._id);
    console.log(props.archived?._id, "This is the id");
    props?.setNoteModal(true);
    // console.log(noteModal, "This is Note Modal");
    // props?.setNoteModal(true);
    props?.setOverLay(true);

    // console.log(noteModal, "Hello!!....I am Clicking");
  };

  return (
    <div
      style={{
        backgroundColor: contextValue?.backgroundColor,
      }}
      className="mapped"
    >
      <div className="subContainer" onClick={handleClick}>
        {props?.archived?.picture ? (
          <Image
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            src={props?.archived?.picture}
            loading="lazy"
            // objectFit="cover"
            alt=" "
          />
        ) : (
          ""
        )}
        {props?.archived?.video ? (
          <video
            className="w-[100%] max-h-[150px]"
            width={200}
            height={120}
            controls
            src={props?.archived?.video}
            // objectFit="cover"
          ></video>
        ) : (
          ""
        )}
        {props.archived?.title?.length == 0 && props.note?.note?.length == 0 ? (
          <div className="p-4">
            <input
              className="bg-transparent border-none outline-none "
              placeholder="Empty Note"
            />
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-[20px]">{props.note?.title}</h1>
            <p className="text-[16px] whitespace-break-spaces ">
              {props.note?.note?.slice(0, 600)}...
            </p>
            {props.note?.location?.length > 1 ? (
              <form onSubmit={removeLocation}>
                <p
                  onMouseOver={() => {
                    setCloseIcon(true);
                  }}
                  onMouseLeave={() => setCloseIcon(false)}
                  className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                >
                  <IoLocationOutline />
                  {props.note?.location}{" "}
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="outline-none border-none cursor-pointer p-1 rounded-full hover:bg-lighterHover "
                  >
                    {closeIcon ? (
                      <Tippy placement="bottom" content="Delete location ">
                        <IoCloseOutline />
                      </Tippy>
                    ) : (
                      ""
                    )}{" "}
                  </button>
                </p>
              </form>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {props?.showId == props?.archived?._id ? (
        <Tippy placement="bottom" content="Select note">
          <BsCheck className="absolute top-[-18px] left-[-18px] z-10 bg-white rounded-full text-[#000] text-[22px] max-sm:text-[18px] max-md:text-[26px] lg:text-3xl " />
        </Tippy>
      ) : (
        " "
      )}
      {props?.showId == props?.archived?._id ? (
        <div
          style={{
            backgroundColor:
              props?.archived?.bgColor || props?.archived?.bgImage
                ? props?.archived?.bgColor || props?.archived?.bgImage
                : "",
          }}
          className="absolute z-10 bottom-[5px] left-0 w-full flex justify-around item-center "
        >
          <Tippy placement="bottom" content="Notification">
            <span className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 ">
              {
                <BiBellPlus
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                  onClick={() => setOpenNotifyModal(!openNotifyModal)}
                />
              }{" "}
            </span>
          </Tippy>
          <AnimatePresence>
            {openNotifyModal ? (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="shadow"
                className="convex"
                // className="absolute bottom-[-200px] left-0 z-30 w-[300px] p-2 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124] "
              >
                <div className="rounded-[20px]">
                  <p>Remainder: </p>
                  <ul>
                    <li
                      onClick={tomorrowRemainder}
                      className="flex justify-between items-center hover:bg-lighterHover p-2 cursor-pointer "
                    >
                      Later Today <span>8:00 PM </span>{" "}
                    </li>
                    <li
                      onClick={tomorrowRemainder}
                      className="flex justify-between items-center hover:bg-lighterHover  p-2 cursor-pointer "
                    >
                      Tomorrow <span>8:00 AM </span>{" "}
                    </li>
                    <li
                      onClick={nextMondayRemainder}
                      className="flex justify-between items-center hover:bg-lighterHover  p-2 cursor-pointer"
                    >
                      Next Week <span>8:00 AM </span>{" "}
                    </li>
                    <li
                      onClick={() => setPickADayModal(true)}
                      className=" flex items-center gap-[10px] cursor-pointer hover:bg-lighterHover  p-2"
                    >
                      <LuClock /> Pick date and time{" "}
                    </li>
                    <li
                      onClick={() => {
                        setPickALocation(true);
                        setOpenNotifyModal(false);
                      }}
                      className="flex gap-[10px] cursor-pointer hover:bg-lighterHover  p-2"
                    >
                      <IoLocationOutline /> Pick place{" "}
                    </li>
                  </ul>
                </div>
                {pickADayModal ? (
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* <PickDate
                      setPickADayModal={setPickADayModal}
                      notepad={props.note}
                    /> */}
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
          {pickALocation ? (
            <form onSubmit={setLocation} className="pickLocation ">
              <h1 className="flex items-center gap-[8px] py-3 text-[20px] border-1 border-[#313235]">
                {
                  <Tippy placement="bottom" content="Go back ">
                    <span className="p-2 rounded-full hover:bg-lighterHover">
                      <IoArrowBackSharp
                        onClick={() => {
                          setPickALocation(false);
                          setOpenNotifyModal(true);
                        }}
                        className="text-[24px] cursor-pointer hover:bg-lighterHover rounded-[50%]"
                        color="#9AA0A6"
                      />
                    </span>
                  </Tippy>
                }{" "}
                Pick a Location{" "}
              </h1>
              <Select
                styles={CustomStyle}
                placeholder="Choose a location"
                options={options}
                value={countryValue}
                onChange={changeHandler}
                className="bg-transparent"
              />
              <div className="flex justify-end w-[90%] mt-2 ">
                <button
                  className="p-3 outline-none border-none hover:bg-lighterHover cursor-pointer"
                  type="submit"
                >
                  Save{" "}
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
          <Tippy placement="bottom" content="Collaborator ">
            <span
              onClick={() => {
                setShowCollaboratorModal(true);
                setOpenNotifyModal(false);
                props.setNoteUrlParams(props.note?._id);
              }}
              className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
            >
              {
                <MdOutlinePersonAddAlt1
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[18px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>

          <Tippy placement="bottom" content="Background options ">
            <span
              onClick={() => {
                props?.setShowBgModal(true);
                props?.setOverLay(true);
                props?.setNoteUrlParams(props.note?._id);
              }}
              className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 cursor-pointer "
            >
              {
                <IoColorPaletteOutline className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  " />
              }{" "}
            </span>
          </Tippy>

          <Tippy placement="bottom" content="Add image">
            <label
              onClick={() => {
                props.setNoteUrlParams(props.note?._id);
              }}
              htmlFor="fileInputImage"
              className="p-2 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 "
            >
              {
                <BiImageAlt
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </label>
          </Tippy>
          <input
            type="file"
            onChange={(e) => uploadMedia(e.target.files, "image")}
            id="fileInputImage"
            style={{ display: "none" }}
          />

          <form onSubmit={archiveNote}>
            <Tippy placement="bottom" content="Archive ">
              <button
                type="submit"
                onClick={archiveNote}
                className="p-2 rounded-full hover:bg-[#313236] cursor-pointer "
              >
                {
                  <BiArchiveIn
                    className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                    cursor="pointer"
                  />
                }{" "}
              </button>
            </Tippy>
          </form>

          <Tippy placement="bottom" content="More ">
            <span
              onClick={addOptions}
              className="p-2 rounded-full hover:bg-[#313236] cursor-pointer "
            >
              {
                <BiDotsVerticalRounded
                  className=" text-[#9AA0A6] text-[16px] max-sm:text-[16px] max-md:text-[22px] lg:text-[22px]  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
          <AnimatePresence>
            {openOptionsModal ? (
              <div className="py-2" id="options">
                {/* <Options trashNote={trashNote} /> */}
              </div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      ) : (
        ""
      )}

      {props?.showIconsOnHover ? (
        contextValue?.pinnedNote?.some(
          (pinned: any) => pinned?._id == props?.archived?._id
        ) ? (
          <Tippy placement="bottom" content="Unpin note ">
            <button
              disabled
              className="absolute top-[10px] right-[5px] z-10 p-2 text-[#5F6368] border-none outline-none cursor-not-allowed"
            >
              <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />{" "}
            </button>
          </Tippy>
        ) : (
          <form onSubmit={pinNote}>
            <Tippy placement="bottom" content="Pin note ">
              <button
                type="submit"
                className="absolute top-[10px] right-[5px] z-[9] p-2 hover:bg-hover rounded-full  hover:text-white text-[#5F6368] cursor-pointer border-none outline-none "
              >
                <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
              </button>
            </Tippy>
          </form>
        )
      ) : (
        ""
      )}
      <AnimatePresence>
        {props?.archivedModal ? (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* <NoteModal
              noteUrlParams={props.noteUrlParams}
              setNoteModal={props?.setNoteModal}
              noteModal={props?.noteModal}
              setNoteUrlParams={props.setNoteUrlParams}
              setOverLay={props.setOverLay}
            /> */}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {showCollaboratorModal ? (
        <AnimatePresence>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" "
          >
            {/* <Collaborators
              noteUrlParams={props.noteUrlParams}
              setShowCollaboratorModal={setShowCollaboratorModal}
            /> */}
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}

      {props?.showBgModal ? (
        <AnimatePresence>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* <Background
              noteUrlParams={props?.noteUrlParams}
              showBgModal={props?.showBgModal}
              setShowBgModal={props?.setShowBgModal}
              overLay={props?.overLay}
              setOverLay={props?.setOverLay}
            /> */}
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}

      {showCollaboratorModal ? (
        <div
          onClick={() => {
            setShowCollaboratorModal(false);
          }}
          className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
        ></div>
      ) : (
        ""
      )}
      {/* {props?.pinnedSuccess && <ToastContainer />} */}
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

export default Archive;
