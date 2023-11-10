"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AppContext } from "./Helpers";
import { useCookies } from "react-cookie";
import { getCookie } from "cookies-next";

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
  const [pinnedNote, setPinnedNote] = useState([]);
  // const [currentUser, setCurrentUser] = useState()
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

  //getCurrentUser takes in a parameter called Id which we'll get from cookies.user
  const getCurrentUser = async (id: string) => {
    await fetch(`http://localhost:5000/api/users/get-user/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("The id was not found");
        }
      })
      .then((res) => {
        router.push("/");
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
        // router.push("/login"); // Redirect to login page if user ID is not found
      });
  };

  //UseEffect to load cookies.user and just
  useEffect(() => {
    getCurrentUser(currentUser);
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
    openTextArea,
    setOpenTextArea,
    noteModal,
    setNoteModal,
    pinnedNote,
    setPinnedNote,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
