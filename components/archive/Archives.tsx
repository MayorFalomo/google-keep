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
  const [archivedModal, setArchivedModal] = useState(false);

  useEffect(() => {
    // console.log(contextValue?.user?.userId, "userId");
    if (contextValue?.user?.userId) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/getall-archived/${contextValue?.user?.userId}`
        )
        .then((res: any) => {
          contextValue?.setArchivedNote(res.data);
        })
        .then(() => setEmptyMessage(true))
        .catch((err) => console.log(err));
    }
  }, [contextValue?.user?.userId]);

  return (
    <div className="mt-[30px] mb-[200px] ml-[40px] max-md:ml-[20px] ">
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[95%] "
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emptyMessage ? (
            contextValue?.archivedNote?.length > 0 ? (
              contextValue.archivedNote?.map((archived: any, index: any) => (
                <div
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
                          setArchivedModal(false);
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
                    archivedModal={archivedModal}
                    setArchivedModal={setArchivedModal}
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
