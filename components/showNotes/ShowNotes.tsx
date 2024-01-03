"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShowNote from "./showNote";
import "./notes.css";
type Props = {};

const ShowNotes = (props: any) => {
  const userCookie = getCookie("user");

  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [postLoaded, setPostLoaded] = useState<boolean>(false);
  // const containerRef = useRef(null);
  const [currentUser, setCurrentUser] = useState<string>(
    contextValue?.user?._id
  );
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [picture, setPicture] = React.useState<string>("");
  const [activeId, setActiveId] = useState(null);
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [pinnedSuccess, setPinnedSuccess] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/getall-notes/${userCookie}`
      )
      .then((res) => contextValue?.setNotes(res.data))
      .then(() => setEmptyMessage(true))
      .catch((err) => console.log(err));
  }, [userCookie]);
  return (
    <div>
      <h1 className="ml-[50px] text-[20px]  mb-[20px]">OTHERS </h1>
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[95%] "
          // className="grid"
          // data-packery='{ "itemSelector": ".grid-item", "gutter": 10 }'
          //   data-masonry='{ "itemSelector": ".grid-item",
          //   "columnWidth": 300
          //  }'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emptyMessage ? (
            contextValue?.notes?.length > 0 ? (
              contextValue.notes?.map((note: any, index: any) => (
                <div
                  key={note?._id}
                  onMouseEnter={() => {
                    setShowIconsOnHover(true);
                    setShowId(note?._id);
                  }}
                  onMouseLeave={() => {
                    setShowIconsOnHover(false);
                    setShowId("");
                  }}
                  className=" relative max-w-[350px] min-w-[250px] h-fit min-h-[120px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
                  style={{
                    backgroundColor: note?.bgColor ? note?.bgColor : "#202124",
                    backgroundImage: `url(${note?.bgImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
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

                  <ShowNote
                    note={note}
                    overLay={overLay}
                    setOverLay={setOverLay}
                    noteModal={noteModal}
                    setNoteModal={setNoteModal}
                    noteUrlParams={noteUrlParams}
                    setNoteUrlParams={setNoteUrlParams}
                    showIconsOnHover={showIconsOnHover}
                    setShowIconsOnHover={setShowIconsOnHover}
                    picture={picture}
                    setPicture={setPicture}
                    showId={showId}
                    showBgModal={showBgModal}
                    setShowBgModal={setShowBgModal}
                    successful={successful}
                    setSuccessful={setSuccessful}
                    pinnedSuccess={pinnedSuccess}
                    setPinnedSuccess={setPinnedSuccess}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center m-[auto] ">
                <p className="text-[20px]"> You have no notes </p>
              </div>
            )
          ) : (
            <div className="flex justify-center text-center m-[auto] ">
              <span style={{ textAlign: "center" }} className="loader"></span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShowNotes;
