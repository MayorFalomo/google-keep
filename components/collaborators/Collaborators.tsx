"use client";
import { useAppContext } from "@/helpers/Helpers";
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import "./collab.styled.css";
import { MdOutlineGroupAdd } from "react-icons/md";
import Result from "./Result";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
        .get(`http://localhost:5000/api/notes/get-note/${props.noteUrlParams}`)
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
        .get(`http://localhost:5000/api/users/search?username=${query}`)
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
      label: singleNote?.label,
      collaborator: singleNote?.username,
      createdAt: new Date(),
    };
    console.log(collaborateObject, "Collaborate Object");
    // console.log(getCollaboratorUsername, "getCollaboratorUsername");
    try {
      console.log(collaborateObject, "inside the Try Catch");
      axios
        .post("http://localhost:5000/api/notes/send-note/", collaborateObject)
        .then((res) => console.log(res && toast("Collaborator Added")))
        .then(() => props?.setShowCollaboratorModal(false))
        .catch((err) => console.log(err && toast("Collaboration failed")));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(singleNote, "SingleNote");

  // console.log(getCollaboratorId, "This is suggestions ID");

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
          onSubmit={handleAddCollaborator}
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
              <div className="w-[100%] h-[100%] rounded-full object-cover">
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
          <div className="flex justify-end items-center bg-[#272729] w-full py-2 gap-2">
            <button
              className="py-2 px-6 text-[20px] hover:bg-borderColor outline-none border-none cursor-pointer"
              onClick={() => props.setShowCollaboratorModal(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-6 text-[20px] hover:bg-borderColor outline-none border-none cursor-pointer"
              type="submit"
            >
              Save{" "}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Collaborators;
