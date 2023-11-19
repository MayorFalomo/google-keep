import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {};

const PickDate = (props: any) => {
  const [value, setValue] = React.useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [showTime, setShowTime] = React.useState<boolean>(false);

  console.log(value);

  return (
    <div className="absolute z-40 left-0 top-[0px] w-[320px] p-4 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124] ">
      <div>
        <h1 className="flex items-center gap-[8px] py-3 text-[20px] border-1 border-[#313235]">
          {
            <IoArrowBackSharp
              onClick={() => props.setPickADayModal(false)}
              className="text-[24px] cursor-pointer "
              color="#9AA0A6"
            />
          }{" "}
          Pick date & time{" "}
        </h1>
        <ul>
          <li
            onClick={() => setShowCalendar(true)}
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
            onClick={() => setShowTime(true)}
            className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235]  border-t-0 border-l-0 border-r-0  cursor-pointer "
          >
            8:00 AM
            <span>{<IoMdArrowDropdown />} </span>{" "}
          </li>
          {showTime ? (
            <div className="absolute z-50 left-0 top-[170px] w-[320px] p-4 bg-[#202124] shadow-[0.625rem_0.625rem_0.875rem_0_#202124,-0.5rem_-0.5rem_1.125rem_0_#202124]  ">
              <ul>
                <li className="flex items-center justify-between px-3 pt-3 pb-2 mt-1 cursor-pointer  hover:bg-lighterHover ">
                  Morning <span>8:000 AM </span>{" "}
                </li>
                <li className="flex items-center justify-between px-3 pt-3 pb-2 mt-1 cursor-pointer  hover:bg-lighterHover ">
                  {" "}
                  Afternoon <span>1:00 AM </span>{" "}
                </li>
                <li className="flex items-center justify-between px-3 pt-3 pb-2 mt-1 cursor-pointer hover:bg-lighterHover ">
                  Evening <span>8:00 PM </span>{" "}
                </li>
                <li className="px-3 pt-3 pb-2 mt-1 cursor-pointer hover:bg-lighterHover ">
                  Custom{" "}
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          <li className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235]  border-t-0 border-l-0 border-r-0 cursor-pointer ">
            Does not repeat
            <span>{<IoMdArrowDropdown />} </span>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PickDate;
