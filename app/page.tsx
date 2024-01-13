"use client";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import styles from "./Homepage.module.css";
import Headerbar from "@/components/header/Headerbar";
import ShowNotes from "@/components/showNotes/ShowNotes";
import Pinned from "@/components/pinned/Pinned";
import { useAppContext } from "@/helpers/Helpers";
import ListView from "@/components/showNotes/ListView";
import { useEffect } from "react";

export default function Page() {
  const { contextValue }: any = useAppContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        if (window.innerWidth <= 550) {
          contextValue?.setChangeNoteLayout(true);
          // setActivateSwitch(true);
        } else {
          // setActivateSwitch(false);
          contextValue?.setChangeNoteLayout(false);
        }
      });
    }
  }, [window.innerWidth]);

  // console.log(window.innerWidth, "width");

  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Notes />
          <div className="my-[50px]">
            <Pinned />
            <div>
              {typeof window !== "undefined" ? (
                window.innerWidth <= 550 || contextValue?.changeNoteLayout ? (
                  <ListView />
                ) : (
                  <ShowNotes />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
