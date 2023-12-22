"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import { getCookie } from "cookies-next";
import ShowNote from "./showNote";
import "./notes.css";
// import Masonry from "masonry-layout";
// import Packery from "packery";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

//Tried DND kIT BUT IT WAS MESSING UP WITH MY Onclick, All other onClicks just refused to work anymore
const ShowNotes = (props: any) => {
  const userCookie = getCookie("user");

  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [postLoaded, setPostLoaded] = useState<boolean>(false);
  // const containerRef = useRef(null);
  const [currentUser, setCurrentUser] = useState<string>(
    contextValue?.user?._id
  );
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [picture, setPicture] = React.useState<string>("");
  const [activeId, setActiveId] = useState(null);
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [pinnedSuccess, setPinnedSuccess] = useState<boolean>(false);

  // console.log(userCookie);

  useEffect(() => {
    if (userCookie) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/getall-notes/${userCookie}`
        )
        .then((res) => contextValue?.setNotes(res.data.notes))
        .catch((err) => console.log(err));
      // setPostLoaded(true);
    }
  }, [userCookie]);

  const items = contextValue?.notes || []; // Assuming contextValue.notes is the array of items

  let currentX = 0;
  let currentY = 0;

  const layout = items.map((note: any, index: number) => ({
    ...note,
    x: index,
    y: currentY,
    w: 2,
    h: 2,
  }));

  // const DynamicMason = dynamic(() => import("masonry-layout"), {
  //   ssr: false,
  // });
  // console.log(currentUser, "this is currentUser");
  // console.log(contextValue.notes);
  // console.log(contextValue.notes);

  //   const items = contextValue?.notes.map(function(note:any) {
  //   return <div key={note._id}>{note.name}</div>
  // });

  // var grid = document.querySelector("grid");

  // // // Check if elem is not null before creating Masonry instance
  // if (grid !== null) {
  //   var msnry = new Masonry(grid, {
  //     // options...
  //     itemSelector: ".grid-item",
  //     columnWidth: 300,
  //   });
  // } else {
  //   console.error("Element with class 'grid' not found.");
  // }

  // var msnry = new Masonry(".grid", {
  //   // options
  // });

  // React.useEffect(() => {
  // var msnry = new Masonry(".grid", {
  //   //options
  // });
  // const func = async() {
  //   const Fuse = (await import('masonry-layout')).default

  // }

  // func()

  // useEffect(() => {
  //   if (contextValue?.notes) {
  //     import("masonry-layout")
  //       .then((masonry) => {
  //         // Use masonry library here
  //         var msnry = new Masonry(".grid", {
  //           //options
  //         });
  //       })
  //       .catch((error) => {
  //         // Handle error while importing
  //         console.log(error);
  //       });
  //   }
  // }, []);

  // window is accessible here.
  // console.log("window.innerHeight", window.innerHeight);
  // });

  // Function to initialize Packery on the client side
  // const containerRef = useRef<HTMLDivElement>(null);

  // var elem = document.querySelector(".grid");
  // //@ts-ignore
  // var pckry = new Packery(elem, {
  //   // options
  //   itemSelector: ".grid-item",
  //   gutter: 10,
  // });

  // // element argument can be a selector string
  // //   for an individual element
  // //@ts-ignore
  // var pckry = new Packery(".grid", {
  //   // options
  // });
  // element argument can be a selector string
  //   for an individual element

  // element argument can be a selector string
  //   for an individual element

  // useEffect(() => {
  //   const imgLoad = imagesLoaded(containerRef.current);
  //   imgLoad.on("always", () => {
  //     console.log("All images are loaded");
  //   });
  // }, [contextValue.notes]);

  // const onDragEnd = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const reorderedNotes = Array.from(contextValue?.notes);
  //   const [movedNote] = reorderedNotes.splice(result.source.index, 1);
  //   reorderedNotes.splice(result.destination.index, 0, movedNote);

  //   contextValue?.setNotes(reorderedNotes);
  // };

  // const onDragEnd = (event: any) => {
  //   const { active, over } = event;
  //   if (active.id == over.id) {
  //     return;
  //   }
  //   contextValue?.setNotes((notes: any) => {
  //     const oldIndex = notes.findIndex((note: any) => note.id == active.id);
  //     const newIndex = notes.findIndex((note: any) => note.id == over.id);
  //     return arrayMove(notes, oldIndex, newIndex);
  //   });
  // };

  // const mouseSensor = useSensor(MouseSensor);
  // const touchSensor = useSensor(TouchSensor);
  // const keyboardSensor = useSensor(KeyboardSensor);

  // const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // const handleDragStart = (event: any) => {
  //   const id = event.active.data.current.id;
  //   setActiveId(id);
  // };

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;

  //   if (active && over) {
  //     const oldIndex = contextValue?.notes.findIndex(
  //       (note: any) => note?._id == active.id
  //     );
  //     const newIndex = contextValue?.notes.findIndex(
  //       (note: any) => note?._id == over.id
  //     );

  //     contextValue?.setNotes((prevNotes: any) =>
  //       arrayMove(prevNotes, oldIndex, newIndex)
  //     );
  //   }

  //   setActiveId(null);
  // };

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;

  //   if (active && over) {
  //     const oldIndex = contextValue?.notes.findIndex(
  //       (note: any) => note._id == active.id
  //     );
  //     const newIndex = contextValue?.notes.findIndex(
  //       (note: any) => note._id == over.id
  //     );

  //     contextValue?.setNotes((prevNotes: any) =>
  //       arrayMove(prevNotes, oldIndex, newIndex)
  //     );
  //   }

  //   setActiveId(null);
  // };

  // console.log(successful, "sUCCESSFUL");

  // const layout = [
  //   // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //   // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   { i: "c", x: 4, y: 0, w: 1, h: 2 },
  // ];

  return (
    <div className=" mb-[200px] ">
      <h1 className="ml-[50px] text-[20px]  mb-[20px]">OTHERS </h1>
      {/* <DynamicMason /> */}
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
          {contextValue?.notes?.length > 0 ? (
            contextValue.notes?.map((note: any, index: any) => (
              <div
                // data-grid={{ ...note, x: currentX, y: currentY, w: 2, h: 2 }}
                // data-grid={{ ...note, x: index }}
                // data-grid={note}
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
                  successful={successful}
                  setSuccessful={setSuccessful}
                  pinnedSuccess={pinnedSuccess}
                  setPinnedSuccess={setPinnedSuccess}
                />
              </div>
            ))
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

export default ShowNotes;
