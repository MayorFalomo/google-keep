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
import { cookies } from "next/headers";

type Props = {};

const Register = (req: any, res: any) => {
  const { contextValue }: any = useAppContext();

  const router = useRouter();

  //generateId
  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }
  // const {getCurrentUser} = useContext(AppContextProvider)
  const [email, setEmail] = useState<string>("");
  const [userNames, setUserName] = useState<string>("");
  const [passwords, setPasswords] = useState<string>("");
  const [notifications, setNotifications] = useState<any>([]);

  // const [cookies, setCookie] = useCookies(["user"]);
  const [name, setName] = useState("");
  // const [isAuth, setIsAuth] = useState<boolean>(false)

  // Sign Up With Google
  const signUpWithGoogle = async () => {
    const generatedId = generateId(24);

    try {
      signInWithPopup(auth, provider).then((response) => {
        // setCookie("user", generatedId, { path: "/" });
        setCookie("user", generateId, { req, res });
        // setCookie("user", generatedId, { path: "/" });
        let userInfo = {
          id: generatedId,
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
        // console.log(userInfo);
        axios
          .post("http://localhost:5000/api/users/register", userInfo)
          .then(() => router.push("/"))
          .then(() => window.location.reload())
          // .then(() => console.log(userInfo))
          .catch((err) => console.log(err));
        contextValue?.getCurrentUser(userInfo.id);
        // console.log(userInfo);
      });
    } catch (err) {
      console.log("Sign up with Google error:", err);
    }
  };

  //Sign up by creating account
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const generatedId = generateId(24);
    createUserWithEmailAndPassword(auth, email, passwords).then((response) => {
      setCookie("user", generatedId, { req, res });
      // cookies().set("name", "lee");
      //Since monogoDb can't find google's id since it's 28 digits, i generated my 24 digit id for each user id
      const userInfo = {
        id: generatedId, //Self generated
        userId: response.user.uid, //userId is from google
        username: userNames,
        email: email,
        password: passwords,
        profileDp:
          "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg",
        notifications: notifications,
      };
      try {
        axios
          .post("http://localhost:5000/api/users/register", userInfo)
          .then(() => router.push("/"))
          .then(() => window.location.reload())
          .then(() => contextValue?.getCurrentUser(userInfo?.id))
          .catch((err) => err && contextValue.setIsAuth(true));
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
      <div className="flex flex-col justify-between items-center w-[650px] h-[90%]">
        <div className="border-2 border-black-200 rounded-xl p-8 mt-2 flex flex-col justify-end mx-[auto] gap-6 w-[90%] ">
          <div className="flex flex-col items-center gap-3">
            <Image
              className="flex justify-center m-auto"
              src="./google.svg"
              width="120"
              height="120"
              alt="Google"
            />
            <h1 className="text-[25px] text-center">
              Create a Hi-Notepad account{" "}
            </h1>
            <button
              onClick={signUpWithGoogle}
              className="w-[60%] text-[22px] border-2 border-black-500 rounded-[35px] flex justify-center gap-2 p-4"
            >
              {<FcGoogle size={30} />} Sign Up With Google
            </button>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-end gap-4"
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
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-2 rounded-[7px] cursor-pointer "
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
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-2 rounded-[7px] cursor-pointer"
              >
                generate name{" "}
              </div>
            </div>

            <div className="relative w-[100%]">
              <input
                className="p-4 w-full rounded-[6px] bg-white border-2 border-black-500 placeholder:px-3"
                value={passwords}
                onChange={(e: any) => setPasswords(e.target.value)}
                type="password"
                name="confirmPassword"
                placeholder="Enter Password"
              />
              <div
                onClick={() => setPasswords(getRandomPassword())}
                className="absolute bg-[#000] top-0 right-0 text-[#fff] p-2 rounded-[7px] cursor-pointer "
              >
                generate password{" "}
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 p-3 w-1/4  bg-[#1B66C9] rounded-[8px] text-[18px] text-white"
            >
              Sign Up{" "}
            </button>
          </form>
        </div>
        <div className=" w-[90%]">
          <ul className="flex items-start justify-between w-full">
            <li className="flex items-center gap-8">
              English (United States) <span>{<MdOutlineArrowDropDown />} </span>{" "}
            </li>
            <div className="flex items-center gap-4">
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
