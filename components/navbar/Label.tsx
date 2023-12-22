import Link from "next/link";
import React from "react";
import { MdOutlineLabel } from "react-icons/md";

type Props = {};

const Label = (props: any) => {
  //   console.log(props?.labelNotes.labels);

  return (
    <div className=" rounded-r-full transition ease-in-out delay-150 cursor-pointer hover:bg-hover">
      {props?.labelNotes?.labels?.map((label: any) => {
        return (
          <div key={label?._id}>
            <div className="flex items-center gap-6 py-4 px-2 text-[20px] my-2  ">
              {" "}
              {
                <MdOutlineLabel
                  className="max-sm:text-2xl md:text-3x1 max-lg:text-3xl xl:text-3xl"
                  color="#9AA0A6"
                  cursor="pointer"
                />
              }{" "}
              <ListedLabel label={label} />
            </div>
            {/* <p>{label.notes}</p> */}
          </div>
        );
      })}
    </div>
  );
};

const ListedLabel = ({ label }: any) => {
  return (
    <div>
      <Link href={`/slug/${label?._id}`}>
        <p className="">{label?.name ? <span>{label?.name}</span> : ""}</p>
      </Link>
    </div>
  );
};

export default Label;
