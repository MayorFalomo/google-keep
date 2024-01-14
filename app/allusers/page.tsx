import Allusers from "@/components/allusers/Allusers";
import Headerbar from "@/components/header/Headerbar";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import styles from "./allusers.module.css";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Allusers />
        </div>
      </div>
    </div>
  );
};

export default page;
