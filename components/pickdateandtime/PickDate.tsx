"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./PickADate.css";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import toast, { ToastBar, Toaster } from "react-hot-toast";

type Props = {};

const PickDate = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [value, setValue] = React.useState<any>(new Date());
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [showTime, setShowTime] = React.useState<boolean>(false);
  const [customTime, setCustomTime] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string>(props.notepad.userId);
  const [onePm, setOnePm] = React.useState<any>(1);
  const [amOrPm, setAmOrPm] = React.useState<any>(20);
  const [timeObject, setTimeObject] = React.useState<any>();
  // console.log(props.notepad, "Pick a date");

  // console.log(value, "This is  value");

  const pickATime = async (e: any, digits: number) => {
    e.preventDefault();

    //So you can set the hours of a specific date like this
    const selectedTime = new Date(value);
    selectedTime.setHours(digits, 0, 0, 0);
    // console.log(selectedTime.toISOString, "The toIsoString");
    // console.log(digits, "digits");
    setAmOrPm(digits);
    // setTime(digits);
    const pickATimeObject = {
      _id: props.notepad?._id,
      time: selectedTime.toISOString(), //This converts the hours to a time format
      userId: props.notepad.userId, //This is not unique, The value is the same thing across all the pinned note, since it's the users id number, we need it to get all the pinned notes belonging to the particular user
      username: props.notepad?.username,
      title: props.notepad?.title,
      note: props.notepad?.note,
      picture: props.notepad?.picture,
      video: props?.notepad?.video,
      bgImage: props.notepad?.bgImage,
      bgColor: props.notepad?.bgColor,
      remainder: props.notepad?.remainder,
      collaborator: props.notepad?.collaborator,
      label: props.notepad?.label,
      location: props.notepad?.location,
      createdAt: new Date(),
    };
    setTimeObject(pickATimeObject);
    setShowTime(false);
    // console.log(pickATimeObject, "Pick a time object");
    // try {
    //   await axios
    //     .post(
    //       `https://keep-backend-theta.vercel.app/api/notes/set-notification/pick-a-time`,
    //       pickATimeObject
    //     )
    //     .catch((err: any) => {
    //       console.log(err);
    //     });
    //   toast.success(`Remainder has been set for ${digits}:00`);
    //   props.setPickADayModal(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const submitCustomTime = async () => {
    // console.log(timeObject, "Time object");

    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/set-notification/pick-a-time`,
          timeObject
        )
        .catch((err: any) => {
          console.log(err);
        });
      toast.success(`Remainder has been set for ${amOrPm}:00`);
      props.setPickADayModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pickCon">
      <form onSubmit={submitCustomTime} className="sub">
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
          {customTime ? (
            // <form onSubmit={(e: any) => e.preventDefault()}>
            <input
              type="text"
              className={
                customTime
                  ? "w-[90%] focus:border-2 focus:border-[#313235] bg-transparent border-none outline-none"
                  : "w-[90%] bg-transparent border-none outline-none"
              }
              placeholder="8:00 AM"
            />
          ) : (
            // </form>
            <button
              onClick={() => {
                setShowTime(!showTime);
                setShowCalendar(false);
              }}
              type="button"
              className="flex items-center justify-between w-[90%] pt-3 pb-2 mt-1 border-2 border-[#313235]  border-t-0 border-l-0 border-r-0  cursor-pointer "
            >
              8:00 AM
              <span>{<IoMdArrowDropdown />} </span>{" "}
            </button>
          )}
          {showTime ? (
            <form
              onSubmit={(e: any) => e.preventDefault()}
              className="customTime "
            >
              <button
                onClick={(e) => pickATime(e, 8)}
                // type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none  hover:bg-lighterHover "
              >
                Morning <span>8:000 AM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 13)}
                // type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                {" "}
                Afternoon <span>1:00 PM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 18)}
                // type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                Evening <span>6:00 PM </span>{" "}
              </button>
              <button
                onClick={(e) => pickATime(e, 20)}
                // type="submit"
                className="flex items-center justify-between w-full px-3 pt-3 pb-2 mt-1 cursor-pointer outline-none border-none hover:bg-lighterHover "
              >
                Night <span>8:00 PM </span>{" "}
              </button>

              {/* <button
                onClick={() => setCustomTime(true)}
                type="submit"
                className="flex justify-start px-3 pt-3 pb-2 w-full mt-1 cursor-pointer  outline-none border-none hover:bg-lighterHover "
              >
                Custom{" "}
              </button> */}
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
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#313235",
            color: "#fff",
            width: "350px",
            height: "70px",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }: any) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
};

export default PickDate;
