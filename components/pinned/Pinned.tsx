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
      .get(`http://localhost:5000/api/notes/get-pinned/${userCookie}`)
      .then((res) => contextValue?.pinnedNote(res.data))
      .catch((err) => console.log(err));
  }, [userCookie]);

  //   const items = contextValue?.notes.map(function(note:any) {
  //   return <div key={note._id}>{note.name}</div>
  // });
  const containerRef = useRef(null);

  var elem = document.querySelector(".grid");
  var msnry = new Masonry(elem, {
    // options
    itemSelector: ".grid-item",
    columnWidth: 300,
    gutter: 10,
    percentPosition: true,
    horizontalOrder: true,
    stagger: 30,
    transitionDuration: 0.5,
    // disable initial layout
    initLayout: false,
  });

  // element argument can be a selector string
  //   for an individual element
  var msnry = new Masonry(".grid", {
    // options
  });

  useEffect(() => {
    const imgLoad = imagesLoaded(containerRef.current);
    imgLoad.on("always", () => {
      console.log("All images are loaded");
    });
  }, [contextValue.notes]);

  return (
    <>
      {contextValue?.pinnedNote.length > 0 ? (
        <div
          onClick={() => contextValue.setOpenTextArea(false)}
          className="grid"
          ref={containerRef}
          data-masonry='{ "itemSelector": ".grid-item", 
      "columnWidth": 300  
     }'
        >
          {contextValue?.pinnedNote?.map((pinned: any) => (
            <div
              // onMouseEnter={() => setShowIconsOnHover(!showIconsOnHover)}
              // onMouseLeave={() => setShowIconsOnHover(showIconsOnHover)}
              className="relative max-w-[350px] min-w-[250px] min-h-[100px] border-2 border-[#5F6368] mr-[25px] mb-[25px] py-3 rounded-[10px]"
              key={pinned._id}
            >
              <ShowPinned
                pinned={pinned}
                showIconsOnHover={showIconsOnHover}
                setShowIconsOnHover={setShowIconsOnHover}
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
