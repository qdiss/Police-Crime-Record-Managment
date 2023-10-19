import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User({ role, changeRole, loginStatus, handleLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
    }
    if (role !== "user") {
      navigate("/");
    }
  }, [loginStatus, role, navigate]);
  return <div>Ja sam korisnik babo mi je osiguravavac</div>;
}

export default User;
