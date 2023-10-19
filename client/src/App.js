import React, { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Admin";
import User from "./components/User";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("");

  const handleLogin = (data) => {
    setLoginStatus(true);
    setRole(data.role);
  };

  const changeRole = (data) => {
    setRole(data);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                role={role}
                changeRole={changeRole}
                handleLogin={handleLogin}
                loginStatus={loginStatus}
              />
            }
          />
          <Route
            path="/adminhome"
            element={
              <AdminHome
                role={role}
                changeRole={changeRole}
                handleLogin={handleLogin}
                loginStatus={loginStatus}
              />
            }
          />
          <Route
            path="/userhome"
            element={
              <User
                role={role}
                changeRole={changeRole}
                handleLogin={handleLogin}
                loginStatus={loginStatus}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
