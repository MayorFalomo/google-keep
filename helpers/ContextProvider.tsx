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
  const [activeId, setActiveId] = useState<any>(" ");

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      const localStorageId = localStorage?.getItem("user");
      setActiveId(localStorageId);
    }
  }, []);

  // const localStorageId = localStorage.getItem("user");
  // const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const currentUser = getCookie("user") || activeId;
  const [openTextArea, setOpenTextArea] = useState<boolean>(false);
  const [noteModal, setNoteModal] = useState<boolean>(false); //toggle create note modal
  const [pinnedNote, setPinnedNote] = useState<any>();
  const [archivedNote, setArchivedNote] = useState([].reverse());
  const [overLay, setOverLay] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [trashedNotes, setTrashedNotes] = useState([].reverse());
  const [changeNoteLayout, setChangeNoteLayout] = useState<boolean>(false);
  const [notesLabel, setNotesLabel] = useState<any>([]);
  const [editLabelModal, setEditLabelModal] = useState<boolean>(false);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState<boolean>(
    false
  );
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSelected, setIsSelected] = useState([]);
  const [isSelectedShow, setIsSelectedShow] = useState<boolean>(false);
  const [allRemainders, setAllRemainders] = useState([]);
  // console.log(currentUser, "currentUser");

  //getCurrentUser takes in a parameter called Id which we'll get from currentUser which is cookies.user

  const getCurrentUser = async (id: string) => {
    if (id) {
      try {
        // console.log(id, "This is id");
        await axios
          .get(`https://keep-backend-theta.vercel.app/api/users/get-user/${id}`)
          .then((res: any) => {
            // console.log(res.data, "This is res.data");
            setUser(res.data);
            router.push("/");
            toast.success("login successful");
            // toast.success(`Merry Christmas ${res.data?.username} `);
          })
          .catch((err) => {
            console.log(err && router.push("/register"));
          });
        // console.log(res, "This is res");
      } catch (err) {
        console.log(err);
      }
    }
  };

  //UseEffect to load cookies.user and just
  useEffect(() => {
    getCurrentUser(currentUser ? currentUser : "");
  }, [currentUser]);

  // console.log(changeNoteLayout, "ChangeNoteLayout");

  const contextValue = {
    user,
    setUser,
    notes,
    setNotes,
    currentUser,
    getCurrentUser,
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
    showCollaboratorModal,
    setShowCollaboratorModal,
    overLay,
    setOverLay,
    openMobileNav,
    setOpenMobileNav,
    searchResults,
    setSearchResults,
    searchValue,
    setSearchValue,
    isSelected,
    setIsSelected,
    isSelectedShow,
    setIsSelectedShow,
  };

  return (
    <AppContext.Provider value={{ contextValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
