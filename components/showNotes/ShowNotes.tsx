"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../helpers/Helpers";
import { getCookie } from "cookies-next";
import ShowNote from "./showNote";
import "./notes.css";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { ToastContainer } from "react-toastify";

type Props = {};

//Tried DND kIT BUT IT WAS MESSING UP WITH MY Onclick, All other onClicks just refused to work anymore
export default function ShowNotes({ req, res }: any) {
  const userCookie = getCookie("user", { req, res });

  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
  const [overLay, setOverLay] = useState<boolean>(false);
  const [showIconsOnHover, setShowIconsOnHover] = React.useState<boolean>(
    false
  );
  const [postLoaded, setPostLoaded] = useState<boolean>(false);
  const containerRef = useRef(null);
  const [currentUser, setCurrentUser] = useState<string>(
    contextValue?.user?._id
  );
  const [noteUrlParams, setNoteUrlParams] = React.useState<string>(""); //Send the id of the clicked note
  const [picture, setPicture] = React.useState<string>("");
  const [activeId, setActiveId] = useState(null);
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [successful, setSuccessful] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/getall-notes/${userCookie}`
      )
      .then((res) => contextValue?.setNotes(res.data.notes))
      .catch((err) => console.log(err));
    // setPostLoaded(true);
  }, [userCookie]);

  // console.log(currentUser, "this is currentUser");
  // console.log(contextValue.notes);
  // console.log(contextValue.notes);

  //   const items = contextValue?.notes.map(function(note:any) {
  //   return <div key={note._id}>{note.name}</div>
  // });

  var elem = document.querySelector(".grid");

  // Check if elem is not null before creating Masonry instance
  if (elem !== null) {
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
  } else {
    console.error("Element with class 'grid' not found.");
  }
  var msnry = new Masonry(".grid", {
    // options
  });
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

  return (
    <div className=" mb-[200px] ">
      <h1 className="ml-[50px] text-[20px]  mb-[20px]">OTHERS </h1>
      {/* <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      > */}
      {/* <SortableContext items={contextValue?.notes}> */}
      <div
        onClick={() => {
          contextValue.setOpenTextArea(false);
        }}
        className="grid"
        data-masonry='{ "itemSelector": ".grid-item", 
      "columnWidth": 300
     }'
      >
        {contextValue?.notes?.length > 0 ? (
          contextValue.notes?.map((note: any) => (
            <div
              onMouseEnter={() => {
                setShowIconsOnHover(true);
                setShowId(note?._id);
              }}
              onMouseLeave={() => {
                setShowIconsOnHover(false);
                setShowId("");
              }}
              className="relative max-w-[350px] min-w-[250px] h-fit min-h-[200px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
              style={{
                backgroundColor: note?.bgColor ? note?.bgColor : "#202124",
                backgroundImage: `url(${note?.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              key={note?._id}
              draggable={false}
              // onClick={() => console.log("I am King")}
              id={contextValue?.notes}
            >
              {overLay ? (
                <div
                  onClick={() => {
                    setNoteModal(false);
                    setOverLay(false);
                    setShowBgModal(false);
                  }}
                  className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
                ></div>
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
                setSuccesful={setSuccessful}
              />
            </div>
          ))
        ) : (
          <div className="empty ">
            <p className="text-[22px] text-center"> You have no Notes </p>
          </div>
        )}
      </div>
      {/* </SortableContext> */}
      {/* </DndContext> */}
      {successful && <ToastContainer />}
    </div>

    // <div className=" mb-[200px] ">
    //   <h1 className="ml-[50px] text-[30px]  mb-[20px]">OTHERS </h1>
    //   <DndContext
    //     sensors={sensors}
    //     collisionDetection={closestCenter}
    //     onDragStart={handleDragStart}
    //     onDragEnd={handleDragEnd}
    //   >
    //     <SortableContext
    //       items={contextValue?.notes}
    //       strategy={verticalListSortingStrategy}
    //     >
    //       <div
    //         onClick={() => contextValue.setOpenTextArea(false)}
    //         className="grid"
    //         ref={containerRef}
    //         data-masonry='{ "itemSelector": ".grid-item",
    //   "columnWidth": 300
    //  }'
    //       >
    //         {contextValue?.notes?.length > 0 ? (
    //           contextValue.notes?.map((note: any) => (
    //             <div
    //               onMouseEnter={() => setShowIconsOnHover(!showIconsOnHover)}
    //               onMouseLeave={() => setShowIconsOnHover(false)}
    //               className="max-w-[350px] min-w-[250px] h-fit min-h-[200px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
    //               style={{
    //                 backgroundColor: note?.bgColor
    //                   ? note?.bgColor
    //                   : "transparent",
    //                 backgroundImage: `url(${note?.bgImage})`,
    //                 backgroundPosition: "center",
    //                 backgroundSize: "cover",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //               key={note._id}
    //             >
    //               {overLay ? (
    //                 <div
    //                   onClick={() => {
    //                     setNoteModal(false);
    //                     setOverLay(false);
    //                   }}
    //                   className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
    //                 ></div>
    //               ) : (
    //                 ""
    //               )}

    //               <ShowNote
    //                 note={note}
    //                 overLay={overLay}
    //                 setOverLay={setOverLay}
    //                 noteModal={noteModal}
    //                 setNoteModal={setNoteModal}
    //                 noteUrlParams={noteUrlParams}
    //                 setNoteUrlParams={setNoteUrlParams}
    //                 showIconsOnHover={showIconsOnHover}
    //                 setShowIconsOnHover={setShowIconsOnHover}
    //                 picture={picture}
    //                 setPicture={setPicture}
    //                 activeId={activeId}
    //               />
    //             </div>
    //           ))
    //         ) : (
    //           <div className="empty ">
    //             <p className="text-[22px] text-center"> You have no Notes </p>
    //           </div>
    //         )}
    //       </div>
    //     </SortableContext>
    //   </DndContext>
    // </div>
  );
}
