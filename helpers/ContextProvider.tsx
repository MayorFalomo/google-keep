"use client"
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AppContext } from './Helpers';
import { useCookies } from 'react-cookie';

type Props = {}

const AppContextProvider = ({children}: any) => {


  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [cookies, setCookies] = useCookies(["user"])


  //Define functions for updating state
  const login = (user:any) => {
    setIsAuth(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  //getCurrentUser takes in a parameter called Id which we'll get from cookies.user
  const getCurrentUser = async(id: string) => {};

  const contextValue = {
    isAuth,
    user,
    notes,
    currentUser,
    bookmarks,
  };

  return (
      <AppContext.Provider value={{contextValue}} >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider