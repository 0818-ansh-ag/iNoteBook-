import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Modal from "react-modal";
import EditNote from "./EditNote";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, showAlert } = context;
  const { note } = props;

  //Edit form style
  const [visible, setVisible] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="col-md-3">
      <div className="card my-3 ">
        <div
          className="card-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {note.title}{" "}
          <span>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("success", "Deleted successfully");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={(e) => {
                e.preventDefault();
                setVisible(true);
              }}
            ></i>
            <Modal
              isOpen={visible}
              onRequestClose={() => {
                setVisible(false);
              }}
              ariaHideApp={false}
              style={customStyles}
            >
              <EditNote id={note._id} note={note} setVisible={setVisible} />
              {/* <h2>Edit Note</h2>
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

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form> */}
            </Modal>
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
