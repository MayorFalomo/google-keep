"use client";
import Image from "next/image";
import Homepage from "./page";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import style from "./Home.module.css";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import ShowNotes from "@/components/showNotes/ShowNotes";

async function getData(id: any) {
  // const res = await fetch(`http://localhost:5000/api/users/get-user/${id}`);
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();
}
// console.log(cookies.user)

export default async function Home() {
  // const [cookies, setCookie] = useCookies(["user"]);

  // useEffect(() => {
  //   axios
  //     .get(`localhost:5000/api/users/${cookies.user}`)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // const data = await getData(cookies.user);
  // console.log(data, "This is data");

  // console.log(cookies.user, "This is cookies");

  return (
    <div className={style.container}>
      {/* {data.map((value: any) => {
        <div>{value} </div>;
      })} */}
      {/* <Navbar /> */}
      <div className="">
        {/* <Notes /> */}
        {/* <h1>This is the notes Component </h1>
        <ShowNotes /> */}
      </div>
    </div>
  );
}
