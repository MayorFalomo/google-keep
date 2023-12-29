"use client";
import React from "react";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Single from "./Single";
import ShowNote from "../showNotes/showNote";

type Props = {};

const SingleNote = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [noteModal, setNoteModal] = useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = useState<boolean>(false);
  const [noteUrlParams, setNoteUrlParams] = useState<string>(""); //Send the id of the clicked note
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [picture, setPicture] = useState<string>("");

  // console.log(props?.labeledNotes, "this is props");

  return (
    <div className="mt-[50px] mb-[200px] ">
      {/* <h1 className="ml-[50px] text-[20px]  mb-[20px]">OTHERS </h1> */}
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="grid"
          // data-packery='{ "itemSelector": ".grid-item", "gutter": 10 }'
          data-masonry='{ "itemSelector": ".grid-item",
          "columnWidth": 300
         }'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {props?.emptyMessage ? (
            props?.labeledNotes?.length > 0 ? (
              props?.labeledNotes?.map((note: any, index: any) => (
                <div
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
                  key={note?._id}
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
                    // pinnedSuccess={pinnedSuccess}
                    // setPinnedSuccess={setPinnedSuccess}
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

export default SingleNote;
