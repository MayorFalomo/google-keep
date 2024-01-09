"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import ShowPinned from "./ShowPinned";
import { AnimatePresence, motion } from "framer-motion";
type Props = {};

const Pinned = () => {
  const { contextValue }: any = useAppContext();
  const [pinnedModal, setPinnedModal] = React.useState(false); //toggle create note modal
  const [overLayBg, setOverLayBg] = useState(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [showId, setShowId] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/getall-pinned-notes/${contextValue?.user?._id}`
      )
      .then((res) => {
        contextValue.setPinnedNote(res.data.reverse());
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [contextValue?.user?._id]);

  // console.log(contextValue?.pinnedNote);

  // console.log(userCookie, "This is pinned note");

  // useEffect(() => {
  //   const imgLoad = imagesLoaded(containerRef.current);
  //   imgLoad.on("always", () => {
  //     console.log("All images are loaded");
  //   });
  // }, [contextValue.notes]);

  // console.log(contextValue.pinnedNote);

  return (
    <div className="ml-[50px] max-md:ml-[10px]">
      {contextValue?.pinnedNote?.length > 0 ? (
        <h1 className="text-[20px] mb-[20px]">PINNED </h1>
      ) : (
        ""
      )}
      {contextValue?.pinnedNote?.length > 0 ? (
        <AnimatePresence>
          <motion.div
            onClick={() => contextValue.setOpenTextArea(false)}
            style={{ position: "relative" }}
            className="relative flex items-start flex-wrap gap-20px "
            // className="relative ml-[50px] flex items-start flex-wrap gap-20px "
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {contextValue?.pinnedNote?.map((pinned: any) => (
              <div
                className="relative max-w-[350px] min-w-[250px] h-fit min-h-[120px] border-2 border-[#5f6368] mr-[25px] mb-[25px] rounded-[10px]"
                style={{
                  backgroundColor: pinned?.bgColor
                    ? pinned?.bgColor
                    : "#202124",
                  backgroundImage: `url(${pinned?.bgImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onMouseOver={() => {
                  setShowIconsOnHover(true);
                  setShowId(pinned?._id);
                }}
                onMouseOut={() => {
                  setShowIconsOnHover(false);
                  setShowId("");
                }}
                key={pinned?._id}
              >
                {contextValue?.overLay ? (
                  <div
                    onClick={() => {
                      setPinnedModal(false);
                      contextValue?.setOverLay(false);
                    }}
                    className="fixed z-10 top-0 left-0 h-screen w-screen bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
                  ></div>
                ) : (
                  ""
                )}
                <ShowPinned
                  pinned={pinned}
                  showIconsOnHover={showIconsOnHover}
                  setShowIconsOnHover={setShowIconsOnHover}
                  pinnedModal={pinnedModal}
                  setPinnedModal={setPinnedModal}
                  // overLayBg={overLayBg}
                  showId={showId}
                  // setOverLayBg={setOverLayBg}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pinned;
