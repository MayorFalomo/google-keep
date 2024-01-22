"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Trash from "./Trash";
import "./trash.module.css";
import toast from "react-hot-toast";
type Props = {};

const Archives = (props: any) => {
  const [activeId, setActiveId] = useState<any>(" ");

  // const localStorageId = localStorage?.getItem("user");

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      const localStorageId = localStorage?.getItem("user");
      setActiveId(localStorageId);
    }
  }, []);

  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  useEffect(() => {
    if (contextValue?.user?.userId) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/get-trash/${contextValue?.user?.userId}`
        )
        .then((res) => {
          contextValue?.setTrashedNotes(res.data);
        })
        .then(() => setEmptyMessage(true))
        .catch((err) => console.log(err));
    }
  }, [contextValue?.user?.userId]);

  const emptyTrash = async () => {
    let trashed: any = [];
    try {
      await axios
        .delete("https://keep-backend-theta.vercel.app/api/notes/empty-trash")
        .catch((err) => console.log(err));
      //This sets contextValue?.setTrashedNotes to empty array
      contextValue?.setTrashedNotes((prevNotes: any) => {
        [{ ...prevNotes, trashed }];
      });
      toast.success("Trash emptied");
    } catch (error) {
      console.log(error);
      toast.error("Error emptying trash");
    }
  };

  return (
    <div className=" mt-[10px] mb-[200px] ml-[20px] max-md:ml-[20px] ">
      <h1 className="flex items-center justify-center text-center ml-[20px] text-[20px]  mb-[20px] max-sm:text-[16px] max-[850px]:ml-[0px] ">
        <i>
          Notes in Trash are deleted after 1 day{" "}
          <span
            onClick={() => emptyTrash}
            className="text-[#84B4F8] place-content-center hover:bg-[#24272D] py-3 px-3 rounded-[8px] cursor-pointer"
          >
            <i>empty trash </i>
          </span>{" "}
        </i>
      </h1>
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[90%] max-[450px]:justify-center  max-[450px]:mx-auto "
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emptyMessage ? (
            contextValue?.trashedNotes?.length > 0 ? (
              contextValue.trashedNotes?.map((trash: any, index: any) => (
                <div
                  onMouseEnter={() => {
                    setShowIconsOnHover(true);
                    setShowId(trash?._id);
                  }}
                  onMouseLeave={() => {
                    setShowIconsOnHover(false);
                    setShowId("");
                  }}
                  onTouchStart={() => {
                    setShowIconsOnHover(true);
                    setShowId(trash?._id);
                  }}
                  className=" relative max-w-[300px] min-w-[300px] h-fit min-h-[140px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px] break-words  max-md:w-[300px] max-sm:min-w-[100%] max-[450px]:mr-0 "
                  style={{
                    backgroundColor: trash?.bgColor
                      ? trash?.bgColor
                      : "#202124",
                    backgroundImage: trash?.bgImage
                      ? `url(${trash?.bgImage})`
                      : "#202124",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  key={trash?._id}
                >
                  {overLay ? (
                    <AnimatePresence>
                      <motion.div
                        onClick={() => {
                          setNoteModal(false);
                          setOverLay(false);
                          setShowBgModal(false);
                        }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
                      ></motion.div>
                    </AnimatePresence>
                  ) : (
                    ""
                  )}

                  <Trash
                    trashedNote={trash}
                    overLay={overLay}
                    setOverLay={setOverLay}
                    noteModal={noteModal}
                    setNoteModal={setNoteModal}
                    noteUrlParams={noteUrlParams}
                    setNoteUrlParams={setNoteUrlParams}
                    showIconsOnHover={showIconsOnHover}
                    setShowIconsOnHover={setShowIconsOnHover}
                    showId={showId}
                    showBgModal={showBgModal}
                    setShowBgModal={setShowBgModal}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center m-[auto] "></div>
            )
          ) : (
            <div className="flex justify-center m-[auto] ">
              <span className="loader"></span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Archives;
