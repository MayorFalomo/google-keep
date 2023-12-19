import React from "react";
import { MdOutlineLabel } from "react-icons/md";

type Props = {};

const Label = (props: any) => {
  //   console.log(props?.labelNotes.labels);

  return (
    <div>
      {props?.labelNotes?.labels?.map((label: any) => {
        return (
          <div key={label?._id}>
            <p className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
              {" "}
              {
                <MdOutlineLabel
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
              {label?.name ? label?.name : ""}
            </p>
            {/* <p>{label.notes}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Label;
