"use client";
import React, { useContext, useEffect, useState } from "react";
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
import EditLabel from "../editLabel/EditLabel";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
// import "../../app/Home.module.css"
type Props = {};

const MobileNav = ({ note }: any) => {
  const { contextValue }: any = useAppContext();
  const [overlay, setOverlay] = useState(false);

  //function to filter notes for notes with label length greater than 1 and assign it to a filterArray variable
  const filteredArray = contextValue?.notes?.filter(
    (element: any) => element?.labelId?.length > 1
  );
  // console.log(filteredArray);

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

  const route = usePathname();
  //   console.log(route);

  return (
    <nav className="fixed left-0 bottom-0 z-50 w-[60%] h-[90%]  border-2 border-t-[#5F6368] border-x-0 border-b-0 flex flex-col overflow-none bg-darkmode transition ease-in-out delay-150 ">
      <ul className=" h-full mt-[50px] w-full ">
        <Link href="/">
          <li
            className={`flex items-center gap-6 py-4 px-4 text-[18px] hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
              route == "/" ? "bg-[#41331C]" : ""
            } `}
          >
            <span>
              {
                <MdLightbulbOutline
                  className="max-sm:text-[20px] md:text-[22px]"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <span className="text-[18px] ">Notes </span>
          </li>
        </Link>

        <li
          className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
            route == "/reminders" ? "bg-[#41331C]" : ""
          } `}
        >
          <span>
            {
              <IoMdNotificationsOutline
                className="max-sm:text-[20px] md:text-[22px]"
                color="#9AA0A6"
                cursor="pointer"
              />
            }
          </span>
          <span className="text-[18px]"> Remainders</span>
        </li>
        <li
          className={`flex items-center gap-4 text-[20px]  rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
            route == "/labels" ? "bg-[#41331C]" : ""
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
                className="max-sm:text-[20px] md:text-[22px]"
                color="#9AA0A6"
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="text-[18px]">Edit labels </span>
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
              route == "/archive" ? "bg-[#41331C]" : ""
            } `}
          >
            <span>
              {
                <BiArchiveIn
                  className="max-sm:text-[20px] md:text-[22px]"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <span className="text-[18px]">Archive </span>
          </li>
        </Link>

        <Link href="/trash">
          {" "}
          <li
            className={`flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-[#28292C] rounded-r-full transition ease-in-out delay-150 cursor-pointer ${
              route == "/trash" ? "bg-[#41331C]" : ""
            } `}
          >
            <span>
              {
                <TfiTrash
                  className="max-sm:text-[20px] md:text-[22px]"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <span className="text-[18px]">Trash </span>
          </li>
        </Link>
      </ul>
      <p className="px-4 text-[#9AA0A6] text-[18px] hover:text-white cursor-pointer">
        {" "}
        Open-source licenses{" "}
      </p>
    </nav>
  );
};

export default MobileNav;
