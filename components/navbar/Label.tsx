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
            <div className="flex items-center gap-6 py-4 px-4 text-[20px]  hover:bg-hover rounded-r-full transition ease-in-out delay-150 cursor-pointer">
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
      {/* <p>label.id </p> */}
      <p onClick={() => console.log(label?._id)}>
        {label?.name ? label?.name : ""}
      </p>
    </div>
  );
};

export default Label;
