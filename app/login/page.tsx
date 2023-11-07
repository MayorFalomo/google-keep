import React from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { BsTwitter } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Login from "@/components/login/Login";

type Props = {};

const login = (props: Props) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default login;
