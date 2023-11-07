"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useAppContext } from "../../helpers/Helpers";
import { getCookie } from "cookies-next";
import ShowNote from "./showNote";
import "./notes.css";
import Masonry from "masonry-layout";

type Props = {};

export default function ShowNotes(req: any, res: any) {
  const userCookie = getCookie("user", { req, res });
  const { contextValue }: any = useAppContext();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/get-notes/${userCookie}`)
      .then((res) => contextValue.setNotes(res.data.notes))
      .catch((err) => console.log(err));
  }, [userCookie]);

  //   const items = contextValue?.notes.map(function(note:any) {
  //   return <div key={note._id}>{note.name}</div>
  // });

  var elem = document.querySelector(".grid");
  var msnry = new Masonry(elem, {
    // options
    itemSelector: ".grid-item",
    columnWidth: 300,
    gutter: 10,
    percentPosition: true,
    horizontalOrder: true,
    stagger: 30,
    transitionDuration: 0.5,
  });
  // element argument can be a selector string
  //   for an individual element
  var msnry = new Masonry(".grid", {
    // options
  });

  return (
    <div
      onClick={() => contextValue.setOpenTextArea(false)}
      className="grid"
      data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 400 }'
    >
      {contextValue?.notes?.map((note: any) => (
        <div
          // style={{ gridRowEnd: `span ${note.span || 1}` }}
          className="max-w-[350px] min-h-[100px] border-2 border-[#5F6368] mr-[25px] mb-[25px] rounded-[10px]"
          key={note._id}
        >
          <ShowNote note={note} />
        </div>
      ))}
    </div>
  );
}
