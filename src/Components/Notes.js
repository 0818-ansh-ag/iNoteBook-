import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes } = context;
  useEffect(() => {
    // if (localStorage.getItem("token")) {
    getNotes();
    // } else {
    //   navigate("/login");
    // }
  }, []);

  return (
    <div>
      <AddNotes />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {/* <div className="container mx-3 my-4 d-flex justify-content-center"> */}
        {notes.length === 0 ? (
          <div className="container mx-3 my-4 d-flex justify-content-center">
            <span>
              <i className="fa-sharp fa-solid fa-notes fa-bounce ">
                {" "}
                No notes to display
              </i>
            </span>
          </div>
        ) : (
          // </div>
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })
        )}
      </div>
    </div>
  );
};

export default Notes;
