import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";

type Props = {};

const BgColor = (props: any) => {
  const { contextValue }: any = useAppContext();

  const appendBgToNote = () => {
    const bgObject = {
      _id: props.noteUrlParams,
      bgColor: contextValue?.backgroundColor,
    };
    try {
      axios.post(`http://localhost:5000/api/notes/bg-color`, bgObject);
      const updatedNotes = contextValue?.notes.map((note: any) =>
        note._id == props.noteUrlParams
          ? { ...note, bgColor: bgObject.bgColor }
          : note
      );
      // Update the contextValue.notes array with the modified note
      contextValue?.setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating bgColor:", error);
    }
  };

  // console.log(props.color);

  return (
    <div>
      <div className="flex items-center gap-2 w-[100%]">
        <Tippy placement="bottom" content={`${props?.color?.name}`}>
          <div
            onClick={appendBgToNote}
            className={`w-[50px] h-[50px] rounded-full`}
            style={{ backgroundColor: props?.color?.color }}
          ></div>
        </Tippy>
        {/* <Tippy placement="bottom" content="Peach ">
          <div
            className={`${"bg-[#692B17]"} w-[50px] h-[50px] rounded-full`}
          ></div>
        </Tippy>
        <Tippy placement="bottom" content="Sand ">
          <div className="bg-[#7C4A03] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Mint ">
          <div className="bg-[#264D3B] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Sage ">
          <div className="bg-[#0C625D] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Fog ">
          <div className="bg-[#256377] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Storm ">
          <div className="bg-[#284255] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Dusk ">
          <div className="bg-[#472E5B] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Blossom ">
          <div className="bg-[#6C394F] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Clay ">
          <div className="bg-[#4B443A] w-[50px] h-[50px] rounded-full"></div>
        </Tippy>
        <Tippy placement="bottom" content="Chalk ">
          <div className="bg-[#232427] w-[50px] h-[50px] rounded-full"></div>
        </Tippy> */}
      </div>
    </div>
  );
};

export default BgColor;
