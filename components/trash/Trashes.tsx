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
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/get-trash/${contextValue?.user?._id}`
      )
      .then((res) => {
        contextValue?.setTrashedNotes(res.data);
      })
      .then(() => setEmptyMessage(true));
  }, []);

  // useEffect(() => {
  //   if (contextValue?.trashedNotes) {
  //     var msnry = new Masonry(".grid", {
  //       //options
  //     });
  //   }
  // }, [contextValue?.trashedNotes]);

  const emptyTrash = async () => {
    let trashed: any = [];
    try {
      await axios
        .delete("http://localhost:5000/api/notes/empty-trash")
        .catch((err) => console.log(err));
      //set contextValue?.setTrashedNotes to empty array
      contextValue?.setTrashedNotes((prevNotes: any) => {
        [{ ...prevNotes, trashed }];
      });
      toast.success("Trash emptied");
    } catch (error) {
      console.log(error);
      toast.error("Error emptying trash");
    }
  };

  // var msnry = new Masonry(".grid", {
  //   //options
  // });

  return (
    <div className=" mb-[200px] ">
      <h1 className="text-center ml-[50px] text-[20px]  mb-[20px]">
        <i>
          Notes in Trash are deleted after 1 day{" "}
          <a onClick={emptyTrash}>
            <span className="text-[#84B4F8] hover:bg-[#24272D] py-4 px-6 rounded-[8px] cursor-pointer">
              empty trash{" "}
            </span>
          </a>{" "}
        </i>
      </h1>
      {/* <DynamicMason /> */}
      <AnimatePresence>
        <motion.div
          onClick={() => {
            contextValue.setOpenTextArea(false);
          }}
          className="flex items-start gap-4 mb-[150px] flex-wrap w-[95%] "
          // className="grid"
          // data-packery='{ "itemSelector": ".grid-item", "gutter": 10 }'
          data-masonry='{ "itemSelector": ".grid-item",
          "columnWidth": 300
         }'
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
                  className=" relative max-w-[350px] min-w-[250px] h-fit min-h-[120px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
                  style={{
                    backgroundColor: trash?.bgColor
                      ? trash?.bgColor
                      : "#202124",
                    backgroundImage: `url(${trash?.bgImage})`,
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
              <div className="flex justify-center m-[auto] ">
                {/* <p className="text-[20px]">No archived notes </p> */}
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
