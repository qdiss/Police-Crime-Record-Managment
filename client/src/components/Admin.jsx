import React, { useState, useEffect } from "react";
import $logoAdmin from "../images/mup.png";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";

function AdminHome({ role, changeRole, loginStatus, handleLogin, username }) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState([]);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
    if (role !== "admin") {
      navigate("/userhome");
    }

    fetch(`/getLoginInfo/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setLoginInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching login info: " + error);
      });
  }, [loginStatus, role, navigate, username]);

  return (
    <div className="admin-home">
      <div className="logo">
        <img src={$logoAdmin} alt="Slika" className="logotip" />
        <h2 className="title-logotip">Ministarstvo unutrašnjih poslova</h2>
      </div>

      <div className="header">
        <h4>Sistem Upravljanja Kriminalističkim Rekordima</h4>
        <div className="login-info">
          <p>Broj Značke: {loginInfo[0]?.username}</p>
          <p>Status: {loginInfo[0]?.status}</p>
        </div>
      </div>
      <div className="admin-home-buttons">
        <button>
          <FaHome /> Home
        </button>
        <button>
          <FaPlus />
          Add Staff
        </button>
        <button>
          <FaPlus />
          View Staff
        </button>
        <button>
          <FaPlus />
          View Cases
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
