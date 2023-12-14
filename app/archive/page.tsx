"use client";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import Headerbar from "@/components/header/Headerbar";
import ShowNotes from "@/components/showNotes/ShowNotes";
import Pinned from "@/components/pinned/Pinned";
import Archive from "@/components/archive/Archives";
import styles from "../archivepage.module.css";
export default function archive() {
  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Archive />
        </div>
      </div>
    </div>
  );
}
