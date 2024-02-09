import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  //Get all Notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);

    setNotes(json);
  };

  //Add Notes
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    // console.log(json);

    //logic to add note
    // const note = {
    //   _id: "6494c296f901b9a3efcb7d62",
    //   user: "64947808dfd431ee485a0d65",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-06-22T21:52:22.534Z",
    //   __v: 0,
    // };
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    //Logic to delete
    // console.log(id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Notes
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = await JSON.parse(JSON.stringify(notes));
    // Logic for edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    // console.log(newNotes);
    setNotes(newNotes);
  };

  const showAlert = (type, msg) => {
    setAlerts({
      type: type,
      message: msg,
    });
    setTimeout(() => {
      setAlerts(null);
    }, 3000);
  };

  const [notes, setNotes] = useState(notesInitial);
  const [alerts, setAlerts] = useState(null);

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        setAlerts,
        alerts,
        showAlert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
