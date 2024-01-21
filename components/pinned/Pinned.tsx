"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import ShowPinned from "./ShowPinned";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
type Props = {};

const Pinned = () => {
  const { contextValue }: any = useAppContext();
  const [pinnedModal, setPinnedModal] = React.useState(false); //toggle create note modal
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [showId, setShowId] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/getall-pinned-notes/${contextValue?.user?.userId}`
      )
      .then((res) => {
        contextValue.setPinnedNote(res.data);
      })
      .catch((err) => console.log(err));
  }, [contextValue?.user?.userId]);

  useEffect(() => {
    if (contextValue?.user?.notifications.length > 0) {
      toast.success("You have a new remainder", {
        duration: 6000,
        position: "top-right",
      });
    }
  }, []);

  return (
    <div className="ml-[20px] max-md:ml-[20px] max-sm:w-[90%] ">
      {contextValue?.pinnedNote?.length > 0 ? (
        <h1 className="text-[#8A949E] text-[20px] mb-[20px]  max-sm:text-[18px] ">
          PINNED{" "}
        </h1>
      ) : (
        ""
      )}
      {contextValue?.pinnedNote?.length > 0 ? (
        <AnimatePresence>
          <motion.div
            onClick={() => contextValue.setOpenTextArea(false)}
            style={{ position: "relative" }}
            className="relative flex items-start flex-wrap gap-[20px] "
            // className="relative ml-[50px] flex items-start flex-wrap gap-20px "
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {contextValue?.pinnedNote?.map((pinned: any) => (
              <div
                className="relative max-w-[300px] min-w-[300px] h-fit min-h-[140px] border-2 border-[#5f6368] break-words mb-[25px] rounded-[10px] max-md:w-[250px] max-sm:min-w-[100%] "
                style={{
                  backgroundColor: pinned?.bgColor
                    ? pinned?.bgColor
                    : "#202124",
                  backgroundImage: `url(${pinned?.bgImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onMouseEnter={() => {
                  setShowIconsOnHover(true);
                  setShowId(pinned?._id);
                }}
                onMouseLeave={() => {
                  setShowIconsOnHover(false);
                  setShowId("");
                }}
                onTouchStart={() => {
                  setShowIconsOnHover(true);
                  setShowId(pinned?._id);
                }}
                key={pinned?._id}
              >
                <ShowPinned
                  pinned={pinned}
                  showIconsOnHover={showIconsOnHover}
                  setShowIconsOnHover={setShowIconsOnHover}
                  pinnedModal={pinnedModal}
                  setPinnedModal={setPinnedModal}
                  showId={showId}
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
