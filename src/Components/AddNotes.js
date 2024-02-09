import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
// import express from "express";

const AddNotes = () => {
  const context = useContext(noteContext);
  const { addNote, showAlert } = context;

  const [note, setNote] = useState({
    inputTitle: "",
    inputDesc: "",
    inputTag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.inputTitle, note.inputDesc, note.inputTag);
    setNote({
      inputTitle: "",
      inputDesc: "",
      inputTag: "",
    });
    showAlert("success", "Notes added successfully");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add Notes</h2>
      <form className="my-4">
        <div className="row mb-3">
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              name="inputTitle"
              value={note.inputTitle}
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputDesc" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="inputDesc"
              name="inputDesc"
              value={note.inputDesc}
              cols="30"
              rows="5"
              onChange={onChange}
              minLength={4}
              required
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputTag" className="col-sm-2 col-form-label">
            Tag
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTag"
              name="inputTag"
              value={note.inputTag}
              onChange={onChange}
            />
          </div>
        </div>

        <button
          disabled={note.inputTitle.length < 5 || note.inputDesc.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
