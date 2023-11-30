"use client";
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import BgColor from "./BgColor";
import { useAppContext } from "@/helpers/Helpers";
type Props = {};

const Background = (props: any) => {
  const colors = [
    {
      id: 1,
      name: "Coral",
      color: "#77172E",
    },
    {
      id: 2,
      name: "Peach",
      color: "#692B17",
    },
    {
      id: 3,
      name: "Sand",
      color: "#7C4A03",
    },
    {
      id: 4,
      name: "Mint",
      color: "#264D3B",
    },
    {
      id: 5,
      name: "Sage",
      color: "#0C625D",
    },
    {
      id: 6,
      name: "Fog",
      color: "#256377",
    },
    {
      id: 7,
      name: "Storm",
      color: "#284255",
    },
    {
      id: 8,
      name: "Dusk",
      color: "#472E5B",
    },
    {
      id: 9,
      name: "Blossom",
      color: "#6C394F",
    },
    {
      id: 10,
      name: "Clay",
      color: "#4B443A",
    },
    {
      id: 11,
      name: "Chalk",
      color: "#232427",
    },
  ];

  // console.log(backgroundColor, "current color");

  return (
    <div>
      <div className="bg-[#2D2E30] fixed z-20 h-auto max-h-[200px] w-1/2 m-auto inset-x-0 inset-y-0 rounded-[10px]">
        <div className="flex items-center gap-3 p-4">
          {colors.map((color: any) => {
            return (
              <div className="" key={color?.id}>
                <BgColor
                  color={color}
                  noteUrlParams={props.noteUrlParams}
                  // setBackgroundColor={setBackgroundColor}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Tippy placement="bottom" content="Chalk ">
          <div className="w-[70px] h-[70px] rounded-full">
            <img src="./grocery.svg" className="rounded-full object-cover " />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default Background;
