import React, { useMemo } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./PickADate.css";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {};

const PickDate = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [value, setValue] = React.useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [showTime, setShowTime] = React.useState<boolean>(false);
  const [customTime, setCustomTime] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<any>(props.notepad.userId);
  const [onePm, setOnePm] = React.useState<any>(1);
  const [eightPm, setEightPm] = React.useState<any>(20);

  console.log(props.notepad, "Pick a date");

  const pickATime = async (e: any, digits: number) => {
    e.preventDefault();
    console.log(digits, "This is digits");

    const time = new Date();
    time.setHours(digits, 0, 0, 0);
    console.log(time.toISOString, "The toIsoString");

    // setTime(digits);
    const pickATimeObject = {
      _id: props.notepad?._id,
      time: time.toISOString(),
      userId: props.notepad.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: props.notepad?.username,
      title: props.notepad?.title,
      note: props.notepad?.note,
      picture: props.notepad?.picture,
      drawing: props.notepad?.drawing,
      bgImage: props.notepad?.bgImage,
      bgColor: props.notepad?.bgColor,
      remainder: props.notepad?.remainder,
      collaborator: props.notepad?.collaborator,
      label: props.notepad?.label,
      location: props.notepad?.location,
      createdAt: new Date(),
    };
    try {
      await axios
        .post(
          `http://localhost:5000/api/notes/set-notification/pick-a-time`,
          pickATimeObject
        )
        .catch((err: any) => {
          console.log(err);
        });
      props.setPickAModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pickCon">
      <form className="sub">
        <h1 className="flex items-center gap-[8px] w-[90%] py-3 text-[20px] border-1 border-[#313235]">
          {
            <span className="p-2 rounded-full hover:bg-lighterHover">
              <IoArrowBackSharp
                onClick={() => props.setPickADayModal(false)}
                className="text-[24px] cursor-pointer rounded-full hover:bg-lighterHover "
                color="#9AA0A6"
              />
            </span>
          }{" "}
          Pick date & time{" "}
        </h1>
        <ul className="w-[90%] ">
          <li
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowTime(false);
            }}
            className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235] border-t-0 border-l-0 border-r-0 cursor-pointer "
          >
            {moment(value).format("MMM DD, YYYY")}
            <span>{<IoMdArrowDropdown />} </span>{" "}
          </li>
          {showCalendar ? (
            <div>
              <Calendar value={value} onChange={setValue} />
            </div>
          ) : (
            ""
          )}
          <li
            onClick={() => {
              setShowTime(!showTime);
              setShowCalendar(false);
            }}
            className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235]  border-t-0 border-l-0 border-r-0  cursor-pointer "
          >
            8:00 AM
            <span>{<IoMdArrowDropdown />} </span>{" "}
          </li>
          {showTime ? (
            <form className="customTime ">
              <button
                onClick={(e) => pickATime(e, 8)}
                type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none  hover:bg-lighterHover "
              >
                Morning <span>8:000 AM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 13)}
                type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                {" "}
                Afternoon <span>1:00 PM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 18)}
                type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                Evening <span>6:00 PM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 20)}
                type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                Night <span>8:00 PM </span>{" "}
              </button>
              <button
                onClick={() => setCustomTime(true)}
                type="submit"
                className="px-3 pt-3 pb-2 w-full mt-1 cursor-pointer  outline-none border-none hover:bg-lighterHover "
              >
                Custom{" "}
              </button>
            </form>
          ) : (
            ""
          )}
          <li className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235]  border-t-0 border-l-0 border-r-0 cursor-pointer ">
            Does not repeat
            <span>{<IoMdArrowDropdown />} </span>{" "}
          </li>
        </ul>
        <div className="flex justify-end w-[90%] mt-2 ">
          <button
            className="p-3 outline-none border-none hover:bg-lighterHover cursor-pointer"
            type="submit"
          >
            Save{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PickDate;
