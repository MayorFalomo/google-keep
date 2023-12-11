"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import { getCookie } from "cookies-next";
import ShowPinned from "./ShowPinned";
type Props = {};

const Pinned = ({ req, res }: any) => {
  const userCookie = getCookie("user", { req, res });
  console.log(userCookie, "This is usercookie");

  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState(false); //toggle create note modal
  const [overLayBg, setOverLayBg] = useState(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState(false);

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/getall-pinned-notes/${userCookie}`
      )
      .then((res) => contextValue.setPinnedNote(res.data.reverse()))
      .catch((err) => console.log(err));
  }, [userCookie]);

  // console.log(contextValue?.pinnedNote);

  // console.log(userCookie, "This is pinned note");

  // useEffect(() => {
  //   const imgLoad = imagesLoaded(containerRef.current);
  //   imgLoad.on("always", () => {
  //     console.log("All images are loaded");
  //   });
  // }, [contextValue.notes]);

  return (
    <div>
      {contextValue?.pinnedNote?.length > 0 ? (
        <h1 className="ml-[50px] text-[20px] mb-[20px]">PINNED </h1>
      ) : (
        ""
      )}
      {contextValue?.pinnedNote?.length > 0 ? (
        <div
          onClick={() => contextValue.setOpenTextArea(false)}
          style={{ position: "relative" }}
          className="relative flex items-start flex-wrap gap-20px "
        >
          {contextValue?.pinnedNote?.map((pinned: any) => (
            <div
              className="relative max-w-[350px] min-w-[250px] h-fit min-h-[200px] border-2 border-[#5f6368] mr-[25px] mb-[25px] rounded-[10px]"
              style={{
                backgroundColor: pinned?.bgColor ? pinned?.bgColor : "#202124",
                backgroundImage: `url(${pinned?.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              key={pinned?._id}
            >
              {overLayBg ? (
                <div
                  onClick={() => {
                    setNoteModal(false);
                    setOverLayBg(false);
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
                noteModal={noteModal}
                setNoteModal={setNoteModal}
                overLayBg={overLayBg}
                setOverLayBg={setOverLayBg}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pinned;
