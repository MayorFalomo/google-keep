"use client";
import React, { useState } from "react";
import { MdLightbulbOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiArchiveIn, BiPencil } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
import Link from "next/link";
import { useAppContext } from "@/helpers/Helpers";
import Label from "./Label";
import EditLabel from "../editLabel/EditLabel";
import { AnimatePresence, motion } from "framer-motion";
import MobileNav from "../mobileNav/MobileNav";
import { usePathname } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";

type Props = {};

const Navbar = ({ note }: any) => {
  const { contextValue }: any = useAppContext();
  const [overlay, setOverlay] = useState(false);

  //function to filter notes for notes with label length greater than 1 and assign it to a filterArray variable
  const filteredArray = contextValue?.notes?.filter(
    (element: any) => element?.labelId?.length > 1
  );

  //function takes in two arguments, one an array of notes and the second is an array of notes values which is label and labelId
  function getUniqueElementsByProperties(arr: any, properties: any) {
    const uniqueSet = new Set();
    const resultArray = [];

    for (const obj of arr) {
      const key = properties?.map((prop: any) => obj[prop]).join("-");
      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        resultArray.push(obj);
      }
    }

    return resultArray;
  }

  //we call the function to get unique elements and pass our values of the filtered array(array containing all notes with label length greater than 1) and the properties array
  const uniqueElements = getUniqueElementsByProperties(filteredArray, [
    "label",
    "labelId",
  ]);

  //To get the url pathname
  const currentRoute = usePathname();

  return (
    <div>
      {contextValue?.openMobileNav ? (
        <MobileNav />
      ) : (
        <nav className="h-[100vh] flex flex-col overflow-none bg-darkmode max-[350px]:w-[80px] ">
          <ul className=" h-full mt-[100px] w-full ">
            <Link href="/">
              <li
                className={`flex items-center gap-6 py-4 px-4 text-[20px] hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                  currentRoute == "/" ? "bg-[#41331C]" : ""
                }`}
              >
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

            <Link href="/remainders">
              {" "}
              <li
                className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                  currentRoute == "/remainders" ? "bg-[#41331C]" : ""
                } `}
              >
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
            </Link>
            <li
              className={`flex items-center gap-4 text-[20px]  rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                currentRoute == "/label" ? "bg-[#41331C]" : ""
              } `}
            >
              <div className=" w-full max-md:hidden">
                {uniqueElements?.map((labelNotes: any) => {
                  return (
                    <div key={labelNotes?._id}>
                      <Label labelNotes={labelNotes} />
                    </div>
                  );
                })}
              </div>
            </li>
            <li
              onClick={() => {
                contextValue?.setEditLabelModal(true);
                setOverlay(false);
              }}
              className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer"
            >
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
            {contextValue?.editLabelModal ? <EditLabel /> : ""}
            {contextValue?.editLabelModal ? (
              <AnimatePresence>
                <motion.div
                  onClick={() => {
                    setOverlay(false);
                    contextValue?.setEditLabelModal(false);
                  }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed z-10 top-0 left-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 "
                ></motion.div>
              </AnimatePresence>
            ) : (
              ""
            )}
            <Link href="/archive">
              <li
                className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                  currentRoute == "/archive" ? "bg-[#41331C]" : ""
                } `}
              >
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

            <Link href="/trash">
              {" "}
              <li
                className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                  currentRoute == "/trash" ? "bg-[#41331C]" : ""
                } `}
              >
                <span className="">
                  {
                    <TfiTrash
                      className=" max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                      color="#9AA0A6"
                      cursor="pointer"
                    />
                  }{" "}
                </span>
                <span className="max-md:hidden">Trash </span>
              </li>
            </Link>

            <Link href="/allusers">
              {" "}
              <li
                className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
                  currentRoute == "/allusers" ? "bg-[#41331C]" : ""
                } `}
              >
                <span className="">
                  {
                    <BsPersonFill
                      className=" max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                      color="#9AA0A6"
                      cursor="pointer"
                    />
                  }{" "}
                </span>
                <span className="max-md:hidden">All Users </span>
              </li>
            </Link>
          </ul>
          <p className="max-[850px]:hidden px-4 text-[#9AA0A6] text-[18px] hover:text-white cursor-pointer">
            {" "}
            Open-source licenses{" "}
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
