"use client";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./allusers.css";

type Props = {};

const Allusers = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [allUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://keep-backend-theta.vercel.app/api/users/getall-users"
        );
        const allUsers = response.data;
        setAllUsers(allUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const gridRef = useRef<any>(null);
  const masonryRef = useRef<any>(null);

  // const switchLayout = () => {
  //   let masonryInstance: any = null;

  //   if (typeof window !== "undefined") {
  //     import("masonry-layout").then((module) => {
  //       const Masonry = module.default;
  //       masonryInstance = new Masonry(gridRef.current, {
  //         // options
  //         // itemSelector: ".grid-item",
  //         // columnWidth: 160,
  //         // gutter: 20,
  //       });

  //       masonryRef.current = masonryInstance;
  //     });
  //   }
  // };

  // switchLayout();

  return (
    <div className="grid">
      <div className="w-full flex flex-wrap ">
        {allUsers.map((user: any) => (
          <div
            className="w-fit min-w-200px h-fit min-h-[120px] p-3 border-2 border-[#5F6368] mr-[20px] ml-[5px] mb-[25px] rounded-[10px] max-[600px]:max-w-95%  max-[600px]:w-full max-[600px]:mr-0 "
            key={user?._id}
          >
            <User user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

const User = ({ user }: any) => {
  return (
    <div className="flex justify-center items-center flex-col gap-[7px] ">
      <div
        style={{
          backgroundImage: `url(${user?.profilePic})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "70px",
          height: "70px",
        }}
        className="rounded-full"
      ></div>

      <p className="text-[18px] font-medium text-center mt-2 ">
        {user.username}
      </p>
      <p className="text-[18px] font-medium text-center">{user?.email} </p>
    </div>
  );
};

export default Allusers;
