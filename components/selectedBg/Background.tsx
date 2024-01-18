"use client";
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import BgColor from "./BgColor";
import Default from "../../public/default.png";
import { useAppContext } from "@/helpers/Helpers";
import BgImage from "./BgImage";
import { MdHideImage } from "react-icons/md";

type Props = {};

//Parent component is ShowNote.tsx
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

  const bgImages = [
    // {
    //   id: 0,
    //   name: "Default",
    //   defaultImage: `${(<MdHideImage />)}`,
    // },
    {
      id: 1,
      name: "Groceries",
      image: `https://www.gstatic.com/keep/backgrounds/grocery_dark_thumb_0615.svg`,
    },
    {
      id: 2,
      name: "Food",
      image: `https://www.gstatic.com/keep/backgrounds/food_dark_thumb_0615.svg`,
    },
    {
      id: 3,
      name: "Music",
      image: `https://www.gstatic.com/keep/backgrounds/music_dark_thumb_0615.svg`,
    },
    {
      id: 4,
      name: "Recipe",
      image: `https://www.gstatic.com/keep/backgrounds/recipe_dark_thumb_0615.svg`,
    },
    {
      id: 5,
      name: "Notes",
      image: `https://www.gstatic.com/keep/backgrounds/notes_dark_thumb_0715.svg`,
    },
    {
      id: 6,
      name: "Places",
      image: `https://www.gstatic.com/keep/backgrounds/places_dark_thumb_0615.svg`,
    },
    {
      id: 7,
      name: "Travel",
      image: `https://www.gstatic.com/keep/backgrounds/travel_dark_thumb_0615.svg`,
    },
    {
      id: 8,
      name: "Videos",
      image: `https://www.gstatic.com/keep/backgrounds/video_dark_thumb_0615.svg`,
    },
    {
      id: 9,
      name: "Celebration",
      image: `https://www.gstatic.com/keep/backgrounds/celebration_dark_thumb_0715.svg`,
    },
  ];

  // console.log(props?.showBgModal, "current color");

  return (
    <div>
      <div className="flex items-center gap-3 p-4 max-[600px]:flex-wrap">
        {colors?.map((color: any) => {
          return (
            <div className="" key={color?.id}>
              <BgColor color={color} setOpenBgModal={props?.setOpenBgModal} />
            </div>
          );
        })}
      </div>

      <div style={{ border: "1px solid #5F6368" }} className="w-full "></div>
      <div className="flex items-center gap-3 p-4  max-[600px]:flex-wrap  max-[600px]:p-2">
        {bgImages?.map((bgImage: any) => {
          return (
            <div className="" key={bgImage?.id}>
              <BgImage
                bgImage={bgImage}
                setOpenBgModal={props?.setOpenBgModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Background;
