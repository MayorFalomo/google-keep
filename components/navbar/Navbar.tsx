"use client";
import React, { useContext, useEffect } from "react";
import { MdLightbulbOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLabel } from "react-icons/md";
import { BiArchiveIn, BiPencil } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
import Link from "next/link";
import { useAppContext } from "@/helpers/Helpers";
import { getCookie } from "cookies-next";
import axios from "axios";
import Label from "./Label";
// import "../../app/Home.module.css"
type Props = {};

const Navbar = ({ note }: any) => {
  const { contextValue }: any = useAppContext();

  // useEffect(() => {
  //   axios
  //     .get("https://keep-backend-theta.vercel.app/api/user")
  //     .then((res: any) => contextValue?.setNotesLabel(res.data))
  //     .catch((err: any) => console.log(err));
  // }, []);
  // console.log(props?.note, "this is logged notes");

  console.log(note, "this is logged user");

  //   const Label = () => {
  //   console.log(contextValue?.notes, "this is notes in label");
  //   contextValue?.notes.map((note: any) => {
  //     return (
  //       <div key={note?._id}>
  //         <Navbar note={note} />
  //       </div>
  //     );
  //   });
  // };

  // console.log(getCookie("user"), "This is cookies");

  return (
    <nav className="h-[100vh] flex flex-col overflow-none ">
      <ul className=" h-full max-[600px]:flex flex-col items-center mt-[100px] ">
        <Link href="/">
          <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
            <span>
              {
                <MdLightbulbOutline
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <span className="font-[Cinzel]  max-md:hidden">Notes </span>
          </li>
        </Link>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>
            {
              <IoMdNotificationsOutline
                className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                color="#9AA0A6"
                cursor="pointer"
              />
            }
          </span>
          <span className="max-md:hidden"> Remainders</span>
        </li>
        <li className="flex items-center gap-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          {/* <span>
            {
              <MdOutlineLabel
                className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                color="#9AA0A6"
                cursor="pointer"
              />
            }{" "}
          </span> */}
          <span className="max-md:hidden">
            {contextValue?.notes?.map((labelNotes: any) => {
              return (
                <div key={note?._id}>
                  <Label labelNotes={labelNotes} />
                </div>
              );
            })}
          </span>
        </li>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <span>
            {
              <BiPencil
                className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                color="#9AA0A6"
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="max-md:hidden">Edit labels </span>
        </li>
        <Link href="/archive">
          <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
            <span>
              {
                <BiArchiveIn
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <span className="max-md:hidden">Archive </span>
          </li>
        </Link>
        <li className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
          <Link href="/about">
            <span>
              {
                <TfiTrash
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Link>
          <span className="max-md:hidden">Trash </span>
        </li>
      </ul>
      <p className="max-[850px]:hidden px-4 text-[#9AA0A6] text-[18px] hover:text-white cursor-pointer">
        {" "}
        Open-source licenses{" "}
      </p>
    </nav>
  );
};

export default Navbar;
