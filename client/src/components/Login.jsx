import React, { useState } from "react";
import "../styles/Login.css";
import $logo from "../images/mup.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ role, changeRole, loginStatus, handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) || value === "") {
      setUsername(value);
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login", { username, password })
      .then((res) => {
        if (res.data.message === "Login successful") {
          handleLogin(true);
          const role = res.data.role; // Get the role from the server response
          console.log("Role received from server: " + res.data.role); // Add this line
          changeRole(role); // Set the role in your state

          // Route based on the role
          if (role === "admin") {
            navigate("/adminhome");
          }
          if (role === "cid") {
            navigate("/cidhome");
          }
          if (role === "NCO") {
            navigate("/ncohome");
          }
        }
      })
      .catch((err) => {
        alert("Netačna značka ili lozinka!");
      });
  };

  return (
    <div className="home">
      <img src={$logo} alt="Logo" className="logo" />
      <h2 className="title-logo">Ministarstvo unutrašnjih poslova</h2>

      <div className="login-form">
        <h1 className="title">Prijavite se</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-pair">
            <label className="username" htmlFor="username">
              Broj Značke:{" "}
            </label>
            <input
              className="username-input"
              type="number"
              id="username"
              name="username"
              value={username}
              autoComplete="new-password"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-pair">
            <label className="password" htmlFor="password">
              Lozinka:
            </label>
            <input
              className="password-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="submit-btn" type="submit" id="submit-btn">
            Prijavi se{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
