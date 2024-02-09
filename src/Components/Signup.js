import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials");
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
            minWidth: "40%",
          }}
        >
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ marginTop: "2rem" }}
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={credentials.name}
              onChange={onChange}
              id="name"
              name="name"
              aria-describedby="nameHelp"
              minLength={3}
              required
            />
            <div
              id="nameHelp"
              className="form-text"
              style={{ marginBottom: "2rem", color: "white" }}
            >
              {" "}
              enter your full name
            </div>
          </div>

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
              minLength={5}
              required
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

export default Signup;
