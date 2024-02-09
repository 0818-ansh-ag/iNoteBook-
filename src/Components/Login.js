import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { showAlert } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("success", "logged in successfully");
    } else {
      // alert("Invalid credentials");
      showAlert("danger", "invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container my-3"
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div
        className="container "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          className="my-4"
          onSubmit={handleSubmit}
          style={{
            border: "1px solid red",
            padding: "12px 12px",
            backgroundColor: "#121212",
            color: "red",
            borderRadius: "2rem",
            minWidth: "35%",
          }}
        >
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ marginTop: "2rem" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ marginBottom: "2rem", color: "white" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              style={{ marginBottom: "2rem" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginBottom: "2rem" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
