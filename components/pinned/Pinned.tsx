"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import { getCookie } from "cookies-next";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import ShowPinned from "./ShowPinned";
type Props = {};

const Pinned = (req: any, res: any) => {
  const userCookie = getCookie("user", { req, res });
  const { contextValue }: any = useAppContext();
  const [overLayBg, setOverLayBg] = useState(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/getall-pinned-notes/${userCookie}`)
      .then((res) => contextValue.setPinnedNote(res.data.reverse()))
      .catch((err) => console.log(err));
  }, [userCookie]);

  // console.log(userCookie, "This is pinned note");

  // useEffect(() => {
  //   const imgLoad = imagesLoaded(containerRef.current);
  //   imgLoad.on("always", () => {
  //     console.log("All images are loaded");
  //   });
  // }, [contextValue.notes]);

  return (
    <>
      {contextValue?.pinnedNote?.length > 0 ? <h1>PINNED </h1> : ""}
      {contextValue?.pinnedNote?.length > 0 ? (
        <div
          onClick={() => contextValue.setOpenTextArea(false)}
          className="flex items-start flex-wrap ml-[50px] mt-[20px] gap-20px "
          //       ref={containerRef}
          //       data-masonry='{ "itemSelector": ".grid-item",
          //   "columnWidth": 300
          //  }'
        >
          {contextValue?.pinnedNote?.map((pinned: any) => (
            <div
              className="relative max-w-[350px] min-w-[250px] min-h-[100px] border-2 border-[#5f6368] mr-[25px] mb-[25px] py-3 rounded-[10px]"
              key={pinned?._id}
            >
              {overLayBg ? (
                <div className="fixed z-10 top-0 left-0 h-screen w-screen bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "></div>
              ) : (
                ""
              )}
              <ShowPinned
                pinned={pinned}
                showIconsOnHover={showIconsOnHover}
                setShowIconsOnHover={setShowIconsOnHover}
                overLayBg={overLayBg}
                setOverLayBg={setOverLayBg}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pinned;
