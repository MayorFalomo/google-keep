"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAppContext } from "@/helpers/Helpers";
import { auth, provider } from "../../firebase.config";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

type Props = {};

const Register = (props: any) => {
  const { contextValue }: any = useAppContext();

  const router = useRouter();

  //generateId
  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    if (typeof window !== "undefined") {
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join("");
    }
  }

  // const {getCurrentUser} = useContext(AppContextProvider)
  const [email, setEmail] = useState<string>("");
  const [userNames, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notifications, setNotifications] = useState<any>([]);

  // const [cookies, setCookie] = useCookies(["user"]);
  const [name, setName] = useState("");
  // const [isAuth, setIsAuth] = useState<boolean>(false)
  const generatedId = generateId(24);

  // Sign Up With Google
  const signUpWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signInWithPopup(auth, provider).then(async (response) => {
        console.log(response, "response");
        // setCookie("user", generatedId, { path: "/" });
        setCookie("user", generatedId);
        // setCookie("user", generatedId, { path: "/" });
        let userInfo = {
          _id: generatedId,
          userId: response.user.uid,
          username: response.user.displayName,
          password: "12345",
          email: response.user.email,
          profilePic:
            response.user.photoURL == null || ""
              ? "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg"
              : response.user.photoURL,
          notifications: notifications,
          // bio: "Regular Human",
          // location: "Lagos, Nigeria",
          // links: "https://mayowa-falomo.netlify.app"
        };
        console.log(userInfo, "this is userInfo");
        await axios
          .post("http://localhost:5000/api/users/register", userInfo)
          // .catch((err) => console.log(err))
          .then(() => router.push("/"))
          // .then(() => contextValue.getCurrentUser(userInfo?._id))
          .then(() => window.location.reload())
          .catch((err) => console.log(err));
        // window.location.reload();
        contextValue?.getCurrentUser(userInfo?._id);
        router.push("/");
        // console.log(userInfo);
      });
    } catch (err) {
      console.log("Sign up with Google error:", err);
    }
  };
  // const generatedId = generateId(24);

  //Sign up by creating account
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((response) => {
      setCookie("user", generatedId);
      // cookies().set("name", "lee");
      //Since monogoDb can't find google's id since it's 28 digits, i generated my 24 digit id for each user id
      const userInfo = {
        _id: generatedId, //Self generated
        userId: response.user.uid, //userId is from google
        username: userNames,
        email: email,
        password: password,
        profileDp:
          "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg",
        notifications: notifications,
      };
      try {
        axios
          .post("http://localhost:5000/api/users/register", userInfo)
          .then(() => router.push("/"))
          .then(() => window.location.reload())
          .then(() => contextValue?.getCurrentUser(userInfo?._id))
          .catch((err) => err);
        // console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
      // contextValue?.getCurrentUser(userInfo?.id);
    });
  };

  const getRandomName = () => {
    if (email.includes("@fake.com")) {
      setUserName(email.split("@")[0]);
    } else {
      axios
        .get("https://random-word-api.herokuapp.com/word")
        .then((res) => setUserName(res.data[0]))
        .catch((err) => console.log(err));
    }
  };

  const getRandomEmail = () => {
    if (name.length > 0) {
      setEmail(name + "@fake.com");
    } else {
      axios
        .get("https://random-word-api.herokuapp.com/word")
        .then((res) => setEmail(res.data[0] + "@fake.com"))
        .catch((err) => console.log(err));
    }
  };

  const getRandomPassword = () => {
    let passNum = "";
    let passChar = "";

    for (let i = 0; i < 10; i++) {
      passNum += Math.floor(Math.random() * 10);
    }
    for (let i = 0; i < 10; i++) {
      passChar += String.fromCharCode(Math.floor(Math.random() * 28) + 98);
    }

    let result = Array.from(
      passNum.length > passChar.length ? passNum : passChar,
      (_, i) => (passNum[i] || "") + (passChar[i] || "")
    ).join("");
    return result;
  };

  return (
    <div className="bg-white text-black h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-between items-center w-[650px] h-[90%] ">
        <div className="border-2 border-black-200 rounded-xl p-8 mt-2 flex flex-col justify-end mx-[auto] gap-6 w-[95%] max-sm:p-[8px] max-[400px]:w-[100%] max-[400px]:mx-[5px] ">
          <div className="flex flex-col items-center gap-3">
            <Image
              className="flex justify-center m-auto"
              src="./google.svg"
              width="120"
              height="120"
              alt="Google"
            />
            <h1 className="text-[20px] text-center max-sm:text-[16px] ">
              Create a Hi-Notepad account{" "}
            </h1>
            <form
              className="flex justify-center w-[100%]"
              onSubmit={signUpWithGoogle}
            >
              <button
                type="submit"
                className="w-[55%] text-[20px] border-2 border-black-500 rounded-[35px] flex justify-center items-center gap-2 p-2 max-[600px]:w-[80%] max-sm:text-[16px] "
              >
                {<FcGoogle className="text-[24px] max-[400px]:text-[18px]" />}{" "}
                Sign Up With Google
              </button>
            </form>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-end gap-4 w-[100%]"
          >
            <div className="relative w-[100%]">
              <input
                className="p-4 w-full  rounded-[6px] border-2 border-black-500 placeholder:px-3"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
              />
              <div
                onClick={getRandomEmail}
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-1 rounded-[7px] cursor-pointer "
              >
                generate email{" "}
              </div>
            </div>

            <div className="relative w-[100%]">
              <input
                className="p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3"
                value={userNames}
                onChange={(e: any) => setUserName(e.target.value)}
                type="text"
                name="username"
                placeholder="Username"
              />
              <div
                onClick={getRandomName}
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-1 rounded-[7px] cursor-pointer"
              >
                generate name{" "}
              </div>
            </div>

            <div className="relative w-[100%]">
              <input
                className="p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                type="password"
                name="confirmPassword"
                placeholder="Enter Password"
              />
              <div
                onClick={() => setPassword(getRandomPassword())}
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-1 rounded-[7px] cursor-pointer "
              >
                generate password{" "}
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 p-3 w-1/4  bg-[#1B66C9] rounded-[8px] text-[18px] text-white max-sm:w-[100px] max-sm:text-[16px] max-sm:p-2"
            >
              Sign Up{" "}
            </button>
          </form>
          <Link href="/login">
            <p className="flex justify-center">Log in? </p>
          </Link>
        </div>
        <div className=" w-[90%] max-[400px]:w-95%">
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

export default Register;
