"use client";
import { useAppContext } from "@/helpers/Helpers";
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import "./collab.styled.css";
import { MdOutlineGroupAdd } from "react-icons/md";
import Result from "./Result";
import axios from "axios";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const Collaborators = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [suggestionModal, setSuggestionModal] = useState<boolean>(false);
  const [getCollaboratorId, setGetCollaboratorId] = useState<string>("");
  const [getCollaboratorUsername, setGetCollaboratorUsername] = useState<
    string
  >("");
  const [getCollaboratorProfilePic, setGetCollaboratorProfilePic] = useState<
    string
  >("");
  const [getCollaboratorEmail, setGetCollaboratorEmail] = useState<string>("");
  const [singleNote, setSingleNote] = useState<any>();

  // console.log(props.noteUrlParams, "note params");

  useEffect(() => {
    if (props.noteUrlParams) {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/notes/get-note/${props.noteUrlParams}`
        )
        .then((res) => setSingleNote(res.data))
        .catch((err) => console.log(err));
    }
  }, [props?.noteUrlParams]);

  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  const handleShow = () => {
    if (suggestions) {
      setSuggestionModal(true);
    } else {
      setSuggestionModal(false);
    }
  };

  useEffect(() => {
    if (suggestions) {
      setSuggestionModal(true);
    } else {
      setSuggestionModal(false);
    }
  }, [suggestions]);

  const handleInputChange = async (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (query: any) => {
    try {
      axios
        .get(
          `https://keep-backend-theta.vercel.app/api/users/search?username=${query}`
        )
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.log(err));
      // const response = await fetch(
      //   `http://localhost:5000/api/users/search?username=${query}`
      // );
      // const data = await response.json();
      // console.log(data, "this is data");

      // setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  //Function to collaborate with another user
  const handleAddCollaborator = (e: any) => {
    e.preventDefault();

    const collaborateObject = {
      _id: singleNote?._id,
      userId: getCollaboratorId,
      generatedId: generateId(24),
      // email: singleNote?.email,
      username: getCollaboratorUsername,
      profilePic: getCollaboratorProfilePic,
      title: singleNote?.title,
      note: singleNote?.note,
      picture: singleNote?.picture,
      drawing: singleNote?.drawing,
      bgImage: singleNote?.bgImage,
      bgColor: singleNote?.bgColor,
      labels: singleNote?.labels,
      collaborator: singleNote?.username,
      createdAt: new Date(),
    };
    try {
      axios
        .post(
          "https://keep-backend-theta.vercel.app/api/notes/send-note/",
          collaborateObject
        )
        .then((res) => console.log(res && toast.success("Collaborator Added")))
        .catch((err) => console.log(err && toast("Collaboration failed")));
    } catch (error) {
      console.log(error);
    }
    props?.setShowCollaboratorModal(false);
  };

  const handleError = (e: any) => {
    e.preventDefault();
    console.log("Done");
    return toast.success("note sent ");
  };

  console.log(singleNote?._id);

  return (
    <div className="bg-[#2D2E30] fixed z-20 h-auto max-h-[340px] w-1/2 m-auto inset-x-0 inset-y-0 rounded-[10px]">
      <div>
        <div className="p-3 ">
          <h1 className="text-[26px] mx-auto w-[100%]">Collaborators</h1>
          <div className="border-b-2 border-[#4C4D4F] w[-98%] m-[20px] "></div>
          <div className="flex items-center gap-4 ">
            <div className="w-[50px] h-[50px] ">
              <img
                className="w-[100%] h-[100%] rounded-full object-cover"
                src={contextValue.user?.profilePic}
                alt="img"
              />
            </div>
            <div>
              <h3 className="">
                {contextValue.user?.username}
                <span className="italic"> (Owner) </span>{" "}
              </h3>
              <p className="text-[bg-#9AA0A6]">{contextValue.user?.email} </p>
            </div>
          </div>
          <div className="border-b-2 border-[#4C4D4F] w[-100%] mt-[20px]"></div>
        </div>
        <form
          onSubmit={
            singleNote?._id == undefined ? handleAddCollaborator : handleError
          }
          className="flex items-start flex-col gap-[5px] "
        >
          <div className="flex items-center w-full mx-auto p-3 gap-4">
            <span className="border-2 border-[#4C4D4F] p-[7px] rounded-full ">
              {<MdOutlineGroupAdd className="text-[27px]" />}
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="bg-transparent py-3 w-full border-none outline-none "
              placeholder="Person or email to share with"
            />
          </div>

          {getCollaboratorUsername ? (
            <div className="flex items-center gap-4 cursor-pointer p-3">
              <div className="w-[50px] h-[50px] ">
                <img
                  className="w-[100%] h-[100%] rounded-full object-cover"
                  src={getCollaboratorProfilePic}
                  alt="img"
                />
              </div>
              <div className="rounded-full object-cover">
                <p>{getCollaboratorUsername}</p>
                <p>{getCollaboratorEmail}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {suggestionModal ? (
            <div className="">
              {suggestions?.map((suggestion: any) => (
                <Result
                  key={suggestion?._id}
                  user={suggestion}
                  setShowCollaboratorModal={props?.setShowCollaboratorModal}
                  setGetCollaboratorId={setGetCollaboratorId}
                  setGetCollaboratorUsername={setGetCollaboratorUsername}
                  setGetCollaboratorProfilePic={setGetCollaboratorProfilePic}
                  setGetCollaboratorEmail={setGetCollaboratorEmail}
                  setSuggestionModal={setSuggestionModal}
                />
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end items-center bg-[#272729] w-full py-5 gap-2">
            <button
              className="py-2 px-6 text-[20px] hover:bg-borderColor outline-none border-none cursor-pointer"
              onClick={() => props.setOpenCollabModal(false)}
            >
              Cancel
            </button>
            <button
              className={
                singleNote?._id == undefined
                  ? "py-2 px-6 text-[20px] cursor-not-allowed outline-none border-none  "
                  : "py-2 px-6 text-[20px] hover:bg-borderColor outline-none border-none cursor-pointer "
              }
              type="submit"
              disabled={singleNote?._id == undefined}
            >
              Save{" "}
            </button>
          </div>
        </form>
      </div>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#313235",
            color: "#fff",
            width: "350px",
            height: "70px",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }: any) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
};

export default Collaborators;
