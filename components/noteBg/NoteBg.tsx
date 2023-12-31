"use client";
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type Props = {};

//Parent component is ShowNote.tsx
const NoteBg = (props: any) => {
  return (
    <div>
      <div className="flex items-center gap-2 w-[100%]">
        <Tippy placement="bottom" content={`${props?.bgColor?.name}`}>
          <div
            onClick={() => {
              props?.setBackgroundImage(" ");
              props.setBgColor(props?.bgColor?.color);
              props?.setShowBgModal(false);
            }}
            className={`w-[40px] h-[40px] hover:border-2 border-white outline-none border-none rounded-full`}
            style={{ backgroundColor: props?.bgColor?.color }}
          ></div>
        </Tippy>
      </div>
    </div>
  );
};

export default NoteBg;
