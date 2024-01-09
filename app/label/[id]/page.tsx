"use client";
import Headerbar from "@/components/header/Headerbar";
import Navbar from "@/components/navbar/Navbar";
import SingleNote from "@/components/singleNote/SingleNote";
import styles from "./labelId.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Notes from "@/components/notes/Notes";

export default function Page({ params }: any) {
  const [labeledNotes, setLabeledNotes] = useState<any>([]);
  const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `https://keep-backend-theta.vercel.app/api/notes/get-label/${params.id}`
      )
      .then((res) => setLabeledNotes(res.data))
      .then(() => setEmptyMessage(true))
      .catch((err) => console.log(err));
  }, [params.id]);
  // console.log(labeledNotes?.note, "labelled");

  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Notes />
          <div>
            <SingleNote
              labeledNotes={labeledNotes}
              setLabelNotes={setLabeledNotes}
              emptyMessage={emptyMessage}
              setEmptyMessage={setEmptyMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
