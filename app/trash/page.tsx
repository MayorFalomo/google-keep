"use client";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import Headerbar from "@/components/header/Headerbar";
import ShowNotes from "@/components/showNotes/ShowNotes";
import Pinned from "@/components/pinned/Pinned";
import Trash from "@/components/trash/Trashes";
import styles from "./trashpage.module.css";
export default function trash() {
  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Trash />
        </div>
      </div>
    </div>
  );
}
