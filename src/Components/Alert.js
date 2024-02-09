import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Alert = (props) => {
  const context = useContext(noteContext);
  const { alerts } = context;
  const firstUpper = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div>
      {!alerts ? (
        <div className="container" style={{ display: "none" }}>
          No alert
        </div>
      ) : (
        <div
          className={`alert alert-${alerts.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{firstUpper(alerts.type)}</strong>{" "}
          {firstUpper(alerts.message)}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;
