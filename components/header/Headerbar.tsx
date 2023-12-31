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
import Tippy from "@tippyjs/react";

type Props = {};

const Headerbar = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [activeInput, setActiveInput] = useState(false); //Changes the background colour
  const [mobileSearchBar, setMobileSearchBar] = useState(false); //This state controls the mobile search bar whether it shows or not
  const [times, setTimes] = useState(false);
  const [showHover, setShowHover] = useState(false);

  // console.log(times);
  const handleClick = () => {
    contextValue?.setChangeNoteLayout(!contextValue.changeNoteLayout);
  };

  return (
    <nav className="fixed z-10 top-0 left-0 w-full flex justify-between mb-4 p-4 bg-darkmode ">
      <div className="flex items-center justify-between gap-16 w-[60%] min-[850px]:  ">
        {mobileSearchBar ? (
          <form className="bg-white flex items-center rounded-xl px-4 ">
            <Tippy placement="bottom" content="Refresh">
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
            </Tippy>
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
            <Tippy placement="bottom" content="Main menu">
              <span className="p-3 rounded-full :hover bg-[#28292C] cursor-pointer ">
                {
                  <FiMenu
                    className="sm:text-[24px] md:text-3x1 "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </Tippy>
            <img src="/keep.png" className="w-8 h-8 nav:w-12 nav:h-12 " />
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
                ? "min-p-[2px] p-1 bg-white w-full border-none outline-none placeholder: text-black text-[18px] font-weight: black"
                : "p-1 bg-searchbar border-none outline-none placeholder:text-[#E9E9E9] text-[18px] font-weight: black"
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
          <Tippy placement="bottom" content="Refresh">
            <span
              onClick={() => window.location.reload()}
              className="p-3 rounded-full hover:bg-[#313236] "
            >
              {
                <IoRefreshSharp
                  className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] max-lg:text-[30px] "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
          {contextValue?.changeNoteLayout ? (
            <Tippy placement="bottom" content="Grid view">
              <span
                onClick={() =>
                  contextValue?.setChangeNoteLayout(
                    !contextValue?.changeNoteLayout
                  )
                }
                className="p-3 max-[900px]:hidden rounded-full hover:bg-[#313236] "
              >
                {
                  //This is list view
                  <FiGrid
                    className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </Tippy>
          ) : (
            <Tippy placement="bottom" content="List view">
              <span
                onClick={() => contextValue?.setChangeNoteLayout(true)}
                className="p-3 max-[900px]:hidden rounded-full hover:bg-[#313236] "
              >
                {
                  //This is masonry view
                  <CiGrid2H
                    className=" text-[#9AA0A6]  text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                    cursor="pointer"
                  />
                }{" "}
              </span>
            </Tippy>
          )}
          <Tippy placement="bottom" content="Settings">
            <span className="p-3 rounded-full hover:bg-[#313236]">
              {
                <IoSettingsOutline
                  className=" text-[#9AA0A6] text-[30px] max-sm:text-[20px] max-md:text-[30px] lg:text-3xl  "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
        </div>
        <div className="flex items-center gap-2 ">
          <Tippy placement="bottom" content="Google apps">
            <span className="p-3 rounded-full hover:bg-[#313236]">
              {
                <CgMenuGridO
                  className=" text-[30px] max-sm:text-[24px] max-md:text-[30px] lg:text-3xl "
                  cursor="pointer"
                />
              }{" "}
            </span>
          </Tippy>
          <div className="relative h-[45px] w-[45px] rounded-full">
            <img
              className="w-[100%] h-[100%] rounded-full "
              src={contextValue.user?.profilePic}
              width="40"
              height="50"
              alt="img"
              onMouseOver={() => setShowHover(true)}
              onMouseOut={() => setShowHover(false)}
            />
            {showHover && (
              <div className="bg-[#393D40] absolute p-1 px-4 top-[40px] left-[-200px] rounded-[8px]  ">
                <span>Google Account </span>
                <p className="text-[#ADB1B5]">{contextValue.user?.username} </p>
                <p className="text-[#ADB1B5]">{contextValue.user?.email} </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Headerbar;
