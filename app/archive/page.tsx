"use client";
import Navbar from "@/components/navbar/Navbar";
import Notes from "@/components/notes/Notes";
import Headerbar from "@/components/header/Headerbar";
import ShowNotes from "@/components/showNotes/ShowNotes";
import Pinned from "@/components/pinned/Pinned";

export default function archive() {
  return (
    <div>
      <p>Archive </p>
      {/* <Headerbar />
      <div>
        <Navbar />
        <div>
          <Notes />
          <div className="my-[50px]">
            <Pinned />
            <div>
              <ShowNotes />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
