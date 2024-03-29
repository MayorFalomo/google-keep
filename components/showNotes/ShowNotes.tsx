"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ShowNote from "./showNote";
import "./notes.css";
import Results from "../results/Results";
import useLongPress from "../hook/useLongPress";
import toast from "react-hot-toast";
type Props = {};

const ShowNotes = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [picture, setPicture] = React.useState<string>("");
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [pinnedSuccess, setPinnedSuccess] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  useEffect(() => {
    if (contextValue?.user?.userId) {
      // console.log(contextValue?.user?.userId, "Inside get");
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/getall-notes/${contextValue?.user?.userId}`
        )
        .then((res) => contextValue?.setNotes(res.data))
        .then(() => setEmptyMessage(true))
        .catch((err) => console.log(err));
    }
  }, [contextValue?.user?.userId]);

  const gridRef = useRef<any>(null);
  const masonryRef = useRef<any>(null);

  const switchLayout = () => {
    let masonryInstance: any = null;

    if (typeof window !== "undefined") {
      if (contextValue?.changeNoteLayout == false) {
        import("masonry-layout").then((module) => {
          const Masonry = module.default;
          masonryInstance = new Masonry(gridRef.current, {
            // options
            // itemSelector: ".grid-item",
            // columnWidth: 160,
            // gutter: 20,
          });

          masonryRef.current = masonryInstance;
        });
      }
    }
  };

  switchLayout();

  useEffect(() => {
    if (contextValue?.user?.userId) {
      contextValue?.user?.notifications.length > 0 &&
        toast.success("You have a new remainder", {
          duration: 6000,
          position: "top-right",
        });
    }
  }, [contextValue?.user?.notifications]);

  return (
    <div className="ml-[20px] max-md:ml-[20px] ">
      <h1 className="text-[#8A949E] text-[20px]  mb-[20px] font-semibold max-sm:text-[17px] ">
        OTHERS{" "}
      </h1>
      <AnimatePresence>
        {
          <motion.div
            onClick={() => {
              contextValue.setOpenTextArea(false);
            }}
            ref={gridRef}
            className="grid"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {contextValue?.searchResults?.searchResults &&
            contextValue?.searchValue?.length > 0 ? (
              <Results />
            ) : emptyMessage ? (
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
                    onTouchStart={() => {
                      setShowIconsOnHover(true);
                      setShowId(note?._id);
                    }}
                    className={
                      "relative max-w-[300px] min-w-[300px] h-fit min-h-[140px] mr-[25px] mb-[25px] rounded-[10px] max-md:max-w-[250px] break-words "
                    }
                    style={{
                      backgroundColor: note?.bgColor
                        ? note?.bgColor
                        : "#202124",
                      backgroundImage: `url(${note?.bgImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      border: contextValue.isSelected.some(
                        (selected: any) => selected == note?._id
                      )
                        ? "2px white solid"
                        : "1px solid #5F6368",
                    }}
                  >
                    {contextValue?.overLay ? (
                      <AnimatePresence>
                        <motion.div
                          onClick={() => {
                            setNoteModal(false);

                            contextValue?.setOverLay(false);
                            setShowBgModal(false);
                          }}
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="fixed z-20 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
                        ></motion.div>
                      </AnimatePresence>
                    ) : (
                      ""
                    )}

                    <ShowNote
                      note={note}
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
                <div className="flex justify-center mx-[auto] w-full ">
                  <p className="flex justify-center text-center text-[20px] mx-auto">
                    {" "}
                    You have no notes{" "}
                  </p>
                </div>
              )
            ) : (
              <div className="flex justify-center text-center mx-[auto] w-full ">
                <span style={{ textAlign: "center" }} className="loader"></span>
              </div>
            )}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default ShowNotes;
