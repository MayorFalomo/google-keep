"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ShowNote from "./showNote";
import "./notes.css";
// import Masonry from "masonry-layout";
type Props = {};

declare global {
  interface HTMLElement {
    masonry?: any; // Define the masonry property on HTMLElement
  }
}

const ShowNotes = (props: any) => {
  const userCookie = getCookie("user");

  const { contextValue }: any = useAppContext();
  const [noteModal, setNoteModal] = React.useState<boolean>(false); //toggle create note modal
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
  const [activeId, setActiveId] = useState<any>(" ");
  const [showId, setShowId] = useState<string>("");
  const [showBgModal, setShowBgModal] = useState(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [pinnedSuccess, setPinnedSuccess] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      const localStorageId = localStorage?.getItem("user");
      setActiveId(localStorageId);
    }
  }, []);

  useEffect(() => {
    if (activeId || userCookie) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/getall-notes/${
            activeId ? userCookie : activeId
          }`
        )
        .then((res) => contextValue?.setNotes(res.data))
        .then(() => setEmptyMessage(true))
        .catch((err) => console.log(err));
    }
  }, [userCookie, activeId]);

  // window.addEventListener("DOMSubtreeModified", function () {
  //   var elem = document.querySelector(".grid");
  //   if (elem) {
  //     var msnry = new Masonry(elem, {
  //       // options
  //       itemSelector: ".grid-item",
  //       columnWidth: 160,
  //       gutter: 20,
  //     });
  //   }
  // });

  const [masonryLoaded, setMasonryLoaded] = useState(false);

  // console.log(Masonry, "Masonry-layout");

  // useEffect(() => {
  //   const loadMasonry = async () => {
  //     try {
  //       // Import masonry-layout dynamically
  //       var { default: Masonry } = await import("masonry-layout");
  //       var elem = document.querySelector(".grid");
  //       // console.log(Masonry, "MASONRY");
  //       // console.log(elem, "ELEM");

  //       // Initialize Masonry on the container element
  //       var msnry = new Masonry(elem, {
  //         // options
  //         // itemSelector: ".grid-item",
  //         // columnWidth: 160,
  //         // gutter: 20,
  //       });

  //       setMasonryLoaded(true);
  //     } catch (error) {
  //       console.error("Error loading Masonry:", error);
  //     }
  //   };

  //   // Call the function to load Masonry when the component mounts
  //   loadMasonry();
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (contextValue?.changeNoteLayout == false) {
  //       window.addEventListener("DOMSubtreeModified", async function () {
  //         var { default: Masonry } = await import("masonry-layout");
  //         var elem = document.querySelector(".grid");
  //         if (!contextValue?.changeNoteLayout) {
  //           var msnry = new Masonry(".grid", {
  //             // options
  //             // itemSelector: ".grid-item",
  //             // columnWidth: 160,
  //             // gutter: 20,
  //           });
  //         } else {
  //           return null;
  //         }
  //       });
  //     }
  //   }
  // }, [!contextValue?.changeNoteLayout]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        window.innerWidth <= 550
          ? contextValue?.setChangeNoteLayout(true)
          : contextValue?.setChangeNoteLayout(false);
      });
    }
  }, [window.innerWidth <= 550]);

  const gridRef = useRef(null);
  const masonryRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let masonryInstance: any;
      if (contextValue?.changeNoteLayout == false) {
        import("masonry-layout").then((module) => {
          const Masonry = module.default;
          // console.log(Masonry, "This is Masonry");

          masonryInstance = new Masonry(gridRef.current, {
            // options
            // itemSelector: ".grid-item",
            // columnWidth: 160,
            // gutter: 20,
          });
          // console.log(masonryInstance, "This is masonryInstance");
          // console.log(masonryRef.current, "This is masonryRef");
          masonryRef.current = masonryInstance;
        });
      }
      return () => {
        if (masonryInstance) {
          masonryInstance.destroy();
        }
      };
    }
  });

  console.log(contextValue?.changeNoteLayout, "layout");

  return (
    <div className="ml-[50px] max-md:ml-[10px] ">
      <h1 className=" text-[#8A949E] text-[20px]  mb-[20px]">OTHERS </h1>
      <AnimatePresence>
        {
          <motion.div
            onClick={() => {
              contextValue.setOpenTextArea(false);
            }}
            ref={gridRef}
            // className="flex items-start gap-4 ml-[50px] mb-[150px] flex-wrap w-[95%] "
            // className="columns-4 gap-3 w-95% mx-auto space-y-8 pb-4"
            className={contextValue?.changeNoteLayout ? "flex-layout" : "grid"}
            // data-packery='{ "itemSelector": ".grid-item", "gutter": 10 }'
            //   data-masonry='{ "itemSelector": ".grid-item",
            //   "columnWidth": 300
            //  }'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {emptyMessage ? (
              contextValue?.notes?.length > 0 ? (
                contextValue.notes?.map((note: any, index: any) => (
                  <div
                    key={note?._id}
                    onMouseEnter={() => {
                      setShowIconsOnHover(true);
                      setShowId(note?._id);
                    }}
                    onMouseLeave={() => {
                      setShowIconsOnHover(false);
                      setShowId("");
                    }}
                    className={
                      contextValue?.changeNoteLayout
                        ? " relative max-w-[600px] min-w-[270px] w-[95%] h-fit min-h-[150px] border-2 border-[#5F6368] rounded-[10px]"
                        : "relative max-w-[350px] min-w-[250px] h-fit min-h-[120px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
                    }
                    style={{
                      backgroundColor: note?.bgColor
                        ? note?.bgColor
                        : "#202124",
                      backgroundImage: `url(${note?.bgImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {contextValue?.overLay ? (
                      <AnimatePresence>
                        <motion.div
                          onClick={() => {
                            setNoteModal(false);
                            contextValue?.setOverLay(false);
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
                      // overLay={overLay}
                      // setOverLay={setOverLay}
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
                <div className="flex justify-center mx-[auto] w-full ">
                  <p className="flex justify-center text-center text-[20px] mx-auto">
                    {" "}
                    You have no notes{" "}
                  </p>
                </div>
              )
            ) : (
              <div className="flex justify-center text-center mx-[auto] w-full ">
                <span style={{ textAlign: "center" }} className="loader"></span>
              </div>
            )}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default ShowNotes;
