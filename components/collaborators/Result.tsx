"use client";
import React from "react";

type Props = {};

const Result = (props: any) => {
  const getUserDetails = () => {
    props?.setGetCollaboratorId(props?.user?._id);
    props?.setGetCollaboratorUsername(props?.user?.username);
    props?.setGetCollaboratorProfilePic(props?.user?.profilePic);
    // props?.setGetCollaboratorEmail(props?.user?.email);
    props?.setSuggestionModal(false);
  };

  // console.log(props.user, "This is user");

  return (
    <div className="p-3">
      <div
        onClick={getUserDetails}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-[50px] h-[50px] ">
          <img
            className="w-[100%] h-[100%] rounded-full object-cover"
            src={props?.user?.profilePic}
          />
        </div>
        <div>
          <p>{props?.user?.username} </p>
          <span className="">{props?.user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Result;
