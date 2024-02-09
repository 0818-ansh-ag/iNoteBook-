import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const EditNote = (props) => {
  const context = useContext(noteContext);
  const { editNote, showAlert } = context;
  const { note, setVisible } = props;
  const [notes, setNote] = useState({
    id: "",
    inputTitle: "",
    inputDesc: "",
    inputTag: "",
  });

  useEffect(() => {
    setNote({
      id: note._id,
      inputTitle: note.title,
      inputDesc: note.description,
      inputTag: note.tag,
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setVisible(false);
    editNote(notes.id, notes.inputTitle, notes.inputDesc, notes.inputTag);
    showAlert("success", "Updated successfully");
  };
  const onChange = (e) => {
    setNote({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form className="my-4" onSubmit={handleClick}>
        <div className="row mb-3">
          <h5>Title</h5>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              name="inputTitle"
              value={notes.inputTitle}
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <h5>Descritption</h5>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="inputDesc"
              name="inputDesc"
              cols="30"
              rows="3"
              value={notes.inputDesc}
              onChange={onChange}
              minLength={4}
              required
            ></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <h5>Tag</h5>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTag"
              name="inputTag"
              value={notes.inputTag}
              onChange={onChange}
            />
          </div>
        </div>

        <button
          disabled={notes.inputTitle.length < 5 || notes.inputDesc.length < 5}
          type="submit"
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNote;
