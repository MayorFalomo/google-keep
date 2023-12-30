import Link from "next/link";
import React from "react";
import { MdOutlineLabel } from "react-icons/md";

type Props = {};

//parent component Navbar.tsx
const Label = (props: any) => {
  // Sample array of objects for testing
  const arrayOfObjects = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Alice", age: 25 },
    { id: 4, name: "Charlie", age: 30 },
  ];

  return (
    <div className=" rounded-r-full transition ease-in-out delay-150 cursor-pointer hover:bg-hover">
      <div>
        {props?.labelNotes.label ? (
          <Link href={`/label/${props?.labelNotes.labelId}`}>
            <p className="flex items-center gap-6 py-4 px-4 text-[20px] my-2  ">
              {" "}
              {
                <MdOutlineLabel
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
              <p>{props?.labelNotes.label} </p>
              <span />
            </p>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Label;
