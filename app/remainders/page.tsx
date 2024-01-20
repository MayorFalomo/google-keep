import Headerbar from "@/components/header/Headerbar";
import Navbar from "@/components/navbar/Navbar";
import Remainders from "@/components/remainder/Remainders";
import styles from "./remainders.module.css";
import React from "react";
import Notifications from "@/components/remainder/Notifications";

type Props = {};

const remainders = (props: any) => {
  return (
    <div>
      <Headerbar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notesContain}>
          <Remainders />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default remainders;
