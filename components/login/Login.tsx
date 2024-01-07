"use client";
import { auth, provider } from "@/firebase.config";
import { useAppContext } from "@/helpers/Helpers";
import axios from "axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
type Props = {};

const Login = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [cookies, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const router = useRouter();

  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  const signInWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        let userInfo = {
          userId: res.user.uid,
        };
        console.log(userInfo);

        const userObject = await axios.get(
          `http://localhost:5000/api/users/get-user/uid/${userInfo?.userId}`
        );
        setCookie("user", userObject.data?._id, { path: "/" });
        router.push("/");
        window.location.reload();
        contextValue?.getCurrentUser(userObject.data?._id);
      })
      .catch((err) => console.log(err));
  };

  //* When the user logs in with signInWithGoogle it gets a response with the _id now instead of setting cookie to the uid.
  //* since we can't use that i need to get the 24digits id from the server
  //? so now i need to find the uid in the server then the response from the get request i would then extract the _id user
  //! Then set the cookie to that _id after that i can now do a get request of that _id so the server can return the user object....Easy Peasy savvy ??

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const generatedId = generateId(24);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res, "This is res");
        console.log(res.user.uid, "This is res.user.uid");

        setCookie("user", res.user.uid, { path: "/" });
      })
      .then(() => router.push("/"))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white text-black h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-between items-center w-[650px] h-[90%]">
        <div className=" border-2 border-black-200 rounded-xl p-8 mt-2 flex flex-col justify-end mx-[auto] gap-6 w-[95%] max-sm:p-[8px] max-[400px]:w-[100%] max-[400px]:mx-[5px] ">
          <div className="flex flex-col items-center gap-3">
            <Image
              className="flex justify-center m-auto"
              src="./google.svg"
              width="120"
              height="120"
              alt="Google"
            />
            <h1 className="text-[20px] text-center">Login to Hi-Notepad </h1>
            <form
              className="flex justify-center w-[100%]"
              onSubmit={signInWithGoogle}
            >
              <button
                type="submit"
                // className="w-[60%] text-[22px] border-2 border-black-500 rounded-[35px] flex justify-center gap-2 p-4"
                className="w-[60%] text-[20px] border-2 border-black-500 rounded-[35px] flex justify-center items-center gap-2 p-2 max-[600px]:w-[85%] max-sm:w-[90%] max-sm:text-[16px] "
              >
                {<FcGoogle className="text-[24px] max-[400px]:text-[18px]" />}{" "}
                Sign in With Google
              </button>
            </form>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-end gap-4"
          >
            <input
              className="p-4 w-full  rounded-[6px] border-2 border-black-500 placeholder:px-3"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {hidePassword ? (
              <div className="relative w-full ">
                <input
                  className="p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Password"
                />
                <span
                  className="absolute right-[20px] top-[20px]  text-[24px] "
                  onClick={() => setHidePassword(false)}
                >
                  {<BiHide />}{" "}
                </span>
              </div>
            ) : (
              <div className="relative w-full ">
                <input
                  className="p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3"
                  type="text"
                  name="confirmPassword"
                  onChange={(e: any) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
                <span
                  className="absolute right-[20px] top-[20px] text-[24px] "
                  onClick={() => setHidePassword(true)}
                >
                  {<IoEyeOutline />}{" "}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="mt-6 p-3 w-1/4  bg-[#1B66C9] rounded-[8px] text-[18px] text-white max-sm:w-[100px] max-sm:text-[16px] max-sm:p-2"
            >
              Sign In{" "}
            </button>
          </form>
          <Link href="/register ">
            <p className="flex justify-center">Sign up?</p>
          </Link>
        </div>
        <div className=" w-[90%]">
          <ul className="flex items-start justify-between w-full">
            <li className="flex items-center gap-2 max-[400px]:gap-3 max-sm:text-[12px]">
              English (United States) <span>{<MdOutlineArrowDropDown />} </span>{" "}
            </li>
            <div className="flex items-center gap-4 max-[400px]:gap-2 max-sm:text-[12px]">
              <span>Help </span>
              <span>Privacy </span>
              <span>Terms </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
