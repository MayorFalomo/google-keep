"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Archive from "./Archive";
import "./archives.css";
type Props = {};

const Archives = (props: any) => {
  const { contextValue }: any = useAppContext();
  const userCookie = getCookie("user");
  const [activeId, setActiveId] = useState<any>(" ");

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      const localStorageId = localStorage?.getItem("user");
      setActiveId(localStorageId);
    }
  }, []);

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
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/get-archived/${
          contextValue?.user?._id || activeId
        }`
      )
      .then((res) => {
        contextValue?.setArchivedNote(res.data);
      })
      .then(() => setEmptyMessage(true));
  }, [contextValue?.user?._id, activeId]);

  return (
    <div className=" mb-[200px] ">
      {/* <h1 className="ml-[50px] text-[20px]  mb-[20px]">ARCHIVED NOTES </h1> */}
      {/* <DynamicMason /> */}
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[95%] "
          // data-packery='{ "itemSelector": ".grid-item", "gutter": 10 }'
          //   data-masonry='{ "itemSelector": ".grid-item",
          //   "columnWidth": 300
          //  }'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emptyMessage ? (
            contextValue?.archivedNote?.length > 0 ? (
              contextValue.archivedNote?.map((archived: any, index: any) => (
                <div
                  // data-grid={{ ...note, x: currentX, y: currentY, w: 2, h: 2 }}
                  // data-grid={{ ...note, x: index }}
                  // data-grid={note}
                  onMouseEnter={() => {
                    setShowIconsOnHover(true);
                    setShowId(archived?._id);
                  }}
                  onMouseLeave={() => {
                    setShowIconsOnHover(false);
                    setShowId("");
                  }}
                  className=" relative max-w-[350px] min-w-[250px] h-fit min-h-[120px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
                  style={{
                    backgroundColor: archived?.bgColor
                      ? archived?.bgColor
                      : "#202124",
                    backgroundImage: `url(${archived?.bgImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  key={archived?._id}
                  id={contextValue?.note?._id}
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

                  <Archive
                    archived={archived}
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
              <div className="flex justify-center m-[auto] ">
                <p className="text-[20px]">No archived notes </p>
              </div>
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
