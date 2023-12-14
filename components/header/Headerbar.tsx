"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiGrid, FiMenu } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { IoRefreshSharp, IoSettingsOutline } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import { LiaTimesSolid } from "react-icons/lia";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useAppContext } from "@/helpers/Helpers";

type Props = {};

const Headerbar = (props: any) => {
  const { contextValue }: any = useAppContext();

  // console.log(contextValue.user, "this is logged user");

  const [activeInput, setActiveInput] = useState(false); //Changes the background colour
  const [mobileSearchBar, setMobileSearchBar] = useState(false); //This state controls the mobile search bar whether it shows or not
  const [times, setTimes] = useState(false);

  // console.log(times);
  const handleClick = () => {
    contextValue?.setChangeNoteLayout(!contextValue.changeNoteLayout);
  };

  return (
    <nav className="fixed z-10 top-0 left-0 w-full flex justify-between mb-4 p-4 bg-darkmode border-y-[#525355]">
      <div className="flex items-center justify-between gap-16 w-[60%] min-[850px]:  ">
        {mobileSearchBar ? (
          <form className="bg-white flex items-center rounded-xl px-4 ">
            <span className="bg-#fff border-2 px-1 outline-none border-none  ">
              {
                <BiLeftArrowAlt
                  className="max-sm:text-[20px] max-md:text-[30px] max-lg:text-[30px]"
                  onClick={() => setMobileSearchBar(false)}
                  color="#000"
                  cursor="pointer"
                />
              }{" "}
            </span>
            <input
              className="bg-white text-black w-full rounded-xl text-#000 py-2 border-none outline-none placeholder:text-[16px] font-weight: black "
              placeholder="Search"
              type="text"
            />
            <span className="bg-#fff border-2 px-1 outline-none border-none ">
              {
                <LiaTimesSolid
                  className="max-sm:text-[20px] max-md:text-[30px] max-lg:text-[30px]"
                  onClick={() => setMobileSearchBar(false)}
                  color="#000"
                  cursor="pointer"
                />
              }{" "}
            </span>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <span>
              {
                <FiMenu
                  className="sm:text-[24px] md:text-3x1 "
                  cursor="pointer"
                />
              }{" "}
            </span>
            <img src="./keep.png" className="w-8 h-8 nav:w-12 nav:h-12 " />
            <h1 className="max-lg:text-2xl text-[30px]"> Keep </h1>
          </div>
        )}
        <form
          className={
            activeInput
              ? "max-md:hidden flex items-center bg-white w-full rounded-xl py-2 px-6"
              : "max-md:hidden flex items-center bg-searchbar w-full rounded-xl py-2 px-6 "
          }
        >
          <span>
            {
              <HiSearch
                className="sm:text-2xl md:text-3x1 lg:text-3xl"
                color={activeInput ? "black" : "#fff"}
                cursor="pointer"
              />
            }{" "}
          </span>
          <input
            onClick={() => {
              setActiveInput(true);
              setTimes(true);
            }}
            className={
              activeInput
                ? "min-p-[2px] p-2 bg-white w-full border-none outline-none placeholder: text-black text-[20px] font-weight: black"
                : "p-2 bg-searchbar border-none outline-none placeholder:text-[#E9E9E9] text-[22px] font-weight: black"
            }
            type="text"
            placeholder="Search"
          />
          {activeInput ? (
            <span className=" " onClick={() => setTimes(!times)}>
              {" "}
              {times ? (
                <LiaTimesSolid
                  className="sm:text-2xl md:text-3x1 lg:text-3xl"
                  color={activeInput ? "black" : "#fff"}
                  cursor="pointer"
                />
              ) : (
                ""
              )}{" "}
            </span>
          ) : (
            ""
          )}
        </form>
      </div>
      <div className=" flex items-center justify-between gap-2 min-w-[15%] ">
        <div className="flex items-center gap-1 nav:gap-2 ">
          <span
            onClick={() => setMobileSearchBar(true)}
            className="min-[850px]:hidden "
          >
            {
              <HiSearch
                className="text-[30px] max-sm:text-[20px] max-md:text-[30px] max-lg:text-[30px] "
                cursor="pointer"
              />
            }{" "}
          </span>
          <span className="p-3 rounded-full hover:bg-hover">
            {
              <IoRefreshSharp
                className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] max-lg:text-[30px] "
                cursor="pointer"
              />
            }{" "}
          </span>
          {contextValue?.changeNoteLayout ? (
            <span
              onClick={() => contextValue?.setChangeNoteLayout(false)}
              className="p-3 max-[900px]:hidden rounded-full hover:bg-hover"
            >
              {
                //This is list view
                <FiGrid
                  className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          ) : (
            <span
              onClick={() => contextValue?.setChangeNoteLayout(true)}
              className="p-3 max-[900px]:hidden rounded-full hover:bg-hover"
            >
              {
                //This is masonry view
                <CiGrid2H
                  className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          )}
          <span className="p-3 rounded-full hover:bg-hover">
            {
              <IoSettingsOutline
                className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                cursor="pointer"
              />
            }{" "}
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="p-3 rounded-full hover:bg-hover">
            {
              <CgMenuGridO
                className=" text-[30px] max-sm:text-[24px] max-md:text-[30px] lg:text-3xl "
                cursor="pointer"
              />
            }{" "}
          </span>
          <img
            className="rounded-full"
            src={contextValue.user?.profilePic}
            // src="/irene.jpg"
            width="40"
            height="40"
            alt="img"
          />
        </div>
      </div>
    </nav>
  );
};

export default Headerbar;
