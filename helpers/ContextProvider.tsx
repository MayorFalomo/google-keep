"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AppContext } from './Helpers';
import { useCookies } from 'react-cookie';

type Props = {}

const AppContextProvider = ({children}: any) => {

    const router = useRouter()

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
 const getCurrentUser = async(id: string) => {
 await fetch(`http://localhost:5000/api/users/get-user/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("User ID not found");
      }
    })
   .then((res) => {      
      setUser(res.user);
    })
    .catch((err) => {
      console.log(err);
      router.push("/login"); // Redirect to login page if user ID is not found
    });
};
  const contextValue = {
    isAuth,
    setIsAuth,
    user,
    notes,
    currentUser,
    bookmarks,
    getCurrentUser,
  };

  return (
      <AppContext.Provider value={{contextValue}} >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider