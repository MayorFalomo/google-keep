"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AppContext } from "./Helpers";
// import { useCookies } from "react-cookie";
import { getCookie } from "cookies-next";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import axios from "axios";

type Props = {};

const AppContextProvider = ({ children }: any) => {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const currentUser = getCookie("user");
  const [bookmarks, setBookmarks] = useState([]);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [noteModal, setNoteModal] = useState(false); //toggle create note modal
  const [pinnedNote, setPinnedNote] = useState<any>();
  const [archivedNote, setArchivedNote] = useState([]);
  const [overLay, setOverLay] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [changeNoteLayout, setChangeNoteLayout] = useState<boolean>(false);
  const [changeLayout, setChangeLayout] = useState<boolean>(false);
  const [notesLabel, setNotesLabel] = useState<any>([]);
  const [editLabelModal, setEditLabelModal] = useState<boolean>(false);
  // const [cookies, setCookies] = useCookies(["user"]);

  //Define functions for updating state
  const login = (user: any) => {
    setIsAuth(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  //getCurrentUser takes in a parameter called Id which we'll get from currentUser which is cookies.user
  const getCurrentUser = async (id: string) => {
    await axios
      .get(`https://keep-backend-theta.vercel.app/api/users/get-user/${id}`)
      .then((res) => {
        setUser(res.data);
        router.push("/");
        toast.success("login successful");
        toast.success(`Merry Christmas ${res.data?.username} `);
      })
      .catch((err) => {
        console.log(err && router.push("/register"));
      });

    // try {
    //   console.log(res.data, "this is res.data");

    //   if (res.data) {
    //     router.push("/");
    //     // console.log(res.data);
    //     // setUser(res.data);
    //     toast.success("Login Successful!");
    //     // return res.data;
    //   } else {
    //     router.push("/register");
    //     console.log("The id was not found");
    //     setUser(null);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //UseEffect to load cookies.user and just
  // useEffect(() => {
  //   getCurrentUser(cookies?.user);
  // }, [cookies.user]);

  //UseEffect to load cookies.user and just
  useEffect(() => {
    // console.log(currentUser, "This is currentUser");

    getCurrentUser(currentUser ? currentUser : "");
    // console.log(getCookie("user"), "This is the provider");
  }, [currentUser]);

  const contextValue = {
    isAuth,
    setIsAuth,
    user,
    notes,
    setNotes,
    currentUser,
    bookmarks,
    getCurrentUser,
    login,
    logout,
    openTextArea,
    setOpenTextArea,
    noteModal,
    setNoteModal,
    pinnedNote,
    setPinnedNote,
    backgroundColor,
    setBackgroundColor,
    archivedNote,
    setArchivedNote,
    trashedNotes,
    setTrashedNotes,
    changeNoteLayout,
    setChangeNoteLayout,
    notesLabel,
    setNotesLabel,
    editLabelModal,
    setEditLabelModal,
    // changeLayout,
    // setChangeLayout,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
