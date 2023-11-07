"use client";
import React from "react";

type Props = {};

const ShowNote = (props: any) => {
  return (
    <div className="mapped">
      {props.note.title.length == 0 && props.note.note.length == 0 ? (
        <div className="p-4">
          <input className="bg-transparent" placeholder="Empty Note" />
        </div>
      ) : (
        <div className="p-4">
          <h1>{props.note?.title}</h1>
          <p>{props.note?.note.slice(0, 600)}...</p>
        </div>
      )}
    </div>
  );
};

export default ShowNote;
