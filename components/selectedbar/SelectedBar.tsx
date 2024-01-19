import { useAppContext } from "@/helpers/Helpers";
import Tippy from "@tippyjs/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiArchiveIn } from "react-icons/bi";
import { BsPin } from "react-icons/bs";
import { IoCloseOutline, IoColorPaletteOutline } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import Background from "../selectedBg/Background";

type Props = {};

const SelectedBar = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [openBgModal, setOpenBgModal] = useState<boolean>(false);

  //Function to trash a selected array of notes
  const trashSelectedNotes = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const arrayOfTrashIds = contextValue?.isSelected;
    try {
      // console.log(arrayOfTrashIds, "Array of trash ids");

      await axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/trash/selected-notes",
          {
            arrayOfTrashIds,
          }
        )
        .catch((err: any) => console.log(err));

      contextValue?.setNotes((prevNotes: any) => {
        return prevNotes.filter(
          (note: any) => !contextValue?.isSelected.includes(note._id)
        );
      });
      contextValue?.setIsSelected([]);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to archive an array of selected notes
  const archiveSelectedNotes = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const arrayOfArchivedIds = contextValue?.isSelected;
    try {
      await axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/archive/selected-notes",
          {
            arrayOfArchivedIds,
          }
        )
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevNotes: any) => {
        return prevNotes.filter(
          (note: any) => !contextValue?.isSelected.includes(note._id)
        );
      });
      toast.success("notes have been archived");
      contextValue?.setIsSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  //Function to pin an array of selected notes
  const pinSelectedNotes = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const arrayOfPinnedIds = contextValue?.isSelected;
    console.log(arrayOfPinnedIds, "array if Pin ids");

    // Get the note objects corresponding to the pinned ids
    const selectedPinnedNotes = arrayOfPinnedIds.map((ids: any) =>
      contextValue?.notes.find((note: any) => note._id == ids)
    );

    try {
      await axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/pin/selected-notes",
          {
            arrayOfPinnedIds,
          }
        )
        .catch((err) => console.log(err));
      contextValue?.setPinnedNote((prevState: any) => {
        return [...prevState, ...selectedPinnedNotes];
      });
      toast.success("Notes pinned successfully");
      contextValue?.setIsSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: "0" }}
        animate={{ width: "100%" }}
        exit={{ width: "0" }}
        className="absolute top-0 left-0 z-30 w-full border-t-2 border-b-2 border-[#5F6368]  border-r-none bg-darkmode "
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6 ">
            <Tippy placement="bottom" content="Close ">
              <span
                onClick={() => {
                  contextValue?.setIsSelected([]);
                  contextValue?.setIsSelectedShow(false);
                }}
                className="text-[28px] cursor-pointer"
              >
                <IoCloseOutline className=" text-[#9AA0A6] text-[26px] max-sm:text-[18px] max-md:text-[22px] " />
              </span>
            </Tippy>
            <div className="flex items-center gap-[8px] ">
              <span className="text-[24px] font-medium ">
                {contextValue?.isSelected.length}{" "}
              </span>
              <p className="text-[24px] font-medium ">selected </p>
            </div>
          </div>
          <div className="relative  flex items-center gap-6 max-sm:gap-2 ">
            {contextValue?.pinnedNote.some(
              (pinned: any) => pinned?._id == contextValue?.isSelected
            ) ? (
              <Tippy placement="bottom" content="already pinned ">
                <button className="p-4 hover:bg-[#27292C] rounded-full text-[#8AB4F8] cursor-not-allowed border-none outline-none  max-sm:p-2 ">
                  <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
                </button>
              </Tippy>
            ) : (
              <form onSubmit={pinSelectedNotes}>
                <Tippy placement="bottom" content="Pin note ">
                  <button
                    type="submit"
                    className="p-4 hover:bg-[#27292C] rounded-full text-[#8AB4F8]  cursor-pointer border-none outline-none  max-sm:p-2 "
                  >
                    <BsPin className="text-[18px] max-sm:text-[18px] max-md:text-[26px] " />
                  </button>
                </Tippy>
              </form>
            )}
            <Tippy placement="bottom" content="Background options ">
              <span
                onClick={() => {
                  setOpenBgModal(true);
                  // contextValue?.setOverLay(true);
                }}
                className="p-4 rounded-full hover:bg-[#313236] transition ease-in-out delay-150 cursor-pointer  max-sm:p-2"
              >
                {
                  <IoColorPaletteOutline className=" text-[#8AB4F8] text-[24px] max-sm:text-[16px] max-md:text-[22px]  " />
                }{" "}
              </span>
            </Tippy>

            <form onSubmit={archiveSelectedNotes}>
              <Tippy placement="bottom" content="Archive ">
                <button
                  type="submit"
                  // onClick={archiveNote}
                  className="p-4 rounded-full hover:bg-[#313236] cursor-pointer  max-sm:p-2 "
                >
                  {
                    <BiArchiveIn
                      className=" text-[#8AB4F8] text-[24px] max-sm:text-[16px] max-md:text-[22px] "
                      cursor="pointer"
                    />
                  }{" "}
                </button>
              </Tippy>
            </form>

            <form onSubmit={trashSelectedNotes}>
              <Tippy placement="bottom" content="Delete forever ">
                <button
                  type="submit"
                  className="p-4 rounded-full hover:bg-[#313236]  cursor-pointer max-sm:p-2 "
                >
                  {
                    <TfiTrash
                      className="text-[24px] max-sm:text-[20px] md:text-[22px] "
                      color="#8AB4F8"
                      cursor="pointer"
                    />
                  }{" "}
                </button>
              </Tippy>
            </form>
            {openBgModal ? (
              <div className="bg-[#2D2E30] absolute left-[-340px] top-[70px] z-50 h-fit w-fit inset-x-0 inset-y-0 rounded-[10px] max-[600px]:h-[100%]  max-[600px]:w-[100%] max-[600px]:max-h-[250px] ">
                <Background setOpenBgModal={setOpenBgModal} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectedBar;
