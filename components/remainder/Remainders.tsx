"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Remainder from "./Remainder";
import "./Remainders.css";
type Props = {};

const Remainders = (props: any) => {
  const [activeId, setActiveId] = useState<any>(" ");

  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [currentUser, setCurrentUser] = useState<any>([]);
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  useEffect(() => {
    if (contextValue?.user?.userId) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/users/get-user/uid/${contextValue?.user?.userId}`
        )
        .then((res) => {
          setCurrentUser(res.data);
        })
        .then(() => setEmptyMessage(true))
        .catch((err) => console.log(err));
    }
  }, [contextValue?.user?.userId]);

  // console.log(currentUser, "This is current");

  return (
    <div className=" mt-[10px] mb-[50px] ml-[40px] max-md:ml-[20px]  max-sm:w-[90%]  ">
      <h1 className="flex items-start justify-start text-[22px]  mb-[20px] max-sm:text-[16px] max-[850px]:ml-[0px] ">
        Pending Remainders
      </h1>
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[100%] "
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {emptyMessage ? (
            contextValue?.user?.pending?.length > 0 ? (
              contextValue.user?.pending?.map((remainder: any, index: any) => (
                <div
                  onMouseEnter={() => {
                    setShowIconsOnHover(true);
                    setShowId(remainder?._id);
                  }}
                  onMouseLeave={() => {
                    setShowIconsOnHover(false);
                    setShowId("");
                  }}
                  onTouchStart={() => {
                    setShowIconsOnHover(true);
                    setShowId(remainder?._id);
                  }}
                  className=" relative max-w-[300px] min-w-[300px] h-fit min-h-[140px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px] break-words  max-md:w-[250px] max-sm:min-w-[100%] "
                  style={{
                    backgroundColor: remainder?.bgColor
                      ? remainder?.bgColor
                      : "#202124",
                    backgroundImage: remainder?.bgImage
                      ? `url(${remainder?.bgImage})`
                      : "#202124",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  key={remainder?._id}
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

                  <Remainder
                    remainder={remainder}
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
              <div className="flex justify-center m-[auto] text-[22px] font-medium ">
                You have no new remainders{" "}
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

export default Remainders;
