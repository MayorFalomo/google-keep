import { AppContext } from "next/app";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Router, useRouter } from "next/router";

const AppContext = createContext({});

export const AppContextProvider = ({children}:any) => {
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [cookies, setCookies] = useCookies(["user"])


  // Define functions for updating state
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
 await fetch(`https://twitter-clone-server-nu.vercel.app/api/users/${id}`)
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

  //UseEffect to load cookies.user and just 
useEffect(() => {
  getCurrentUser(cookies?.user);
}, [cookies.user]);
  // Include the functions and state in the context value
  const contextValue = {
    isAuth,
    user,
    notes,
    currentUser,
    bookmarks,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={{contextValue}} >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
