"use client";
import Navbar from "@/components/navbar/Navbar";
import Headerbar from "@/components/header/Headerbar";
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
