import { useAppContext } from "@/helpers/Helpers";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import "./Profile.css";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { HiOutlinePencil } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {};

const Profile = (props: any) => {
  const { contextValue }: any = useAppContext();
  const [newUsername, setNewUsername] = React.useState<any>(""); //I decided not to implement the change username functionality
  const [newProfilePic, setNewProfilePic] = React.useState<string>("");
  const [userId, setUserId] = useState<string>("");

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

  const edit = async (files: any) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "t3dil6ur");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dsghy4siv/image/upload`,
        formData
      );
      setNewProfilePic(response.data.url);

      const updated = {
        _id: contextValue?.user?._id,
        profilePic: response.data.url,
      };

      if (response.data.url) {
        await axios
          .put(
            `https://keep-backend-theta.vercel.app/api/users/update-userinfo/${contextValue?.user?._id}`,
            updated
          )
          .catch((err) => console.log(err));
      }
      contextValue.setUser((prevUser: any) => {
        return { ...prevUser, profilePic: response.data.url };
      });

      toast.success("Profile picture Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <form onSubmit={(e) => edit(e)} className="mt-3">
        <p className="relative flex justify-center items-center text-[18px]">
          {contextValue?.user?.email}
          <span
            onClick={() => props?.setOpenProfileModal(false)}
            className="absolute top-[6px] right-[10px] z-10 cursor-pointer"
          >
            {<GrClose />}{" "}
          </span>
        </p>
        <div
          style={{
            backgroundImage: `url(${
              newProfilePic ? newProfilePic : contextValue?.user?.profilePic
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="relative w-[80px] h-[80px] flex justify-center mt-[10px] mb-[20px] mx-auto rounded-full border-2 border-white"
        >
          <label
            htmlFor="upload"
            className="absolute bottom-[-5px] right-[-10px] z-10  bg-black rounded-full p-2 text-[20px] cursor-pointer"
          >
            {<HiOutlinePencil />}{" "}
          </label>
          <input
            type="file"
            onChange={(e) => edit(e.target.files)}
            onClick={() => setUserId(props?.user?._id)}
            id="upload"
            className="hidden"
          />
        </div>
        <h2 className="flex justify-center text-[20px] ">
          HI, {contextValue?.user?.username}!{" "}
        </h2>
      </form>
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
