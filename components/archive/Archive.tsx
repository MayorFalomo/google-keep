import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
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
import axios from "axios";

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

  const pinNote = async (e: any) => {
    e.preventDefault();

    const pinThisNote = {
      _id: props.archive?._id,
      userId: props.archive?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.archive?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.archive?.username,
      title: props.archive?.title,
      note: props.archive?.note,
      picture: props.archive?.picture,
      video: props.archive?.video,
      drawing: props.archive?.drawing,
      bgImage: props.archive?.bgImage,
      bgColor: props.archive?.bgColor,
      remainder: props.archive?.remainder,
      collaborator: props.archive?.collaborator,
      label: props.archive?.label,
      location: props.archive?.location,
      createdAt: new Date(),
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/add-pinned/from-archharchive`,
          pinThisNote
        )
        .then(() =>
          contextValue.setPinnedNote(
            [...contextValue?.pinnedNote, pinThisNote].reverse()
          )
        )
        .catch((err) => console.log(err));

      toast.success("Note Pinned Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const tomorrowRemainder = (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      location: props.note?.location,
      createdAt: new Date(),
    };
    try {
      axios.post(
        "https://keep-backend-theta.vercel.app/api/notes/set-notification/tomorrow",
        noteRemainder
      );
      toast.success("Remainder set for tomorrow ");
    } catch (error) {
      console.log(error, "This did not work");
    }
    setOpenNotifyModal(false);
  };

  const nextMondayRemainder = async (e: any) => {
    e.preventDefault();
    const noteRemainder = {
      _id: props.note?._id,
      userId: props.note?.userId,
      pinnedId: props.note?._id,
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      location: props.note?.location,
      createdAt: new Date(),
    };
    try {
      await axios.post(
        "https://keep-backend-theta.vercel.app/api/notes/set-notification/next-week",
        noteRemainder
      );
      toast.success("Remainder set for tomorrow ");
    } catch (error) {
      console.log(error, "This did not work");
    }
    setOpenNotifyModal(false);
  };

  const CustomStyle = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#444547" : "#202124",
    }),
    menuList: (base: any) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#444547",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "red",
      },
    }),
  };

  const setLocation = (e: any) => {
    e.preventDefault();
    const country = {
      _id: props.note?._id,
      userId: props.note?.userId,
      note: props.note?.note,
      title: props.note?.title,
      picture: props.note?.picture,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note.collaborator,
      label: props.note?.label,
      location: countryValue?.label || props.note?.location || "",
    };
    try {
      axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/update-note/${props.note?._id}`,
        country
      );
      contextValue?.setNotes((prevState: any) =>
        prevState.map((note: any) =>
          note._id == props.note?._id
            ? { ...note, location: country.location }
            : note
        )
      );
    } catch (err) {
      console.log(err);
    }
    setPickALocation(false);
  };

  const removeLocation = async (e: any) => {
    e.preventDefault();
    props?.setNoteModal(false);

    const noteId = props.note?._id;

    try {
      props?.setNoteModal(false);
      await axios.put(
        `https://keep-backend-theta.vercel.app/api/notes/delete-country/${noteId}`
      );
      // console.log(noteId, "This is noteId");

      contextValue?.setNotes((prevNotes: any) => {
        const updatedNotes = prevNotes.map((note: any) => {
          if (note._id == noteId) {
            // Update the location to an empty string for the specific note
            return { ...note, location: " " };
          }
          return note;
        });
        return updatedNotes;
      });
      setPickALocation(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = (files: any) => {
    props.setNoteUrlParams(props.note?._id);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    axios
      .post("https://api.cloudinary.com/v1_1/dsghy4siv/image/upload", formData)
      .then((res) => {
        setVideo("");
        setPicture(res.data.url);
        if (res.data.url) {
          const pictureObject = {
            id: props?.noteUrlParams,
            picture: res.data.url,
            video: " ",
          };

          try {
            // console.log(props?.note?._id, "This is props?.note?._id");
            axios
              .post(
                `https://keep-backend-theta.vercel.app/api/notes/upload-picture`,
                pictureObject
              )
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setNotes((prevState: any) =>
              prevState.map((note: any) =>
                note._id == pictureObject?.id
                  ? {
                      ...note,
                      picture: pictureObject?.picture,
                      video: pictureObject?.video,
                    }
                  : note
              )
            );
            toast.success("Picture has been uploaded successfully");
          } catch (error) {
            console.error(error && "Error updating bgColor:");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadVideo = (files: any) => {
    props.setNoteUrlParams(props.note?._id);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    axios
      .post("https://api.cloudinary.com/v1_1/dsghy4siv/video/upload", formData)
      .then((res) => {
        setPicture("");
        setVideo(res.data.url);
        if (res.data.url) {
          const videoObject = {
            id: props?.noteUrlParams,
            video: res.data.url,
            picture: " ",
          };

          try {
            // console.log(props?.note?._id, "This is props?.note?._id");
            axios
              .post(
                `https://keep-backend-theta.vercel.app/api/notes/upload-video`,
                videoObject
              )
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setNotes((prevState: any) =>
              prevState.map((note: any) =>
                note._id == videoObject?.id
                  ? {
                      ...note,
                      video: videoObject?.video,
                      picture: videoObject?.picture,
                    }
                  : note
              )
            );
            toast.success("Video has been uploaded successfully");
          } catch (error) {
            console.error(error && "Error updating Video");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadMedia = (files: any, mediaType: string) => {
    props.setNoteUrlParams(props.note?._id);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    const uploadEndpoint =
      mediaType == "image"
        ? "https://api.cloudinary.com/v1_1/dsghy4siv/image/upload"
        : "https://api.cloudinary.com/v1_1/dsghy4siv/video/upload";

    axios
      .post(uploadEndpoint, formData)
      .then((res) => {
        // setPicture("");
        // setVideo("");

        if (res.data.url) {
          const mediaObject =
            mediaType == "image"
              ? { picture: res.data.url, video: "" }
              : { video: res.data.url, picture: "" };

          const updateEndpoint =
            mediaType == "image"
              ? "https://keep-backend-theta.vercel.app/api/notes/upload-picture"
              : "https://keep-backend-theta.vercel.app/api/notes/upload-video";

          try {
            axios
              .post(updateEndpoint, {
                id: props?.noteUrlParams,
                ...mediaObject,
              })
              .catch((err) => console.log(err));

            // Update the contextValue.notes array with updated note
            contextValue?.setNotes((prevState: any) =>
              prevState.map((note: any) =>
                note._id == props?.noteUrlParams
                  ? {
                      ...note,
                      ...mediaObject,
                    }
                  : note
              )
            );

            toast.success(
              mediaType == "image"
                ? "Picture has been uploaded successfully"
                : "Video has been uploaded successfully"
            );
          } catch (error) {
            console.error(
              error &&
                (mediaType == "image"
                  ? "Error updating picture"
                  : "Error updating video")
            );
          }
        }
      })
      .catch((err) => console.log(err));
  };

  // // Example usage for image upload
  // uploadMedia(imageFiles, "image");

  // // Example usage for video upload
  // uploadMedia(videoFiles, "video");

  const archiveNote = async (e: any) => {
    e.preventDefault();

    const archiveThisNote = {
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      location: props.note?.location,
      createdAt: props?.note.createdAt,
    };
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/archive-note`,
          archiveThisNote
        )
        .then(() =>
          contextValue?.setNotes((prevState: any) =>
            prevState.filter((note: any) => note._id !== props.note?._id)
          )
        )
        .catch((err) => console.log(err));
      toast.success("Note archived successfully");
      // Update the contextValue.notes array with updated note
    } catch (err) {
      console.log(err);
    }
  };

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: props.note?._id,
  // });

  // console.log(props?.noteUrlParams, "This is picture");

  const addOptions = () => {
    setTrashNote({
      _id: props.note?._id,
      userId: props.note?.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      pinnedId: props.note?._id, //I need something unique from props.note to be in pinned, so you can't add more than one of the same pinned note
      username: props.note?.username,
      title: props.note?.title,
      note: props.note?.note,
      picture: props.note?.picture,
      drawing: props.note?.drawing,
      bgImage: props.note?.bgImage,
      bgColor: props.note?.bgColor,
      remainder: props.note?.remainder,
      collaborator: props.note?.collaborator,
      label: props.note?.label,
      location: props.note?.location,
      createdAt: props?.note.createdAt,
    });
    setOpenOptionsModal(!openOptionsModal);
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
            <h1 className="text-[20px]">{props.archived?.title}</h1>
            <p className="text-[16px] whitespace-break-spaces ">
              {props.archived?.note?.slice(0, 600)}...
            </p>
            {props.archived?.location?.length > 1 ? (
              <form onSubmit={removeLocation}>
                <p
                  onMouseOver={() => {
                    setCloseIcon(true);
                  }}
                  onMouseLeave={() => setCloseIcon(false)}
                  className="relative flex items-center gap-2 w-fit py-1 my-1 px-3 rounded-[30px] border-2 border-[#313235]"
                >
                  <IoLocationOutline />
                  {props.archived?.location}{" "}
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
