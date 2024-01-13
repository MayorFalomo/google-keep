import { useAppContext } from "@/helpers/Helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrClose } from "react-icons/gr";
import "./Profile.css";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

type Props = {};

const Profile = (props: any) => {
  const { contextValue }: any = useAppContext();

  const router = useRouter();
  //Function to handle Log out
  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        contextValue?.setUser(null);
      })
      .then(() => router.push("/login"))
      .catch((err) => {
        console.log(err, "Error Logging out user");
      });
  };

  console.log(contextValue?.user, "contextValue?.user");

  return (
    <div className="profile">
      {/* <span
        onClick={() => props?.setOpenProfileModal(false)}
        className="absolute top-[40px] right-[1px] z-10 cursor-pointer "
      >
        {<GrClose />}{" "}
      </span> */}
      <div className="mt-3">
        <p className="relative flex justify-center items-center text-[18px]">
          {contextValue?.user?.email}
          <span
            onClick={() => props?.setOpenProfileModal(false)}
            className="absolute top-[6px] right-[10px] z-10 cursor-pointer"
          >
            {<GrClose />}{" "}
          </span>
        </p>

        <img
          src={contextValue?.user?.profilePic}
          className="rounded-full flex justify-center mt-[10px] mb-[20px] mx-auto"
          width={80}
          height={80}
          alt="img"
        />
        <h2 className="flex justify-center text-[20px] ">
          HI, {contextValue?.user?.username}!{" "}
        </h2>
      </div>
      <div>
        <Link href="/login">
          <p className="flex items-center gap-[8px] cursor-pointer py-3 hover:bg-[#525355] rounded-[5px] ">
            <span className="text-[22px]">
              {" "}
              <AiOutlinePlusCircle />
            </span>{" "}
            Add Another Account{" "}
          </p>
        </Link>
        <p
          onClick={handleLogOut}
          className="flex items-center gap-[8px] cursor-pointer py-3 hover:bg-[#525355]  rounded-[5px]"
        >
          <span className="text-[22px]">
            <IoIosLogOut />{" "}
          </span>{" "}
          Sign Out{" "}
        </p>
      </div>
    </div>
  );
};

export default Profile;
