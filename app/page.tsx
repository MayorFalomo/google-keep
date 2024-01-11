"use client";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import styles from "./Homepage.module.css";
import Headerbar from "@/components/header/Headerbar";
import ShowNotes from "@/components/showNotes/ShowNotes";
import Pinned from "@/components/pinned/Pinned";
import { useAppContext } from "@/helpers/Helpers";
import ListView from "@/components/showNotes/ListView";

export default function Page() {
  const { contextValue }: any = useAppContext();
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
              {contextValue?.changeNoteLayout ? <ListView /> : <ShowNotes />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
