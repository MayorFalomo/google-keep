"use client";
import { useAppContext } from "@/helpers/Helpers";
import React from "react";
import { HiUserGroup } from "react-icons/hi";

const Collaborators = () => {
  const { contextValue }: any = useAppContext();
  console.log(contextValue?.user);

  return (
    <div className="convex">
      <div>
        <h1>Collaborators</h1>
        <div className="flex items-center gap-2 ">
          <div className="w-[50px] h-[50px] ">
            <img
              className="w-[100%] object-cover"
              src={contextValue.user?.profilePic}
              alt="img"
            />
          </div>
          <div>
            <h3>
              {contextValue.user?.username}
              <span className="italic">Owner </span>{" "}
            </h3>
            <p className="text-[bg-#444547]">{contextValue.user?.email} </p>
          </div>
        </div>
        <div>
          <span>{HiUserGroup} </span>
          <input placeholder="person or email to share with" />
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
