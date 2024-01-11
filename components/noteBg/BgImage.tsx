"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React from "react";
import Tippy from "@tippyjs/react";
import toast, { Toaster } from "react-hot-toast";

import Image from "next/image";
type Props = {};

//Parent component is Background.tsx
const BgImage = (props: any) => {
  const { contextValue }: any = useAppContext();
  return (
    <div>
      <div className="flex items-center gap-2 w-[100%]">
        <Tippy placement="bottom" content={`${props?.bgImage?.name}`}>
          <div
            onClick={() => {
              props?.setBgColor(" ");
              props?.setBackgroundImage(props?.bgImage?.image);
              props?.setShowBgModal(false);
              contextValue?.setOverLay(false);
            }}
            className={`w-[50px] h-[50px]  outline-none border-none rounded-full`}
          >
            <Image
              src={props?.bgImage?.image}
              width={50}
              height={50}
              className={`w-[50px] h-[50px]  outline-none border-none rounded-full`}
              // style={{
              //   backgroundImage: props?.bgImage?.image,
              //   backgroundRepeat: "no-repeat",
              //   backgroundPosition: "center",
              //   backgroundSize: "cover",
              // }}
              alt="img"
            />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default BgImage;
